interface Source {
  text: string;
  href: string;
}

/**
 * Two short sections that appear at the very bottom of the page,
 * after the news feed: a brief explainer for readers who arrived
 * not knowing what gerrymandering is, and a compact US history
 * with sourced footnotes.
 */
export function AboutSections() {
  return (
    <>
      <Explainer />
      <History />
    </>
  );
}

function Explainer() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-12 md:px-10 md:py-16">
      <h2 className="font-serif text-2xl font-semibold tracking-tighter text-ink-50 md:text-3xl">
        What is gerrymandering, briefly
      </h2>
      <div className="mt-4 max-w-prose space-y-3 text-base leading-relaxed text-ink-200">
        <p>
          Gerrymandering is the practice of drawing the boundaries of an electoral district to
          favour one party, one incumbent, or one demographic group — and disfavour the others. In
          the US it usually refers to the lines around the 435 congressional districts, redrawn
          once per decade after the census and, increasingly, between censuses.
        </p>
        <p>
          The two basic moves are <em>cracking</em> a concentrated bloc of voters across several
          districts so it can&rsquo;t win any of them, and <em>packing</em> the same bloc into one
          district so its votes are &ldquo;wasted&rdquo; on a lopsided margin. Modern computer-aided
          redistricting can do both with near-surgical precision: a party that wins 50% of the
          statewide vote can win 65–75% of the seats with the right map.
        </p>
        <p>
          Partisan gerrymandering is largely legal at the federal level after the Supreme Court&rsquo;s{' '}
          <em>Rucho v. Common Cause</em> (2019); racial gerrymandering remains illegal in principle,
          though the bar to prove it has been raised twice in the last two years
          (<em>Alexander v. SC NAACP</em>, 2024; <em>Louisiana v. Callais</em>, 2026).
        </p>
      </div>
    </section>
  );
}

function History() {
  return (
    <section className="mx-auto w-full max-w-[1200px] border-t border-hairline px-5 py-12 md:px-10 md:py-16">
      <h2 className="font-serif text-2xl font-semibold tracking-tighter text-ink-50 md:text-3xl">
        A short history of the American gerrymander
      </h2>

      <div className="mt-6 grid gap-x-12 gap-y-8 md:grid-cols-2">
        <HistoryEntry
          year="1812"
          title="The salamander that named it"
          body={
            <>
              Massachusetts Governor Elbridge Gerry signs a state-senate map drawn to favour his
              Democratic-Republican party. A Boston Gazette cartoonist sketches one of the
              districts as a winged dragon, calling it a &ldquo;Gerry-mander&rdquo; — and the name
              sticks.
            </>
          }
          sources={[
            {
              text: 'Library of Congress · the original 1812 cartoon',
              href: 'https://www.loc.gov/resource/cph.3a01840/',
            },
          ]}
        />

        <HistoryEntry
          year="1965 →"
          title="The Voting Rights Act limits racial gerrymandering"
          body={
            <>
              Section 2 of the Voting Rights Act prohibits maps that dilute minority voting power.
              For decades it&rsquo;s the main federal check on redistricting, used to create
              majority-Black and majority-Hispanic districts across the South.
            </>
          }
          sources={[
            {
              text: 'DOJ · About Section 2 of the VRA',
              href: 'https://www.justice.gov/crt/section-2-voting-rights-act',
            },
          ]}
        />

        <HistoryEntry
          year="2010"
          title="REDMAP and the computer-drawn map"
          body={
            <>
              A Republican strategy called REDMAP targets state-legislature races in the 2010
              cycle, betting that the party that wins state houses going into a census year
              controls the next decade of congressional maps. The bet pays off in PA, MI, OH, NC,
              WI: durable Republican majorities locked in by software-optimised lines.
            </>
          }
          sources={[
            {
              text: 'ProPublica · How Republicans drew the 2010 maps',
              href: 'https://www.propublica.org/article/how-dark-money-helped-republicans-hold-the-house',
            },
          ]}
        />

        <HistoryEntry
          year="2019"
          title="Rucho: partisan gerrymandering escapes federal courts"
          body={
            <>
              In <em>Rucho v. Common Cause</em>, the Supreme Court rules 5-4 that partisan
              gerrymandering claims are &ldquo;political questions&rdquo; outside federal-court
              reach. State courts and state constitutions become the only venue. Some states
              (FL, NC, PA, OH) bring suits in their own courts; others don&rsquo;t.
            </>
          }
          sources={[
            {
              text: 'Brennan Center · Rucho v. Common Cause explainer',
              href: 'https://www.brennancenter.org/our-work/research-reports/extreme-partisan-maps-account-2024-congressional-bias',
            },
          ]}
        />

        <HistoryEntry
          year="2023"
          title="Allen v. Milligan reaffirms VRA §2"
          body={
            <>
              The Court, 5-4, upholds the Voting Rights Act&rsquo;s vote-dilution framework and
              orders Alabama to draw a second Black-opportunity district. Louisiana follows in
              early 2024. Many observers read it as a temporary stay of execution — both maps
              are later challenged on equal-protection grounds.
            </>
          }
          sources={[
            {
              text: 'SCOTUSblog · Allen v. Milligan opinion analysis',
              href: 'https://www.scotusblog.com/2023/06/in-surprise-ruling-court-rejects-alabamas-bid-to-weaken-voting-rights-act/',
            },
          ]}
        />

        <HistoryEntry
          year="2024-2026"
          title="The mid-decade gerrymander becomes routine"
          body={
            <>
              For nearly a century, congressional maps changed once per decade. In this cycle that
              norm dissolves: NC redraws twice; TX, CA, MO, UT, FL and TN redraw mid-decade for
              partisan reasons (or in response to the partisan reasons of others). The SCOTUS
              ruling in <em>Louisiana v. Callais</em> (April 2026) further loosens the
              VRA&rsquo;s constraint, triggering a cascade across the South.
            </>
          }
          sources={[
            {
              text: 'Brennan Center · the mid-decade redistricting wave',
              href: 'https://www.brennancenter.org/our-work/analysis-opinion/mid-decade-redistricting-explained',
            },
            {
              text: 'Harvard Kennedy School · what mid-decade redistricting means',
              href: 'https://www.hks.harvard.edu/faculty-research/policy-topics/politics/explainer-understanding-mid-decade-redistricting-push-texas',
            },
          ]}
        />
      </div>
    </section>
  );
}

function HistoryEntry({
  year,
  title,
  body,
  sources,
}: {
  year: string;
  title: string;
  body: React.ReactNode;
  sources: Source[];
}) {
  return (
    <article>
      <div className="text-xs font-medium uppercase tracking-widest text-ink-500 tabular-nums">
        {year}
      </div>
      <h3 className="mt-1 font-serif text-xl font-semibold text-ink-50">{title}</h3>
      <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-200">{body}</p>
      <ul className="mt-3 space-y-1 text-xs">
        {sources.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-ink-400 underline-offset-2 transition hover:text-ink-100 hover:underline"
            >
              {s.text}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
