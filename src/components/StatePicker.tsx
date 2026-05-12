import { useMemo } from 'react';
import { STATES } from '../data/states';
import type { Status } from '../data/types';
import { statusLabel } from '../lib/visuals';

interface Props {
  selected: string | null;
  onSelect: (code: string | null) => void;
}

const ORDER: Status[] = ['passed', 'planned', 'failed'];

export function StatePicker({ selected, onSelect }: Props) {
  const grouped = useMemo(() => {
    const out: Record<Status, { code: string; name: string }[]> = {
      passed: [],
      planned: [],
      failed: [],
      none: [],
    };
    for (const s of Object.values(STATES)) {
      out[s.status].push({ code: s.code, name: s.name });
    }
    for (const k of ORDER) out[k].sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }, []);

  return (
    <label className="flex w-full items-center gap-2 text-xs font-medium text-ink-300 md:w-auto">
      <span className="hidden md:inline">Jump to:</span>
      <span className="sr-only md:hidden">Jump to state</span>
      <select
        value={selected ?? ''}
        onChange={(e) => onSelect(e.target.value || null)}
        className="w-full flex-1 cursor-pointer rounded-md border border-ink-700 bg-ink-800/80 px-2.5 py-1.5 text-sm font-medium text-ink-100 outline-none transition hover:border-ink-600 focus:border-ink-500 focus:ring-2 focus:ring-dem-500/40 md:w-56"
      >
        <option value="">Select a state…</option>
        {ORDER.map((status) =>
          grouped[status].length > 0 ? (
            <optgroup key={status} label={statusLabel(status)}>
              {grouped[status].map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </optgroup>
          ) : null,
        )}
      </select>
    </label>
  );
}
