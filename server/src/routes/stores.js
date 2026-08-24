const { Router } = require('express');
const { supabase } = require('../lib/supabaseClient');
const { asyncHandler } = require('../lib/asyncHandler');

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('stores').select('*').order('name', { ascending: true });
    if (error) throw error;
    res.json({ data });
  })
);

module.exports = router;
