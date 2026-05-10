import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Trophy, Users } from 'lucide-react';
import { contests } from '../data/contests';
import { Button } from '../components/common/Button';
import { ContestCard } from '../components/contest/ContestCard';
import { Metric } from '../components/contest/Metric';
import { Pill } from '../components/common/Pill';

export function HomePage({ onOpenWizard }: { onOpenWizard: () => void }) {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-6 lg:py-16">
        <div>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Collect UX mockups and choose the clearest direction.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-navy/70">
            MockContest lets teams gather AI-assisted UX concepts for SaaS, business apps, landing pages, and AI tools before contracting production development.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button onClick={onOpenWizard}>
              Open a contest <ArrowRight size={17} />
            </Button>
            <Link to="/contests">
              <Button variant="ghost">Browse open contests</Button>
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <Pill tone="navy">Marketplace-style contest flow</Pill>
            <Pill tone="emerald">Prototype review only</Pill>
            <Pill tone="amber">No production guarantee</Pill>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Metric label="Standard prize" value="$1.4k" icon={<Trophy size={18} />} />
            <Metric label="Expected entries" value="5-8" icon={<Users size={18} />} />
            <Metric label="Production guarantee" value="0" icon={<ShieldCheck size={18} />} />
          </div>
        </div>
        <div className="mock-surface rounded-lg p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black">Live contest preview</h2>
              <p className="text-sm text-navy/60">Prize pool, submissions, and safety tags stay visible.</p>
            </div>
            <Pill tone="orange">Featured</Pill>
          </div>
          <div className="space-y-3">
            {contests.slice(0, 3).map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
