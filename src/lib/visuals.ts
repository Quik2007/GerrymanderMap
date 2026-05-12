import type { Party, Status, StateInfo } from '../data/types';

/** Brand colors. */
export const PARTY_COLOR: Record<Party, string> = {
  D: '#3b82f6', // blue-500
  R: '#ef4444', // red-500
};

/** Darker variant used for the "after" (post-redraw) and for selected outlines. */
export const PARTY_COLOR_DEEP: Record<Party, string> = {
  D: '#1d4ed8', // blue-700
  R: '#b91c1c', // red-700
};

export const PARTY_COLOR_SOFT: Record<Party, string> = {
  D: '#1e3a8a',
  R: '#7f1d1d',
};

export const NEUTRAL = '#1e293b'; // ink-800
export const NEUTRAL_HOVER = '#334155'; // ink-700

/**
 * Fill spec for a state polygon on the US map. Returns either a flat color
 * or a reference to one of the SVG <pattern> ids defined in <MapPatterns>.
 */
export function stateFill(info: StateInfo | undefined): string {
  if (!info || info.status === 'none' || info.favors == null) {
    return NEUTRAL;
  }
  const party = info.favors;
  switch (info.status) {
    case 'passed':
      // Solid party color
      return PARTY_COLOR[party];
    case 'planned':
      // Striped pattern referencing party color
      return `url(#pattern-planned-${party})`;
    case 'failed':
      // Desaturated, outline-only feel via soft fill
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

export function statusTextColor(info: StateInfo): string {
  if (info.status === 'failed') return 'text-ink-400';
  if (info.status === 'planned') return info.favors === 'D' ? 'text-dem-400' : 'text-rep-400';
  if (info.favors == null) return 'text-ink-300';
  return info.favors === 'D' ? 'text-dem-400' : 'text-rep-400';
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
