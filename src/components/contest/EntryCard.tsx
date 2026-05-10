import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Entry } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { Pill } from '../common/Pill';
import { cn } from '../../utils/cn';
import { creatorSlug } from '../../utils/creatorSlug';
import { useLanguage } from '../../i18n/LanguageContext';
import { entryTitle } from '../../utils/entryDisplay';

const entryCardCopy = {
  en: {
    winner: 'Winner',
    finalist: 'Finalist',
    selected: 'Selected',
    select: 'Select',
    details: 'Details',
  },
  ja: {
    winner: '受賞作品',
    finalist: 'ファイナリスト',
    selected: '選択中',
    select: '選択',
    details: '詳細',
  },
} as const;

export function EntryCard({
  entry,
  selected,
  onSelect,
}: {
  entry: Entry;
  selected: boolean;
  onSelect: () => void;
}) {
  const { language } = useLanguage();
  const text = entryCardCopy[language];
  const title = entryTitle(entry, language);

  return (
    <article
      className={cn(
        'w-full rounded-lg border bg-white p-3 text-left transition hover:-translate-y-0.5',
        selected ? 'border-orange shadow-soft' : 'border-navy/10',
      )}
    >
      <button className="focus-ring w-full rounded-md text-left" onClick={onSelect} aria-label={`${text.select} ${title}`} aria-pressed={selected}>
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
      </button>
      <div className="mt-3 flex flex-wrap gap-2">
        {entry.winner && <Pill tone="emerald">{text.winner}</Pill>}
        {entry.finalist && <Pill tone="amber">{text.finalist}</Pill>}
      </div>
      <h4 className="mt-2 font-black">{title}</h4>
      <Link className="text-sm text-navy/60 hover:text-orange" to={`/creators/${creatorSlug(entry.creator)}`}>
        {entry.creator}
      </Link>
      <div className="mt-3 flex items-center justify-between gap-3">
        <RatingStars rating={entry.rating} />
        <span className="font-black text-orange">{entry.score}</span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-navy/10 pt-3">
        <button className="focus-ring rounded-md px-2 py-1 text-xs font-bold text-navy/60 hover:text-orange" onClick={onSelect}>
          {selected ? text.selected : text.select}
        </button>
        <Link
          className="focus-ring inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-navy hover:text-orange"
          to={`/contests/${entry.contestId}/entries/${entry.id}`}
        >
          <Eye size={14} /> {text.details}
        </Link>
      </div>
    </article>
  );
}
