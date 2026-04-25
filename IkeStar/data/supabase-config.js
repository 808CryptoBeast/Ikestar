/* ════════════════════════════════════════════════════════════
   IKEVERSE SUPABASE CONFIG
   data/supabase-config.js

   SETUP:
   1. Go to supabase.com → New Project
   2. Run data/supabase-schema.sql in SQL Editor
   3. Go to Settings → API
   4. Copy your Project URL and anon public key below
   5. Add this file to index.html BEFORE cultural-extensions.js
════════════════════════════════════════════════════════════ */

const SUPABASE_URL  = 'https://fmrjdvsqdfyaqtzwbbqi.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcmpkdnNxZGZ5YXF0endiYnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1OTE2MzYsImV4cCI6MjA5MTE2NzYzNn0.UKyvX02bG4cNhb7U2TK96t8XFREHYYwHJIKbPK06nqs';

/* ── Supabase client (minimal, no SDK needed) ──────────────
   We use raw fetch() so there's zero dependency.
────────────────────────────────────────────────────────── */
const _sb = {
  _h: () => ({
    'apikey':        SUPABASE_ANON,
    'Authorization': `Bearer ${SUPABASE_ANON}`,
    'Content-Type':  'application/json',
  }),

  async query(table, params = '') {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, { headers: _sb._h() });
    if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`);
    return r.json();
  },

  async upsert(table, data) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: { ..._sb._h(), 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error(`Supabase upsert ${r.status}`);
    return r.json();
  },
};

/* ── Load and apply Supabase knowledge on top of local data ─
   Runs after IKE_EXTENSIONS finishes applying.
────────────────────────────────────────────────────────── */
window.SUPABASE_READY = false;

async function loadSupabaseKnowledge() {
  if (!SUPABASE_URL.includes('supabase.co') || SUPABASE_URL.includes('YOUR_PROJECT')) {
    console.log('[IKE] Supabase not configured — using local data only');
    return;
  }

  try {
    /* Stars */
    const stars = await _sb.query('star_knowledge', 'select=*');
    stars.forEach(row => {
      const star = (typeof STARS !== 'undefined') && STARS.find(s => s.id === row.star_id);
      if (!star) return;
      if (row.haw_name)      star.h       = row.haw_name;
      if (row.meaning)       star.meaning = row.meaning;
      if (row.moolelo)       star.moolelo = row.moolelo;
      if (row.nav_use)       star.nav     = row.nav_use;
      if (row.culture_names) star.cults   = { ...star.cults, ...row.culture_names };
      if (typeof STAR_MAP !== 'undefined' && STAR_MAP[row.star_id]) Object.assign(STAR_MAP[row.star_id], star);
    });

    /* Formations */
    const forms = await _sb.query('formation_knowledge', 'select=*');
    forms.forEach(row => {
      if (typeof CULTURES === 'undefined') return;
      const cult = CULTURES[row.culture_id];
      if (!cult) return;
      const f = cult.formations?.find(x => x.id === row.formation_id);
      if (!f) return;
      if (row.moolelo) f.moolelo = row.moolelo;
      if (row.nav_use) f.navUse  = row.nav_use;
      if (row.meaning) f.meaning = row.meaning;
    });

    /* Moon nights */
    const nights = await _sb.query('moon_nights', 'select=*&order=night_num');
    if (nights.length && typeof MAHINA_NIGHTS !== 'undefined') {
      nights.forEach(row => {
        const i = row.night_num - 1;
        if (!MAHINA_NIGHTS[i]) return;
        if (row.name)     MAHINA_NIGHTS[i].n       = row.name;
        if (row.meaning)  MAHINA_NIGHTS[i].meaning = row.meaning;
        if (row.best_for) MAHINA_NIGHTS[i].bestFor = row.best_for;
        if (row.taboos)   MAHINA_NIGHTS[i].taboos  = row.taboos;
        if (row.notes)    MAHINA_NIGHTS[i].notes   = row.notes;
      });
    }

    window.SUPABASE_READY = true;
    console.log(`[IKE] Supabase: ${stars.length} stars, ${forms.length} formations, ${nights.length} moon nights loaded`);

  } catch(e) {
    console.warn('[IKE] Supabase load failed (using local data):', e.message);
  }
}

/* ── Device session sync ───────────────────────────────────
   Saves and restores observer's last position cross-device
────────────────────────────────────────────────────────── */
let _deviceId = localStorage.getItem('ike-device-id');
if (!_deviceId) {
  _deviceId = 'dev-' + Math.random().toString(36).slice(2,10);
  localStorage.setItem('ike-device-id', _deviceId);
}

async function syncObserverSession() {
  if (!window.SUPABASE_READY) return;
  try {
    await _sb.upsert('observer_sessions', {
      device_id:    _deviceId,
      lat:          OBSERVER?.lat,
      lon:          OBSERVER?.lon,
      last_culture: state?.culture,
      last_seen:    new Date().toISOString(),
    });
  } catch(e) { /* silent fail */ }
}

async function restoreObserverSession() {
  if (!window.SUPABASE_READY) return;
  try {
    const rows = await _sb.query('observer_sessions', `device_id=eq.${_deviceId}&select=*`);
    if (rows[0]?.last_culture && typeof switchCulture === 'function') {
      switchCulture(rows[0].last_culture);
    }
  } catch(e) { /* silent fail */ }
}

/* ── Run after page loads ──────────────────────────────────── */
window.addEventListener('load', async () => {
  await loadSupabaseKnowledge();
  await restoreObserverSession();
  // Sync session every 5 minutes
  setInterval(syncObserverSession, 5 * 60 * 1000);
});