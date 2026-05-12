import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { STATES } from '../data/states';
import type { StateInfo } from '../data/types';
import { NAME_TO_CODE } from '../lib/stateNames';
import { stateFill, NEUTRAL_HOVER } from '../lib/visuals';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

/** Tiny offsets so postal-code labels don't get covered by other state polygons. */
const LABEL_OFFSETS: Record<string, [number, number]> = {
  FL: [3, 1],
  MI: [4, 6],
  LA: [-4, -2],
  RI: [22, -2],
  CT: [10, 8],
  NJ: [12, 4],
  DE: [18, 0],
  MD: [22, 6],
  MA: [22, -6],
  NH: [4, -4],
  VT: [-3, -4],
};

/** Tiny states get a leader line + offset label so they're tappable. */
const LEADER_LABELS = new Set(['RI', 'CT', 'NJ', 'DE', 'MD', 'MA', 'NH', 'VT']);

interface Props {
  selected: string | null;
  onSelect: (code: string | null) => void;
}

export function USMap({ selected, onSelect }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 1000, h: 600 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const tooltipInfo: StateInfo | null = useMemo(() => {
    const code = hover ?? selected;
    return code ? (STATES[code] ?? null) : null;
  }, [hover, selected]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) setSize({ w: rect.width, h: rect.height });
    });
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHover(null);
        setCursor(null);
      }}
    >
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        width={980}
        height={560}
        style={{ width: '100%', height: 'auto', touchAction: 'manipulation' }}
      >
        <defs>
          <MapPatternsContent />
          <filter id="state-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="state-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodOpacity="0.45" />
          </filter>
        </defs>

        <Geographies geography={GEO_URL}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const name: string = geo.properties.name;
                const code = NAME_TO_CODE[name];
                const info = code ? STATES[code] : undefined;
                const fill = stateFill(info);
                const isSelected = code === selected;
                const isInteractive = Boolean(info && info.status !== 'none');

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={isSelected ? '#f8fafc' : '#0a0f1e'}
                    strokeWidth={isSelected ? 1.4 : 0.5}
                    filter={
                      isSelected
                        ? 'url(#state-glow)'
                        : isInteractive
                          ? 'url(#state-shadow)'
                          : undefined
                    }
                    style={{
                      default: {
                        outline: 'none',
                        transition: 'fill 200ms ease, stroke 200ms ease, opacity 200ms ease',
                        opacity: selected && !isSelected && isInteractive ? 0.78 : 1,
                      },
                      hover: {
                        outline: 'none',
                        fill: isInteractive ? fill : NEUTRAL_HOVER,
                        cursor: isInteractive ? 'pointer' : 'default',
                        opacity: 1,
                      },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() => code && setHover(code)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => {
                      if (!code || !info || info.status === 'none') return;
                      onSelect(isSelected ? null : code);
                    }}
                    aria-label={
                      info ? `${info.name}, status ${info.status}` : name
                    }
                  />
                );
              })}

              {/* State-code labels for active states */}
              {geographies.map((geo) => {
                const name: string = geo.properties.name;
                const code = NAME_TO_CODE[name];
                const info = code ? STATES[code] : undefined;
                if (!code || !info || info.status === 'none') return null;
                const isSelected = code === selected;
                const dimmed = Boolean(selected && !isSelected);
                const centroid = geoCentroid(geo) as [number, number];
                const offset = LABEL_OFFSETS[code] ?? [0, 0];
                const hasLeader = LEADER_LABELS.has(code);
                return (
                  <Marker
                    key={`label-${code}`}
                    coordinates={centroid}
                    style={{ default: { pointerEvents: 'none' } }}
                  >
                    {hasLeader && (
                      <line
                        x1={0}
                        y1={0}
                        x2={offset[0]}
                        y2={offset[1]}
                        stroke="#f8fafc"
                        strokeOpacity={dimmed ? 0.3 : 0.55}
                        strokeWidth={0.7}
                      />
                    )}
                    <text
                      x={offset[0]}
                      y={offset[1]}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      style={{
                        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
                        fontWeight: 700,
                        fontSize: isSelected ? 13 : 11,
                        letterSpacing: '0.04em',
                        fill: '#f8fafc',
                        opacity: dimmed ? 0.6 : 1,
                        paintOrder: 'stroke',
                        stroke: 'rgba(2, 6, 23, 0.85)',
                        strokeWidth: 3,
                        transition: 'font-size 180ms ease, opacity 180ms ease',
                      }}
                    >
                      {code}
                    </text>
                  </Marker>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>

      <Tooltip info={tooltipInfo} cursor={cursor} bounds={size} />
    </div>
  );
}

/**
 * Inline so the patterns share the same <defs> block as our filter defs and
 * stay in document order with the rest of the SVG primitives.
 */
function MapPatternsContent() {
  return (
    <>
      {(['D', 'R'] as const).map((p) => (
        <pattern
          key={p}
          id={`pattern-planned-${p}`}
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
          patternTransform="rotate(45)"
        >
          <rect width="8" height="8" fill="#0a0f1e" />
          <rect
            width="4"
            height="8"
            fill={p === 'D' ? '#3b82f6' : '#ef4444'}
            opacity="0.85"
          />
        </pattern>
      ))}
    </>
  );
}

function Tooltip({
  info,
  cursor,
  bounds,
}: {
  info: StateInfo | null;
  cursor: { x: number; y: number } | null;
  bounds: { w: number; h: number };
}) {
  if (!info || !cursor) return null;
  const sign = info.after.seats.D - info.before.seats.D;
  const delta =
    sign === 0 ? 'no net seat change' : sign > 0 ? `+${sign} D` : `+${-sign} R`;
  const statusColor =
    info.status === 'failed'
      ? '#94a3b8'
      : info.favors === 'D'
        ? '#60a5fa'
        : info.favors === 'R'
          ? '#f87171'
          : '#cbd5e1';

  const offset = 14;
  const tooltipWidth = 260;
  const tooltipHeight = 110;
  const flipX = cursor.x + offset + tooltipWidth > bounds.w;
  const flipY = cursor.y + offset + tooltipHeight > bounds.h;
  const left = flipX ? cursor.x - offset - tooltipWidth : cursor.x + offset;
  const top = flipY ? cursor.y - offset - tooltipHeight : cursor.y + offset;

  return (
    <div
      className="pointer-events-none absolute z-10 max-w-xs rounded-xl border border-ink-700 bg-ink-900/95 px-3 py-2 text-xs text-ink-100 shadow-2xl backdrop-blur"
      style={{ left, top, width: tooltipWidth }}
      role="tooltip"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-ink-50">{info.name}</span>
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ color: statusColor }}
        >
          {info.status}
        </span>
      </div>
      <div className="mt-1 text-ink-300 tabular-nums">
        {info.before.seats.D}D–{info.before.seats.R}R
        <span className="mx-1 text-ink-500">→</span>
        {info.after.seats.D}D–{info.after.seats.R}R
        <span className="ml-1.5 text-ink-400">({delta})</span>
      </div>
      <div className="mt-1.5 text-[11px] text-ink-400">Click to see details</div>
    </div>
  );
}

