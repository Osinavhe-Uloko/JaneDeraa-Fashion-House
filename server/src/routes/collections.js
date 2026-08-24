const { Router } = require('express');
const { supabase } = require('../lib/supabaseClient');
const { asyncHandler } = require('../lib/asyncHandler');

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ data });
  })
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { data: collection, error } = await supabase
      .from('collections')
      .select('*')
      .eq('slug', req.params.slug)
      .maybeSingle();
    if (error) throw error;
    if (!collection) return res.status(404).json({ error: 'Collection not found' });

    const { data: links, error: linkError } = await supabase
      .from('collection_products')
      .select('product:products(*)')
      .eq('collection_id', collection.id);
    if (linkError) throw linkError;

    res.json({ data: { ...collection, products: links.map((l) => l.product) } });
  })
);

module.exports = router;
