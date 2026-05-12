import { PARTY_COLOR } from '../lib/visuals';

export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-400">
      <LegendSwatch fill={PARTY_COLOR.D} label="Favors Democrats" />
      <LegendSwatch fill={PARTY_COLOR.R} label="Favors Republicans" />
      <LegendPair variant="striped" label="Planned" />
      <LegendPair variant="faded" label="Failed" />
      <LegendSwatch fill="#33302c" label="No action this cycle" />
    </div>
  );
}

function LegendSwatch({ fill, label }: { fill: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block h-3 w-5 rounded-sm border border-hairline"
        style={{ background: fill }}
        aria-hidden
      />
      <span>{label}</span>
    </span>
  );
}

function LegendPair({ variant, label }: { variant: 'striped' | 'faded'; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-flex gap-1" aria-hidden>
        <Swatch variant={variant} party="D" />
        <Swatch variant={variant} party="R" />
      </span>
      <span>{label}</span>
    </span>
  );
}

function Swatch({ variant, party }: { variant: 'striped' | 'faded'; party: 'D' | 'R' }) {
  const base = PARTY_COLOR[party];
  const style: React.CSSProperties =
    variant === 'striped'
      ? {
          backgroundColor: '#262422',
          backgroundImage: `repeating-linear-gradient(45deg, ${base} 0 3px, transparent 3px 6px)`,
        }
      : { background: party === 'D' ? '#1e3a8a' : '#7f1d1d' };
  return (
    <span className="inline-block h-3 w-5 rounded-sm border border-hairline" style={style} />
  );
}
