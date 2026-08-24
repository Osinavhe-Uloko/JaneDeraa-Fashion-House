const { Router } = require('express');
const { supabase } = require('../lib/supabaseClient');
const { asyncHandler } = require('../lib/asyncHandler');

const router = Router();

const SORT_MAP = {
  newest: { column: 'created_at', ascending: false },
  'price-asc': { column: 'price_cents', ascending: true },
  'price-desc': { column: 'price_cents', ascending: false },
};

// GET /api/products?gender=women&category=coats&tier=ready-to-wear&tag=New&sort=newest&page=1&pageSize=12&featured=true
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { gender, category, tier, tag, sort = 'newest', featured, q } = req.query;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const pageSize = Math.min(48, Math.max(1, parseInt(req.query.pageSize, 10) || 12));
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('products')
      .select('*, category:categories(id, slug, name)', { count: 'exact' });

    if (gender) query = query.eq('gender', gender);
    if (tier) query = query.eq('tier', tier);
    if (tag) query = query.contains('tags', [tag]);
    if (featured === 'true') query = query.eq('is_featured', true);
    if (q) query = query.ilike('name', `%${q}%`);
    if (category) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .maybeSingle();
      if (cat) query = query.eq('category_id', cat.id);
      else return res.json({ data: [], count: 0, page, pageSize });
    }

    const sortSpec = SORT_MAP[sort] || SORT_MAP.newest;
    query = query.order(sortSpec.column, { ascending: sortSpec.ascending }).range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ data, count, page, pageSize });
  })
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(id, slug, name)')
      .eq('slug', req.params.slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Product not found' });

    res.json({ data });
  })
);

module.exports = router;
