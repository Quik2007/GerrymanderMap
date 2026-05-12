import type { StateData, Party } from './types';

/**
 * 2024–2026 redistricting tracker.
 *
 * Vintage: data verified through 2026-05-13. The 2025-26 cycle has been
 * dominated by mid-decade redraws triggered first by Texas (Aug 2025) and
 * then accelerated by the SCOTUS ruling in *Louisiana v. Callais*
 * (Apr 29, 2026), which narrowed Section 2 of the VRA and unleashed a
 * cascade of GOP redraws across the South.
 *
 * Per-district arrays are stylized — they reflect the expected partisan
 * lean for visualization but do not encode Cook PVI or 2024 presidential
 * results at district level. Aggregate seat counts match reported
 * projections.
 */

const D: Party = 'D';
const R: Party = 'R';

export const STATES: StateData = {
  // --- States with maps redrawn for the 2024 or 2026 cycle ---

  NC: {
    code: 'NC',
    name: 'North Carolina',
    totalSeats: 14,
    status: 'passed',
    favors: 'R',
    effective: '2026-01-01',
    before: {
      seats: { D: 7, R: 7 },
      districts: [R, D, R, D, R, D, R, D, R, D, R, D, R, D],
    },
    after: {
      seats: { D: 3, R: 11 },
      districts: [R, R, R, R, R, D, R, R, R, D, R, R, R, D],
    },
    summary:
      'Two GOP redraws this cycle. The October 2023 map (SL 2023-145) flipped the 2022 court-imposed 7-7 lines to roughly 10R-4D for 2024. A second redraw passed October 22, 2025 carves out NC-1 to oust Democrat Don Davis, with three Beaufort/Carteret/Craven-area counties shifted in — pushing the projected delegation to 11R-3D for 2026.',
  },

  AL: {
    code: 'AL',
    name: 'Alabama',
    totalSeats: 7,
    status: 'passed',
    favors: 'R',
    effective: '2026-05-11',
    before: {
      seats: { D: 2, R: 5 },
      districts: [R, D, R, R, R, R, D],
    },
    after: {
      seats: { D: 1, R: 6 },
      districts: [R, R, R, R, R, R, D],
    },
    summary:
      'Three status changes in one cycle. The 2023 GOP map → the 2024 court-imposed Milligan remedial map (the second Black-opportunity district that elected Shomari Figures) → the May 11, 2026 SCOTUS vacatur in *Allen v. Caster*, which — in light of *Louisiana v. Callais* — cleared Alabama to revert to its 2023 map for 2026. AL-2 is expected to flip back to the GOP.',
  },

  LA: {
    code: 'LA',
    name: 'Louisiana',
    totalSeats: 6,
    status: 'planned',
    favors: 'R',
    effective: '2026-01-01',
    before: {
      seats: { D: 2, R: 4 },
      districts: [R, D, R, R, R, D],
    },
    after: {
      seats: { D: 1, R: 5 },
      districts: [R, D, R, R, R, R],
    },
    summary:
      'The 2024 SB 8 map drew a second Black-majority district (LA-6, won by Cleo Fields). On April 29, 2026, SCOTUS struck it down in *Louisiana v. Callais* (6-3, Alito), narrowing the Gingles framework for Section 2 plaintiffs. The state is now drafting a replacement map — almost certainly reverting toward a 5R-1D configuration.',
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
      districts: [D, R, D, D, D, D, D, D, D, D, R, D, D, D, D, D, R, R, D, R, R, R, R, R, R, R],
    },
    after: {
      seats: { D: 18, R: 8 },
      districts: [D, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, R, R, R, R, R, R],
    },
    summary:
      'After the Independent Redistricting Commission deadlocked and the Court of Appeals ordered redraw in December 2023, the legislature rejected the IRC submission and adopted its own modestly more Democratic map on February 28, 2024. NY-1 (Long Island), NY-3 (former Santos seat), NY-19 and NY-22 all shifted Democratic.',
  },

  OH: {
    code: 'OH',
    name: 'Ohio',
    totalSeats: 15,
    status: 'passed',
    favors: 'R',
    effective: '2026-01-01',
    before: {
      seats: { D: 5, R: 10 },
      districts: [R, R, R, R, R, R, R, D, D, D, D, D, R, R, R],
    },
    after: {
      seats: { D: 3, R: 12 },
      districts: [R, R, R, R, R, R, R, D, R, D, D, R, R, R, R],
    },
    summary:
      "The 2024 election actually used the 2022 map (which had been invalidated but kept in place out of time). With the legislature missing the September 30, 2025 deadline, the Ohio Redistricting Commission unanimously adopted a new map on October 31, 2025. Marcy Kaptur's 9th (Toledo) is shifted to roughly R+11 — the projected delegation moves toward 12R-3D.",
  },

  GA: {
    code: 'GA',
    name: 'Georgia',
    totalSeats: 14,
    status: 'passed',
    favors: null,
    effective: '2024-01-01',
    before: {
      seats: { D: 5, R: 9 },
      districts: [R, R, D, D, D, R, R, R, R, R, R, D, D, R],
    },
    after: {
      seats: { D: 5, R: 9 },
      districts: [R, R, D, D, D, D, R, R, R, R, R, R, D, R],
    },
    summary:
      "After Judge Steve C. Jones ruled the 2021 map violated Section 2 of the VRA in October 2023, the legislature added a majority-Black 6th in western metro Atlanta — but dismantled Lucy McBath's coalition 7th in the same map, preserving the 9R-5D partisan split. Approved December 28, 2023.",
  },

  SC: {
    code: 'SC',
    name: 'South Carolina',
    totalSeats: 7,
    status: 'failed',
    favors: 'D',
    effective: '2024-05-23',
    before: {
      seats: { D: 1, R: 6 },
      districts: [R, R, R, R, R, D, R],
    },
    after: {
      seats: { D: 1, R: 6 },
      districts: [R, R, R, R, R, D, R],
    },
    summary:
      "SCOTUS upheld the 2021 GOP-drawn map 6-3 in *Alexander v. South Carolina State Conference of the NAACP* (May 23, 2024), reversing a lower court's racial-gerrymander finding and tightening the standard plaintiffs must meet to disentangle race from politics. The 6-1 Republican advantage stands.",
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
        D, R, R, D, D, R, D, D,
      ],
    },
    after: {
      seats: { D: 8, R: 30 },
      districts: [
        R, R, R, R, R, R, D, R, R, R, R, R, R, R, R, R, R, R, R, D, R, R, R, R, R, R, R, D, D, D,
        R, R, R, D, R, R, D, D,
      ],
    },
    summary:
      "HB 4 of the second 2025 special session, signed by Gov. Abbott on August 29, 2025, redraws Houston, Dallas, and the Rio Grande Valley to unwind five Democratic-leaning seats. After a District Court injunction, SCOTUS stayed the order 6-3 in December 2025 and reversed in April 2026 — the map is in effect for the 2026 primary and general.",
  },

  CA: {
    code: 'CA',
    name: 'California',
    totalSeats: 52,
    status: 'passed',
    favors: 'D',
    effective: '2026-01-01',
    before: {
      seats: { D: 43, R: 9 },
      districts: [
        D, R, D, D, D, D, D, D, D, D, R, D, D, D, D, R, D, D, D, R, R, R, D, D, D, D, D, D, D, D,
        D, D, D, D, D, D, D, D, D, D, R, D, D, D, R, D, D, D, D, D, R, D,
      ],
    },
    after: {
      seats: { D: 48, R: 4 },
      districts: [
        D, R, D, D, D, D, D, D, D, D, D, D, D, D, D, R, D, D, D, R, D, D, D, D, D, D, D, D, D, D,
        D, D, D, D, D, D, D, D, D, D, R, D, D, D, D, D, D, D, D, D, D, D,
      ],
    },
    summary:
      'Proposition 50 passed November 4, 2025 with 63.9% support, suspending the Citizens Redistricting Commission and adopting a legislatively-drawn (Paul Mitchell) map through the 2030 cycle. Explicitly framed as a counter to Texas, the map shifts roughly five Republican-leaning seats to Democrats.',
  },

  FL: {
    code: 'FL',
    name: 'Florida',
    totalSeats: 28,
    status: 'passed',
    favors: 'R',
    effective: '2026-05-04',
    before: {
      seats: { D: 8, R: 20 },
      districts: [
        R, R, R, R, R, R, R, R, R, D, R, R, R, D, D, R, R, R, R, R, D, D, D, D, D, R, R, R,
      ],
    },
    after: {
      seats: { D: 4, R: 24 },
      districts: [
        R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, R, R, R, R, R, R, R, D, D, D, R, R, R,
      ],
    },
    summary:
      "HB 1D, signed by Gov. DeSantis on May 4, 2026, is the first mid-decade map enacted after *Callais*. It targets Reps. Castor (Tampa), Soto (Orlando), Frankel (West Palm), and Wasserman Schultz (Fort Lauderdale) — projected 20R-8D to 24R-4D. Three lawsuits were filed under Florida's Fair Districts Amendment within 24 hours.",
  },

  TN: {
    code: 'TN',
    name: 'Tennessee',
    totalSeats: 9,
    status: 'passed',
    favors: 'R',
    effective: '2026-05-07',
    before: {
      seats: { D: 1, R: 8 },
      districts: [R, R, R, R, R, R, R, R, D],
    },
    after: {
      seats: { D: 0, R: 9 },
      districts: [R, R, R, R, R, R, R, R, R],
    },
    summary:
      "Tennessee became the second state to redraw after *Callais*. Signed May 7, 2026, the new map carves Shelby County across three GOP-leaning districts to dismantle Steve Cohen's 9th — Tennessee's only majority-Black district. The 9th moves from Harris +42 to roughly Trump +21. NAACP sued within hours.",
  },

  MO: {
    code: 'MO',
    name: 'Missouri',
    totalSeats: 8,
    status: 'passed',
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
      'HB 1 of the second 2025 extraordinary session ("Missouri First Map") was signed by Gov. Mike Kehoe on September 28, 2025. It dismantles Emanuel Cleaver\'s Kansas City 5th — Troost Avenue, historically the racial dividing line in KC, becomes the new MO-4/MO-5 boundary. A citizen-led veto referendum qualified for the 2026 ballot; the Missouri Supreme Court is hearing two challenges.',
  },

  UT: {
    code: 'UT',
    name: 'Utah',
    totalSeats: 4,
    status: 'passed',
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
      "On November 10, 2025, Third District Judge Dianna Gibson rejected the legislature's remedial Map C for violating voter-passed Proposition 4 and imposed the plaintiffs' map, which keeps Salt Lake County whole in a single Democratic-leaning district. The Utah Supreme Court ruled the legislature missed its appeal deadlines; the plaintiffs' map is in effect for 2026.",
  },

  // --- Failed redraws and challenges ---

  IN: {
    code: 'IN',
    name: 'Indiana',
    totalSeats: 9,
    status: 'failed',
    favors: 'R',
    effective: '2025-12-11',
    before: {
      seats: { D: 2, R: 7 },
      districts: [D, R, R, R, R, R, D, R, R],
    },
    after: {
      seats: { D: 2, R: 7 },
      districts: [D, R, R, R, R, R, D, R, R],
    },
    summary:
      "HB 1032 — which would have cracked Mrvan's 1st and Carson's 7th to push toward 9R-0D — was rejected 31-19 by the Indiana Senate on December 11, 2025. Twenty-one of the chamber's Republicans joined all ten Democrats, making Indiana the first GOP-led legislature to defeat Trump's mid-decade redistricting push.",
  },

  MD: {
    code: 'MD',
    name: 'Maryland',
    totalSeats: 8,
    status: 'failed',
    favors: 'D',
    effective: '2026-02-20',
    before: {
      seats: { D: 7, R: 1 },
      districts: [R, D, D, D, D, D, D, D],
    },
    after: {
      seats: { D: 7, R: 1 },
      districts: [R, D, D, D, D, D, D, D],
    },
    summary:
      'HB 488, which would have redrawn the delegation from 7D-1R to 8D-0R, passed the House 99-37 on February 2, 2026. Senate President Bill Ferguson referred it to the Rules Committee and on February 20, 2026 declared the "window of opportunity has closed" — killing the bill despite a personal lobbying visit from Hakeem Jeffries.',
  },

  KS: {
    code: 'KS',
    name: 'Kansas',
    totalSeats: 4,
    status: 'failed',
    favors: 'R',
    effective: '2026-01-06',
    before: {
      seats: { D: 1, R: 3 },
      districts: [R, R, R, D],
    },
    after: {
      seats: { D: 1, R: 3 },
      districts: [R, R, R, D],
    },
    summary:
      "Senate President Ty Masterson gathered the 27 Senate signatures for a special session targeting Sharice Davids's KS-3 by October 27, 2025; the House fell short of the 84 signatures it needed. Speaker Hawkins stripped three GOP holdouts of committee chairmanships, and in January 2026 conceded he was about twenty votes short of a veto-override majority. Effort shelved.",
  },

  VA: {
    code: 'VA',
    name: 'Virginia',
    totalSeats: 11,
    status: 'failed',
    favors: 'D',
    effective: '2026-05-08',
    before: {
      seats: { D: 6, R: 5 },
      districts: [R, R, D, D, R, R, D, D, R, D, D],
    },
    after: {
      seats: { D: 6, R: 5 },
      districts: [R, R, D, D, R, R, D, D, R, D, D],
    },
    summary:
      'The legislatively-referred constitutional amendment to authorize a temporary redraw passed a special election on April 21, 2026 (51.7%-48.3%). On May 8, 2026, the Supreme Court of Virginia struck it down 4-3, holding the General Assembly violated the requirement to pass amendments "before the general election" because 2025 early voting had already begun. VA Democrats filed an emergency SCOTUS petition May 11.',
  },

  NM: {
    code: 'NM',
    name: 'New Mexico',
    totalSeats: 3,
    status: 'failed',
    favors: 'R',
    effective: '2023-11-27',
    before: {
      seats: { D: 3, R: 0 },
      districts: [D, D, D],
    },
    after: {
      seats: { D: 3, R: 0 },
      districts: [D, D, D],
    },
    summary:
      "The state GOP challenged the 2021 Democratic-drawn map — which split conservative southeast NM into multiple districts and tipped NM-2 toward Gabe Vasquez — as a partisan gerrymander. On November 27, 2023 the New Mexico Supreme Court unanimously upheld the map, finding it dilutive but not 'egregious' enough to violate the state constitution.",
  },

  WI: {
    code: 'WI',
    name: 'Wisconsin',
    totalSeats: 8,
    status: 'failed',
    favors: 'D',
    effective: '2026-03-31',
    before: {
      seats: { D: 2, R: 6 },
      districts: [R, R, D, D, R, R, R, R],
    },
    after: {
      seats: { D: 2, R: 6 },
      districts: [R, R, D, D, R, R, R, R],
    },
    summary:
      "Two direct-to-court challenges (Bothfeld v. WEC and a Wisconsin Business Coalition action) were re-filed in lower court after the Wisconsin Supreme Court declined original jurisdiction in June 2025. A three-judge panel dismissed Bothfeld on March 31, 2026, ending any path to a 2026 congressional redraw. The Business Coalition case continues with a tentative 2027 trial.",
  },
};
