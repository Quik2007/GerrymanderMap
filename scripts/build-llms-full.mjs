/**
 * Generate public/llms-full.txt from the same source-of-truth data that
 * drives the site UI. Run after editing src/data/states.ts or
 * src/data/news.ts. Done as a tiny TS-to-Markdown pass — no heavy build.
 *
 *   node scripts/build-llms-full.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'llms-full.txt');

const statesSrc = readFileSync(path.join(ROOT, 'src/data/states.ts'), 'utf-8');
const newsSrc = readFileSync(path.join(ROOT, 'src/data/news.ts'), 'utf-8');

// --- crude but effective TS-literal extractor (the files are hand-edited
// JSON-like exports; ad-hoc parsing is fine here, no need for a real AST)

function stripQuotes(s) {
  return s.trim().replace(/^['"`]|['"`]$/g, '').replace(/\\'/g, "'");
}

function pickStates() {
  const out = [];
  // Top-level state entries are introduced by `  XX: {` (two-space indent
  // because they sit inside the STATES object) and terminate at the
  // matching `  },` at the same indent — split on that anchor.
  const sections = statesSrc.split(/\n {2}([A-Z]{2}):\s*\{/);
  for (let i = 1; i < sections.length; i += 2) {
    const key = sections[i];
    const rawBody = sections[i + 1] || '';
    // Stop at the outer-level closing `  },`
    const idx = rawBody.search(/\n {2}\},/);
    const body = idx >= 0 ? rawBody.slice(0, idx) : rawBody;
    if (!/code:\s*'/.test(body)) continue;
    const fields = {};
    for (const [, k, v] of body.matchAll(/(\w+):\s*((?:'[^']*'|null|\d+))/g)) {
      fields[k] = v === 'null' ? null : v.replace(/^'|'$/g, '');
    }
    // Summary spans lines — match its full string literal.
    const summary =
      (body.match(/summary:\s*\n?\s*'((?:[^'\\]|\\.)*)'/) ||
        body.match(/summary:\s*\n?\s*"((?:[^"\\]|\\.)*)"/) ||
        [])[1] || '';
    // Seat counts.
    const before =
      (body.match(/before:\s*\{\s*seats:\s*\{\s*D:\s*(\d+),\s*R:\s*(\d+)\s*\}/) || []);
    const after =
      (body.match(/after:\s*\{\s*seats:\s*\{\s*D:\s*(\d+),\s*R:\s*(\d+)\s*\}/) || []);
    out.push({
      code: fields.code,
      name: fields.name,
      totalSeats: +fields.totalSeats,
      status: fields.status,
      favors: fields.favors,
      effective: fields.effective || null,
      before: { D: +before[1], R: +before[2] },
      after: { D: +after[1], R: +after[2] },
      summary: summary.replace(/\\'/g, "'"),
    });
  }
  return out;
}

function pickNews() {
  const out = [];
  const blockRe = /\{\s*id:\s*'([^']+)'[\s\S]*?source:\s*\{[\s\S]*?\},?\s*\n\s*\}/g;
  let m;
  while ((m = blockRe.exec(newsSrc))) {
    const block = m[0];
    const id = m[1];
    const get = (k) => {
      const r = block.match(new RegExp(`${k}:\\s*(?:'([^']*?)'|null)\\s*,`));
      return r ? r[1] ?? null : null;
    };
    const headline =
      (block.match(/headline:\s*'((?:[^'\\]|\\.)*)'/) ||
        block.match(/headline:\s*"((?:[^"\\]|\\.)*)"/) ||
        [])[1] || '';
    const description =
      (block.match(/description:\s*\n?\s*'((?:[^'\\]|\\.)*?)'\s*,\s*\n/s) ||
        block.match(/description:\s*\n?\s*"((?:[^"\\]|\\.)*?)"\s*,\s*\n/s) ||
        [])[1] || '';
    const srcName = (block.match(/source:\s*\{\s*\n?\s*name:\s*'([^']*)'/) || [])[1] || '';
    const srcUrl = (block.match(/url:\s*'([^']*)'/) || [])[1] || '';
    out.push({
      id,
      date: get('date'),
      state: get('state'),
      tag: get('tag'),
      headline: headline.replace(/\\'/g, "'"),
      description: description.replace(/\\'/g, "'").replace(/\s+/g, ' ').trim(),
      sourceName: srcName,
      sourceUrl: srcUrl,
    });
  }
  return out;
}

const states = pickStates();
const news = pickNews().sort((a, b) => (a.date < b.date ? 1 : -1));

const md = [];
md.push('# The Mander Tracker — full content snapshot');
md.push('');
md.push('Generated from the same source-of-truth data that powers');
md.push('https://mandertracker.com. Verified through 2026-05-13.');
md.push('');
md.push('Per-state seat counts are aggregate projections. Source URLs in the');
md.push('news section are deep links (court opinion PDFs, secretary-of-state');
md.push('results, legislative bill pages, or specific articles).');
md.push('');
md.push('---');
md.push('');

md.push('## States');
md.push('');
md.push('Status taxonomy: *passed* = new map in effect; *planned* = announced');
md.push('or pending; *failed* = effort blocked or challenge defeated.');
md.push('');
for (const s of states) {
  const dD = s.after.D - s.before.D;
  const dR = s.after.R - s.before.R;
  const delta =
    dD === 0 && dR === 0 ? 'no net partisan change' : dD > 0 ? `+${dD}D` : `+${dR}R`;
  md.push(`### ${s.name} (${s.code}) — ${s.status}`);
  md.push('');
  md.push(
    `- **Status:** ${s.status}${s.favors ? ` (favors ${s.favors === 'D' ? 'Democrats' : 'Republicans'})` : ''}`,
  );
  md.push(`- **Seats:** ${s.totalSeats} House districts`);
  md.push(
    `- **Projection:** ${s.before.D}D-${s.before.R}R → ${s.after.D}D-${s.after.R}R (${delta})`,
  );
  if (s.effective) md.push(`- **Effective:** ${s.effective}`);
  md.push('');
  md.push(s.summary);
  md.push('');
}

md.push('---');
md.push('');
md.push('## News timeline');
md.push('');
md.push(`${news.length} verified events. Each entry: date · state · tag — headline. Description. Source link.`);
md.push('');
for (const n of news) {
  const scope = n.state ? `[${n.state}]` : '[national]';
  const tag = n.tag ? ` · ${n.tag}` : '';
  md.push(`### ${n.date} ${scope}${tag}`);
  md.push('');
  md.push(`**${n.headline.replace(/\*/g, '\\*')}**`);
  md.push('');
  md.push(n.description.replace(/\*/g, '\\*'));
  md.push('');
  md.push(`Source: [${n.sourceName}](${n.sourceUrl})`);
  md.push('');
}

writeFileSync(OUT, md.join('\n'));
console.log(`Wrote ${path.relative(ROOT, OUT)} — ${states.length} states, ${news.length} news items`);
