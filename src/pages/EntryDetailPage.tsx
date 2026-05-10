import { ArrowLeft, CheckCircle2, MessageSquare, MousePointerClick } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { RatingStars } from '../components/common/RatingStars';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { creatorSlug } from '../utils/creatorSlug';

function NotFoundPanel() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
      <section className="mock-surface rounded-lg p-6">
        <Pill tone="rose">Not found</Pill>
        <h1 className="mt-4 text-3xl font-black">Entry not found</h1>
        <p className="mt-3 text-navy/70">The contest or entry ID does not match an available static prototype entry.</p>
        <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
          Back to contests
        </Link>
      </section>
    </main>
  );
}

export function EntryDetailPage() {
  const { contestId, entryId } = useParams();
  const contest = contests.find((item) => item.id === Number(contestId));
  const entry = entries.find((item) => item.id === Number(entryId) && item.contestId === Number(contestId));

  if (!contest || !entry) {
    return <NotFoundPanel />;
  }

  const criteria = entry.reviewCriteria?.length ? entry.reviewCriteria : entry.tags;
  const discussion = entry.discussion?.length
    ? entry.discussion
    : [`${entry.comments} review comments are available in this static summary.`, `${entry.views} client views recorded for comparison.`];
  const submitted = entry.submittedAt ? new Date(entry.submittedAt).toLocaleDateString() : 'Recently submitted';

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to={`/contests/${contest.id}`}>
        <ArrowLeft size={16} /> Back to contest
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <article className="mock-surface rounded-lg p-5">
          <div className="flex flex-wrap gap-2">
            <Pill tone="navy">{contest.category}</Pill>
            {entry.winner && <Pill tone="emerald">Winner</Pill>}
            {entry.finalist && <Pill tone="amber">Finalist</Pill>}
          </div>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">{entry.title}</h1>
          <Link className="mt-2 inline-flex font-semibold text-navy/55 hover:text-orange" to={`/creators/${creatorSlug(entry.creator)}`}>
            by {entry.creator}
          </Link>

          <div className={`mt-6 h-72 rounded-lg bg-gradient-to-br ${entry.gradient} p-4`}>
            <div className="grid h-full gap-4 rounded-md border border-white/80 bg-white/50 p-4 md:grid-cols-[1fr_180px]">
              <div className="rounded-md bg-white/75 p-4">
                <div className="h-4 w-32 rounded bg-navy/20" />
                <div className="mt-5 grid gap-3">
                  <div className="h-16 rounded bg-navy/10" />
                  <div className="h-16 rounded bg-orange/20" />
                  <div className="h-16 rounded bg-white" />
                </div>
              </div>
              <div className="grid gap-3">
                <div className="rounded bg-white/80" />
                <div className="rounded bg-navy/15" />
                <div className="rounded bg-orange/30" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-md bg-neutralPanel p-4">
              <p className="text-xs font-bold text-navy/50">Score</p>
              <p className="mt-1 text-2xl font-black text-orange">{entry.score}</p>
            </div>
            <div className="rounded-md bg-neutralPanel p-4">
              <p className="text-xs font-bold text-navy/50">Rating</p>
              <div className="mt-2">
                <RatingStars rating={entry.rating} />
              </div>
            </div>
            <div className="rounded-md bg-neutralPanel p-4">
              <p className="text-xs font-bold text-navy/50">Submitted</p>
              <p className="mt-1 font-black">{submitted}</p>
            </div>
          </div>

          <section className="mt-6">
            <h2 className="text-xl font-black">Review summary</h2>
            <p className="mt-3 leading-7 text-navy/70">{entry.summary || entry.review}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-black">Review criteria</h2>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {criteria.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                  <CheckCircle2 size={16} className="text-emerald-700" /> {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-black">Discussion</h2>
            <div className="mt-3 grid gap-3">
              {discussion.map((item) => (
                <p key={item} className="rounded-md border border-navy/10 bg-white p-3 text-sm leading-6 text-navy/70">
                  {item}
                </p>
              ))}
            </div>
          </section>
        </article>

        <aside className="mock-surface h-fit rounded-lg p-5">
          <h2 className="text-xl font-black">Entry actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold text-navy/65">
            <span className="inline-flex items-center gap-1">
              <MessageSquare size={16} /> {entry.comments} comments
            </span>
            <span>{entry.views} views</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
          <div className="mt-6 grid gap-2">
            <Link className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90" to={`/contests/${contest.id}/winner-review/${entry.id}`}>
              <MousePointerClick size={16} /> Review as winner
            </Link>
            <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}`}>
              Back to entries
            </Link>
          </div>
          <div className="mt-6 rounded-md bg-neutralPanel p-4 text-sm leading-6 text-navy/70">
            This static detail view summarizes prototype comparison signals only. Production build scope, acceptance, security, and support remain separate agreements.
          </div>
        </aside>
      </section>
    </main>
  );
}
