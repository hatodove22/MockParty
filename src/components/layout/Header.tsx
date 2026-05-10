import { Link, NavLink } from 'react-router-dom';
import { Languages, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../common/Button';

export function Header() {
  const { t, toggleLanguage } = useLanguage();
  const navItems = [
    [t('browseContests'), '/contests'],
    [t('creators'), '/creators'],
    [t('activeExample'), '/contests/1'],
    [t('safety'), '/safety'],
    [t('openContest'), '/contests/new'],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-warm/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-contestGreen text-white">
            <Sparkles size={19} />
          </span>
          <span>
            <span className="block text-base font-black leading-tight">MockContest</span>
            <span className="block text-xs font-semibold text-navy/55">{t('brandTagline')}</span>
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
        <div className="hidden gap-2 lg:flex">
          <Button variant="ghost" onClick={toggleLanguage}>
            <Languages size={16} /> {t('language')}
          </Button>
          <Link to="/creators">
            <Button variant="ghost">{t('creatorRegistration')}</Button>
          </Link>
          <Link to="/contests/new">
            <Button>{t('openContest')}</Button>
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl justify-end px-4 pb-3 lg:hidden">
        <Button variant="ghost" onClick={toggleLanguage}>
          <Languages size={16} /> {t('language')}
        </Button>
      </div>
    </header>
  );
}
