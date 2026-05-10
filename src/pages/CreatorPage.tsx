import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { useLanguage } from '../i18n/LanguageContext';

const checks = [
  'No real data, API keys, or confidential information is included.',
  'AI tools and outside assets are declared.',
  'Use rights for selected entries are understood.',
  'The work is not presented as production-ready development.',
];

function validDemoUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function CreatorPage() {
  const { t } = useLanguage();
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const [title, setTitle] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [aiTools, setAiTools] = useState('');
  const [summary, setSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ready = useMemo(() => checks.every((item) => accepted[item]), [accepted]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!title.trim()) nextErrors.title = 'Proposal title is required.';
    if (!demoUrl.trim()) nextErrors.demoUrl = 'Demo URL is required.';
    else if (!validDemoUrl(demoUrl)) nextErrors.demoUrl = 'Enter a valid http or https URL.';
    if (!aiTools.trim()) nextErrors.aiTools = 'AI tool disclosure is required.';
    if (!summary.trim()) nextErrors.summary = 'Proposal summary is required.';
    if (!ready) nextErrors.checks = 'Complete every responsibility check before submitting.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6 text-center">
          <CheckCircle2 className="mx-auto text-emerald-700" size={44} />
          <Pill tone="emerald">Review queue</Pill>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">{t('mockProposalSubmitted')}</h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/70">
            The static creator flow has moved this proposal into a review-ready state. No account, upload, or API request was created.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button onClick={() => setSubmitted(false)}>{t('submitAnother')}</Button>
            <Link to="/contests">
              <Button variant="ghost">{t('browseContests')}</Button>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-6">
      <section>
        <h1 className="text-3xl font-black md:text-5xl">{t('creatorPageTitle')}</h1>
        <p className="mt-4 text-lg leading-8 text-navy/70">{t('creatorPageCopy')}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Pill tone="emerald">Prototype only</Pill>
          <Pill tone="orange">AI disclosure required</Pill>
          <Pill tone="navy">Review-ready entries</Pill>
        </div>
      </section>
      <section className="mock-surface rounded-lg p-5">
        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-2 text-sm font-bold">
            Proposal title
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder="Flow-first Admin" value={title} onChange={(event) => setTitle(event.target.value)} />
            {errors.title && <span className="text-xs text-rose-700">{errors.title}</span>}
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Demo URL
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder="https://example.com/mock" value={demoUrl} onChange={(event) => setDemoUrl(event.target.value)} />
            {errors.demoUrl && <span className="text-xs text-rose-700">{errors.demoUrl}</span>}
          </label>
          <label className="grid gap-2 text-sm font-bold">
            AI tools used
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder="Image model, UI generator, editor" value={aiTools} onChange={(event) => setAiTools(event.target.value)} />
            {errors.aiTools && <span className="text-xs text-rose-700">{errors.aiTools}</span>}
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Proposal summary
            <textarea className="focus-ring min-h-28 rounded-md border border-navy/15 px-3 py-2" value={summary} onChange={(event) => setSummary(event.target.value)} />
            {errors.summary && <span className="text-xs text-rose-700">{errors.summary}</span>}
          </label>
          <div className="grid gap-2">
            {checks.map((item) => (
              <label key={item} className="flex items-start gap-3 rounded-md bg-neutralPanel p-3 text-sm font-semibold">
                <input
                  className="mt-1"
                  type="checkbox"
                  checked={Boolean(accepted[item])}
                  onChange={(event) => setAccepted((current) => ({ ...current, [item]: event.target.checked }))}
                />
                {item}
              </label>
            ))}
            {errors.checks && <span className="text-xs font-bold text-rose-700">{errors.checks}</span>}
          </div>
          <Button type="submit">{t('submitMockProposal')}</Button>
        </form>
      </section>
    </main>
  );
}
