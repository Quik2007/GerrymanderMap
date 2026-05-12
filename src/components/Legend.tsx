import { PARTY_COLOR } from '../lib/visuals';

export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-300">
      <LegendSwatch fill={PARTY_COLOR.D} label="Favors Democrats" />
      <LegendSwatch fill={PARTY_COLOR.R} label="Favors Republicans" />
      <LegendSwatch striped party="D" label="Planned" />
      <LegendSwatch striped party="R" label="Planned" />
      <LegendSwatch faded party="D" label="Failed (D attempt)" />
      <LegendSwatch faded party="R" label="Failed (R attempt)" />
      <LegendSwatch fill="#1e293b" label="No action this cycle" />
    </div>
  );
}

function LegendSwatch({
  fill,
  striped,
  faded,
  party,
  label,
}: {
  fill?: string;
  striped?: boolean;
  faded?: boolean;
  party?: 'D' | 'R';
  label: string;
}) {
  const base = party ? PARTY_COLOR[party] : (fill ?? '#1e293b');
  let style: React.CSSProperties = { background: base };
  if (striped && party) {
    style = {
      backgroundColor: '#0a0f1e',
      backgroundImage: `repeating-linear-gradient(45deg, ${base} 0 3px, transparent 3px 6px)`,
    };
  }
  if (faded && party) {
    style = { background: party === 'D' ? '#1e3a8a' : '#7f1d1d' };
  }
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block h-3.5 w-5 rounded-sm border border-ink-700"
        style={style}
        aria-hidden
      />
      <span>{label}</span>
    </span>
  );
}
