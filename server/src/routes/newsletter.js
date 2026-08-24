const { Router } = require('express');
const { supabase } = require('../lib/supabaseClient');
const { asyncHandler } = require('../lib/asyncHandler');

const router = Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email }, { onConflict: 'email' })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ data });
  })
);

module.exports = router;
