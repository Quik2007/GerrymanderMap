/**
 * Build per-state before/after district TopoJSON files.
 *
 * Pulls full-resolution GeoJSON from Jeffrey B. Lewis' congressional district
 * boundaries repository (https://github.com/JeffreyBLewis/congressional-district-boundaries),
 * runs mapshaper to simplify aggressively for web use, and emits per-state
 * TopoJSON to public/districts/.
 *
 * Run with: node scripts/build-districts.mjs
 */

import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKIP_EXISTING = process.argv.includes('--skip-existing');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'districts');
const TMP_DIR = path.join(tmpdir(), 'lewis-districts');

const BASE =
  'https://raw.githubusercontent.com/JeffreyBLewis/congressional-district-boundaries/master/GeoJson';

/**
 * For each state, the Lewis-repo source file we treat as "before" the
 * 2024–2026 cycle and the file we treat as "after".
 *
 * Lewis's coverage stops at the 119th Congress (i.e. the map in force at
 * the 2024 election). The 2025-26 mid-decade redraws (TX Aug 2025, NC Oct
 * 2025, CA Prop 50, OH Oct 2025, MO Sep 2025, UT Nov 2025, FL May 2026,
 * TN May 2026, plus the Alabama post-Callais revert) are NOT reflected in
 * the 119 boundaries here — the partisan projection on each district is
 * conveyed via the `districts` array in `src/data/states.ts`, which the
 * UI renders on top of the most-recent available geometry.
 *
 * For states that did not redraw at all this cycle (IL, IN, KS, MD, NM,
 * SC, VA, WI), Lewis only publishes one combined 118-119 file; we use it
 * for both before and after so the geometry shows up cleanly even though
 * the seat array is unchanged.
 */
const STATES = [
  // States that redrew or had court action
  { code: 'NC', before: 'North Carolina_117_to_117.geojson', after: 'North Carolina_119_to_119.geojson' },
  { code: 'NY', before: 'New York_115_to_117.geojson',       after: 'New York_119_to_119.geojson' },
  { code: 'TX', before: 'Texas_115_to_117.geojson',          after: 'Texas_118_to_119.geojson' },
  { code: 'CA', before: 'California_115_to_117.geojson',     after: 'California_118_to_119.geojson' },
  { code: 'AL', before: 'Alabama_118_to_118.geojson',        after: 'Alabama_119_to_119.geojson' },
  { code: 'LA', before: 'Louisiana_115_to_117.geojson',      after: 'Louisiana_119_to_119.geojson' },
  { code: 'GA', before: 'Georgia_115_to_117.geojson',        after: 'Georgia_119_to_119.geojson' },
  { code: 'OH', before: 'Ohio_115_to_117.geojson',           after: 'Ohio_118_to_119.geojson' },
  { code: 'FL', before: 'Florida_115_to_117.geojson',        after: 'Florida_118_to_119.geojson' },
  { code: 'TN', before: 'Tennessee_118_to_119.geojson',      after: 'Tennessee_118_to_119.geojson' },
  { code: 'MO', before: 'Missouri_118_to_119.geojson',       after: 'Missouri_118_to_119.geojson' },
  { code: 'UT', before: 'Utah_118_to_119.geojson',           after: 'Utah_118_to_119.geojson' },

  // States where the cycle effort failed or no redraw happened
  { code: 'IL', before: 'Illinois_118_to_119.geojson',       after: 'Illinois_118_to_119.geojson' },
  { code: 'IN', before: 'Indiana_118_to_119.geojson',        after: 'Indiana_118_to_119.geojson' },
  { code: 'KS', before: 'Kansas_118_to_119.geojson',         after: 'Kansas_118_to_119.geojson' },
  { code: 'MD', before: 'Maryland_115_to_117.geojson',       after: 'Maryland_118_to_119.geojson' },
  { code: 'NM', before: 'New Mexico_118_to_119.geojson',     after: 'New Mexico_118_to_119.geojson' },
  { code: 'SC', before: 'South Carolina_115_to_117.geojson', after: 'South Carolina_118_to_119.geojson' },
  { code: 'VA', before: 'Virginia_115_to_117.geojson',       after: 'Virginia_118_to_119.geojson' },
  { code: 'WI', before: 'Wisconsin_118_to_119.geojson',      after: 'Wisconsin_118_to_119.geojson' },
];

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });

async function fetchToFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} -> HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  return buf.length;
}

const MAPSHAPER_BIN = path.join(ROOT, 'node_modules', '.bin', 'mapshaper');

function runMapshaper(input, output, simplifyPct = 12) {
  // - simplify with Visvalingam, keep small shapes (low-pop districts)
  // - drop unused properties
  // - emit TopoJSON for ~5–10x size reduction over GeoJSON
  // 12% retains enough curvature detail to look smooth at retina/4K
  // pixel densities while still gzipping small (~15-30 KB per state)
  const bin = existsSync(MAPSHAPER_BIN) ? MAPSHAPER_BIN : 'npx --yes mapshaper';
  const cmd = [
    bin,
    JSON.stringify(input),
    '-clean',
    `-simplify ${simplifyPct}% keep-shapes visvalingam`,
    '-filter-fields district,statename,startcong',
    '-o', 'format=topojson', 'precision=0.0001',
    JSON.stringify(output),
  ].join(' ');
  execSync(cmd, { stdio: ['ignore', 'inherit', 'inherit'] });
}

console.log(`Building district maps for ${STATES.length} states${SKIP_EXISTING ? ' (skipping existing)' : ''}...\n`);
for (const s of STATES) {
  for (const which of ['before', 'after']) {
    const srcName = s[which];
    const tmp = path.join(TMP_DIR, `${s.code}-${which}.geojson`);
    const out = path.join(OUT_DIR, `${s.code}-${which}.json`);
    if (SKIP_EXISTING && existsSync(out)) {
      console.log(`[${s.code} ${which}] skipped (already exists)\n`);
      continue;
    }
    try {
      console.log(`[${s.code} ${which}] downloading ${srcName}`);
      const bytes = await fetchToFile(`${BASE}/${encodeURI(srcName)}`, tmp);
      console.log(`   ${bytes.toLocaleString()} bytes raw`);
      runMapshaper(tmp, out);
      const sz = statSync(out).size;
      console.log(`   wrote ${path.relative(ROOT, out)} (${sz.toLocaleString()} bytes)\n`);
    } catch (e) {
      console.error(`   FAILED ${s.code} ${which}: ${e.message}\n`);
    }
  }
}

console.log('Done.');
