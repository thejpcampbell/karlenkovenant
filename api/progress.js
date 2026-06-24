// Shared two-phone progress store, backed by Supabase (free tier).
// Server-side only: the Supabase keys live in Vercel env vars and never reach
// the browser. The frontend just hits GET/POST /api/progress as before, and
// silently falls back to localStorage if this isn't configured yet (spec §6).
//
// Requires two Vercel env vars:
//   SUPABASE_URL                 e.g. https://abcdxyz.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY    the project's service_role secret (NOT anon)
//
// And one table (run once in the Supabase SQL editor):
//   create table if not exists public.kv (
//     key text primary key,
//     value jsonb not null default '{}'::jsonb,
//     updated_at timestamptz not null default now()
//   );

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const STORE_KEY = 'karlen_covenant_progress';

export default async function handler(req, res) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    // Not configured yet → client falls back to per-phone localStorage.
    return res.status(500).json({ error: 'Storage not configured' });
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/kv`;
  const headers = {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  };

  try {
    if (req.method === 'GET') {
      const r = await fetch(
        `${endpoint}?key=eq.${STORE_KEY}&select=value`,
        { headers }
      );
      if (!r.ok) throw new Error(`read ${r.status}`);
      const rows = await r.json();
      return res.status(200).json(rows[0]?.value || {});
    }

    if (req.method === 'POST') {
      const body =
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({
          key: STORE_KEY,
          value: body,
          updated_at: new Date().toISOString(),
        }),
      });
      if (!r.ok) throw new Error(`write ${r.status}`);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'Storage unavailable' });
  }
}
