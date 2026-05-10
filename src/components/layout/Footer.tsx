import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="border-t border-navy/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-navy/70 md:grid-cols-[1fr_auto] lg:px-6">
        <div>
          <p className="font-black text-navy">MockContest</p>
          <p className="mt-2 max-w-2xl">{t('footerCopy')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-semibold">
          <Link className="hover:text-orange" to="/safety">
            {t('ethicalResponsibility')}
          </Link>
          <Link className="hover:text-orange" to="/safety">
            {t('realDataProhibited')}
          </Link>
          <Link className="hover:text-orange" to="/terms">
            {language === 'ja' ? '利用規約' : 'Terms'}
          </Link>
          <Link className="hover:text-orange" to="/privacy">
            {language === 'ja' ? 'プライバシー' : 'Privacy'}
          </Link>
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <CheckCircle2 size={16} /> {t('selfTestsPassed')}
          </span>
        </div>
      </div>
    </footer>
  );
}
