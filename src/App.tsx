import { useCallback, useEffect, useMemo, useState } from 'react';
import { USMap } from './components/USMap';
import { StateDetail } from './components/StateDetail';
import { NewsFeed } from './components/NewsFeed';
import { Legend } from './components/Legend';
import { StatePicker } from './components/StatePicker';
import { NationalImpact } from './components/NationalImpact';
import { STATES } from './data/states';

function readHash(): string | null {
  if (typeof window === 'undefined') return null;
  const h = window.location.hash.replace(/^#/, '').toUpperCase();
  return h && STATES[h] ? h : null;
}

function writeHash(code: string | null) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (code) url.hash = code;
  else url.hash = '';
  window.history.replaceState(null, '', url.pathname + url.search + (code ? `#${code}` : ''));
}

export function App() {
  const [selected, setSelected] = useState<string | null>(() => readHash());

  const selectedInfo = useMemo(
    () => (selected ? STATES[selected] : null),
    [selected],
  );

  const handleSelect = useCallback((code: string | null) => {
    setSelected(code);
    writeHash(code);
    if (code && typeof window !== 'undefined') {
      // Smooth-scroll the detail panel into view on small screens after selection
      requestAnimationFrame(() => {
        const el = document.getElementById('state-detail');
        if (el && window.innerWidth < 1024) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }, []);

  const handleClear = useCallback(() => {
    setSelected(null);
    writeHash(null);
  }, []);

  // Respond to browser back/forward
  useEffect(() => {
    const onHashChange = () => setSelected(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Escape closes detail panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selected) handleClear();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, handleClear]);

  const counts = useMemo(() => {
    const c = { passed: 0, planned: 0, failed: 0 };
    for (const s of Object.values(STATES)) {
      if (s.status in c) c[s.status as keyof typeof c]++;
    }
    return c;
  }, []);

  return (
    <div className="app-bg min-h-screen">
      <Header counts={counts} selected={selected} onSelect={handleSelect} />

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-5">
        <div className="mt-6">
          <NationalImpact />
        </div>

        <section className="card mt-6 overflow-hidden">
          <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 pt-5">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink-50 sm:text-2xl">
                Where the 2024–2026 lines are being redrawn
              </h2>
              <p className="mt-1 text-sm text-ink-300">
                {selected
                  ? 'Click the highlighted state again, press Esc, or pick "Clear" to deselect.'
                  : 'Tap any highlighted state to see its before/after district picture and the news that drove the change.'}
              </p>
            </div>
            {selected && (
              <button type="button" onClick={handleClear} className="btn-ghost">
                Clear selection
              </button>
            )}
          </div>

          <div className="mt-4 px-2 pb-2 sm:px-4">
            <USMap selected={selected} onSelect={handleSelect} />
          </div>

          <details className="group border-t border-ink-800/80 px-5 py-4" open>
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs uppercase tracking-widest text-ink-400">
              <span>Legend</span>
              <span className="text-[10px] text-ink-500 transition group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="mt-3">
              <Legend />
            </div>
          </details>
        </section>

        {selectedInfo && (
          <div id="state-detail" className="mt-6 fade-in">
            <StateDetail info={selectedInfo} onClear={handleClear} />
          </div>
        )}

        <div className="mt-6">
          <NewsFeed filterState={selected} onClearFilter={handleClear} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Header({
  counts,
  selected,
  onSelect,
}: {
  counts: { passed: number; planned: number; failed: number };
  selected: string | null;
  onSelect: (code: string | null) => void;
}) {
  return (
    <header className="border-b border-ink-800/80 bg-ink-950/40 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-5 sm:py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400">
              US Redistricting · 2024–2026
            </div>
            <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl md:text-4xl">
              The Mander Tracker
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-ink-300">
              Interactive map of where congressional district lines are being redrawn this cycle —
              who wins, who loses, and which efforts went through, are pending, or failed.
            </p>
          </div>
          <dl className="flex w-full justify-between gap-3 rounded-xl border border-ink-800/80 bg-ink-900/40 p-3 sm:w-auto sm:gap-6 sm:border-0 sm:bg-transparent sm:p-0">
            <Stat label="Passed" value={counts.passed} tint="text-ink-50" />
            <Stat label="Planned" value={counts.planned} tint="text-amber-300" />
            <Stat label="Failed" value={counts.failed} tint="text-ink-400" />
          </dl>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <StatePicker selected={selected} onSelect={onSelect} />
          {selected && (
            <span className="text-xs text-ink-400">
              Showing <span className="font-semibold text-ink-200">{STATES[selected]?.name}</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value, tint }: { label: string; value: number; tint: string }) {
  return (
    <div className="text-center">
      <div className={`font-display text-2xl font-semibold tabular-nums sm:text-3xl ${tint}`}>
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-widest text-ink-400">{label}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-800/80 bg-ink-950/40">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-ink-400 sm:px-5">
        <p>
          Data in this prototype is illustrative — seat counts and per-district party expectations
          are stylized for visualization. News descriptions are editorial; click the source link on
          each item for the original reporting.
        </p>
      </div>
    </footer>
  );
}
