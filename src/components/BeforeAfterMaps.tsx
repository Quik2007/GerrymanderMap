import { useEffect, useState } from 'react';
import type { Topology } from 'topojson-specification';
import type { StateInfo, DistrictBreakdown, Party } from '../data/types';
import { PARTY_COLOR } from '../lib/visuals';
import { DistrictMap } from './DistrictMap';

/** Which states have real district TopoJSON in public/districts/. */
export const STATES_WITH_REAL_MAPS = new Set([
  'NC',
  'NY',
  'TX',
  'CA',
  'AL',
  'LA',
  'GA',
  'OH',
  'FL',
  'TN',
  'MO',
  'UT',
  'IL',
  'IN',
  'KS',
  'MD',
  'NM',
  'SC',
  'VA',
  'WI',
]);

interface Props {
  info: StateInfo;
}

interface MapPair {
  before: Topology | null;
  after: Topology | null;
  loading: boolean;
}

async function fetchTopology(url: string): Promise<Topology | null> {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return (await r.json()) as Topology;
  } catch {
    return null;
  }
}

export function BeforeAfterMaps({ info }: Props) {
  const hasReal = STATES_WITH_REAL_MAPS.has(info.code);
  const [maps, setMaps] = useState<MapPair>({
    before: null,
    after: null,
    loading: hasReal,
  });

  useEffect(() => {
    if (!hasReal) {
      setMaps({ before: null, after: null, loading: false });
      return;
    }
    let cancelled = false;
    setMaps({ before: null, after: null, loading: true });
    const base = `${import.meta.env.BASE_URL ?? '/'}districts/`;
    Promise.all([
      fetchTopology(`${base}${info.code}-before.json`),
      fetchTopology(`${base}${info.code}-after.json`),
    ]).then(([before, after]) => {
      if (!cancelled) setMaps({ before, after, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, [info.code, hasReal]);

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-8">
      {!hasReal ? (
        <>
          <Fallback title="Before" subtitle="Previous map · schematic" breakdown={info.before} />
          <Fallback title="After" subtitle="New / proposed · schematic" breakdown={info.after} />
          <p className="text-sm text-ink-500 md:col-span-2">
            Real district boundaries for this state aren&rsquo;t bundled yet — showing a schematic
            per-seat representation instead.
          </p>
        </>
      ) : maps.loading ? (
        <>
          <Skeleton title="Before" />
          <Skeleton title="After" />
        </>
      ) : !maps.before || !maps.after ? (
        <>
          <Fallback title="Before" subtitle="Previous map · schematic" breakdown={info.before} />
          <Fallback title="After" subtitle="New / current · schematic" breakdown={info.after} />
          <p className="text-sm text-ink-500 md:col-span-2">
            Couldn&rsquo;t load real district boundaries — falling back to schematic.
          </p>
        </>
      ) : (
        <>
          <DistrictMap
            topology={maps.before}
            parties={info.before.districts}
            compareTo={info.after.districts}
            title="Before"
            subtitle="Previous map · pre-cycle boundaries"
            seats={info.before.seats}
          />
          <DistrictMap
            topology={maps.after}
            parties={info.after.districts}
            compareTo={info.before.districts}
            title="After"
            subtitle={
              info.status === 'failed'
                ? 'No change · effort blocked'
                : info.status === 'planned'
                  ? 'Projected · map in progress'
                  : 'Current map · post-cycle boundaries'
            }
            seats={info.after.seats}
          />
          <p className="text-xs text-ink-500 md:col-span-2">
            Districts that didn&rsquo;t change party between the two maps are dimmed; flipped
            districts are at full saturation. Boundaries via Jeffrey B. Lewis&rsquo; GIS collection
            (cutoff: 119th Congress). The 2025-26 mid-decade redraws are reflected in the seat
            projection but the underlying geometry may pre-date them.
          </p>
        </>
      )}
    </div>
  );
}

function Skeleton({ title }: { title: string }) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold text-ink-300">{title}</div>
      <div className="h-[340px] w-full animate-pulse rounded-md bg-page-2" />
    </div>
  );
}

function Fallback({
  title,
  subtitle,
  breakdown,
}: {
  title: string;
  subtitle: string;
  breakdown: DistrictBreakdown;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="font-serif text-xl font-semibold text-ink-50">{title}</div>
          <div className="text-xs text-ink-500">{subtitle}</div>
        </div>
        <div className="text-sm tabular-nums">
          <span className="font-semibold text-dem-400">{breakdown.seats.D}D</span>
          <span className="mx-1.5 text-ink-600">·</span>
          <span className="font-semibold text-rep-400">{breakdown.seats.R}R</span>
        </div>
      </div>
      <TileGrid districts={breakdown.districts} />
      <SeatBar seats={breakdown.seats} />
    </div>
  );
}

function TileGrid({ districts }: { districts: Party[] }) {
  const cols = districts.length <= 8 ? 4 : districts.length <= 17 ? 6 : 8;
  return (
    <div
      className="my-1 grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {districts.map((p, i) => (
        <div
          key={i}
          className="relative aspect-square overflow-hidden rounded-md text-[10px] font-semibold text-white/90"
          style={{ background: PARTY_COLOR[p] }}
          title={`District ${i + 1} · ${p === 'D' ? 'D-leaning' : 'R-leaning'}`}
        >
          <span className="absolute left-1 top-1 leading-none">{i + 1}</span>
          <span className="absolute right-1 bottom-1 leading-none opacity-80">{p}</span>
        </div>
      ))}
    </div>
  );
}

function SeatBar({ seats }: { seats: { D: number; R: number } }) {
  const total = seats.D + seats.R || 1;
  const dPct = (seats.D / total) * 100;
  return (
    <div
      className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-page-2"
      role="img"
      aria-label={`${seats.D} Democratic seats, ${seats.R} Republican seats`}
    >
      <div className="flex h-full">
        <div style={{ width: `${dPct}%`, background: PARTY_COLOR.D }} />
        <div style={{ width: `${100 - dPct}%`, background: PARTY_COLOR.R }} />
      </div>
    </div>
  );
}
