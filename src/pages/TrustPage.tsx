import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { Pill } from '../components/common/Pill';
import { useLanguage } from '../i18n/LanguageContext';

const pageCopy = {
  terms: {
    en: {
      eyebrow: 'Static terms preview',
      title: 'Prototype marketplace terms',
      copy: 'This page gives the mock contest flow a believable policy destination without creating real legal acceptance.',
      items: ['Contest listings are prototype-only review spaces.', 'Prize, licensing, and production scope require a separate real agreement.', 'Clients and creators must not exchange secrets, credentials, or real customer data.'],
    },
    ja: {
      eyebrow: '静的規約プレビュー',
      title: 'プロトタイプ用マーケットプレイス規約',
      copy: '実際の法的同意ではなく、モックのコンテスト導線に信頼できるポリシー到達点を用意します。',
      items: ['コンテスト掲載はプロトタイプ審査用の場です。', '賞金、ライセンス、本番制作範囲は別途正式な合意が必要です。', '秘密情報、認証情報、実顧客データを共有してはいけません。'],
    },
  },
  privacy: {
    en: {
      eyebrow: 'Static privacy preview',
      title: 'Prototype privacy boundary',
      copy: 'This static mock explains what a real marketplace would need to say about data handling.',
      items: ['Use synthetic examples only in briefs and submissions.', 'Do not upload personally identifiable information or regulated records.', 'Analytics, storage, and account systems are not implemented in this prototype.'],
    },
    ja: {
      eyebrow: '静的プライバシープレビュー',
      title: 'プロトタイプのプライバシー境界',
      copy: '実際のマーケットプレイスで必要になるデータ取り扱い説明を、静的モックとして示します。',
      items: ['依頼内容と応募には合成例だけを使います。', '個人情報や規制対象の記録はアップロードしません。', 'このプロトタイプには分析、保存、アカウント機能は実装していません。'],
    },
  },
} as const;

export function TrustPage() {
  const { language } = useLanguage();
  const location = useLocation();
  const kind = location.pathname.includes('privacy') ? 'privacy' : 'terms';
  const copy = pageCopy[kind][language];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to="/safety">
        <ArrowLeft size={16} /> Back to safety
      </Link>
      <section className="mock-surface rounded-lg p-6">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-md bg-mint text-contestGreen">
            {kind === 'privacy' ? <ShieldCheck size={24} /> : <FileText size={24} />}
          </span>
          <div>
            <Pill tone="green">{copy.eyebrow}</Pill>
            <h1 className="mt-4 text-3xl font-black md:text-5xl">{copy.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-navy/70">{copy.copy}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-3">
          {copy.items.map((item) => (
            <div key={item} className="flex gap-3 rounded-md bg-neutralPanel p-4 text-sm font-bold text-navy/70">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
