import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { contests } from '../data/contests';

const safetyChecks = [
  'No real customer data, private keys, or credentials are included.',
  'AI-generated assets and tools are disclosed in the submission.',
  'This is a UX mock or prototype, not a production guarantee.',
];

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function NotFoundPanel() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
      <section className="mock-surface rounded-lg p-6">
        <Pill tone="rose">Not found</Pill>
        <h1 className="mt-4 text-3xl font-black">Contest not found</h1>
        <p className="mt-3 text-navy/70">This static prototype could not find a contest for that ID.</p>
        <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
          Back to contests
        </Link>
      </section>
    </main>
  );
}

export function SubmitEntryPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const contest = contests.find((item) => item.id === Number(contestId));
  const [title, setTitle] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [aiTools, setAiTools] = useState('');
  const [summary, setSummary] = useState('');
  const [checked, setChecked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!contest) {
    return <NotFoundPanel />;
  }
  const contestIdValue = contest.id;
  const acceptsSubmissions = contest.status === 'Open';

  function toggleCheck(item: string) {
    setChecked((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!acceptsSubmissions) return;
    const nextErrors: Record<string, string> = {};

    if (!title.trim()) nextErrors.title = 'Title is required.';
    if (!demoUrl.trim()) nextErrors.demoUrl = 'Demo URL is required.';
    else if (!isValidUrl(demoUrl)) nextErrors.demoUrl = 'Enter a valid http or https URL.';
    if (!aiTools.trim()) nextErrors.aiTools = 'AI tools disclosure is required.';
    if (!summary.trim()) nextErrors.summary = 'Summary is required.';
    if (checked.length !== safetyChecks.length) nextErrors.safety = 'Complete every safety acknowledgement.';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      navigate(`/contests/${contestIdValue}/submit/success`);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to={`/contests/${contest.id}`}>
        <ArrowLeft size={16} /> Back to contest
      </Link>

      <section className="mock-surface rounded-lg p-5">
        <div className="flex flex-wrap gap-2">
          <Pill tone="navy">{contest.category}</Pill>
          <Pill>{contest.status}</Pill>
        </div>
        <h1 className="mt-4 text-3xl font-black md:text-5xl">Submit proposal</h1>
        <p className="mt-3 max-w-3xl text-navy/70">{contest.title}</p>

        {!acceptsSubmissions && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
            <Pill tone="amber">Submissions closed</Pill>
            <h2 className="mt-3 text-2xl font-black">
              {contest.status === 'Completed' ? 'This contest has already selected a winner.' : 'This contest is in finalist review.'}
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-navy/65">
              New entries are locked in this prototype so the lifecycle matches a real design-contest marketplace. You can still inspect entries, compare finalists, or view the archive when available.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to={`/contests/${contest.id}`}>
                Back to contest
              </Link>
              <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}/compare`}>
                Compare entries
              </Link>
            </div>
          </div>
        )}

        <form className={`mt-6 grid gap-5 ${acceptsSubmissions ? '' : 'pointer-events-none opacity-45'}`} onSubmit={handleSubmit} noValidate aria-disabled={!acceptsSubmissions}>
          <label className="grid gap-2 text-sm font-bold">
            Entry title
            <input className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2 font-medium" value={title} onChange={(event) => setTitle(event.target.value)} />
            {errors.title && <span className="text-xs text-rose-700">{errors.title}</span>}
          </label>

          <label className="grid gap-2 text-sm font-bold">
            Demo URL
            <input className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2 font-medium" placeholder="https://example.com/prototype" value={demoUrl} onChange={(event) => setDemoUrl(event.target.value)} />
            {errors.demoUrl && <span className="text-xs text-rose-700">{errors.demoUrl}</span>}
          </label>

          <label className="grid gap-2 text-sm font-bold">
            AI tools used
            <input className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2 font-medium" placeholder="Figma AI, ChatGPT, image generation, none, etc." value={aiTools} onChange={(event) => setAiTools(event.target.value)} />
            {errors.aiTools && <span className="text-xs text-rose-700">{errors.aiTools}</span>}
          </label>

          <label className="grid gap-2 text-sm font-bold">
            Summary
            <textarea className="focus-ring min-h-32 rounded-md border border-navy/15 bg-white px-3 py-2 font-medium" value={summary} onChange={(event) => setSummary(event.target.value)} />
            {errors.summary && <span className="text-xs text-rose-700">{errors.summary}</span>}
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-black">Safety checks</legend>
            {safetyChecks.map((item) => (
              <label key={item} className="flex items-start gap-3 rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                <input className="mt-1" type="checkbox" checked={checked.includes(item)} onChange={() => toggleCheck(item)} />
                <span>{item}</span>
              </label>
            ))}
            {errors.safety && <span className="text-xs font-bold text-rose-700">{errors.safety}</span>}
          </fieldset>

          <div className="flex flex-wrap justify-end gap-2 border-t border-navy/10 pt-5">
            <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}`}>
              Cancel
            </Link>
            <Button type="submit" disabled={!acceptsSubmissions}>
              <CheckCircle2 size={16} /> Submit entry
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
