import type { StateInfo } from '../data/types';
import { PARTY_COLOR, partyLabel, seatDelta, statusLabel } from '../lib/visuals';
import { BeforeAfterMaps } from './BeforeAfterMaps';

interface Props {
  info: StateInfo;
}

export function StateHero({ info }: Props) {
  const delta = seatDelta(info);
  const netShift =
    delta.D === 0 && delta.R === 0
      ? 'No net partisan change'
      : delta.D > 0
        ? `Net +${delta.D} Democratic seat${delta.D === 1 ? '' : 's'}`
        : `Net +${delta.R} Republican seat${delta.R === 1 ? '' : 's'}`;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tighter text-ink-50 md:text-[44px]">
            {info.name}
          </h1>
          <div className="mt-1 text-sm text-ink-400">
            {info.totalSeats} House seats
            {info.effective ? ` · map effective ${info.effective}` : ''}
          </div>
        </div>
        <StatusBadge info={info} />
      </div>

      <div className="mt-8 md:mt-10">
        <BeforeAfterMaps info={info} />
      </div>

      <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 md:mt-10">
        <span className="font-serif text-2xl font-semibold text-ink-50">{netShift}</span>
        <span className="text-base text-ink-400 tabular-nums">
          {info.before.seats.D}D – {info.before.seats.R}R
          <span className="mx-2 text-ink-600">→</span>
          {info.after.seats.D}D – {info.after.seats.R}R
        </span>
      </div>

      <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-200">{info.summary}</p>
    </>
  );
}

function StatusBadge({ info }: { info: StateInfo }) {
  const isFailed = info.status === 'failed';
  const partyColor = info.favors ? PARTY_COLOR[info.favors] : '#9a9285';
  const dot = isFailed ? '#9a9285' : partyColor;
  const text = isFailed
    ? '#d6cfc1'
    : info.favors
      ? info.favors === 'D'
        ? '#7aaeff'
        : '#fb8a8a'
      : '#d6cfc1';
  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest"
      style={{ color: text }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: dot }} aria-hidden />
      {statusLabel(info.status)}
      {info.favors && !isFailed ? ` · favors ${partyLabel(info.favors)}` : null}
      {isFailed && info.favors ? ` · ${partyLabel(info.favors)} attempt` : null}
    </span>
  );
}
