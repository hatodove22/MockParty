import { AlertTriangle, CheckCircle2, Flag, ShieldCheck } from 'lucide-react';
import { responsibilitySections, safetyNotice } from '../data/responsibility';
import { useLanguage } from '../i18n/LanguageContext';

const safetyCopy = {
  en: {
    title: 'Safety and responsibility',
    subtitle: safetyNotice,
    reportTitle: 'Report and moderation flow',
    reportSteps: [
      ['Flag the concern', 'Clients or creators mark confidential data, misleading claims, unsafe scope, or rights issues.'],
      ['Freeze the risky item', 'The prototype flow treats the affected entry as review-only until the concern is resolved.'],
      ['Document the handoff', 'Any production work, licensing, or maintenance discussion moves outside the contest prototype.'],
    ],
    checklistTitle: 'Before a brief or entry goes live',
    checklist: ['Synthetic data only', 'No API keys or credentials', 'AI and outside assets disclosed', 'Prototype scope is explicit'],
  },
  ja: {
    title: '安全と責任',
    subtitle: '本番開発、保守、商用リリース、セキュリティ保証は当事者間で別途契約します。MockContestはUXモック比較とプロトタイプ審査に限定されます。',
    reportTitle: '通報とモデレーションの流れ',
    reportSteps: [
      ['懸念点を報告', '機密データ、誤解を招く表現、危険なスコープ、権利問題を報告できます。'],
      ['リスク項目を保留', '対象の応募は、解決までレビュー専用として扱います。'],
      ['ハンドオフを記録', '本番制作、ライセンス、保守の相談はコンペ外の別契約へ移します。'],
    ],
    checklistTitle: '依頼や応募を公開する前に',
    checklist: ['合成データのみ', 'APIキーや認証情報なし', 'AIと外部素材を開示', 'プロトタイプ範囲を明記'],
  },
} as const;

export function SafetyPage() {
  const { language } = useLanguage();
  const text = safetyCopy[language];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <section className="max-w-3xl">
        <h1 className="text-3xl font-black md:text-5xl">{text.title}</h1>
        <p className="mt-4 text-lg leading-8 text-navy/70">{text.subtitle}</p>
      </section>
      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="mock-surface rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-md bg-contestGreen text-white">
              <Flag size={21} />
            </div>
            <h2 className="text-2xl font-black">{text.reportTitle}</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {text.reportSteps.map(([title, description], index) => (
              <article key={title} className="flex gap-3 rounded-md bg-neutralPanel p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-sm font-black text-contestGreen">{index + 1}</span>
                <div>
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-navy/65">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="rounded-lg bg-navy p-5 text-white">
          <ShieldCheck size={28} className="text-mint" />
          <h2 className="mt-4 text-2xl font-black">{text.checklistTitle}</h2>
          <div className="mt-5 grid gap-2">
            {text.checklist.map((item) => (
              <div key={item} className="flex gap-2 rounded-md bg-white/10 p-3 text-sm font-semibold text-white/75">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-mint" /> {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-2 rounded-md bg-amber-400/10 p-3 text-sm font-semibold text-amber-100">
            <AlertTriangle size={18} className="shrink-0" />
            <p>MockContest never represents a contest result as production-ready software.</p>
          </div>
        </aside>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {responsibilitySections.map((section) => (
          <article key={section.title} className="mock-surface rounded-lg p-5">
            <h2 className="text-xl font-black">{section.title}</h2>
            <ul className="mt-4 grid gap-2">
              {section.items.map((item) => (
                <li key={item} className="rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
