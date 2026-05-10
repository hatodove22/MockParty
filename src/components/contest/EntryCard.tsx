import type { Entry } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { Pill } from '../common/Pill';
import { cn } from '../../utils/cn';

export function EntryCard({
  entry,
  selected,
  onSelect,
}: {
  entry: Entry;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={cn(
        'focus-ring w-full rounded-lg border bg-white p-3 text-left transition hover:-translate-y-0.5',
        selected ? 'border-orange shadow-soft' : 'border-navy/10',
      )}
      onClick={onSelect}
    >
      <div className={`h-36 rounded-md bg-gradient-to-br ${entry.gradient} p-3`}>
        <div className="grid h-full grid-cols-[1fr_48px] gap-2 rounded-md border border-white/80 bg-white/45 p-2">
          <div>
            <div className="h-3 w-20 rounded bg-navy/25" />
            <div className="mt-3 h-20 rounded bg-white/70" />
          </div>
          <div className="space-y-2">
            <div className="h-10 rounded bg-navy/15" />
            <div className="h-10 rounded bg-orange/30" />
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {entry.winner && <Pill tone="emerald">Winner</Pill>}
        {entry.finalist && <Pill tone="amber">Finalist</Pill>}
      </div>
      <h4 className="mt-2 font-black">{entry.title}</h4>
      <p className="text-sm text-navy/60">{entry.creator}</p>
      <div className="mt-3 flex items-center justify-between">
        <RatingStars rating={entry.rating} />
        <span className="font-black text-orange">{entry.score}</span>
      </div>
    </button>
  );
}
