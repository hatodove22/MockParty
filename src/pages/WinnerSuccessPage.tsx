import { ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Pill } from '../components/common/Pill';
import { contests } from '../data/contests';
import { entries } from '../data/entries';

export function WinnerSuccessPage() {
  const { contestId, entryId } = useParams();
  const contest = contests.find((item) => item.id === Number(contestId));
  const entry = entries.find((item) => item.id === Number(entryId) && item.contestId === Number(contestId));

  if (!contest || !entry) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6">
          <Pill tone="rose">Not found</Pill>
          <h1 className="mt-4 text-3xl font-black">Winner confirmation not found</h1>
          <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
            Back to contests
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <section className="mock-surface rounded-lg p-6 text-center">
        <ShieldCheck className="mx-auto text-emerald-700" size={44} />
        <Pill tone="emerald">Winner reviewed</Pill>
        <h1 className="mt-4 text-3xl font-black">Responsibility review complete</h1>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/70">
          {entry.title} is ready for the next consultation step for {contest.title}. This prototype does not persist the selection.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90" to={`/contests/${contest.id}/entries/${entry.id}`}>
            View entry
          </Link>
          <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}`}>
            Back to contest
          </Link>
        </div>
      </section>
    </main>
  );
}
