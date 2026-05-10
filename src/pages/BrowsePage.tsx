import { useMemo, useState } from 'react';
import type { Category } from '../types';
import { contests } from '../data/contests';
import { CategoryRail } from '../components/contest/CategoryRail';
import { ContestCard } from '../components/contest/ContestCard';

export function BrowsePage() {
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [query, setQuery] = useState('');
  const [guaranteed, setGuaranteed] = useState(false);

  const filtered = useMemo(
    () =>
      contests.filter((contest) => {
        const categoryMatch = category === 'All' || contest.category === category;
        const queryMatch = `${contest.title} ${contest.brief} ${contest.client}`.toLowerCase().includes(query.toLowerCase());
        const guaranteeMatch = !guaranteed || contest.guaranteed;
        return categoryMatch && queryMatch && guaranteeMatch;
      }),
    [category, guaranteed, query],
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black md:text-5xl">Browse contests</h1>
          <p className="mt-3 max-w-2xl text-navy/65">Find UX mock contests by category, prize, deadline, and responsibility boundary.</p>
        </div>
        <label className="flex min-w-72 flex-col gap-2 text-sm font-bold">
          Search
          <input
            className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2"
            placeholder="Search contests"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="mb-5 grid gap-3">
        <CategoryRail selected={category} onSelect={setCategory} />
        <label className="inline-flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" checked={guaranteed} onChange={(event) => setGuaranteed(event.target.checked)} />
          Guaranteed only
        </label>
      </div>
      <div className="grid gap-4">
        {filtered.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
    </main>
  );
}
