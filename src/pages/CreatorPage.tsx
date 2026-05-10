import { useMemo, useState } from 'react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';

const checks = [
  'No real data, API keys, or confidential information is included.',
  'AI tools and outside assets are declared.',
  'Use rights for selected entries are understood.',
  'The work is not presented as production-ready development.',
];

export function CreatorPage() {
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const ready = useMemo(() => checks.every((item) => accepted[item]), [accepted]);

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-6">
      <section>
        <h1 className="text-3xl font-black md:text-5xl">Submit fast AI-assisted UX proposals.</h1>
        <p className="mt-4 text-lg leading-8 text-navy/70">
          Join contests with clear prototype boundaries, show your mockup process, and build a track record through shortlisted entries.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Pill tone="emerald">Prototype only</Pill>
          <Pill tone="orange">AI disclosure required</Pill>
          <Pill tone="navy">Review-ready entries</Pill>
        </div>
      </section>
      <section className="mock-surface rounded-lg p-5">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-bold">
            Proposal title
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder="Flow-first Admin" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Demo URL
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder="https://example.com/mock" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            AI tools used
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder="Image model, UI generator, editor" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Proposal summary
            <textarea className="focus-ring min-h-28 rounded-md border border-navy/15 px-3 py-2" />
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
          </div>
          <Button disabled={!ready}>Submit mock proposal</Button>
        </div>
      </section>
    </main>
  );
}
