import { FormEvent, useState } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { RatingStars } from '../components/common/RatingStars';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { safetyNotice } from '../data/responsibility';

const acknowledgements = [
  'I understand this selects a UX mock for comparison and consultation, not a production build contract.',
  'Development scope, licensing, acceptance testing, and maintenance will be agreed separately by the parties.',
  'No confidential data, credentials, or regulated production data will be shared through this prototype flow.',
];

function NotFoundPanel() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
      <section className="mock-surface rounded-lg p-6">
        <Pill tone="rose">Not found</Pill>
        <h1 className="mt-4 text-3xl font-black">Winner review not found</h1>
        <p className="mt-3 text-navy/70">The contest and entry IDs must both match an available static entry.</p>
        <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
          Back to contests
        </Link>
      </section>
    </main>
  );
}

export function WinnerReviewPage() {
  const { contestId, entryId } = useParams();
  const navigate = useNavigate();
  const contest = contests.find((item) => item.id === Number(contestId));
  const entry = entries.find((item) => item.id === Number(entryId) && item.contestId === Number(contestId));
  const [checked, setChecked] = useState<string[]>([]);
  const [error, setError] = useState('');

  if (!contest || !entry) {
    return <NotFoundPanel />;
  }
  const contestIdValue = contest.id;
  const entryIdValue = entry.id;

  function toggleCheck(item: string) {
    setChecked((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (checked.length !== acknowledgements.length) {
      setError('Confirm every responsibility acknowledgement before continuing.');
      return;
    }
    navigate(`/contests/${contestIdValue}/winner-review/${entryIdValue}/success`);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to={`/contests/${contest.id}`}>
        <ArrowLeft size={16} /> Back to contest
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <form className="mock-surface rounded-lg p-5" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-2">
            <Pill tone="navy">{contest.category}</Pill>
            {entry.winner && <Pill tone="emerald">Current winner</Pill>}
            {entry.finalist && <Pill tone="amber">Finalist</Pill>}
          </div>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">Winner review</h1>
          <p className="mt-3 max-w-3xl text-navy/70">Confirm responsibility boundaries before selecting {entry.title} for {contest.title}.</p>

          <article className="mt-6 rounded-lg border border-navy/10 bg-white p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black">{entry.title}</h2>
                <p className="text-sm font-semibold text-navy/55">{entry.creator}</p>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-neutralPanel p-3">
                <RatingStars rating={entry.rating} />
                <span className="text-2xl font-black text-orange">{entry.score}</span>
              </div>
            </div>
            <p className="mt-4 leading-7 text-navy/70">{entry.summary || entry.review}</p>
          </article>

          <fieldset className="mt-6 grid gap-3">
            <legend className="text-sm font-black">Responsibility acknowledgements</legend>
            {acknowledgements.map((item) => (
              <label key={item} className="flex items-start gap-3 rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                <input className="mt-1" type="checkbox" checked={checked.includes(item)} onChange={() => toggleCheck(item)} />
                <span>{item}</span>
              </label>
            ))}
            {error && <span className="text-xs font-bold text-rose-700">{error}</span>}
          </fieldset>

          <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-navy/10 pt-5">
            <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}/entries/${entry.id}`}>
              View entry detail
            </Link>
            <Button type="submit">
              <ShieldCheck size={16} /> Confirm winner review
            </Button>
          </div>
        </form>

        <aside className="mock-surface h-fit rounded-lg p-5">
          <h2 className="text-xl font-black">Boundary notice</h2>
          <p className="mt-3 leading-7 text-navy/70">{safetyNotice}</p>
          <div className="mt-5 grid gap-2">
            {contest.deliverables.map((item) => (
              <div key={item} className="rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
