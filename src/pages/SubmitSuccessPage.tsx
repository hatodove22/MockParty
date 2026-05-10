import { CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Pill } from '../components/common/Pill';
import { contests } from '../data/contests';

export function SubmitSuccessPage() {
  const { contestId } = useParams();
  const contest = contests.find((item) => item.id === Number(contestId));

  if (!contest) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6">
          <Pill tone="rose">Not found</Pill>
          <h1 className="mt-4 text-3xl font-black">Contest not found</h1>
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
        <CheckCircle2 className="mx-auto text-emerald-700" size={44} />
        <Pill tone="emerald">Submitted</Pill>
        <h1 className="mt-4 text-3xl font-black">Proposal submitted</h1>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/70">
          Your static prototype submission for {contest.title} has passed the required form checks.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90" to={`/contests/${contest.id}`}>
            Back to contest
          </Link>
          <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to="/contests">
            Browse contests
          </Link>
        </div>
      </section>
    </main>
  );
}
