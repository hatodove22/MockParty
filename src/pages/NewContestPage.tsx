import { useNavigate } from 'react-router-dom';
import { ContestWizard } from '../components/wizard/ContestWizard';
import { useLanguage } from '../i18n/LanguageContext';

export function NewContestPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <section className="mb-7 max-w-3xl">
        <h1 className="text-3xl font-black md:text-5xl">{t('openMockContest')}</h1>
        <p className="mt-4 text-lg leading-8 text-navy/70">{t('openMockContestCopy')}</p>
      </section>
      <ContestWizard embedded onComplete={() => navigate('/contests/new/success')} />
    </main>
  );
}
