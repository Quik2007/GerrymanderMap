import { useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { FeatureCollection, Feature, Geometry } from 'geojson';
import type { Party } from '../data/types';
import { PARTY_COLOR } from '../lib/visuals';

interface DistrictProps {
  district: number | null;
  statename: string | null;
  [key: string]: unknown;
}

interface Props {
  topology: Topology;
  /** Party prediction per district number (parties[N-1] for district N). */
  parties: Party[];
  /** The party array from the *other* map — used to dim districts whose party didn't change. */
  compareTo: Party[];
  title: string;
  subtitle: string;
  seats: { D: number; R: number };
}

const W = 700;
const H = 460;

export function DistrictMap({ topology, parties, compareTo, title, subtitle, seats }: Props) {
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
    const proj = geoMercator().fitSize([W - 8, H - 8], fc);
    return geoPath(proj);
  }, [features]);

  const hoverInfo = (() => {
    if (hover == null) return null;
    const p = parties[hover - 1];
    const other = compareTo[hover - 1];
    const changed = p && other && p !== other;
    const lean = p === 'D' ? 'D-leaning' : p === 'R' ? 'R-leaning' : 'unknown lean';
    return { lean, changed };
  })();

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="font-serif text-xl font-semibold text-ink-50">{title}</div>
          <div className="text-xs text-ink-500">{subtitle}</div>
        </div>
        <div className="text-sm tabular-nums">
          <span className="font-semibold text-dem-400">{seats.D}D</span>
          <span className="mx-1.5 text-ink-600">·</span>
          <span className="font-semibold text-rep-400">{seats.R}R</span>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          shapeRendering="geometricPrecision"
          role="img"
          aria-label={`${title} district map`}
        >
          <g transform="translate(4, 4)">
            {features.map((f) => {
              const distNum = Number(f.properties?.district ?? 0);
              const idx = distNum - 1;
              const party: Party | undefined = parties[idx];
              const other: Party | undefined = compareTo[idx];
              const fill = party ? PARTY_COLOR[party] : '#5e574e';
              // Same party in before and after → unchanged → render slightly muted
              const isChanged = !!(party && other && party !== other);
              const opacity = !party ? 1 : isChanged ? 1 : 0.55;
              const isHover = hover === distNum;
              const d = pathGen(f) ?? '';
              return (
                <path
                  key={distNum || Math.random()}
                  d={d}
                  fill={fill}
                  fillOpacity={opacity}
                  stroke={isHover ? '#f6f1e8' : '#262422'}
                  strokeWidth={isHover ? 1.8 : 0.7}
                  style={{ cursor: 'pointer', transition: 'stroke 120ms, fill-opacity 180ms' }}
                  onMouseEnter={() => setHover(distNum)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </g>
        </svg>
        {hoverInfo && (
          <div className="pointer-events-none absolute left-1 bottom-1 rounded-md border border-hairline bg-page-2/95 px-2 py-1 text-[11px] text-ink-100 shadow-lg backdrop-blur">
            District {hover}
            <span className="ml-1.5 text-ink-400">· {hoverInfo.lean}</span>
            {hoverInfo.changed && (
              <span className="ml-1.5 text-ink-300 font-medium">· flipped</span>
            )}
          </div>
        )}
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
