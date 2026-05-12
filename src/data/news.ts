import type { NewsItem } from './types';

/**
 * News timeline for the 2023-2026 redistricting cycle.
 *
 * Headlines and descriptions are editorial; the `source` link points to the
 * underlying reporting or primary document (court opinion PDF, secretary-of-
 * state results page, legislative bill page, or a specific news article).
 * Sources are deep links — not homepages.
 *
 * Vintage: events verified through 2026-05-13.
 */

export const NEWS: NewsItem[] = [
  // --- May 2026: The Callais cascade ---

  {
    id: 'n-2026-05-11-al',
    date: '2026-05-11',
    state: 'AL',
    tag: 'court',
    headline: 'SCOTUS vacates Alabama Milligan remedial order, freeing the state to revert to its 2023 map',
    description:
      "An unsigned per curiam order in *Allen v. Caster* sent the case back to the district court for reconsideration in light of *Callais*. With Shomari Figures's AL-2 in the balance, the projected delegation moves from 5R-2D back to 6R-1D. Sotomayor, Kagan, and Jackson dissented.",
    source: {
      name: 'SCOTUS order (PDF)',
      url: 'https://www.supremecourt.gov/opinions/25pdf/25-243_f20h.pdf',
    },
  },

  {
    id: 'n-2026-05-11-va',
    date: '2026-05-11',
    state: 'VA',
    tag: 'court',
    headline: "Virginia Democrats file emergency SCOTUS petition over Saturday's referendum ruling",
    description:
      'Three days after the Supreme Court of Virginia struck down the redistricting amendment 4-3, Democratic plaintiffs asked Justice Roberts to stay the decision and let the new lines stand for 2026. The current 6D-5R map is otherwise back in effect.',
    source: {
      name: 'Virginia Mercury',
      url: 'https://virginiamercury.com/2026/05/11/virginia-democrats-seek-emergency-injunction-from-us-supreme-court-in-redistricting-fight/',
    },
  },

  {
    id: 'n-2026-05-08-va',
    date: '2026-05-08',
    state: 'VA',
    tag: 'court',
    headline: 'Virginia Supreme Court strikes down redistricting amendment 4-3',
    description:
      "Justices held the General Assembly violated the constitutional requirement to enact amendments 'before the general election' because 2025 House of Delegates early voting had already begun by the time the amendment received its first legislative passage. Two weeks of voter approval reversed.",
    source: {
      name: 'Virginia Mercury',
      url: 'https://virginiamercury.com/2026/05/08/supreme-court-of-virginia-strikes-down-redistricting-amendment-keeps-current-maps-in-place/',
    },
  },

  {
    id: 'n-2026-05-07-tn',
    date: '2026-05-07',
    state: 'TN',
    tag: 'legislature',
    headline: "Tennessee signs map dismantling Steve Cohen's Memphis district hours after passage",
    description:
      "Governor Bill Lee signed the redrawn congressional map within two hours of legislative passage, carving Shelby County across three GOP-leaning districts and converting TN-9 — the state's only majority-Black district — from Harris +42 to Trump +21. The NAACP filed suit the same day.",
    source: {
      name: 'Roll Call',
      url: 'https://rollcall.com/2026/05/07/tennessee-passes-new-map-that-erases-states-lone-majority-black-district/',
    },
  },

  {
    id: 'n-2026-05-04-fl',
    date: '2026-05-04',
    state: 'FL',
    tag: 'legislature',
    headline: 'DeSantis signs Florida mid-decade map targeting four Democratic incumbents',
    description:
      "HB 1D — the first map enacted after *Callais* — projects a shift from 20R-8D to 24R-4D, redrawing Tampa, Orlando, West Palm Beach, and Fort Lauderdale to unwind Castor, Soto, Frankel, and Wasserman Schultz. Three lawsuits under Florida's Fair Districts Amendment were filed within 24 hours.",
    source: {
      name: 'CNN',
      url: 'https://www.cnn.com/2026/05/04/politics/florida-redistricting-ron-desantis-voting-rights-act-vis',
    },
  },

  {
    id: 'n-2026-04-29-natl',
    date: '2026-04-29',
    state: null,
    tag: 'court',
    headline: 'In *Louisiana v. Callais*, SCOTUS narrows Section 2 and strikes down the 2024 LA map',
    description:
      "A 6-3 decision by Alito invalidates Louisiana's two-Black-district SB 8 map, requiring Section 2 plaintiffs to offer alternative race-neutral maps and disentangle race from party affiliation. The ruling immediately destabilizes the post-Milligan southern maps and triggers fast-moving GOP redraws in Florida and Tennessee.",
    source: {
      name: 'SCOTUS opinion (PDF)',
      url: 'https://www.supremecourt.gov/opinions/25pdf/24-109_21o3.pdf',
    },
  },

  {
    id: 'n-2026-04-21-va',
    date: '2026-04-21',
    state: 'VA',
    tag: 'ballot',
    headline: 'Virginia voters narrowly approve temporary redistricting amendment, 51.7-48.3',
    description:
      'Held at a stand-alone special election, the amendment would have let the General Assembly draw a one-cycle counter-Texas map. Approval came on a margin of about 105,000 votes out of roughly 3.1 million cast.',
    source: {
      name: 'Virginia Mercury',
      url: 'https://virginiamercury.com/2026/04/21/virginia-voters-back-redistricting-amendment-after-months-of-legal-and-political-battles/',
    },
  },

  // --- Early 2026 ---

  {
    id: 'n-2026-03-31-wi',
    date: '2026-03-31',
    state: 'WI',
    tag: 'court',
    headline: 'Wisconsin three-judge panel dismisses partisan-gerrymander challenge to congressional map',
    description:
      "*Bothfeld v. WEC* — the Elias Law Group case re-filed in lower court after the state supreme court declined original jurisdiction — was dismissed for lack of jurisdiction over partisan-gerrymander claims. A separate Wisconsin Business Coalition case continues with a tentative 2027 trial, ending any path to a 2026 redraw.",
    source: {
      name: 'Wisconsin Examiner',
      url: 'https://wisconsinexaminer.com/2026/03/31/three-judge-panel-rejects-lawsuit-to-toss-wisconsins-congressional-maps/',
    },
  },

  {
    id: 'n-2026-02-20-md',
    date: '2026-02-20',
    state: 'MD',
    tag: 'legislature',
    headline: 'Maryland Senate president declares "window of opportunity has closed" on 8D-0R map',
    description:
      'Bill Ferguson held his caucus together against HB 488, the House-passed counter-redraw that would have eliminated Andy Harris\'s 1st District. The bill had passed the House 99-37 on February 2; Ferguson cited likely litigation backlash.',
    source: {
      name: 'Maryland Matters',
      url: 'https://marylandmatters.org/2026/02/20/ferguson-window-of-opportunity-has-closed-on-redistricting-efforts/',
    },
  },

  {
    id: 'n-2026-02-18-md',
    date: '2026-02-18',
    state: 'MD',
    tag: 'legislature',
    headline: 'Hakeem Jeffries flies to Annapolis to lobby Ferguson directly on Maryland redraw',
    description:
      'The House Democratic leader made a rare in-person appeal to Maryland Senate President Bill Ferguson, who controls whether HB 488 reaches the floor. Two days later Ferguson publicly closed the door.',
    source: {
      name: 'NBC News',
      url: 'https://www.nbcnews.com/politics/2026-election/top-maryland-senate-democrat-says-window-opportunity-closed-redistrict-rcna259935',
    },
  },

  {
    id: 'n-2026-01-06-ks',
    date: '2026-01-06',
    state: 'KS',
    tag: 'legislature',
    headline: 'Kansas Speaker concedes redistricting effort lacks votes for veto override',
    description:
      "After the House fell short of the 84 signatures needed for a special session in November, Speaker Dan Hawkins acknowledged Republicans were roughly twenty votes short of overriding a near-certain Kelly veto. Sharice Davids's KS-3 survives the cycle.",
    source: {
      name: 'KCUR',
      url: 'https://www.kcur.org/politics-elections-and-government/2026-01-06/kansas-republicans-redistricting-congress-sharice-davids',
    },
  },

  // --- Late 2025 ---

  {
    id: 'n-2025-12-11-in',
    date: '2025-12-11',
    state: 'IN',
    tag: 'legislature',
    headline: 'Indiana Senate rejects 9R-0D map 31-19, breaking GOP solidarity',
    description:
      "HB 1032 — which would have cracked Frank Mrvan's 1st and André Carson's 7th — failed when 21 of the chamber's Republicans joined all 10 Democrats in opposition. Indiana became the first Republican-led legislature to reject Trump's mid-decade redistricting push.",
    source: {
      name: 'NPR',
      url: 'https://www.npr.org/2025/12/11/nx-s1-5637488/midterm-elections-trump-redistricting-indiana',
    },
  },

  {
    id: 'n-2025-12-04-tx',
    date: '2025-12-04',
    state: 'TX',
    tag: 'court',
    headline: 'SCOTUS stays district-court injunction, clearing Texas map for 2026 primary',
    description:
      "On a 6-3 emergency-docket vote, the Supreme Court let HB 4 take effect over the lower court's finding of intentional racial discrimination. Justice Kagan dissented, joined by Sotomayor and Jackson.",
    source: {
      name: 'Texas Tribune',
      url: 'https://www.texastribune.org/2025/12/04/texas-redistricting-map-us-supreme-court-2026-midterms/',
    },
  },

  {
    id: 'n-2025-11-10-ut',
    date: '2025-11-10',
    state: 'UT',
    tag: 'court',
    headline: "Utah court rejects legislature's remedial map, imposes plaintiffs' map for 2026",
    description:
      "Third District Judge Dianna Gibson held that SB 1011's 'Map C' — which split Salt Lake County across all four districts — violated voter-passed Proposition 4. The plaintiffs' alternative, which keeps Salt Lake City whole and creates one Democratic-leaning seat, takes effect for the midterms.",
    source: {
      name: 'League of Women Voters',
      url: 'https://www.lwv.org/newsroom/press-releases/victory-utahns-will-have-fair-map-place-2026-midterms',
    },
  },

  {
    id: 'n-2025-11-04-ca',
    date: '2025-11-04',
    state: 'CA',
    tag: 'ballot',
    headline: 'California Prop 50 passes 63.9-36.1, suspending the citizens commission through 2030',
    description:
      'A turnout of about 36% delivered roughly 5.3M yes to 3.0M no, replacing the Citizens Redistricting Commission map with a legislatively-drawn Paul Mitchell map. The projection: 43D-9R to 48D-4R, explicitly framed as a five-seat counter to Texas.',
    source: {
      name: 'California Secretary of State (certified results)',
      url: 'https://electionresults.sos.ca.gov/returns/maps/ballot-measures/prop/50',
    },
  },

  {
    id: 'n-2025-10-31-oh',
    date: '2025-10-31',
    state: 'OH',
    tag: 'legislature',
    headline: 'Ohio Redistricting Commission unanimously adopts new congressional map',
    description:
      "The seven-member commission's unanimous vote came after the legislature missed its September 30 bipartisan-map deadline. Marcy Kaptur's 9th (Toledo) shifts to roughly R+11; the delegation projects to 12R-3D.",
    source: {
      name: 'Ballotpedia News',
      url: 'https://news.ballotpedia.org/2025/11/03/ohio-redistricting-commission-approves-new-congressional-map-in-the-only-state-required-by-law-to-redistrict-before-2026/',
    },
  },

  {
    id: 'n-2025-10-22-nc',
    date: '2025-10-22',
    state: 'NC',
    tag: 'legislature',
    headline: "North Carolina enacts second redraw of the cycle to take aim at Don Davis's NC-1",
    description:
      "House final passage came on a 66-48 vote following Senate approval the day before; redistricting in NC is veto-proof. Six reliably Republican coastal counties shift into NC-1, projecting the delegation from 10R-4D to 11R-3D.",
    source: {
      name: 'NC Newsline',
      url: 'https://ncnewsline.com/2025/10/20/nc-republicans-move-on-new-congressional-plan-to-add-another-gop-district/',
    },
  },

  {
    id: 'n-2025-09-28-mo',
    date: '2025-09-28',
    state: 'MO',
    tag: 'legislature',
    headline: 'Kehoe signs the "Missouri First Map," redrawing KC to oust Emanuel Cleaver',
    description:
      'HB 1 of the second 2025 extraordinary session splits Jackson County among three districts and uses Troost Avenue — historically the racial dividing line in Kansas City — as the new MO-4/MO-5 boundary. A citizen-led veto referendum is in motion.',
    source: {
      name: "Governor's office (signing release)",
      url: 'https://governor.mo.gov/press-releases/archive/governor-kehoe-signs-missouri-first-map-law',
    },
  },

  {
    id: 'n-2025-08-29-tx',
    date: '2025-08-29',
    state: 'TX',
    tag: 'legislature',
    headline: 'Abbott signs HB 4, opening the mid-decade redistricting cycle',
    description:
      'After House Democrats broke quorum for two weeks in August, the second special session passed HB 4 88-52 in the House and 18-8 in the Senate. The map targets five Democratic-held seats across Houston, Dallas, and the Rio Grande Valley.',
    source: {
      name: 'Texas Tribune',
      url: 'https://www.texastribune.org/2025/08/29/greg-abbott-signs-texas-congressional-map-redistricting/',
    },
  },

  // --- 2024 ---

  {
    id: 'n-2024-05-23-sc',
    date: '2024-05-23',
    state: 'SC',
    tag: 'court',
    headline: 'SCOTUS upholds South Carolina congressional map in *Alexander v. NAACP*',
    description:
      "A 6-3 decision by Alito reversed the lower court's finding that SC-1 was an unconstitutional racial gerrymander, holding plaintiffs must 'disentangle race from politics' and presume good-faith partisan motivation. Foreshadows the *Callais* reasoning.",
    source: {
      name: 'SCOTUS opinion (PDF)',
      url: 'https://www.supremecourt.gov/opinions/23pdf/22-807_3e04.pdf',
    },
  },

  {
    id: 'n-2024-02-28-ny',
    date: '2024-02-28',
    state: 'NY',
    tag: 'legislature',
    headline: 'Hochul signs legislature\'s map after IRC submission rejected',
    description:
      "After the NY Court of Appeals ordered a new map in December 2023, the IRC's near-status-quo submission was rejected and replaced with a legislative draft. Targeted changes in Long Island, the Hudson Valley and Syracuse produced an estimated 2-4 seat Democratic shift.",
    source: {
      name: 'Roll Call',
      url: 'https://rollcall.com/2024/02/28/new-york-adopts-congressional-map-that-benefits-democrats/',
    },
  },

  // --- 2023: foundational events ---

  {
    id: 'n-2023-12-28-ga',
    date: '2023-12-28',
    state: 'GA',
    tag: 'court',
    headline: 'Federal judge approves Georgia remedial map that preserves 9R-5D split',
    description:
      "Judge Steve C. Jones overruled plaintiffs' objections and approved the legislature's remedial map, which added a new majority-Black 6th in western metro Atlanta but dismantled Lucy McBath's coalition 7th in the same redraw — preserving the partisan balance.",
    source: {
      name: 'PBS NewsHour',
      url: 'https://www.pbs.org/newshour/politics/federal-judge-accepts-redrawn-georgia-congressional-districts-that-will-favor-republicans',
    },
  },

  {
    id: 'n-2023-11-27-nm',
    date: '2023-11-27',
    state: 'NM',
    tag: 'court',
    headline: 'New Mexico Supreme Court unanimously upholds Democratic-drawn congressional map',
    description:
      "The GOP had challenged the 2021 map that split conservative southeast NM into multiple districts and turned NM-2 competitive (won by Gabe Vasquez). Justices found the map 'substantially' diluted Republican votes but did not reach the 'egregious' threshold required to strike it down.",
    source: {
      name: 'Democracy Docket',
      url: 'https://www.democracydocket.com/news-alerts/new-mexico-supreme-court-upholds-congressional-map-for-2024-and-beyond/',
    },
  },

  {
    id: 'n-2023-10-25-nc',
    date: '2023-10-25',
    state: 'NC',
    tag: 'legislature',
    headline: 'North Carolina enacts first 2024-cycle redraw, projected to flip three seats',
    description:
      "SB 757 (SL 2023-145) became law without the governor's signature — redistricting is veto-proof in NC. It replaced the 2022 court-imposed 7-7 lines with a map projected at roughly 10R-3D plus one competitive seat (NC-1).",
    source: {
      name: 'Roll Call',
      url: 'https://rollcall.com/2023/10/25/north-carolina-legislature-passes-new-congressional-map-that-favors-republicans/',
    },
  },

  {
    id: 'n-2023-06-08-natl',
    date: '2023-06-08',
    state: null,
    tag: 'court',
    headline: 'Allen v. Milligan: SCOTUS upholds Section 2 of the Voting Rights Act, 5-4',
    description:
      "Chief Justice Roberts's majority opinion preserved the Thornburg v. Gingles framework and rejected Alabama's race-blind benchmark theory — ultimately forcing both Alabama and Louisiana to draw new majority-Black districts for 2024. The framework Roberts protected here is the one *Callais* narrowed three years later.",
    source: {
      name: 'SCOTUS opinion (PDF)',
      url: 'https://www.supremecourt.gov/opinions/22pdf/21-1086_1co6.pdf',
    },
  },
];
