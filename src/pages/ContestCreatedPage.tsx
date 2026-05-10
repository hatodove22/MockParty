import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useLanguage } from '../i18n/LanguageContext';

export function ContestCreatedPage() {
  const { t } = useLanguage();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <section className="mock-surface rounded-lg p-6">
        <div className="flex max-w-3xl gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-md bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={24} />
          </span>
          <div>
            <h1 className="text-3xl font-black md:text-5xl">{t('contestDraftCreated')}</h1>
            <p className="mt-4 text-lg leading-8 text-navy/70">{t('contestDraftCopy')}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Link className="focus-ring rounded-lg border border-navy/10 bg-white p-5 hover:border-orange" to="/contests">
          <h2 className="text-xl font-black">{t('browseContests')}</h2>
          <p className="mt-2 text-sm font-semibold text-navy/65">Compare the active mock contest listings.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-orange">
            {t('browseContests')} <ArrowRight size={16} />
          </span>
        </Link>
        <Link className="focus-ring rounded-lg border border-navy/10 bg-white p-5 hover:border-orange" to="/contests/1">
          <h2 className="text-xl font-black">{t('viewActiveExample')}</h2>
          <p className="mt-2 text-sm font-semibold text-navy/65">Inspect entries, feedback, brief, and safety tabs.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-orange">
            Open example <ArrowRight size={16} />
          </span>
        </Link>
        <Link className="focus-ring rounded-lg border border-navy/10 bg-white p-5 hover:border-orange" to="/safety">
          <span className="mb-3 inline-flex text-emerald-700">
            <ShieldCheck size={22} />
          </span>
          <h2 className="text-xl font-black">{t('safety')}</h2>
          <p className="mt-2 text-sm font-semibold text-navy/65">Review boundaries for prototype-only work.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-orange">
            {t('readSafety')} <ArrowRight size={16} />
          </span>
        </Link>
      </section>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link to="/contests/new">
          <Button>{t('startAnotherContest')}</Button>
        </Link>
        <Link to="/contests">
          <Button variant="ghost">{t('browseContests')}</Button>
        </Link>
      </div>
    </main>
  );
}
