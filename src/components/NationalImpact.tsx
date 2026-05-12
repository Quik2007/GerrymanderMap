import { useMemo } from 'react';
import { STATES } from '../data/states';
import { PARTY_COLOR } from '../lib/visuals';

/**
 * Aggregate seat shifts across all "passed" maps in the dataset.
 * Planned/failed states are excluded — those haven't moved seats yet.
 */
export function NationalImpact() {
  const totals = useMemo(() => {
    let beforeD = 0;
    let beforeR = 0;
    let afterD = 0;
    let afterR = 0;
    let plannedD = 0;
    let plannedR = 0;

    for (const s of Object.values(STATES)) {
      if (s.status === 'passed') {
        beforeD += s.before.seats.D;
        beforeR += s.before.seats.R;
        afterD += s.after.seats.D;
        afterR += s.after.seats.R;
      } else if (s.status === 'planned') {
        plannedD += s.after.seats.D - s.before.seats.D;
        plannedR += s.after.seats.R - s.before.seats.R;
      }
    }

    return {
      beforeD,
      beforeR,
      afterD,
      afterR,
      shiftD: afterD - beforeD,
      shiftR: afterR - beforeR,
      plannedD,
      plannedR,
    };
  }, []);

  const netShift =
    totals.shiftD === 0 && totals.shiftR === 0
      ? 0
      : Math.abs(totals.shiftD) > Math.abs(totals.shiftR)
        ? totals.shiftD
        : -totals.shiftR;
  const netParty = netShift >= 0 ? 'D' : 'R';
  const netMagnitude = Math.abs(netShift);

  return (
    <section className="card grid gap-5 p-5 md:grid-cols-3">
      <div>
        <div className="text-xs uppercase tracking-widest text-ink-400">
          Net shift · passed maps
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span
            className="font-display text-3xl font-semibold tabular-nums"
            style={{ color: PARTY_COLOR[netParty] }}
          >
            {netMagnitude === 0 ? '0' : `+${netMagnitude}`}
          </span>
          <span className="text-sm text-ink-300">
            {netMagnitude === 0
              ? 'seats'
              : `${netParty === 'D' ? 'Democratic' : 'Republican'} seat${netMagnitude === 1 ? '' : 's'}`}
          </span>
        </div>
        <div className="mt-1 text-xs text-ink-400 tabular-nums">
          {totals.beforeD}D–{totals.beforeR}R
          <span className="mx-1.5 text-ink-600">→</span>
          {totals.afterD}D–{totals.afterR}R
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-ink-400">
          If planned redraws pass
        </div>
        <div className="mt-1 flex items-baseline gap-3">
          <PartyShift value={totals.plannedD} party="D" />
          <PartyShift value={totals.plannedR} party="R" />
        </div>
        <div className="mt-1 text-xs text-ink-400">
          across in-progress mid-decade proposals
        </div>
      </div>

      <div className="rounded-lg border border-ink-800 bg-ink-950/50 p-3">
        <div className="text-xs font-semibold text-ink-100">
          What you&rsquo;re looking at
        </div>
        <p className="mt-1 text-xs leading-relaxed text-ink-400">
          A snapshot of the 2024–2026 redistricting cycle. Solid colors mark maps
          already in effect; striped tones mark mid-decade efforts still in
          play; muted tones mark efforts that failed.
        </p>
      </div>
    </section>
  );
}

function PartyShift({ value, party }: { value: number; party: 'D' | 'R' }) {
  const positive = value > 0;
  return (
    <span className="inline-flex items-baseline gap-1 tabular-nums">
      <span
        className="font-display text-2xl font-semibold"
        style={{ color: PARTY_COLOR[party] }}
      >
        {positive ? `+${value}` : value}
      </span>
      <span className="text-xs text-ink-400">{party}</span>
    </span>
  );
}
