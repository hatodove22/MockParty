import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { ContestWizard } from '../components/wizard/ContestWizard';
import { useLanguage } from '../i18n/LanguageContext';

const briefGuide = {
  en: {
    title: 'What a strong mock contest brief includes',
    items: ['One workflow to compare', 'Target users and device states', 'Examples of what must stay out of scope', 'Synthetic sample content only'],
  },
  ja: {
    title: '良いモックコンテスト依頼に含めるもの',
    items: ['比較したいワークフローを1つに絞る', '対象ユーザーとデバイス状態を示す', 'スコープ外にする内容を明記する', '合成サンプルだけを使う'],
  },
} as const;

export function NewContestPage() {
  const { language, t } = useLanguage();
  const guide = briefGuide[language];
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <section className="mb-7 max-w-3xl">
            <h1 className="text-3xl font-black md:text-5xl">{t('openMockContest')}</h1>
            <p className="mt-4 text-lg leading-8 text-navy/70">{t('openMockContestCopy')}</p>
          </section>
          <ContestWizard embedded onComplete={() => navigate('/contests/new/success')} />
        </div>
        <aside className="mock-surface h-fit rounded-lg p-5">
          <h2 className="text-2xl font-black">{guide.title}</h2>
          <div className="mt-5 grid gap-3">
            {guide.items.map((item) => (
              <div key={item} className="flex gap-2 rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
