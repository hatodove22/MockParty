import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Columns3, MessageSquare } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { RatingStars } from '../components/common/RatingStars';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { useLanguage } from '../i18n/LanguageContext';

export function CompareEntriesPage() {
  const { contestId } = useParams();
  const { contestBrief, contestTitle } = useLanguage();
  const contest = contests.find((item) => item.id === Number(contestId));
  const contestEntries = contest ? entries.filter((entry) => entry.contestId === contest.id).slice(0, 3) : [];
  const initialShortlist = useMemo(() => contestEntries.filter((entry) => entry.finalist).map((entry) => entry.id), [contestEntries]);
  const [shortlist, setShortlist] = useState<number[]>(initialShortlist);

  if (!contest) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6">
          <Pill tone="rose">Not found</Pill>
          <h1 className="mt-4 text-3xl font-black">Comparison not found</h1>
          <p className="mt-3 text-navy/70">This contest does not exist in the static prototype.</p>
          <Link to="/contests">
            <Button className="mt-5">Back to contests</Button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to={`/contests/${contest.id}`}>
        <ArrowLeft size={16} /> Back to contest
      </Link>
      <section className="mock-surface rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Pill tone="green">Comparison board</Pill>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">{contestTitle(contest)}</h1>
            <p className="mt-3 max-w-3xl text-navy/70">{contestBrief(contest)}</p>
          </div>
          <div className="grid size-14 place-items-center rounded-md bg-mint text-contestGreen">
            <Columns3 size={28} />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-navy/10 bg-white p-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-contestGreen">Client shortlist</p>
            <p className="mt-1 text-sm font-semibold text-navy/60">{shortlist.length} entries marked for final review in this session.</p>
          </div>
          <Link to={`/contests/${contest.id}/winner-review/${shortlist[0] ?? contestEntries[0]?.id}`}>
            <Button disabled={shortlist.length === 0}>Review top shortlist</Button>
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {contestEntries.map((entry) => (
            <article key={entry.id} className="mock-surface rounded-lg p-4">
              <div className={`h-44 rounded-md bg-gradient-to-br ${entry.gradient} p-3`}>
                <img className="h-full w-full rounded-md object-cover opacity-85 mix-blend-multiply" src={contest.thumbnail} alt="" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {entry.winner && <Pill tone="emerald">Winner</Pill>}
                {entry.finalist && <Pill tone="amber">Finalist</Pill>}
              </div>
              <h2 className="mt-3 text-xl font-black">{entry.title}</h2>
              <p className="text-sm font-semibold text-navy/55">{entry.creator}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-md bg-neutralPanel p-3">
                  <p className="text-xs font-bold text-navy/50">Score</p>
                  <p className="text-2xl font-black text-orange">{entry.score}</p>
                </div>
                <div className="rounded-md bg-neutralPanel p-3">
                  <p className="text-xs font-bold text-navy/50">Rating</p>
                  <div className="mt-2">
                    <RatingStars rating={entry.rating} />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-navy/70">{entry.summary}</p>
              <div className="mt-4 grid gap-2">
                {entry.reviewCriteria.map((item) => (
                  <div key={item} className="flex gap-2 rounded-md bg-neutralPanel p-2 text-xs font-semibold text-navy/70">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-navy/10 pt-4 text-sm font-semibold text-navy/60">
                <span className="inline-flex items-center gap-1">
                  <MessageSquare size={15} /> {entry.comments}
                </span>
                <Link className="text-orange hover:text-navy" to={`/contests/${contest.id}/entries/${entry.id}`}>
                  View detail
                </Link>
              </div>
              <Button
                className="mt-4 w-full"
                variant={shortlist.includes(entry.id) ? 'secondary' : 'ghost'}
                onClick={() =>
                  setShortlist((current) =>
                    current.includes(entry.id) ? current.filter((id) => id !== entry.id) : [...current, entry.id],
                  )
                }
              >
                {shortlist.includes(entry.id) ? 'Shortlisted' : 'Add to shortlist'}
              </Button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
