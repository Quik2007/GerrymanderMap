import type { StateData, Party } from './types';

/**
 * 2024–2026 redistricting tracker — PLACEHOLDER editorial data.
 *
 * These entries are illustrative and based on broadly reported events from
 * the current US redistricting cycle. Numbers (seat counts, per-district
 * party expectations) are stylized for visualization. Replace or amend
 * before publishing.
 */

const D: Party = 'D';
const R: Party = 'R';

export const STATES: StateData = {
  NC: {
    code: 'NC',
    name: 'North Carolina',
    totalSeats: 14,
    status: 'passed',
    favors: 'R',
    effective: '2024-01-01',
    before: {
      seats: { D: 7, R: 7 },
      districts: [R, D, R, D, R, D, R, D, R, D, R, D, R, D],
    },
    after: {
      seats: { D: 3, R: 11 },
      districts: [R, D, R, R, R, D, R, R, R, D, R, R, R, R],
    },
    summary:
      'GOP-controlled legislature replaced the court-imposed 7-7 map with one expected to deliver an 11-3 Republican delegation. Lawsuits failed at the state supreme court after a 2022 partisan shift on the bench.',
  },

  AL: {
    code: 'AL',
    name: 'Alabama',
    totalSeats: 7,
    status: 'passed',
    favors: 'D',
    effective: '2024-01-01',
    before: {
      seats: { D: 1, R: 6 },
      districts: [R, R, R, R, R, R, D],
    },
    after: {
      seats: { D: 2, R: 5 },
      districts: [R, D, R, R, R, R, D],
    },
    summary:
      'Court-ordered second majority-Black district under Allen v. Milligan. A special master drew the new boundaries after the legislature refused to comply with the federal court order.',
  },

  LA: {
    code: 'LA',
    name: 'Louisiana',
    totalSeats: 6,
    status: 'passed',
    favors: 'D',
    effective: '2024-01-01',
    before: {
      seats: { D: 1, R: 5 },
      districts: [R, D, R, R, R, R],
    },
    after: {
      seats: { D: 2, R: 4 },
      districts: [R, D, R, R, R, D],
    },
    summary:
      'Legislature drew a second majority-Black district to comply with a federal court order. SCOTUS allowed the map to be used for 2024 while litigation continued.',
  },

  NY: {
    code: 'NY',
    name: 'New York',
    totalSeats: 26,
    status: 'passed',
    favors: 'D',
    effective: '2024-01-01',
    before: {
      seats: { D: 15, R: 11 },
      districts: [D, R, R, D, D, D, D, D, D, D, R, D, D, D, D, D, R, R, D, R, R, R, R, R, R, R],
    },
    after: {
      seats: { D: 18, R: 8 },
      districts: [D, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, D, R, R, R, R, R, R, R],
    },
    summary:
      'After the Independent Redistricting Commission deadlocked, the legislature adopted a modestly more Democratic map. The Court of Appeals had reopened redistricting in late 2023.',
  },

  OH: {
    code: 'OH',
    name: 'Ohio',
    totalSeats: 15,
    status: 'passed',
    favors: null,
    effective: '2024-01-01',
    before: {
      seats: { D: 5, R: 10 },
      districts: [R, R, R, R, R, R, R, D, D, D, D, D, R, R, R],
    },
    after: {
      seats: { D: 5, R: 10 },
      districts: [R, R, R, R, R, R, R, D, D, D, D, D, R, R, R],
    },
    summary:
      'Redrawn under continued state-supreme-court pressure. Despite multiple rejections, the final adopted map preserved a 10-5 Republican lean — Democrats vowed a future commission overhaul.',
  },

  GA: {
    code: 'GA',
    name: 'Georgia',
    totalSeats: 14,
    status: 'passed',
    favors: 'R',
    effective: '2024-01-01',
    before: {
      seats: { D: 5, R: 9 },
      districts: [R, R, D, D, D, R, R, R, R, R, R, D, D, R],
    },
    after: {
      seats: { D: 5, R: 9 },
      districts: [R, R, D, D, D, R, R, R, R, R, R, D, D, R],
    },
    summary:
      'A federal judge ordered a new majority-Black district, but the legislature redrew the map to add the district without changing the 9-5 partisan split — dismantling a different minority-opportunity district in the process.',
  },

  SC: {
    code: 'SC',
    name: 'South Carolina',
    totalSeats: 7,
    status: 'passed',
    favors: 'R',
    effective: '2024-01-01',
    before: {
      seats: { D: 1, R: 6 },
      districts: [R, R, R, R, R, D, R],
    },
    after: {
      seats: { D: 1, R: 6 },
      districts: [R, R, R, R, R, D, R],
    },
    summary:
      'SCOTUS upheld the GOP-drawn map in Alexander v. South Carolina NAACP, rejecting a racial-gerrymandering challenge and effectively preserving the existing 6-1 Republican advantage.',
  },

  TX: {
    code: 'TX',
    name: 'Texas',
    totalSeats: 38,
    status: 'passed',
    favors: 'R',
    effective: '2026-01-01',
    before: {
      seats: { D: 13, R: 25 },
      districts: [
        R, R, R, R, R, R, D, R, D, R, R, R, R, R, R, D, R, D, R, D, R, R, R, R, R, R, R, D, D, D,
        D, R, D, D, D, R, D, D,
      ],
    },
    after: {
      seats: { D: 9, R: 29 },
      districts: [
        R, R, R, R, R, R, D, R, R, R, R, R, R, R, R, R, R, D, R, D, R, R, R, R, R, R, R, D, D, D,
        D, R, R, D, D, R, D, D,
      ],
    },
    summary:
      'Mid-decade GOP redraw signed in 2025 unwound several Democratic-leaning districts in Houston and the Rio Grande Valley. Lawsuits under Section 2 of the VRA are pending; map is in effect for the 2026 cycle.',
  },

  CA: {
    code: 'CA',
    name: 'California',
    totalSeats: 52,
    status: 'planned',
    favors: 'D',
    effective: '2026-11-03',
    before: {
      seats: { D: 40, R: 12 },
      districts: [
        D, R, D, R, D, D, D, D, D, D, R, D, D, D, D, R, D, D, D, R, R, R, D, D, D, D, D, D, D, D,
        D, D, D, D, D, D, D, D, D, R, R, D, D, D, R, D, D, D, D, R, R, D,
      ],
    },
    after: {
      seats: { D: 43, R: 9 },
      districts: [
        D, R, D, D, D, D, D, D, D, D, R, D, D, D, D, R, D, D, D, R, R, R, D, D, D, D, D, D, D, D,
        D, D, D, D, D, D, D, D, D, D, R, D, D, D, R, D, D, D, D, D, R, D,
      ],
    },
    summary:
      'Governor Newsom proposed bypassing the citizens redistricting commission via a 2026 ballot measure to counter the Texas redraw. Signature collection underway; legal challenges likely if it qualifies.',
  },

  MO: {
    code: 'MO',
    name: 'Missouri',
    totalSeats: 8,
    status: 'planned',
    favors: 'R',
    effective: '2026-01-01',
    before: {
      seats: { D: 2, R: 6 },
      districts: [D, R, R, R, R, R, R, D],
    },
    after: {
      seats: { D: 1, R: 7 },
      districts: [D, R, R, R, R, R, R, R],
    },
    summary:
      'GOP legislative leadership floated a mid-decade redraw to flip the Kansas City-area 5th district, citing the Texas precedent. No bill has cleared committee.',
  },

  IL: {
    code: 'IL',
    name: 'Illinois',
    totalSeats: 17,
    status: 'planned',
    favors: 'D',
    effective: '2026-01-01',
    before: {
      seats: { D: 14, R: 3 },
      districts: [D, D, D, D, D, D, D, D, D, D, D, R, D, D, R, R, D],
    },
    after: {
      seats: { D: 15, R: 2 },
      districts: [D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, R, D],
    },
    summary:
      'Democratic leadership signaled openness to a counter-Texas redraw targeting the 12th district downstate. Internal caucus split between offense-minded and incumbent-protective factions.',
  },

  WI: {
    code: 'WI',
    name: 'Wisconsin',
    totalSeats: 8,
    status: 'failed',
    favors: 'R',
    before: {
      seats: { D: 2, R: 6 },
      districts: [R, R, D, D, R, R, R, R],
    },
    after: {
      seats: { D: 2, R: 6 },
      districts: [R, R, D, D, R, R, R, R],
    },
    summary:
      'Following the flip of the state supreme court, the GOP-aligned legislature attempted to lock in the existing congressional map preemptively. The bill stalled and a court challenge to the 2022 lines remains pending.',
  },

  UT: {
    code: 'UT',
    name: 'Utah',
    totalSeats: 4,
    status: 'planned',
    favors: 'D',
    effective: '2026-01-01',
    before: {
      seats: { D: 0, R: 4 },
      districts: [R, R, R, R],
    },
    after: {
      seats: { D: 1, R: 3 },
      districts: [D, R, R, R],
    },
    summary:
      'Utah Supreme Court reinstated the citizen-passed Proposition 4 standards, ordering the legislature to redraw the Salt Lake City district that had been split four ways. New map due ahead of the 2026 primary.',
  },
};
