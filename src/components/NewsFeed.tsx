import { useMemo, useState } from 'react';
import { NEWS } from '../data/news';
import type { NewsItem } from '../data/types';
import { CODE_TO_NAME } from '../lib/stateNames';

interface Props {
  /** When set, only show news for this state. */
  filterState: string | null;
}

type Tag = NonNullable<NewsItem['tag']>;
const TAGS: Tag[] = ['court', 'legislature', 'ballot', 'analysis', 'executive'];

export function NewsFeed({ filterState }: Props) {
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
    ? `${CODE_TO_NAME[filterState] ?? filterState} · updates`
    : 'Latest';

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-serif text-2xl font-semibold tracking-tighter text-ink-50 md:text-3xl">
          {heading}
        </h2>
        <span className="text-xs text-ink-500 tabular-nums">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search headlines, sources…"
          className="min-w-0 max-w-[420px] flex-1 rounded-md border border-hairline bg-page-2/60 px-3 py-1.5 text-sm text-ink-100 placeholder:text-ink-500 outline-none transition focus:border-hairline-strong focus:ring-1 focus:ring-dem-500/40"
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
              className="text-xs text-ink-500 underline-offset-2 hover:text-ink-200 hover:underline"
            >
              clear
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-12 text-center text-sm text-ink-500">
          No items match the current filters.
        </div>
      ) : (
        <ol className="divide-y divide-hairline">
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
    active: 'bg-amber-500/15 text-amber-200 border-amber-500/40',
    inactive: 'border-amber-500/20 text-amber-300/60 hover:border-amber-500/40 hover:text-amber-300/90',
  },
  legislature: {
    active: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40',
    inactive: 'border-emerald-500/20 text-emerald-300/60 hover:border-emerald-500/40 hover:text-emerald-300/90',
  },
  ballot: {
    active: 'bg-violet-500/15 text-violet-200 border-violet-500/40',
    inactive: 'border-violet-500/20 text-violet-300/60 hover:border-violet-500/40 hover:text-violet-300/90',
  },
  analysis: {
    active: 'bg-sky-500/15 text-sky-200 border-sky-500/40',
    inactive: 'border-sky-500/20 text-sky-300/60 hover:border-sky-500/40 hover:text-sky-300/90',
  },
  executive: {
    active: 'bg-rose-500/15 text-rose-200 border-rose-500/40',
    inactive: 'border-rose-500/20 text-rose-300/60 hover:border-rose-500/40 hover:text-rose-300/90',
  },
};

function TagToggle({ tag, active, onClick }: { tag: Tag; active: boolean; onClick: () => void }) {
  const s = TAG_STYLES[tag];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition ${active ? s.active : `bg-transparent ${s.inactive}`}`}
    >
      {tag}
    </button>
  );
}

function NewsRow({ item, showStateBadge }: { item: NewsItem; showStateBadge: boolean }) {
  let host = '';
  try {
    host = new URL(item.source.url).hostname.replace(/^www\./, '');
  } catch {
    host = item.source.name;
  }
  return (
    <li className="py-5 first:pt-0 last:pb-0">
      <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-500">
        <time dateTime={item.date} className="tabular-nums">
          {formatDate(item.date)}
        </time>
        {showStateBadge && (
          <>
            <span className="text-ink-700">·</span>
            <span className="font-medium text-ink-300">
              {item.state ? (CODE_TO_NAME[item.state] ?? item.state) : 'National'}
            </span>
          </>
        )}
        {item.tag && <TagPill tag={item.tag} />}
      </div>
      <h3 className="max-w-prose font-serif text-xl font-semibold leading-snug text-ink-50">
        {item.headline}
      </h3>
      <p className="mt-1.5 max-w-prose text-base leading-relaxed text-ink-200">
        {item.description}
      </p>
      <a
        href={item.source.url}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-2 inline-flex items-baseline gap-1.5 text-xs text-ink-400 underline-offset-2 transition hover:text-ink-100 hover:underline"
      >
        <span className="text-ink-500">Source:</span>
        <span className="font-medium">{item.source.name}</span>
        <span className="text-ink-600">· {host}</span>
      </a>
    </li>
  );
}

function TagPill({ tag }: { tag: Tag }) {
  const s = TAG_STYLES[tag];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${s.active}`}>
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
