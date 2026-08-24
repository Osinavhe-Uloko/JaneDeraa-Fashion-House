const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.warn(
    '[supabase] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set. ' +
      'Copy server/.env.example to server/.env and fill in your project credentials.'
  );
}

const supabase = createClient(url || 'http://localhost', serviceRoleKey || 'placeholder', {
  auth: { persistSession: false },
});

module.exports = { supabase };
