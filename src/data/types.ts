export type Party = 'D' | 'R';

export type Status = 'passed' | 'planned' | 'failed' | 'none';

export interface DistrictBreakdown {
  seats: { D: number; R: number };
  /** Ordered by district number (1..N). Each entry is the party expected to win that seat. */
  districts: Party[];
}

export interface StateInfo {
  /** USPS two-letter code, e.g. "NC". */
  code: string;
  name: string;
  totalSeats: number;
  status: Status;
  /** The party that benefits from the change, or null if balanced / no change. */
  favors: Party | null;
  before: DistrictBreakdown;
  after: DistrictBreakdown;
  /** Editorial 1–2 sentence summary. */
  summary: string;
  /** When the new map took / would take effect. */
  effective?: string;
}

export type StateData = Record<string, StateInfo>;

export interface NewsSource {
  name: string;
  url: string;
}

export interface NewsItem {
  id: string;
  /** ISO date, e.g. "2025-08-14". */
  date: string;
  /** USPS code, or null for national / multi-state news. */
  state: string | null;
  headline: string;
  description: string;
  tag?: 'court' | 'legislature' | 'ballot' | 'analysis' | 'executive';
  source: NewsSource;
}
