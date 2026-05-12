import { useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { FeatureCollection, Feature, Geometry } from 'geojson';
import type { Party } from '../data/types';
import { PARTY_COLOR, PARTY_COLOR_DEEP } from '../lib/visuals';

interface DistrictProps {
  district: number | null;
  statename: string | null;
  [key: string]: unknown;
}

interface Props {
  topology: Topology;
  /** Party prediction per district index (district number 1..N → parties[N-1]). */
  parties: Party[];
  title: string;
  subtitle: string;
  seats: { D: number; R: number };
  /** Use deeper variant of party colors (typically for "after"). */
  deep?: boolean;
}

const WIDTH = 360;
const HEIGHT = 240;

export function DistrictMap({ topology, parties, title, subtitle, seats, deep }: Props) {
  const [hover, setHover] = useState<number | null>(null);

  const features = useMemo<Feature<Geometry, DistrictProps>[]>(() => {
    const layerName = Object.keys(topology.objects)[0];
    const layer = topology.objects[layerName];
    const fc = feature(topology, layer) as unknown as FeatureCollection<Geometry, DistrictProps>;
    return fc.features;
  }, [topology]);

  const pathGen = useMemo(() => {
    const fc: FeatureCollection<Geometry, DistrictProps> = {
      type: 'FeatureCollection',
      features,
    };
    const proj = geoMercator().fitSize([WIDTH - 8, HEIGHT - 8], fc);
    return geoPath(proj);
  }, [features]);

  const palette = deep ? PARTY_COLOR_DEEP : PARTY_COLOR;

  return (
    <div className="rounded-xl border border-ink-800 bg-ink-950/60 p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <div className="font-display text-lg font-semibold text-ink-50">{title}</div>
          <div className="text-xs text-ink-400">{subtitle}</div>
        </div>
        <div className="text-right text-sm tabular-nums">
          <span className="font-semibold text-dem-400">{seats.D}D</span>
          <span className="mx-1.5 text-ink-500">·</span>
          <span className="font-semibold text-rep-400">{seats.R}R</span>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="block h-auto w-full"
          role="img"
          aria-label={`${title} district map`}
        >
          <g transform="translate(4, 4)">
            {features.map((f) => {
              const distNum = Number(f.properties?.district ?? 0);
              const idx = distNum - 1;
              const party: Party | undefined = parties[idx];
              const fill = party ? palette[party] : '#475569'; // ink-600 for unknown
              const isHover = hover === distNum;
              const d = pathGen(f) ?? '';
              return (
                <path
                  key={distNum || Math.random()}
                  d={d}
                  fill={fill}
                  stroke={isHover ? '#f8fafc' : '#0a0f1e'}
                  strokeWidth={isHover ? 1.6 : 0.6}
                  style={{ cursor: 'pointer', transition: 'stroke 120ms' }}
                  onMouseEnter={() => setHover(distNum)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </g>
        </svg>
        {hover !== null && (() => {
          const p = parties[hover - 1];
          const label = p === 'D' ? 'D-leaning' : p === 'R' ? 'R-leaning' : 'unknown lean';
          return (
            <div className="pointer-events-none absolute left-2 bottom-2 rounded-md border border-ink-700 bg-ink-900/95 px-2 py-1 text-[11px] text-ink-100 shadow-lg backdrop-blur">
              District {hover}
              <span className="ml-1.5 text-ink-400">· {label}</span>
            </div>
          );
        })()}
      </div>

      <SeatBar seats={seats} />
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
