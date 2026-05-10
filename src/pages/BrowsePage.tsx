import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../types';
import { contests } from '../data/contests';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { CategoryRail } from '../components/contest/CategoryRail';
import { ContestCard } from '../components/contest/ContestCard';
import { useLanguage } from '../i18n/LanguageContext';
import { statusLabel } from '../utils/displayLabels';

const browseCopy = {
  en: {
    status: 'Status',
    sort: 'Sort',
    recommended: 'Recommended',
    prize: 'Highest prize',
    entries: 'Most designs',
    deadline: 'Ending soon',
  },
  ja: {
    status: '状態',
    sort: '並び替え',
    recommended: 'おすすめ順',
    prize: '賞金が高い順',
    entries: '応募数が多い順',
    deadline: '締切が近い順',
  },
} as const;

export function BrowsePage() {
  const { language, t } = useLanguage();
  const text = browseCopy[language];
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [query, setQuery] = useState('');
  const [guaranteed, setGuaranteed] = useState(false);
  const [status, setStatus] = useState<'All' | 'Open' | 'Finalist' | 'Completed'>('All');
  const [sort, setSort] = useState<'recommended' | 'prize' | 'entries' | 'deadline'>('recommended');

  const filtered = useMemo(
    () => {
      const filteredContests = contests.filter((contest) => {
        const categoryMatch = category === 'All' || contest.category === category;
        const queryMatch = `${contest.title} ${contest.brief} ${contest.client}`.toLowerCase().includes(query.toLowerCase());
        const guaranteeMatch = !guaranteed || contest.guaranteed;
        const statusMatch = status === 'All' || contest.status === status;
        return categoryMatch && queryMatch && guaranteeMatch && statusMatch;
      });

      return [...filteredContests].sort((first, second) => {
        if (sort === 'prize') return Number(second.prize.replace(/[$,]/g, '')) - Number(first.prize.replace(/[$,]/g, ''));
        if (sort === 'entries') return second.entries - first.entries;
        if (sort === 'deadline') return first.daysLeft - second.daysLeft;
        return Number(second.featured) - Number(first.featured) || Number(second.guaranteed) - Number(first.guaranteed);
      });
    },
    [category, guaranteed, query, sort, status],
  );
  const hasFilters = category !== 'All' || query.length > 0 || guaranteed || status !== 'All';

  const resetFilters = () => {
    setCategory('All');
    setQuery('');
    setGuaranteed(false);
    setStatus('All');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black md:text-5xl">{t('pageBrowseTitle')}</h1>
          <p className="mt-3 max-w-2xl text-navy/65">{t('pageBrowseCopy')}</p>
        </div>
        <label className="flex min-w-72 flex-col gap-2 text-sm font-bold">
          {t('search')}
          <input
            className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="mb-5 grid gap-3">
        <CategoryRail selected={category} onSelect={setCategory} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" checked={guaranteed} onChange={(event) => setGuaranteed(event.target.checked)} />
              {t('guaranteedOnly')}
            </label>
            <label className="flex items-center gap-2 text-sm font-bold">
              {text.status}
              <select className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
                {(['All', 'Open', 'Finalist', 'Completed'] as const).map((item) => (
                  <option key={item} value={item}>
                    {statusLabel(item, language)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm font-bold">
            {text.sort}
            <select className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2" value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
              <option value="recommended">{text.recommended}</option>
              <option value="prize">{text.prize}</option>
              <option value="entries">{text.entries}</option>
              <option value="deadline">{text.deadline}</option>
            </select>
          </label>
        </div>
      </div>
      {filtered.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-soft">
          {filtered.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t('noContestsTitle')}
          description={t('noContestsCopy')}
          actions={
            <>
              <Button onClick={resetFilters} disabled={!hasFilters} variant="ghost">
                {t('resetFilters')}
              </Button>
              <Link to="/contests/new">
                <Button>{t('openContest')}</Button>
              </Link>
            </>
          }
        />
      )}
    </main>
  );
}
