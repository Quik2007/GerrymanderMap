import type { StateInfo } from '../data/types';
import { PARTY_COLOR, partyLabel, seatDelta, statusLabel } from '../lib/visuals';
import { BeforeAfterMaps } from './BeforeAfterMaps';

interface Props {
  info: StateInfo;
  onClear: () => void;
}

export function StateDetail({ info, onClear }: Props) {
  const delta = seatDelta(info);
  const netShift =
    delta.D === 0 && delta.R === 0
      ? 'No net partisan change'
      : delta.D > 0
        ? `Net +${delta.D} Democratic seat${delta.D === 1 ? '' : 's'}`
        : `Net +${delta.R} Republican seat${delta.R === 1 ? '' : 's'}`;

  return (
    <section className="card overflow-hidden">
      <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-800/80 px-5 py-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-ink-400">
            {info.totalSeats} House seats
            {info.effective ? ` · effective ${info.effective}` : ''}
          </div>
          <h2 className="font-display text-2xl font-semibold text-ink-50">{info.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge info={info} />
          <button
            type="button"
            onClick={onClear}
            className="btn-ghost"
            aria-label="Close state detail"
          >
            Close
          </button>
        </div>
      </header>

      <div className="grid gap-5 px-5 py-5 md:grid-cols-2">
        <BeforeAfterMaps info={info} />
      </div>

      <div className="border-t border-ink-800/80 px-5 py-4">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-semibold text-ink-100">{netShift}</span>
          <span className="text-ink-400">
            {info.before.seats.D}D – {info.before.seats.R}R
            <span className="mx-2 text-ink-500">→</span>
            {info.after.seats.D}D – {info.after.seats.R}R
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-200">{info.summary}</p>
      </div>
    </section>
  );
}

function StatusBadge({ info }: { info: StateInfo }) {
  const isPlanned = info.status === 'planned';
  const isFailed = info.status === 'failed';
  const partyColor = info.favors ? PARTY_COLOR[info.favors] : '#64748b';
  const bg = isFailed
    ? 'rgba(100,116,139,0.15)'
    : isPlanned
      ? `${partyColor}22`
      : `${partyColor}26`;
  const text = isFailed
    ? '#cbd5e1'
    : info.favors
      ? info.favors === 'D'
        ? '#93c5fd'
        : '#fca5a5'
      : '#cbd5e1';
  const dot = isFailed ? '#94a3b8' : partyColor;
  return (
    <span
      className="chip"
      style={{ background: bg, color: text, border: `1px solid ${dot}55` }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: dot }}
        aria-hidden
      />
      {statusLabel(info.status)}
      {info.favors && info.status !== 'failed' ? ` · favors ${partyLabel(info.favors)}` : null}
      {isFailed && info.favors ? ` · ${partyLabel(info.favors)} attempt` : null}
    </span>
  );
}

