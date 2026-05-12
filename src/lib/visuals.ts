import type { Party, Status, StateInfo } from '../data/types';

/** Party colors — nudged slightly for legibility on warm dark grey. */
export const PARTY_COLOR: Record<Party, string> = {
  D: '#5b9cf5',
  R: '#ef5757',
};

/** Deeper variant used for the "after" map. */
export const PARTY_COLOR_DEEP: Record<Party, string> = {
  D: '#1f4eb8',
  R: '#b91c1c',
};

export const PARTY_COLOR_SOFT: Record<Party, string> = {
  D: '#1e3a8a',
  R: '#7f1d1d',
};

/** Inactive state on the US map — just above the page background. */
export const NEUTRAL = '#33302c';
export const NEUTRAL_HOVER = '#403c37';
export const PAGE_BG = '#262422';

export function stateFill(info: StateInfo | undefined): string {
  if (!info || info.status === 'none' || info.favors == null) {
    return NEUTRAL;
  }
  const party = info.favors;
  switch (info.status) {
    case 'passed':
      return PARTY_COLOR[party];
    case 'planned':
      return `url(#pattern-planned-${party})`;
    case 'failed':
      return PARTY_COLOR_SOFT[party];
    default:
      return NEUTRAL;
  }
}

export function statusLabel(status: Status): string {
  switch (status) {
    case 'passed':
      return 'Passed';
    case 'planned':
      return 'Planned';
    case 'failed':
      return 'Failed';
    case 'none':
      return 'No change';
  }
}

export function partyLabel(p: Party): string {
  return p === 'D' ? 'Democratic' : 'Republican';
}

export function seatDelta(info: StateInfo): { D: number; R: number } {
  return {
    D: info.after.seats.D - info.before.seats.D,
    R: info.after.seats.R - info.before.seats.R,
  };
}
