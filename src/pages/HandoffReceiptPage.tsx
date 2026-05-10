import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download, FileArchive, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { useLanguage } from '../i18n/LanguageContext';

const handoffCopy = {
  en: {
    back: 'Back to contest',
    eyebrow: 'Static handoff receipt',
    copy: 'This mock receipt shows the marketplace moment after a winner is confirmed: prize status, file expectations, rights review, and archive export.',
    print: 'Print receipt',
    details: 'Receipt details',
    delivery: 'Delivery bundle',
    archive: 'Open archive',
    labels: ['Selected direction', 'Creator', 'Prize release', 'Rights review', 'Archive bundle'],
    guaranteed: 'Queued after final confirmation',
    manual: 'Manual client confirmation required',
    rights: 'Prototype-use rights checklist acknowledged',
    bundle: 'Entry scorecard, comments, and responsibility summary',
    files: ['Prototype preview link', 'Static scorecard', 'AI-use disclosure', 'Rights and scope checklist'],
  },
  ja: {
    back: 'コンテストへ戻る',
    eyebrow: '静的ハンドオフ受領',
    copy: '受賞者確定後のマーケットプレイスらしい受領状態として、賞金、ファイル、権利確認、アーカイブを書面風に示します。',
    print: '受領内容を印刷',
    details: '受領詳細',
    delivery: '納品バンドル',
    archive: 'アーカイブを開く',
    labels: ['選定した方向性', 'クリエイター', '賞金リリース', '権利確認', 'アーカイブ内容'],
    guaranteed: '最終確認後にリリース待ち',
    manual: 'クライアントの手動確認が必要',
    rights: 'プロトタイプ利用権のチェックリスト確認済み',
    bundle: '応募スコアカード、コメント、責任範囲サマリー',
    files: ['プロトタイププレビューリンク', '静的スコアカード', 'AI利用開示', '権利と範囲のチェックリスト'],
  },
} as const;

export function HandoffReceiptPage() {
  const { contestTitle, language } = useLanguage();
  const text = handoffCopy[language];
  const { contestId, entryId } = useParams();
  const contest = contests.find((item) => item.id === Number(contestId));
  const entry = entries.find((item) => item.id === Number(entryId) && item.contestId === Number(contestId));
  const receiptItems = [
    [text.labels[0], entry?.title ?? 'Unknown entry'],
    [text.labels[1], entry?.creator ?? 'Unknown creator'],
    [text.labels[2], contest?.guaranteed ? text.guaranteed : text.manual],
    [text.labels[3], text.rights],
    [text.labels[4], text.bundle],
  ];
  const files = text.files;

  if (!contest || !entry) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6">
          <Pill tone="rose">Not found</Pill>
          <h1 className="mt-4 text-3xl font-black">Handoff receipt not found</h1>
          <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
            Back to contests
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to={`/contests/${contest.id}`}>
        <ArrowLeft size={16} /> {text.back}
      </Link>
      <section className="mock-surface rounded-lg p-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <Pill tone="emerald">{text.eyebrow}</Pill>
            <h1 className="mt-4 text-3xl font-black md:text-5xl">{contestTitle(contest)}</h1>
            <p className="mt-3 max-w-3xl text-navy/70">
              {text.copy}
            </p>
          </div>
          <Button variant="ghost" onClick={() => window.print()}>
            <Download size={16} /> {text.print}
          </Button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="mock-surface rounded-lg p-5">
          <div className="flex items-center gap-3">
            <FileArchive className="text-contestGreen" size={24} />
            <h2 className="text-2xl font-black">{text.details}</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {receiptItems.map(([label, value]) => (
              <div key={label} className="grid gap-1 rounded-md bg-neutralPanel p-4 sm:grid-cols-[180px_1fr]">
                <p className="text-xs font-black uppercase tracking-wide text-navy/45">{label}</p>
                <p className="font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="mock-surface rounded-lg p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-contestGreen" size={23} />
            <h2 className="text-2xl font-black">{text.delivery}</h2>
          </div>
          <div className="mt-5 grid gap-2">
            {files.map((item) => (
              <div key={item} className="flex gap-2 rounded-md bg-neutralPanel p-3 text-sm font-bold text-navy/70">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
              </div>
            ))}
          </div>
          <Link className="mt-5 inline-flex w-full" to={`/contests/${contest.id}/archive`}>
            <Button className="w-full">{text.archive}</Button>
          </Link>
        </aside>
      </section>
    </main>
  );
}
