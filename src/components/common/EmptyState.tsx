import type { ReactNode } from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function EmptyState({ title, description, actions }: EmptyStateProps) {
  return (
    <section className="mock-surface rounded-lg p-6 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-md bg-orange/10 text-orange">
        <SearchX size={22} />
      </div>
      <h2 className="mt-4 text-2xl font-black">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-navy/65">{description}</p>
      {actions && <div className="mt-5 flex flex-wrap justify-center gap-3">{actions}</div>}
    </section>
  );
}
