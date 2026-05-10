import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ClipboardList, CreditCard, Megaphone, ShieldCheck, Users } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useLanguage } from '../i18n/LanguageContext';

export function ContestCreatedPage() {
  const { t } = useLanguage();
  const milestones = ['Listing visible to creators', 'Brief quality check complete', 'Invite batch queued', 'First review window opens in 24h'];
  const receiptItems = [
    ['Package', 'Standard'],
    ['Mock prize pool', '$1,400'],
    ['Review window', '7 days'],
    ['Expected entries', '12-18'],
  ];

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

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="mock-surface rounded-lg p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-orange/10 text-orange">
              <Megaphone size={20} />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-contestGreen">Draft marketplace listing</p>
              <h2 className="text-2xl font-black">Salon booking SaaS direction contest</h2>
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold leading-6 text-navy/65">
            A believable listing preview helps the client understand what creators will see: scope, prize, deadline, expected deliverables, and safety boundaries.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {receiptItems.map(([label, value]) => (
              <div key={label} className="rounded-md bg-neutralPanel p-3">
                <p className="text-xs font-black uppercase tracking-wide text-navy/45">{label}</p>
                <p className="mt-1 text-lg font-black">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/contests/1">
              <Button>
                <ClipboardList size={16} /> Preview contest dashboard
              </Button>
            </Link>
            <Link to="/creators">
              <Button variant="ghost">
                <Users size={16} /> Invite creators
              </Button>
            </Link>
          </div>
        </div>

        <aside className="mock-surface rounded-lg p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-mint text-contestGreen">
              <CreditCard size={20} />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-contestGreen">Static receipt</p>
              <h2 className="text-2xl font-black">Launch checklist</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {milestones.map((item) => (
              <div key={item} className="flex gap-3 rounded-md bg-neutralPanel p-3 text-sm font-bold text-navy/70">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
              </div>
            ))}
          </div>
        </aside>
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
