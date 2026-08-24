const { Router } = require('express');
const { supabase } = require('../lib/supabaseClient');
const { asyncHandler } = require('../lib/asyncHandler');

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    let query = supabase.from('journal_articles').select('*').order('published_at', { ascending: false });
    if (req.query.category) query = query.eq('category', req.query.category);

    const { data, error } = await query;
    if (error) throw error;
    res.json({ data });
  })
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('journal_articles')
      .select('*')
      .eq('slug', req.params.slug)
      .maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Article not found' });
    res.json({ data });
  })
);

module.exports = router;
