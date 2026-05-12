import { useEffect, useState } from 'react';
import type { Topology } from 'topojson-specification';
import type { StateInfo, DistrictBreakdown, Party } from '../data/types';
import { PARTY_COLOR, PARTY_COLOR_DEEP } from '../lib/visuals';
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

  if (!hasReal) {
    return (
      <>
        <DistrictPanelFallback title="Before" subtitle="Previous map" breakdown={info.before} />
        <DistrictPanelFallback
          title="After"
          subtitle="New / proposed map"
          breakdown={info.after}
          deep
        />
        <DataNote
          message="Real district boundaries for this state aren't bundled yet — showing a schematic per-seat representation instead."
        />
      </>
    );
  }

  if (maps.loading) {
    return (
      <>
        <Skeleton title="Before" />
        <Skeleton title="After" />
      </>
    );
  }

  if (!maps.before || !maps.after) {
    return (
      <>
        <DistrictPanelFallback title="Before" subtitle="Previous map" breakdown={info.before} />
        <DistrictPanelFallback
          title="After"
          subtitle="New / proposed map"
          breakdown={info.after}
          deep
        />
        <DataNote message="Couldn't load real district boundaries — falling back to schematic." />
      </>
    );
  }

  return (
    <>
      <DistrictMap
        topology={maps.before}
        parties={info.before.districts}
        title="Before"
        subtitle="Previous congressional map"
        seats={info.before.seats}
      />
      <DistrictMap
        topology={maps.after}
        parties={info.after.districts}
        title="After"
        subtitle="New / current map"
        seats={info.after.seats}
        deep
      />
      <DataNote
        message="District boundaries via Jeffrey B. Lewis' GIS collection. Very recent mid-decade redraws may not be reflected in the source dataset yet."
      />
    </>
  );
}

function Skeleton({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-ink-800 bg-ink-950/60 p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <div className="font-display text-lg font-semibold text-ink-50">{title}</div>
      </div>
      <div className="h-[240px] w-full animate-pulse rounded-md bg-ink-900/60" />
    </div>
  );
}

function DataNote({ message }: { message: string }) {
  return (
    <p className="text-xs text-ink-400 md:col-span-2">
      <span className="font-medium text-ink-300">Note:</span> {message}
    </p>
  );
}

/** Schematic per-seat tile grid for states without real boundary data. */
function DistrictPanelFallback({
  title,
  subtitle,
  breakdown,
  deep,
}: {
  title: string;
  subtitle: string;
  breakdown: DistrictBreakdown;
  deep?: boolean;
}) {
  return (
    <div className="rounded-xl border border-ink-800 bg-ink-950/60 p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <div className="font-display text-lg font-semibold text-ink-50">{title}</div>
          <div className="text-xs text-ink-400">{subtitle} · schematic</div>
        </div>
        <div className="text-right text-sm tabular-nums">
          <span className="font-semibold text-dem-400">{breakdown.seats.D}D</span>
          <span className="mx-1.5 text-ink-500">·</span>
          <span className="font-semibold text-rep-400">{breakdown.seats.R}R</span>
        </div>
      </div>
      <TileGrid districts={breakdown.districts} deep={deep} />
      <SeatBar seats={breakdown.seats} />
    </div>
  );
}

function TileGrid({ districts, deep }: { districts: Party[]; deep?: boolean }) {
  const palette = deep ? PARTY_COLOR_DEEP : PARTY_COLOR;
  const cols = districts.length <= 8 ? 4 : districts.length <= 17 ? 6 : 8;
  return (
    <div
      className="my-3 grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {districts.map((p, i) => (
        <div
          key={i}
          className="relative aspect-square overflow-hidden rounded-md text-[10px] font-semibold text-white/90"
          style={{ background: palette[p] }}
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
      className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-800"
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
