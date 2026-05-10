import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users } from 'lucide-react';
import type { Contest } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { Pill } from '../common/Pill';

export function ContestCard({ contest }: { contest: Contest }) {
  const { categoryLabel, contestBrief, contestTitle, t } = useLanguage();

  return (
    <article className="grid gap-4 border-b border-navy/10 bg-white p-4 transition hover:bg-mint/45 md:grid-cols-[132px_1fr_170px]">
      <div className="overflow-hidden rounded-md bg-white shadow-sm">
        <img
          className="h-full min-h-28 w-full object-cover"
          src={contest.thumbnail}
          alt=""
          loading="lazy"
        />
      </div>
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <Pill tone="navy">{categoryLabel(contest.category)}</Pill>
          {contest.guaranteed && <Pill tone="green">{t('guaranteed')}</Pill>}
          {contest.private && <Pill tone="amber">{t('private')}</Pill>}
          {contest.featured && <Pill tone="orange">{t('featured')}</Pill>}
          <Pill>{t('noGenAi')}</Pill>
        </div>
        <h3 className="text-lg font-black">{contestTitle(contest)}</h3>
        <p className="mt-2 text-sm leading-6 text-navy/65">{contestBrief(contest)}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-navy/65">
          <span className="inline-flex items-center gap-1">
            <Users size={16} /> {contest.creators} {t('creatorsCount')}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={16} /> {contest.daysLeft} {t('daysLeft')}
          </span>
          <span>{contest.entries} {t('designs')}</span>
          <span>{contest.watchers} watching</span>
        </div>
      </div>
      <div className="flex min-w-32 flex-col justify-between gap-3 rounded-md bg-neutralPanel p-3 md:items-end">
        <div className="md:text-right">
          <span className="block text-xl font-black">{contest.prize}</span>
          <span className="mt-1 block text-xs font-bold text-navy/55">{contest.packageName} {t('packagePurchased')}</span>
          <span className="block text-xs text-navy/45">({t('includingFees')})</span>
        </div>
        <Link className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-navy px-3 py-2 text-sm font-bold text-white" to={`/contests/${contest.id}`}>
          {t('viewDetails')} <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
