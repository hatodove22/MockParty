import { MessageSquare, MousePointerClick } from 'lucide-react';
import type { Entry } from '../../types';
import { Button } from '../common/Button';
import { Pill } from '../common/Pill';
import { RatingStars } from '../common/RatingStars';

export function EntryInspector({ entry, onNotice }: { entry: Entry; onNotice: () => void }) {
  return (
    <aside className="mock-surface sticky top-24 rounded-lg p-5">
      <div className="flex flex-wrap gap-2">
        {entry.winner && <Pill tone="emerald">Winner</Pill>}
        {entry.finalist && <Pill tone="amber">Finalist</Pill>}
        <Pill>Entry</Pill>
      </div>
      <h3 className="mt-3 text-xl font-black">{entry.title}</h3>
      <p className="text-sm font-semibold text-navy/55">{entry.creator}</p>
      <div className="mt-4 flex items-center justify-between rounded-md bg-neutralPanel p-3">
        <RatingStars rating={entry.rating} />
        <span className="text-2xl font-black text-orange">{entry.score}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-navy/70">{entry.review}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-semibold text-navy/65">
        <span className="inline-flex items-center gap-1">
          <MessageSquare size={16} /> {entry.comments} comments
        </span>
        <span>{entry.views} views</span>
      </div>
      <div className="mt-5 grid gap-2">
        <Button onClick={onNotice}>
          <MousePointerClick size={16} /> Select as winner
        </Button>
        <Button variant="ghost" onClick={onNotice}>
          View development notice
        </Button>
      </div>
    </aside>
  );
}
