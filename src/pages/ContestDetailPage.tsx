import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Send } from 'lucide-react';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { safetyNotice } from '../data/responsibility';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Pill } from '../components/common/Pill';
import { EntryCard } from '../components/contest/EntryCard';
import { EntryInspector } from '../components/contest/EntryInspector';
import { useLanguage } from '../i18n/LanguageContext';

const tabs = ['entriesTab', 'briefTab', 'feedbackTab', 'safetyTab'] as const;

export function ContestDetailPage() {
  const { categoryLabel, contestBrief, contestTitle, t } = useLanguage();
  const { contestId } = useParams();
  const contest = contests.find((item) => item.id === Number(contestId));
  const contestEntries = contest ? entries.filter((entry) => entry.contestId === contest.id) : [];
  const [selectedId, setSelectedId] = useState(contestEntries[0]?.id);
  const [tab, setTab] = useState<(typeof tabs)[number]>('entriesTab');
  const [noticeOpen, setNoticeOpen] = useState(false);
  const selectedEntry = useMemo(() => contestEntries.find((entry) => entry.id === selectedId) ?? contestEntries.find((entry) => entry.winner) ?? contestEntries[0], [contestEntries, selectedId]);
  const reviewEntry = selectedEntry ?? contestEntries.find((entry) => entry.winner);

  if (!contest) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6">
          <Pill tone="rose">Not found</Pill>
          <h1 className="mt-4 text-3xl font-black">{t('contestNotFound')}</h1>
          <p className="mt-3 text-navy/70">The requested contest is not available in this static prototype.</p>
          <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
            {t('backToContests')}
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to="/contests">
        <ArrowLeft size={16} /> Back to contests
      </Link>
      <section className="mock-surface rounded-lg p-5">
        <div className="flex flex-wrap gap-2">
          <Pill tone="navy">{categoryLabel(contest.category)}</Pill>
          <Pill>{contest.status}</Pill>
          {contest.guaranteed && <Pill tone="green">{t('guaranteed')}</Pill>}
          {contest.private && <Pill tone="amber">{t('private')}</Pill>}
        </div>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <h1 className="text-3xl font-black md:text-5xl">{contestTitle(contest)}</h1>
            <p className="mt-4 max-w-3xl text-navy/70">{contestBrief(contest)}</p>
          </div>
          <div className="grid min-w-64 grid-cols-3 gap-3 text-center">
            <div className="rounded-md bg-neutralPanel p-3">
              <p className="text-xs font-bold text-navy/50">Prize</p>
              <p className="text-xl font-black">{contest.prize}</p>
            </div>
            <div className="rounded-md bg-neutralPanel p-3">
              <p className="text-xs font-bold text-navy/50">Entries</p>
              <p className="text-xl font-black">{contest.entries}</p>
            </div>
            <div className="rounded-md bg-neutralPanel p-3">
              <p className="text-xs font-bold text-navy/50">Days left</p>
              <p className="text-xl font-black">{contest.daysLeft}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {reviewEntry ? (
            <Link
              className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90"
              to={`/contests/${contest.id}/winner-review/${reviewEntry.id}`}
            >
              {t('consultWinner')}
            </Link>
          ) : (
          <Button disabled>{t('consultWinner')}</Button>
          )}
          <Link
            className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90"
            to={`/contests/${contest.id}/submit`}
          >
            <Send size={16} /> {t('submitProposal')}
          </Link>
          <Button variant="ghost" onClick={() => setNoticeOpen(true)}>
            {t('developmentNotice')}
          </Button>
        </div>
      </section>

      <div className="mt-6 flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <Button key={item} variant={tab === item ? 'secondary' : 'ghost'} onClick={() => setTab(item)}>
            {t(item)}
          </Button>
        ))}
      </div>

      {tab === 'entriesTab' && (
        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {contestEntries.length > 0 ? (
              contestEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} selected={entry.id === selectedId} onSelect={() => setSelectedId(entry.id)} />
              ))
            ) : (
              <div className="mock-surface rounded-lg p-5 sm:col-span-2">
                <Pill tone="amber">{t('noEntriesYet')}</Pill>
                <h2 className="mt-3 text-2xl font-black">{t('firstSubmit')}</h2>
                <p className="mt-2 text-navy/70">{t('noEntriesCopy')}</p>
                <Link
                  className="focus-ring mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90"
                  to={`/contests/${contest.id}/submit`}
                >
                  <Send size={16} /> {t('submitProposal')}
                </Link>
              </div>
            )}
          </div>
          {selectedEntry && <EntryInspector entry={selectedEntry} onNotice={() => setNoticeOpen(true)} />}
        </section>
      )}

      {tab === 'briefTab' && (
        <section className="mock-surface mt-6 rounded-lg p-5">
          <h2 className="text-2xl font-black">Contest brief</h2>
          <p className="mt-3 text-navy/70">{contestBrief(contest)}</p>
          <h3 className="mt-6 font-black">Deliverables</h3>
          <ul className="mt-2 grid gap-2">
            {contest.deliverables.map((item) => (
              <li key={item} className="rounded-md bg-neutralPanel p-3 font-semibold">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === 'feedbackTab' && (
        <section className="mt-6 grid gap-3">
          {contestEntries.slice(0, 3).map((entry) => (
            <div key={entry.id} className="mock-surface rounded-lg p-4">
              <h3 className="font-black">{entry.title}</h3>
              <p className="mt-2 text-navy/70">{entry.review}</p>
            </div>
          ))}
        </section>
      )}

      {tab === 'safetyTab' && (
        <section className="mock-surface mt-6 rounded-lg p-5">
          <div className="flex gap-3 text-amber-800">
            <AlertTriangle size={22} />
            <p className="font-semibold">{safetyNotice}</p>
          </div>
        </section>
      )}

      <Modal open={noticeOpen} onClose={() => setNoticeOpen(false)} title="Development responsibility notice">
        <p className="leading-7 text-navy/75">
          Production development, maintenance, acceptance testing, contracts, rights, licenses, and security guarantees must be agreed directly between the parties. Do not share personal data, confidential information, or API keys in this prototype.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setNoticeOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setNoticeOpen(false)}>I understand</Button>
        </div>
      </Modal>
    </main>
  );
}
