import { useMemo } from 'react';
import { NEWS } from '../data/news';
import type { NewsItem } from '../data/types';
import { CODE_TO_NAME } from '../lib/stateNames';

interface Props {
  /** When set, only show news for this state. */
  filterState: string | null;
  onClearFilter: () => void;
}

export function NewsFeed({ filterState, onClearFilter }: Props) {
  const items = useMemo(() => {
    const list = filterState
      ? NEWS.filter((n) => n.state === filterState)
      : NEWS.slice();
    return list.sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [filterState]);

  const heading = filterState
    ? `${CODE_TO_NAME[filterState] ?? filterState} · Updates`
    : 'National & state updates';

  return (
    <section className="card">
      <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink-800/80 px-5 py-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-ink-400">News feed</div>
          <h2 className="font-display text-xl font-semibold text-ink-50">{heading}</h2>
        </div>
        {filterState && (
          <button type="button" onClick={onClearFilter} className="btn-ghost">
            Show all news
          </button>
        )}
      </header>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-ink-400">
          No items yet for {CODE_TO_NAME[filterState!] ?? filterState}.
        </div>
      ) : (
        <ol className="divide-y divide-ink-800/80">
          {items.map((n) => (
            <NewsRow key={n.id} item={n} showStateBadge={!filterState} />
          ))}
        </ol>
      )}
    </section>
  );
}

function NewsRow({ item, showStateBadge }: { item: NewsItem; showStateBadge: boolean }) {
  return (
    <li className="px-5 py-4">
      <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-400">
        <time dateTime={item.date} className="tabular-nums">
          {formatDate(item.date)}
        </time>
        {showStateBadge && (
          <>
            <span className="text-ink-600">·</span>
            <span className="font-medium text-ink-300">
              {item.state ? (CODE_TO_NAME[item.state] ?? item.state) : 'National'}
            </span>
          </>
        )}
        {item.tag && <TagPill tag={item.tag} />}
      </div>
      <h3 className="font-display text-base font-semibold leading-snug text-ink-50">
        {item.headline}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-300">{item.description}</p>
      <div className="mt-2 text-xs text-ink-400">
        Source:{' '}
        <a
          href={item.source.url}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-ink-200 underline-offset-2 hover:text-ink-50 hover:underline"
        >
          {item.source.name}
        </a>
      </div>
    </li>
  );
}

function TagPill({ tag }: { tag: NonNullable<NewsItem['tag']> }) {
  const styles: Record<string, string> = {
    court: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    legislature: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    ballot: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    analysis: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    executive: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  };
  return (
    <span
      className={`chip border ${styles[tag] ?? 'bg-ink-800 text-ink-300 border-ink-700'}`}
    >
      {tag}
    </span>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
