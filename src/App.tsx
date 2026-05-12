import { useCallback, useEffect, useMemo, useState } from 'react';
import { USMap } from './components/USMap';
import { StateHero } from './components/StateHero';
import { NewsFeed } from './components/NewsFeed';
import { Legend } from './components/Legend';
import { STATES } from './data/states';

function readHash(): string | null {
  if (typeof window === 'undefined') return null;
  const h = window.location.hash.replace(/^#/, '').toUpperCase();
  return h && STATES[h] ? h : null;
}

function writeHash(code: string | null) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  window.history.replaceState(
    null,
    '',
    url.pathname + url.search + (code ? `#${code}` : ''),
  );
}

export function App() {
  const [selected, setSelected] = useState<string | null>(() => readHash());
  const selectedInfo = useMemo(() => (selected ? STATES[selected] : null), [selected]);

  const handleSelect = useCallback((code: string | null) => {
    setSelected(code);
    writeHash(code);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleBack = useCallback(() => handleSelect(null), [handleSelect]);

  useEffect(() => {
    const onHashChange = () => setSelected(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selected) handleBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, handleBack]);

  return (
    <div className="min-h-screen bg-page">
      <Masthead selected={selected} onBack={handleBack} />

      <main className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <section key={selected ?? 'us'} className="fade-in pt-4 pb-10 md:pt-6 md:pb-14">
          {selectedInfo ? (
            <StateHero info={selectedInfo} />
          ) : (
            <>
              <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tighter text-ink-50 md:text-[40px]">
                Where America&rsquo;s lines are being redrawn
              </h1>
              <p className="mt-2 max-w-prose text-base text-ink-300">
                A map of the 2024–2026 redistricting cycle. Coloured states have changed,
                are changing, or tried and failed to change their congressional districts.
                Tap one to see its before and after.
              </p>
              <div className="mt-6 md:mt-8">
                <USMap selected={selected} onSelect={handleSelect} />
              </div>
              <div className="mt-5">
                <Legend />
              </div>
            </>
          )}
        </section>

        <hr className="hairline" aria-hidden />

        <section className="py-10 md:py-14">
          <NewsFeed filterState={selected} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Masthead({
  selected,
  onBack,
}: {
  selected: string | null;
  onBack: () => void;
}) {
  return (
    <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 pt-5 md:px-8 md:pt-7">
      {selected ? (
        <button type="button" onClick={onBack} className="btn-back" aria-label="Back to US map">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back to US map</span>
        </button>
      ) : (
        <span className="text-[11px] uppercase tracking-[0.22em] text-ink-500">
          The Mander Tracker
        </span>
      )}
      <span className="text-[11px] uppercase tracking-[0.22em] text-ink-500">
        US Redistricting · 2024–2026
      </span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto">
      <hr className="hairline" aria-hidden />
      <div className="mx-auto max-w-[1200px] px-5 py-6 text-xs text-ink-500 md:px-8">
        <p className="max-w-prose">
          District boundaries via Jeffrey B. Lewis&rsquo; GIS collection. Seat counts and per-district
          party expectations are stylized; news descriptions are editorial. Click any item&rsquo;s source
          link for the original reporting.
        </p>
      </div>
    </footer>
  );
}
