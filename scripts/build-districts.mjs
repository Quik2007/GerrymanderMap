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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'districts');
const TMP_DIR = path.join(tmpdir(), 'lewis-districts');

const BASE =
  'https://raw.githubusercontent.com/JeffreyBLewis/congressional-district-boundaries/master/GeoJson';

/**
 * For each state, the Lewis-repo source file we treat as "before" the
 * 2024–2026 cycle and the file we treat as "after". For most states the
 * before is the 117th-Congress map (used in the 2022 elections) and the
 * after is the 119th (in effect after the major redraws).
 */
const STATES = [
  { code: 'NC', before: 'North Carolina_117_to_117.geojson', after: 'North Carolina_119_to_119.geojson' },
  { code: 'NY', before: 'New York_115_to_117.geojson',       after: 'New York_119_to_119.geojson' },
  { code: 'TX', before: 'Texas_115_to_117.geojson',          after: 'Texas_118_to_119.geojson' },
  { code: 'CA', before: 'California_115_to_117.geojson',     after: 'California_118_to_119.geojson' },
  { code: 'AL', before: 'Alabama_115_to_117.geojson',        after: 'Alabama_119_to_119.geojson' },
  { code: 'LA', before: 'Louisiana_115_to_117.geojson',      after: 'Louisiana_119_to_119.geojson' },
  { code: 'GA', before: 'Georgia_115_to_117.geojson',        after: 'Georgia_119_to_119.geojson' },
  { code: 'OH', before: 'Ohio_115_to_117.geojson',           after: 'Ohio_118_to_119.geojson' },
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

function runMapshaper(input, output, simplifyPct = 12) {
  // - simplify with Visvalingam, keep small shapes (low-pop districts)
  // - drop unused properties
  // - emit TopoJSON for ~5–10x size reduction over GeoJSON
  // 12% retains enough curvature detail to look smooth at retina/4K
  // pixel densities while still gzipping small (~15-30 KB per state)
  const cmd = [
    'npx', '--yes', 'mapshaper',
    JSON.stringify(input),
    '-clean',
    `-simplify ${simplifyPct}% keep-shapes visvalingam`,
    '-filter-fields district,statename,startcong',
    '-o', 'format=topojson', 'precision=0.0001',
    JSON.stringify(output),
  ].join(' ');
  execSync(cmd, { stdio: ['ignore', 'inherit', 'inherit'] });
}

console.log(`Building district maps for ${STATES.length} states...\n`);
for (const s of STATES) {
  for (const which of ['before', 'after']) {
    const srcName = s[which];
    const tmp = path.join(TMP_DIR, `${s.code}-${which}.geojson`);
    const out = path.join(OUT_DIR, `${s.code}-${which}.json`);
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
