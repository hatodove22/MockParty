import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { packages } from '../data/packages';
import { useLanguage } from '../i18n/LanguageContext';

const copy = {
  en: {
    title: 'Pricing for UX mock contests',
    copy: 'Packages are shown before contest creation so clients and creators understand expected volume, review time, and prototype-only boundaries.',
    faqTitle: 'What the price does not include',
    faq: ['Production development', 'Maintenance or security guarantee', 'Commercial release acceptance testing', 'Handling real customer data'],
    start: 'Start with this package',
    perPackage: 'Package scope',
  },
  ja: {
    title: 'UXモックコンテストの料金',
    copy: '作成前にパッケージを確認できるため、想定応募数、レビュー期間、プロトタイプ限定の責任範囲を揃えられます。',
    faqTitle: '料金に含まれないもの',
    faq: ['本番開発', '保守やセキュリティ保証', '商用リリースの受入テスト', '実顧客データの取り扱い'],
    start: 'このパッケージで開始',
    perPackage: 'パッケージ範囲',
  },
} as const;
const packageCopy = {
  en: {
    Starter: { name: 'Starter', entries: '3-5 entries', days: '5 days', description: 'Best for a quick direction check before deeper design work.', features: ['Public brief', 'Basic comparison', 'Creator notes'] },
    Standard: { name: 'Standard', entries: '5-8 entries', days: '7 days', description: 'Recommended for serious UX exploration with clearer feedback.', features: ['Guaranteed prize', 'Feedback cards', 'Finalist shortlist'] },
    Premium: { name: 'Premium', entries: '8-12 entries', days: '10 days', description: 'For complex flows and multiple screen-state comparisons.', features: ['Featured listing', 'Private option', 'Review summary'] },
    recommended: 'Recommended',
  },
  ja: {
    Starter: { name: 'スターター', entries: '3-5件の応募', days: '5日間', description: '深いデザイン作業の前に、方向性を素早く確認するためのプランです。', features: ['公開ブリーフ', '基本比較', 'クリエイターノート'] },
    Standard: { name: 'スタンダード', entries: '5-8件の応募', days: '7日間', description: 'より明確なフィードバックを含む、本格的なUX探索に向いた推奨プランです。', features: ['賞金保証', 'フィードバックカード', 'ファイナリスト候補'] },
    Premium: { name: 'プレミアム', entries: '8-12件の応募', days: '10日間', description: '複雑なフローや複数の画面状態を比較するためのプランです。', features: ['注目掲載', '非公開オプション', 'レビュー要約'] },
    recommended: 'おすすめ',
  },
} as const;

export function PricingPage() {
  const { language } = useLanguage();
  const text = copy[language];
  const packageText = packageCopy[language];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <section className="max-w-3xl">
        <Pill tone="green">Packages</Pill>
        <h1 className="mt-4 text-3xl font-black md:text-5xl">{text.title}</h1>
        <p className="mt-4 text-lg leading-8 text-navy/70">{text.copy}</p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {packages.map((pack) => (
          <article key={pack.name} className={`rounded-lg border bg-white p-5 ${pack.recommended ? 'border-contestGreen shadow-soft' : 'border-navy/10'}`}>
            {pack.recommended && <Pill tone="green">{packageText.recommended}</Pill>}
            <p className="text-xs font-black uppercase tracking-wide text-navy/45">{text.perPackage}</p>
            <h2 className="mt-3 text-2xl font-black">{packageText[pack.name].name}</h2>
            <p className="mt-2 text-4xl font-black">{pack.price}</p>
            <p className="mt-1 text-sm font-bold text-navy/55">
              {packageText[pack.name].entries} / {packageText[pack.name].days}
            </p>
            <p className="mt-4 leading-7 text-navy/65">{packageText[pack.name].description}</p>
            <ul className="mt-5 grid gap-2">
              {packageText[pack.name].features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm font-semibold text-navy/70">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {feature}
                </li>
              ))}
            </ul>
            <Link className="mt-5 inline-flex" to="/contests/new">
              <Button>
                {text.start} <ArrowRight size={16} />
              </Button>
            </Link>
          </article>
        ))}
      </section>
      <section className="mt-8 rounded-lg bg-navy p-5 text-white">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-mint" size={24} />
          <h2 className="text-2xl font-black">{text.faqTitle}</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {text.faq.map((item) => (
            <div key={item} className="rounded-md bg-white/10 p-3 text-sm font-semibold text-white/75">
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
