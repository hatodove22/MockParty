import { Link } from 'react-router-dom';
import { CheckCircle2, ClipboardCheck, MessageSquareText, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react';
import { Button } from '../common/Button';
import { Pill } from '../common/Pill';
import { packages } from '../../data/packages';
import { useLanguage } from '../../i18n/LanguageContext';

const copy = {
  en: {
    howTitle: 'A contest flow built for early UX decisions',
    howCopy: 'MockContest makes a pre-production design contest feel concrete while keeping delivery risk explicit.',
    steps: [
      ['1', 'Post a focused brief', 'Choose a category, package, timeline, and prototype-only responsibility boundary.'],
      ['2', 'Review multiple directions', 'Compare mockups, finalist notes, ratings, and client feedback in one contest page.'],
      ['3', 'Select a direction safely', 'Confirm rights and development responsibility before moving into a separate production discussion.'],
    ],
    packagesTitle: 'Packages that set expectations up front',
    packagesCopy: 'Each package communicates expected entry volume, review window, and what the client should receive.',
    trustTitle: 'Trust signals for a mock marketplace',
    trustItems: [
      ['Guaranteed prize labels', 'Clients can see when a contest has committed prize money before creators submit.'],
      ['Prototype-only safety', 'Forms block production-development framing and require responsibility acknowledgements.'],
      ['No real data policy', 'Submissions are prompted to avoid credentials, customer data, regulated data, and API keys.'],
      ['Reviewable handoff', 'Winner review leads to consultation only, not a hidden production contract.'],
    ],
    ctaTitle: 'Ready to compare directions?',
    ctaCopy: 'Start with a concise brief and treat every result as a review artifact, not production code.',
    start: 'Start a contest',
    browse: 'Browse contests',
  },
  ja: {
    howTitle: '制作前のUX判断に特化したコンテストフロー',
    howCopy: 'MockContestは、本番制作前のデザインコンペを具体的に見せながら、責任範囲も明確にします。',
    steps: [
      ['1', '焦点を絞った依頼を投稿', 'カテゴリ、パッケージ、期間、プロトタイプ限定の責任範囲を設定します。'],
      ['2', '複数の方向性を比較', 'モック、ファイナリスト、評価、フィードバックをコンテストページで比較できます。'],
      ['3', '安全に方向性を選定', '権利と制作責任を確認してから、別途本番制作の相談へ進みます。'],
    ],
    packagesTitle: '期待値を先に揃えるパッケージ',
    packagesCopy: '各パッケージは、想定応募数、レビュー期間、受け取れる成果物を明確にします。',
    trustTitle: 'モックマーケットプレイスの信頼シグナル',
    trustItems: [
      ['賞金保証ラベル', 'クリエイターが応募する前に、賞金が確約されたコンペか確認できます。'],
      ['プロトタイプ限定の安全設計', '本番開発目的はブロックし、責任範囲の確認を必須にします。'],
      ['実データ禁止ポリシー', '認証情報、顧客データ、規制対象データ、APIキーの提出を避ける前提です。'],
      ['レビュー可能なハンドオフ', '受賞確認は相談導線であり、隠れた制作契約には進みません。'],
    ],
    ctaTitle: '方向性を比較しますか？',
    ctaCopy: '短い依頼から始め、すべての結果を本番コードではなくレビュー資料として扱います。',
    start: 'コンペを開始',
    browse: 'コンペを探す',
  },
} as const;

const icons = [ClipboardCheck, Users, Trophy];
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

export function MarketplaceSections() {
  const { language } = useLanguage();
  const text = copy[language];
  const packageText = packageCopy[language];

  return (
    <>
      <section className="border-y border-navy/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl">
            <Pill tone="green">Marketplace</Pill>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">{text.howTitle}</h2>
            <p className="mt-3 text-lg leading-8 text-navy/65">{text.howCopy}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {text.steps.map(([number, title, description], index) => {
              const Icon = icons[index];
              return (
                <article key={title} className="rounded-lg border border-navy/10 bg-warm p-5">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-md bg-contestGreen text-sm font-black text-white">{number}</span>
                    <Icon size={22} className="text-contestGreen" />
                  </div>
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-navy/65">{description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Pill tone="navy">Packages</Pill>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">{text.packagesTitle}</h2>
            <p className="mt-3 text-lg leading-8 text-navy/65">{text.packagesCopy}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {packages.map((pack) => (
              <article key={pack.name} className={`rounded-lg border bg-white p-5 ${pack.recommended ? 'border-contestGreen shadow-soft' : 'border-navy/10'}`}>
                {pack.recommended && <Pill tone="green">{packageText.recommended}</Pill>}
                <h3 className="mt-3 text-xl font-black">{packageText[pack.name].name}</h3>
                <p className="mt-2 text-3xl font-black text-navy">{pack.price}</p>
                <p className="mt-1 text-sm font-semibold text-navy/55">
                  {packageText[pack.name].entries} / {packageText[pack.name].days}
                </p>
                <p className="mt-3 text-sm leading-6 text-navy/65">{packageText[pack.name].description}</p>
                <ul className="mt-4 grid gap-2">
                  {packageText[pack.name].features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm font-semibold text-navy/70">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-6">
          <div>
            <div className="grid size-12 place-items-center rounded-md bg-white/10 text-mint">
              <ShieldCheck size={24} />
            </div>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">{text.trustTitle}</h2>
            <p className="mt-3 text-lg leading-8 text-white/70">{text.ctaCopy}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contests/new">
                <Button>{text.start}</Button>
              </Link>
              <Link to="/contests">
                <Button variant="ghost">{text.browse}</Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {text.trustItems.map(([title, description], index) => {
              const Icon = index % 2 === 0 ? Sparkles : MessageSquareText;
              return (
                <article key={title} className="rounded-lg border border-white/10 bg-white/8 p-4">
                  <Icon size={20} className="text-mint" />
                  <h3 className="mt-3 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
