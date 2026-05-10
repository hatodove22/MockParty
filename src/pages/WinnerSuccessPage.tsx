import { CheckCircle2, FileArchive, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Pill } from '../components/common/Pill';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { useLanguage } from '../i18n/LanguageContext';

const winnerSuccessCopy = {
  en: {
    notFound: 'Winner confirmation not found',
    backToContests: 'Back to contests',
    pill: 'Winner reviewed',
    title: 'Responsibility review complete',
    copy: (entryTitle: string, contestTitle: string) =>
      `${entryTitle} is ready for the next consultation step for ${contestTitle}. This static handoff keeps the selected direction, rights review, and prototype boundary visible.`,
    steps: [
      'Prize release is queued after the client confirms prototype-only scope.',
      'Source-file request, license notes, and AI-use disclosure are ready for review.',
      'Final archive will include selected entry, comments, scorecard, and responsibility checklist.',
    ],
    viewEntry: 'View entry',
    handoff: 'Open handoff receipt',
    back: 'Back to contest',
  },
  ja: {
    notFound: '受賞確認が見つかりません',
    backToContests: 'コンテスト一覧へ戻る',
    pill: '受賞確認済み',
    title: '責任範囲の確認が完了しました',
    copy: (entryTitle: string, contestTitle: string) =>
      `${entryTitle} は ${contestTitle} の次の相談ステップへ進める状態です。この静的ハンドオフでは、選定方向、権利確認、プロトタイプ境界を見える状態にしています。`,
    steps: [
      'クライアントがプロトタイプ限定範囲を確認した後、賞金リリースが待機状態になります。',
      'ソースファイル依頼、ライセンスメモ、AI利用開示をレビューできる状態です。',
      '最終アーカイブには、選定応募、コメント、スコアカード、責任範囲チェックリストが含まれます。',
    ],
    viewEntry: '応募を見る',
    handoff: 'ハンドオフ受領書を開く',
    back: 'コンテストへ戻る',
  },
} as const;

export function WinnerSuccessPage() {
  const { contestId, entryId } = useParams();
  const { contestTitle, language } = useLanguage();
  const text = winnerSuccessCopy[language];
  const contest = contests.find((item) => item.id === Number(contestId));
  const entry = entries.find((item) => item.id === Number(entryId) && item.contestId === Number(contestId));

  if (!contest || !entry) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6">
          <Pill tone="rose">Not found</Pill>
          <h1 className="mt-4 text-3xl font-black">{text.notFound}</h1>
          <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
            {text.backToContests}
          </Link>
        </section>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 lg:px-6">
      <section className="mock-surface rounded-lg p-6 text-center">
        <ShieldCheck className="mx-auto text-emerald-700" size={44} />
        <Pill tone="emerald">{text.pill}</Pill>
        <h1 className="mt-4 text-3xl font-black">{text.title}</h1>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/70">
          {text.copy(entry.title, contestTitle(contest))}
        </p>
        <div className="mx-auto mt-6 grid max-w-3xl gap-3 text-left">
          {text.steps.map((item) => (
            <div key={item} className="flex gap-3 rounded-md bg-neutralPanel p-3 text-sm font-bold text-navy/70">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90" to={`/contests/${contest.id}/entries/${entry.id}`}>
            {text.viewEntry}
          </Link>
          <Link className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-contestGreen px-4 py-2 text-sm font-semibold text-white hover:bg-contestGreen/90" to={`/contests/${contest.id}/handoff/${entry.id}`}>
            <FileArchive size={16} /> {text.handoff}
          </Link>
          <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}`}>
            {text.back}
          </Link>
        </div>
      </section>
    </main>
  );
}
