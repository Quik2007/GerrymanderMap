import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { USMap } from './components/USMap';
import { StateHero } from './components/StateHero';
import { NewsFeed } from './components/NewsFeed';
import { Legend } from './components/Legend';
import { AboutSections } from './components/AboutSections';
import { STATES } from './data/states';

function readHash(): string | null {
  if (typeof window === 'undefined') return null;
  const h = window.location.hash.replace(/^#/, '').toUpperCase();
  return h && STATES[h] ? h : null;
}

export function App() {
  const [selected, setSelected] = useState<string | null>(() => readHash());
  const selectedInfo = useMemo(() => (selected ? STATES[selected] : null), [selected]);

  /** Tracks whether the user has navigated within the app since loading. */
  const navDepth = useRef(0);

  const handleSelect = useCallback((code: string | null) => {
    const currentHash = window.location.hash.replace(/^#/, '').toUpperCase();
    const nextHash = code ?? '';
    if (currentHash === nextHash) return;
    const url = window.location.pathname + window.location.search + (code ? `#${code}` : '');
    window.history.pushState(null, '', url);
    navDepth.current += 1;
    setSelected(code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    if (navDepth.current > 0) {
      window.history.back();
    } else {
      const url = window.location.pathname + window.location.search;
      window.history.pushState(null, '', url);
      navDepth.current += 1;
      setSelected(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      setSelected(readHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
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

      <main key={selected ?? 'us'} className="fade-in pt-4 pb-10 md:pt-6 md:pb-14">
        {selectedInfo ? (
          <StateHero info={selectedInfo} />
        ) : (
          <DefaultHero selected={selected} onSelect={handleSelect} />
        )}

        <hr className="hairline mx-auto max-w-[1200px] mt-10" aria-hidden />

        <section className="mx-auto mt-10 w-full max-w-[1200px] px-5 md:mt-14 md:px-10">
          <NewsFeed filterState={selected} />
        </section>

        <hr className="hairline mx-auto mt-12 max-w-[1200px] md:mt-16" aria-hidden />

        <AboutSections />
      </main>

      <Footer />
    </div>
  );
}

function DefaultHero({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (code: string | null) => void;
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 md:px-10">
      <div className="max-w-prose">
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tighter text-ink-50 md:text-[44px]">
          Where America&rsquo;s lines are being redrawn
        </h1>
        <p className="mt-2 text-base text-ink-300">
          A map of the 2024–2026 redistricting cycle. Coloured states have changed,
          are changing, or tried and failed to change their congressional districts.
          Tap one to see its before and after.
        </p>
      </div>
      {/* Negative margin lets the US map break out of the section's px-5 on
          mobile so it gets every available pixel of width. */}
      <div className="mt-6 md:mt-8 -mx-5 md:mx-0">
        <USMap selected={selected} onSelect={onSelect} />
      </div>
      <div className="mt-5">
        <Legend />
      </div>
    </section>
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
    <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 pt-5 md:px-10 md:pt-7">
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
      <hr className="hairline mx-auto max-w-[1200px]" aria-hidden />
      <div className="mx-auto max-w-[1200px] px-5 py-6 text-xs text-ink-500 md:px-10">
        <p className="max-w-prose">
          District boundaries via Jeffrey B. Lewis&rsquo; GIS collection. Seat counts and per-district
          party expectations are stylized; news descriptions are editorial. Click any item&rsquo;s source
          link for the original reporting.
        </p>
      </div>
    </footer>
  );
}
