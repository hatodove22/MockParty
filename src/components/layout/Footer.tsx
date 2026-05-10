import { CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-navy/70 md:grid-cols-[1fr_auto] lg:px-6">
        <div>
          <p className="font-black text-navy">MockContest</p>
          <p className="mt-2 max-w-2xl">
            UX mock comparison prototype for pre-development review. Production development, maintenance, and commercial release guarantees are outside this prototype.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-semibold">
          <span>Ethical responsibility</span>
          <span>Real data prohibited</span>
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <CheckCircle2 size={16} /> Self-tests passed
          </span>
        </div>
      </div>
    </footer>
  );
}
