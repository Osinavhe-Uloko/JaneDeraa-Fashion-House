const { Router } = require('express');
const { supabase } = require('../lib/supabaseClient');
const { asyncHandler } = require('../lib/asyncHandler');
const { generateOrderNumber } = require('../lib/orderNumber');

const router = Router();

// POST /api/orders
// Body: { customerName, email, shippingAddress, deliveryMethod, items: [{ productId, name, size, color, qty, priceCents }], shippingCents }
//
// NOTE: this is a mock checkout — no real payment gateway is called. It exists
// so the checkout flow has somewhere real to write an order record.
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { customerName, email, shippingAddress, deliveryMethod, items, shippingCents = 0 } = req.body;

    if (!customerName || !email || !shippingAddress || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'customerName, email, shippingAddress and items are required' });
    }

    const subtotalCents = items.reduce((sum, item) => sum + item.priceCents * item.qty, 0);
    const totalCents = subtotalCents + shippingCents;

    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number: generateOrderNumber(),
        customer_name: customerName,
        email,
        shipping_address: shippingAddress,
        delivery_method: deliveryMethod || 'Standard',
        items,
        subtotal_cents: subtotalCents,
        shipping_cents: shippingCents,
        total_cents: totalCents,
        status: 'confirmed',
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ data });
  })
);

// GET /api/orders?email=name@example.com — order history for a signed-in customer.
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'email query param is required' });

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ data });
  })
);

router.get(
  '/:orderNumber',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', req.params.orderNumber)
      .maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Order not found' });
    res.json({ data });
  })
);

module.exports = router;
