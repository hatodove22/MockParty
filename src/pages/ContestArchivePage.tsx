import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileText, Printer, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { useLanguage } from '../i18n/LanguageContext';
import { statusLabel } from '../utils/displayLabels';
import { entryCriteria, entrySummary, entryTitle } from '../utils/entryDisplay';

const archiveCopy = {
  en: {
    notFound: 'Archive not found',
    backToContests: 'Back to contests',
    back: 'Back to contest',
    print: 'Print summary',
    eyebrow: 'Final review archive',
    title: 'Selected direction and handoff notes',
    winner: 'Winner',
    noWinner: 'No winner has been recorded for this static contest.',
    boundaryTitle: 'Post-contest boundary',
    boundaryItems: ['Prototype decision archived', 'Rights discussion remains separate', 'Production scope requires a new agreement', 'No real data transferred'],
  },
  ja: {
    notFound: 'アーカイブが見つかりません',
    backToContests: 'コンテスト一覧へ戻る',
    back: 'コンテストへ戻る',
    print: '概要を印刷',
    eyebrow: '最終レビューアーカイブ',
    title: '選定方向とハンドオフメモ',
    winner: '受賞作品',
    noWinner: 'この静的コンテストには受賞作品が記録されていません。',
    boundaryTitle: 'コンテスト後の責任範囲',
    boundaryItems: ['プロトタイプ判断をアーカイブ済み', '権利協議は別途実施', '本番範囲は新しい契約が必要', '実データは移転しない'],
  },
} as const;

export function ContestArchivePage() {
  const { contestId } = useParams();
  const { contestBrief, contestTitle, language } = useLanguage();
  const text = archiveCopy[language];
  const contest = contests.find((item) => item.id === Number(contestId));
  const winner = contest ? entries.find((entry) => entry.contestId === contest.id && entry.winner) : undefined;

  if (!contest) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6">
          <Pill tone="rose">Not found</Pill>
          <h1 className="mt-4 text-3xl font-black">{text.notFound}</h1>
          <Link to="/contests">
            <Button className="mt-5">{text.backToContests}</Button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to={`/contests/${contest.id}`}>
        <ArrowLeft size={16} /> {text.back}
      </Link>
      <section className="mock-surface rounded-lg p-5">
        <Pill tone={contest.status === 'Completed' ? 'green' : 'amber'}>{statusLabel(contest.status, language)}</Pill>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black md:text-5xl">{contestTitle(contest)}</h1>
            <p className="mt-3 max-w-3xl leading-7 text-navy/70">{contestBrief(contest)}</p>
          </div>
          <Button variant="ghost" onClick={() => window.print()}>
            <Printer size={16} /> {text.print}
          </Button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
        <article className="mock-surface rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-md bg-contestGreen text-white">
              <FileText size={21} />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-contestGreen">{text.eyebrow}</p>
              <h2 className="text-2xl font-black">{text.title}</h2>
            </div>
          </div>
          {winner ? (
            <div className="mt-5 rounded-lg border border-navy/10 bg-white p-4">
              <div className="flex flex-wrap gap-2">
                <Pill tone="emerald">{text.winner}</Pill>
                <Pill>{winner.creator}</Pill>
              </div>
              <h3 className="mt-3 text-xl font-black">{entryTitle(winner, language)}</h3>
              <p className="mt-2 leading-7 text-navy/70">{entrySummary(winner, language)}</p>
              <div className="mt-4 grid gap-2 md:grid-cols-3">
                {entryCriteria(winner, language).map((item) => (
                  <div key={item} className="rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-5 rounded-md bg-neutralPanel p-4 text-navy/70">{text.noWinner}</p>
          )}
        </article>
        <aside className="rounded-lg bg-navy p-5 text-white">
          <ShieldCheck className="text-mint" size={28} />
          <h2 className="mt-4 text-2xl font-black">{text.boundaryTitle}</h2>
          <div className="mt-5 grid gap-2">
            {text.boundaryItems.map((item) => (
              <div key={item} className="flex gap-2 rounded-md bg-white/10 p-3 text-sm font-semibold text-white/75">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-mint" /> {item}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
