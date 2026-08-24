const { Router } = require('express');
const { supabase } = require('../lib/supabaseClient');
const { asyncHandler } = require('../lib/asyncHandler');

const router = Router();

// POST /api/inquiries
// Body: { type: 'custom'|'bespoke', fullName, email, phone, city, garmentType, occasion, fabricPreference, notes, appointmentPreference }
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
      type,
      fullName,
      email,
      phone,
      city,
      garmentType,
      occasion,
      fabricPreference,
      notes,
      appointmentPreference,
    } = req.body;

    if (!type || !fullName || !email) {
      return res.status(400).json({ error: 'type, fullName and email are required' });
    }
    if (!['custom', 'bespoke'].includes(type)) {
      return res.status(400).json({ error: "type must be 'custom' or 'bespoke'" });
    }

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        type,
        full_name: fullName,
        email,
        phone,
        city,
        garment_type: garmentType,
        occasion,
        fabric_preference: fabricPreference,
        notes,
        appointment_preference: appointmentPreference,
        status: 'new',
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ data });
  })
);

module.exports = router;
