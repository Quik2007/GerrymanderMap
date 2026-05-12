import { useMemo, useState } from 'react';
import { NEWS } from '../data/news';
import type { NewsItem } from '../data/types';
import { CODE_TO_NAME } from '../lib/stateNames';

interface Props {
  /** When set, only show news for this state. */
  filterState: string | null;
  onClearFilter: () => void;
}

type Tag = NonNullable<NewsItem['tag']>;
const TAGS: Tag[] = ['court', 'legislature', 'ballot', 'analysis', 'executive'];

export function NewsFeed({ filterState, onClearFilter }: Props) {
  const [activeTags, setActiveTags] = useState<Set<Tag>>(new Set());
  const [query, setQuery] = useState('');

  const toggleTag = (tag: Tag) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NEWS.filter((n) => {
      if (filterState && n.state !== filterState) return false;
      if (activeTags.size && (!n.tag || !activeTags.has(n.tag))) return false;
      if (q) {
        const hay = `${n.headline} ${n.description} ${n.source.name}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [filterState, activeTags, query]);

  const heading = filterState
    ? `${CODE_TO_NAME[filterState] ?? filterState} · Updates`
    : 'National & state updates';

  const totalForScope = useMemo(() => {
    return filterState ? NEWS.filter((n) => n.state === filterState).length : NEWS.length;
  }, [filterState]);

  return (
    <section className="card">
      <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink-800/80 px-5 py-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-ink-400">News feed</div>
          <h2 className="font-display text-xl font-semibold text-ink-50">{heading}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-400 tabular-nums">
            {items.length} of {totalForScope}
          </span>
          {filterState && (
            <button type="button" onClick={onClearFilter} className="btn-ghost">
              Show all news
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2 border-b border-ink-800/80 px-5 py-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search headlines, sources…"
          className="min-w-0 flex-1 rounded-md border border-ink-700 bg-ink-900/60 px-3 py-1.5 text-sm text-ink-100 placeholder:text-ink-500 outline-none transition focus:border-ink-500 focus:ring-2 focus:ring-dem-500/30"
        />
        <div className="flex flex-wrap items-center gap-1.5">
          {TAGS.map((tag) => (
            <TagToggle
              key={tag}
              tag={tag}
              active={activeTags.has(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
          {activeTags.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveTags(new Set())}
              className="text-xs text-ink-400 underline-offset-2 hover:text-ink-200 hover:underline"
            >
              clear
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-ink-400">
          No items match the current filters.
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

const TAG_STYLES: Record<Tag, { active: string; inactive: string }> = {
  court: {
    active: 'bg-amber-500/20 text-amber-200 border-amber-500/60',
    inactive: 'border-amber-500/30 text-amber-300/80 hover:border-amber-500/50',
  },
  legislature: {
    active: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/60',
    inactive: 'border-emerald-500/30 text-emerald-300/80 hover:border-emerald-500/50',
  },
  ballot: {
    active: 'bg-violet-500/20 text-violet-200 border-violet-500/60',
    inactive: 'border-violet-500/30 text-violet-300/80 hover:border-violet-500/50',
  },
  analysis: {
    active: 'bg-sky-500/20 text-sky-200 border-sky-500/60',
    inactive: 'border-sky-500/30 text-sky-300/80 hover:border-sky-500/50',
  },
  executive: {
    active: 'bg-rose-500/20 text-rose-200 border-rose-500/60',
    inactive: 'border-rose-500/30 text-rose-300/80 hover:border-rose-500/50',
  },
};

function TagToggle({
  tag,
  active,
  onClick,
}: {
  tag: Tag;
  active: boolean;
  onClick: () => void;
}) {
  const s = TAG_STYLES[tag];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`chip border transition ${active ? s.active : `bg-transparent ${s.inactive}`}`}
    >
      {tag}
    </button>
  );
}

function NewsRow({ item, showStateBadge }: { item: NewsItem; showStateBadge: boolean }) {
  return (
    <li className="px-5 py-4 transition hover:bg-ink-900/60">
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

function TagPill({ tag }: { tag: Tag }) {
  const s = TAG_STYLES[tag];
  return <span className={`chip border ${s.active}`}>{tag}</span>;
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
