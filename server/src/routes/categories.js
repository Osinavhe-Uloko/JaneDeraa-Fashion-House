const { Router } = require('express');
const { supabase } = require('../lib/supabaseClient');
const { asyncHandler } = require('../lib/asyncHandler');

const router = Router();

// GET /api/categories?gender=women
router.get(
  '/',
  asyncHandler(async (req, res) => {
    let query = supabase.from('categories').select('*').order('name', { ascending: true });
    if (req.query.gender) query = query.eq('gender', req.query.gender);

    const { data, error } = await query;
    if (error) throw error;
    res.json({ data });
  })
);

module.exports = router;
