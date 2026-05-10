import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { safetyNotice } from '../data/responsibility';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Pill } from '../components/common/Pill';
import { EntryCard } from '../components/contest/EntryCard';
import { EntryInspector } from '../components/contest/EntryInspector';

const tabs = ['Entries', 'Brief', 'Feedback', 'Safety'] as const;

export function ContestDetailPage() {
  const { contestId } = useParams();
  const contest = contests.find((item) => item.id === Number(contestId)) ?? contests[0];
  const contestEntries = entries.filter((entry) => entry.contestId === contest.id);
  const [selectedId, setSelectedId] = useState(contestEntries[0]?.id);
  const [tab, setTab] = useState<(typeof tabs)[number]>('Entries');
  const [noticeOpen, setNoticeOpen] = useState(false);
  const selectedEntry = useMemo(() => contestEntries.find((entry) => entry.id === selectedId) ?? contestEntries[0], [contestEntries, selectedId]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to="/contests">
        <ArrowLeft size={16} /> Back to contests
      </Link>
      <section className="mock-surface rounded-lg p-5">
        <div className="flex flex-wrap gap-2">
          <Pill tone="navy">{contest.category}</Pill>
          <Pill>{contest.status}</Pill>
          {contest.guaranteed && <Pill tone="emerald">Guaranteed prize</Pill>}
          {contest.private && <Pill tone="amber">Private</Pill>}
        </div>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <h1 className="text-3xl font-black md:text-5xl">{contest.title}</h1>
            <p className="mt-4 max-w-3xl text-navy/70">{contest.brief}</p>
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
          <Button onClick={() => setNoticeOpen(true)}>Consult on this winner</Button>
          <Button variant="ghost" onClick={() => setNoticeOpen(true)}>
            Development responsibility notice
          </Button>
        </div>
      </section>

      <div className="mt-6 flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <Button key={item} variant={tab === item ? 'secondary' : 'ghost'} onClick={() => setTab(item)}>
            {item}
          </Button>
        ))}
      </div>

      {tab === 'Entries' && (
        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {contestEntries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} selected={entry.id === selectedId} onSelect={() => setSelectedId(entry.id)} />
            ))}
          </div>
          {selectedEntry && <EntryInspector entry={selectedEntry} onNotice={() => setNoticeOpen(true)} />}
        </section>
      )}

      {tab === 'Brief' && (
        <section className="mock-surface mt-6 rounded-lg p-5">
          <h2 className="text-2xl font-black">Contest brief</h2>
          <p className="mt-3 text-navy/70">{contest.brief}</p>
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

      {tab === 'Feedback' && (
        <section className="mt-6 grid gap-3">
          {contestEntries.slice(0, 3).map((entry) => (
            <div key={entry.id} className="mock-surface rounded-lg p-4">
              <h3 className="font-black">{entry.title}</h3>
              <p className="mt-2 text-navy/70">{entry.review}</p>
            </div>
          ))}
        </section>
      )}

      {tab === 'Safety' && (
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
