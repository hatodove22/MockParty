import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileImage, Pencil, ShieldCheck, Star } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { entries } from '../data/entries';
import { contests } from '../data/contests';
import { creatorSlug } from '../utils/creatorSlug';

export function CreatorProfilePage() {
  const { creatorSlug: slug } = useParams();
  const creatorEntries = entries.filter((entry) => creatorSlug(entry.creator) === slug);
  const creator = creatorEntries[0]?.creator;
  const averageScore = creatorEntries.length
    ? Math.round(creatorEntries.reduce((total, entry) => total + entry.score, 0) / creatorEntries.length)
    : 0;

  if (!creator) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6">
          <Pill tone="rose">Not found</Pill>
          <h1 className="mt-4 text-3xl font-black">Creator not found</h1>
          <Link to="/creators">
            <Button className="mt-5">Back to creators</Button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to="/creators">
        <ArrowLeft size={16} /> Back to creators
      </Link>
      <section className="mock-surface rounded-lg p-5">
        <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="grid size-20 place-items-center rounded-full bg-navy text-2xl font-black text-white">{creator.slice(0, 2)}</div>
          <div>
            <Pill tone="green">Verified mock creator</Pill>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">{creator}</h1>
            <p className="mt-2 text-navy/65">Prototype-focused UX proposals with declared AI and asset usage.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-neutralPanel px-3 py-2 text-sm font-bold text-navy/65">
                <ShieldCheck size={16} className="text-contestGreen" /> AI disclosure verified
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-neutralPanel px-3 py-2 text-sm font-bold text-navy/65">
                <FileImage size={16} className="text-orange" /> Portfolio media ready
              </span>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-lg bg-neutralPanel p-4 text-center">
              <p className="text-xs font-bold text-navy/50">Avg. score</p>
              <p className="mt-1 text-3xl font-black text-orange">{averageScore}</p>
            </div>
            <button className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60">
              <Pencil size={16} /> Edit mock profile
            </button>
          </div>
        </div>
      </section>
      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="mock-surface rounded-lg p-5">
          <p className="text-sm font-black uppercase tracking-wide text-contestGreen">Portfolio setup</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {['Dashboard mockups', 'Mobile flow samples', 'Review annotations'].map((item, index) => (
              <div key={item} className={`min-h-32 rounded-md bg-gradient-to-br ${index === 0 ? 'from-orange-200 to-rose-200' : index === 1 ? 'from-mint to-cyan-100' : 'from-amber-100 to-orange-200'} p-3`}>
                <div className="h-full rounded-md border border-white/70 bg-white/55 p-3">
                  <div className="h-3 w-20 rounded bg-navy/20" />
                  <div className="mt-4 grid gap-2">
                    <div className="h-8 rounded bg-white/70" />
                    <div className="h-8 rounded bg-navy/10" />
                  </div>
                </div>
                <p className="mt-2 text-sm font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="mock-surface rounded-lg p-5">
          <p className="text-sm font-black uppercase tracking-wide text-contestGreen">Account readiness</p>
          <div className="mt-4 grid gap-2">
            {['Public profile complete', 'Synthetic portfolio samples attached', 'Rights handoff checklist acknowledged'].map((item) => (
              <div key={item} className="flex gap-2 rounded-md bg-neutralPanel p-3 text-sm font-bold text-navy/70">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
              </div>
            ))}
          </div>
        </aside>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ['Entries', String(creatorEntries.length)],
          ['Finalists', String(creatorEntries.filter((entry) => entry.finalist).length)],
          ['Winner', String(creatorEntries.filter((entry) => entry.winner).length)],
        ].map(([label, value]) => (
          <article key={label} className="mock-surface rounded-lg p-4">
            <p className="text-sm font-bold text-navy/50">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </article>
        ))}
      </section>
      <section className="mt-6 grid gap-4">
        {creatorEntries.map((entry) => {
          const contest = contests.find((item) => item.id === entry.contestId);
          return (
            <article key={entry.id} className="mock-surface grid gap-4 rounded-lg p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
              {contest && <img className="h-24 w-full rounded-md object-cover md:w-28" src={contest.thumbnail} alt="" />}
              <div>
                <div className="flex flex-wrap gap-2">
                  {entry.winner && <Pill tone="emerald">Winner</Pill>}
                  {entry.finalist && <Pill tone="amber">Finalist</Pill>}
                </div>
                <h2 className="mt-2 text-xl font-black">{entry.title}</h2>
                <p className="mt-1 text-sm text-navy/60">{contest?.title}</p>
                <p className="mt-2 text-sm leading-6 text-navy/70">{entry.summary}</p>
              </div>
              <div className="grid gap-2">
                <span className="inline-flex items-center justify-center gap-1 rounded-md bg-neutralPanel px-3 py-2 font-black text-orange">
                  <Star size={16} /> {entry.score}
                </span>
                <Link to={`/contests/${entry.contestId}/entries/${entry.id}`}>
                  <Button variant="ghost">View entry</Button>
                </Link>
              </div>
            </article>
          );
        })}
      </section>
      <section className="mt-6 rounded-lg bg-mint p-5">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-1 shrink-0 text-contestGreen" />
          <p className="font-semibold text-navy/70">
            This profile is static mock data. It demonstrates how a real marketplace could expose creator reliability, shortlist history, and prototype-only disclosures.
          </p>
        </div>
      </section>
    </main>
  );
}
