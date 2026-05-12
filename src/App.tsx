import { useCallback, useMemo, useState } from 'react';
import { USMap } from './components/USMap';
import { StateDetail } from './components/StateDetail';
import { NewsFeed } from './components/NewsFeed';
import { Legend } from './components/Legend';
import { STATES } from './data/states';

export function App() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedInfo = useMemo(
    () => (selected ? STATES[selected] : null),
    [selected],
  );

  const handleSelect = useCallback((code: string | null) => {
    setSelected(code);
  }, []);

  const handleClear = useCallback(() => setSelected(null), []);

  const counts = useMemo(() => {
    const c = { passed: 0, planned: 0, failed: 0 };
    for (const s of Object.values(STATES)) {
      if (s.status in c) c[s.status as keyof typeof c]++;
    }
    return c;
  }, []);

  return (
    <div className="app-bg min-h-screen">
      <Header counts={counts} />

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <section className="card mt-6 p-5">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-50">
                Where the 2024–2026 lines are being redrawn
              </h2>
              <p className="mt-1 text-sm text-ink-300">
                Click any highlighted state to see its before/after district picture and the news
                that drove the change.
              </p>
            </div>
            {selected && (
              <button type="button" onClick={handleClear} className="btn-ghost">
                Clear selection
              </button>
            )}
          </div>

          <USMap selected={selected} onSelect={handleSelect} />

          <div className="mt-4 border-t border-ink-800/80 pt-4">
            <Legend />
          </div>
        </section>

        {selectedInfo && (
          <div className="mt-6">
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

function Header({ counts }: { counts: { passed: number; planned: number; failed: number } }) {
  return (
    <header className="border-b border-ink-800/80 bg-ink-950/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-5 py-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400">
            US Redistricting · 2024–2026
          </div>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink-50 md:text-4xl">
            The Mander Tracker
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-300">
            An interactive map of where congressional district lines are being redrawn this cycle —
            who wins, who loses, and which efforts went through, are pending, or failed.
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-4 text-center md:gap-6">
          <Stat label="Passed" value={counts.passed} tint="text-ink-50" />
          <Stat label="Planned" value={counts.planned} tint="text-amber-300" />
          <Stat label="Failed" value={counts.failed} tint="text-ink-400" />
        </dl>
      </div>
    </header>
  );
}

function Stat({ label, value, tint }: { label: string; value: number; tint: string }) {
  return (
    <div>
      <div className={`font-display text-2xl font-semibold tabular-nums ${tint}`}>{value}</div>
      <div className="text-[11px] uppercase tracking-widest text-ink-400">{label}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-800/80 bg-ink-950/40">
      <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-ink-400">
        <p>
          Data in this prototype is illustrative — seat counts and per-district party expectations
          are stylized for visualization. News descriptions are editorial; click the source link on
          each item for the original reporting.
        </p>
      </div>
    </footer>
  );
}
