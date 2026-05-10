import { Link, NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

const navItems = [
  ['Start contest', '/'],
  ['Browse contests', '/contests'],
  ['Active example', '/contests/1'],
  ['Safety', '/safety'],
];

export function Header({ onOpenWizard }: { onOpenWizard: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-warm/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-navy text-white">
            <Sparkles size={19} />
          </span>
          <span>
            <span className="block text-base font-black leading-tight">MockContest</span>
            <span className="block text-xs font-semibold text-navy/55">AI UX mock contests</span>
          </span>
        </Link>
        <nav className="flex flex-1 gap-1 overflow-x-auto text-sm font-semibold">
          {navItems.map(([label, to]) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-2 transition ${isActive ? 'bg-white text-orange shadow-sm' : 'text-navy/70 hover:bg-white/70'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden gap-2 md:flex">
          <Link to="/creators">
            <Button variant="ghost">Creator registration</Button>
          </Link>
          <Button onClick={onOpenWizard}>Open contest</Button>
        </div>
      </div>
    </header>
  );
}
