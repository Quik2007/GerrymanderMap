import { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { STATES } from '../data/states';
import type { StateInfo } from '../data/types';
import { NAME_TO_CODE } from '../lib/stateNames';
import { stateFill, NEUTRAL_HOVER } from '../lib/visuals';
import { MapPatterns } from './MapPatterns';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

interface Props {
  selected: string | null;
  onSelect: (code: string | null) => void;
}

export function USMap({ selected, onSelect }: Props) {
  const [hover, setHover] = useState<string | null>(null);

  const tooltipState = useMemo(() => {
    const code = hover ?? selected;
    return code ? STATES[code] : null;
  }, [hover, selected]);

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        width={980}
        height={560}
        style={{ width: '100%', height: 'auto' }}
      >
        <MapPatterns />
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name: string = geo.properties.name;
              const code = NAME_TO_CODE[name];
              const info = code ? STATES[code] : undefined;
              const fill = stateFill(info);
              const isSelected = code === selected;
              const isHover = code === hover;
              const isInteractive = Boolean(info && info.status !== 'none');
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#0a0f1e"
                  strokeWidth={isSelected ? 2 : 0.6}
                  style={{
                    default: {
                      outline: 'none',
                      transition: 'fill 200ms, stroke 200ms',
                    },
                    hover: {
                      outline: 'none',
                      fill: isInteractive ? fill : NEUTRAL_HOVER,
                      cursor: isInteractive ? 'pointer' : 'default',
                    },
                    pressed: { outline: 'none' },
                  }}
                  onMouseEnter={() => code && setHover(code)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => {
                    if (!code || !info || info.status === 'none') return;
                    onSelect(isSelected ? null : code);
                  }}
                  className={
                    isSelected
                      ? '[stroke:white] [stroke-width:2px]'
                      : isHover && isInteractive
                        ? '[stroke:#cbd5e1] [stroke-width:1.4px]'
                        : ''
                  }
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <MapTooltip info={tooltipState} />
    </div>
  );
}

function MapTooltip({ info }: { info: StateInfo | null }) {
  if (!info) return null;
  const i = info;
  const sign = i.after.seats.D - i.before.seats.D;
  const delta =
    sign === 0 ? 'no net seat change' : sign > 0 ? `+${sign} D` : `+${-sign} R`;
  return (
    <div className="pointer-events-none absolute right-3 top-3 max-w-xs rounded-xl border border-ink-700 bg-ink-900/90 px-3 py-2 text-xs text-ink-100 shadow-lg backdrop-blur">
      <div className="text-sm font-semibold">{i.name}</div>
      <div className="mt-0.5 text-ink-300">
        {i.before.seats.D}D–{i.before.seats.R}R → {i.after.seats.D}D–{i.after.seats.R}R
        <span className="ml-1 text-ink-400">({delta})</span>
      </div>
    </div>
  );
}
