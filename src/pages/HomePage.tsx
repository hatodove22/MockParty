import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Trophy, Users } from 'lucide-react';
import { contests } from '../data/contests';
import { Button } from '../components/common/Button';
import { ContestCard } from '../components/contest/ContestCard';
import { Metric } from '../components/contest/Metric';
import { Pill } from '../components/common/Pill';
import { useLanguage } from '../i18n/LanguageContext';

export function HomePage() {
  const { t } = useLanguage();

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-6 lg:py-16">
        <div>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">{t('heroTitle')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-navy/70">{t('heroCopy')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/contests/new">
              <Button>
                {t('startContest')} <ArrowRight size={17} />
              </Button>
            </Link>
            <Link to="/contests">
              <Button variant="ghost">{t('browseOpenContests')}</Button>
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <Pill tone="green">{t('marketplaceFlow')}</Pill>
            <Pill tone="emerald">{t('prototypeOnly')}</Pill>
            <Pill tone="amber">{t('noProductionGuarantee')}</Pill>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Metric label={t('standardPrize')} value="$1.4k" icon={<Trophy size={18} />} />
            <Metric label={t('expectedEntries')} value="5-8" icon={<Users size={18} />} />
            <Metric label={t('productionGuarantee')} value="0" icon={<ShieldCheck size={18} />} />
          </div>
        </div>
        <div className="mock-surface overflow-hidden rounded-lg">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl font-black">{t('liveContests')}</h2>
              <p className="text-sm text-navy/60">{t('liveContestCopy')}</p>
            </div>
            <Pill tone="orange">{t('featured')}</Pill>
          </div>
          <div className="border-t border-navy/10">
            {contests.slice(0, 3).map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
