import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users } from 'lucide-react';
import type { Contest } from '../../types';
import { Pill } from '../common/Pill';

export function ContestCard({ contest }: { contest: Contest }) {
  return (
    <article className="mock-surface grid gap-4 rounded-lg p-4 transition hover:-translate-y-0.5 hover:shadow-soft md:grid-cols-[120px_1fr_auto]">
      <div className={`min-h-28 rounded-md bg-gradient-to-br ${contest.color} p-3 text-white`}>
        <div className="h-full rounded-md border border-white/40 bg-white/20 p-2">
          <div className="h-3 w-16 rounded bg-white/80" />
          <div className="mt-3 h-14 rounded bg-white/35" />
        </div>
      </div>
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <Pill tone="navy">{contest.category}</Pill>
          {contest.guaranteed && <Pill tone="emerald">Guaranteed</Pill>}
          {contest.private && <Pill tone="amber">Private</Pill>}
          {contest.featured && <Pill tone="orange">Featured</Pill>}
        </div>
        <h3 className="text-lg font-black">{contest.title}</h3>
        <p className="mt-2 text-sm leading-6 text-navy/65">{contest.brief}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-navy/65">
          <span className="inline-flex items-center gap-1">
            <Users size={16} /> {contest.creators} creators
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={16} /> {contest.daysLeft} days left
          </span>
          <span>{contest.entries} entries</span>
        </div>
      </div>
      <div className="flex min-w-32 flex-col justify-between gap-3 md:items-end">
        <span className="text-xl font-black">{contest.prize}</span>
        <Link className="focus-ring inline-flex items-center gap-2 rounded-md bg-navy px-3 py-2 text-sm font-bold text-white" to={`/contests/${contest.id}`}>
          View details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
