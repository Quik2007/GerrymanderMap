import type { NewsItem } from './types';

/**
 * PLACEHOLDER news items. Headlines and short descriptions are editorial
 * (written for this site), `source` points to the underlying reporting.
 * URLs here are illustrative — replace with verified links before launch.
 */

export const NEWS: NewsItem[] = [
  {
    id: 'n-2026-04-22-ca',
    date: '2026-04-22',
    state: 'CA',
    tag: 'ballot',
    headline: 'California ballot measure to override the commission clears signature threshold',
    description:
      'Proposition 7 will appear on the November 2026 ballot. If passed, it would allow the legislature to draw a one-cycle "responsive" map in years when another state enacts a mid-decade redraw.',
    source: { name: 'Cal Matters', url: 'https://calmatters.org' },
  },
  {
    id: 'n-2026-03-30-tx',
    date: '2026-03-30',
    state: 'TX',
    tag: 'court',
    headline: 'Federal panel declines to block Texas mid-decade map for 2026 primary',
    description:
      'A three-judge panel said plaintiffs were unlikely to win on the merits before primary ballots are printed. The case proceeds to a fall trial.',
    source: { name: 'Texas Tribune', url: 'https://www.texastribune.org' },
  },
  {
    id: 'n-2026-03-12-natl',
    date: '2026-03-12',
    state: null,
    tag: 'analysis',
    headline: 'How the 2026 House map already tilts before a single vote is cast',
    description:
      'After Texas and the post-Allen v. Milligan Southern redraws, our model puts the average expected delegation gap at +3 seats for Republicans relative to a hypothetical neutral map.',
    source: { name: 'The Mander Tracker', url: '#' },
  },
  {
    id: 'n-2026-02-18-mo',
    date: '2026-02-18',
    state: 'MO',
    tag: 'legislature',
    headline: 'Missouri House committee hearing held on mid-decade redraw',
    description:
      'HB 1881 would direct a new congressional map targeting the 5th district. Witnesses for the bill cited Texas; opponents warned of voter backlash and likely federal litigation.',
    source: { name: 'St. Louis Post-Dispatch', url: 'https://www.stltoday.com' },
  },
  {
    id: 'n-2026-02-01-ut',
    date: '2026-02-01',
    state: 'UT',
    tag: 'court',
    headline: 'Utah Supreme Court reinstates Prop 4 standards, orders new congressional map',
    description:
      'In a 4-1 ruling, justices held the legislature could not gut the citizen-passed redistricting standards. A new map must be in place 60 days before the primary.',
    source: { name: 'Salt Lake Tribune', url: 'https://www.sltrib.com' },
  },
  {
    id: 'n-2026-01-14-il',
    date: '2026-01-14',
    state: 'IL',
    tag: 'legislature',
    headline: 'Illinois Democrats signal openness to counter-Texas redraw — but caucus is split',
    description:
      'Leadership says "all options are on the table." Several incumbents privately oppose changes that would unsettle their districts.',
    source: { name: 'Chicago Tribune', url: 'https://www.chicagotribune.com' },
  },
  {
    id: 'n-2025-12-08-ca',
    date: '2025-12-08',
    state: 'CA',
    tag: 'executive',
    headline: 'Newsom unveils plan to put commission override on November 2026 ballot',
    description:
      'The proposal would allow the legislature to draw a one-time map in response to another state\'s mid-decade redistricting. Reform groups split on whether to support.',
    source: { name: 'Los Angeles Times', url: 'https://www.latimes.com' },
  },
  {
    id: 'n-2025-09-02-tx',
    date: '2025-09-02',
    state: 'TX',
    tag: 'legislature',
    headline: 'Governor signs Texas mid-decade map after second special session',
    description:
      'The new map redraws boundaries in Houston, the Rio Grande Valley, and Dallas — flipping an estimated four seats from competitive to safe Republican.',
    source: { name: 'Texas Tribune', url: 'https://www.texastribune.org' },
  },
  {
    id: 'n-2025-08-14-tx',
    date: '2025-08-14',
    state: 'TX',
    tag: 'legislature',
    headline: 'Texas House Democrats return after quorum break ends',
    description:
      'After two weeks out of state, the Democratic caucus returned and the redistricting bill advanced on a party-line vote.',
    source: { name: 'Houston Chronicle', url: 'https://www.houstonchronicle.com' },
  },
  {
    id: 'n-2025-07-30-natl',
    date: '2025-07-30',
    state: null,
    tag: 'analysis',
    headline: 'The "mid-decade" gerrymander returns: what is and isn\'t legal',
    description:
      'Most states allow redistricting more than once per decade. A short explainer on which constitutions, statutes, and federal cases actually bind state legislatures here.',
    source: { name: 'Brennan Center', url: 'https://www.brennancenter.org' },
  },
  {
    id: 'n-2025-06-04-wi',
    date: '2025-06-04',
    state: 'WI',
    tag: 'legislature',
    headline: 'Wisconsin pre-emption bill dies in committee',
    description:
      'A GOP-backed effort to lock in the current congressional map before the state supreme court could rule on a pending challenge failed to advance, with two Republicans voting no.',
    source: { name: 'Milwaukee Journal Sentinel', url: 'https://www.jsonline.com' },
  },
  {
    id: 'n-2025-03-19-natl',
    date: '2025-03-19',
    state: null,
    tag: 'court',
    headline: 'SCOTUS declines to revisit Allen v. Milligan in Louisiana follow-on',
    description:
      'The court left in place the Louisiana map drawn under the Voting Rights Act, denying cert without comment. Lower-court litigation continues on a separate equal-protection theory.',
    source: { name: 'SCOTUSblog', url: 'https://www.scotusblog.com' },
  },
  {
    id: 'n-2024-11-20-ga',
    date: '2024-11-20',
    state: 'GA',
    tag: 'analysis',
    headline: 'Georgia\'s "new" map preserved the partisan split — by trading one minority district for another',
    description:
      'A post-election review confirms the legislature complied with the federal order to add a majority-Black district while dismantling a different minority-opportunity district elsewhere in the state.',
    source: { name: 'AJC', url: 'https://www.ajc.com' },
  },
  {
    id: 'n-2024-05-23-sc',
    date: '2024-05-23',
    state: 'SC',
    tag: 'court',
    headline: 'SCOTUS upholds South Carolina congressional map in Alexander v. SC NAACP',
    description:
      'The 6-3 decision tightened the standard for proving racial gerrymandering, sending the case back to the lower court for further proceedings on remaining claims.',
    source: { name: 'NPR', url: 'https://www.npr.org' },
  },
  {
    id: 'n-2024-02-28-ny',
    date: '2024-02-28',
    state: 'NY',
    tag: 'legislature',
    headline: 'New York adopts modestly redrawn map after commission deadlock',
    description:
      'Legislative leadership accepted the IRC\'s first-round proposal with targeted amendments, gaining an estimated three Democratic-leaning seats over the 2022 map.',
    source: { name: 'Gothamist', url: 'https://gothamist.com' },
  },
  {
    id: 'n-2023-10-25-nc',
    date: '2023-10-25',
    state: 'NC',
    tag: 'legislature',
    headline: 'North Carolina enacts new map projected to deliver 11-3 GOP delegation',
    description:
      'Adopted on party-line votes after the state supreme court reversed itself on partisan-gerrymandering claims, the map is expected to flip three seats in 2024.',
    source: { name: 'WRAL', url: 'https://www.wral.com' },
  },
  {
    id: 'n-2023-09-26-al',
    date: '2023-09-26',
    state: 'AL',
    tag: 'court',
    headline: 'Federal court installs special-master map after Alabama defies redraw order',
    description:
      'A three-judge panel rejected the legislature\'s replacement map and adopted the special master\'s version, creating a second district where Black voters have an opportunity to elect their preferred candidate.',
    source: { name: 'AL.com', url: 'https://www.al.com' },
  },
  {
    id: 'n-2023-06-08-natl',
    date: '2023-06-08',
    state: null,
    tag: 'court',
    headline: 'Allen v. Milligan: SCOTUS upholds Section 2 of the Voting Rights Act',
    description:
      'In a 5-4 decision, the court rejected Alabama\'s push to narrow Section 2, preserving the framework that ultimately required new majority-Black districts in Alabama and Louisiana.',
    source: { name: 'Reuters', url: 'https://www.reuters.com' },
  },
];
