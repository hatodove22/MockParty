import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

interface StatusPanelProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function StatusPanel({ eyebrow, title, description, actions }: StatusPanelProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mock-surface rounded-lg p-6">
        <div className="grid size-12 place-items-center rounded-md bg-navy text-white">
          <Info size={22} />
        </div>
        {eyebrow && <p className="mt-5 text-sm font-black uppercase tracking-wide text-orange">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-3xl font-black md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-navy/70">{description}</p>
        {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
