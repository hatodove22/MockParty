import { FormEvent, useState } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { RatingStars } from '../components/common/RatingStars';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { safetyNotice } from '../data/responsibility';
import { useLanguage } from '../i18n/LanguageContext';
import { statusLabel } from '../utils/displayLabels';

const reviewCopy = {
  en: {
    back: 'Back to contest',
    currentWinner: 'Current winner',
    finalist: 'Finalist',
    title: 'Winner review',
    intro: (entryTitle: string, contestTitle: string) => `Confirm responsibility boundaries before selecting ${entryTitle} for ${contestTitle}.`,
    acknowledgementsTitle: 'Responsibility acknowledgements',
    checks: [
      'I understand this selects a UX mock for comparison and consultation, not a production build contract.',
      'Development scope, licensing, acceptance testing, and maintenance will be agreed separately by the parties.',
      'No confidential data, credentials, or regulated production data will be shared through this prototype flow.',
    ],
    error: 'Confirm every responsibility acknowledgement before continuing.',
    viewEntry: 'View entry detail',
    confirm: 'Confirm winner review',
    boundary: 'Boundary notice',
    completedTitle: 'Winner already selected',
    completedCopy: 'This completed contest is locked. Use the archive or handoff receipt to review the selected direction.',
    archive: 'Open archive',
    handoff: 'Open handoff receipt',
  },
  ja: {
    back: 'コンテストへ戻る',
    currentWinner: '現在の受賞作品',
    finalist: '最終候補',
    title: '受賞確認',
    intro: (entryTitle: string, contestTitle: string) => `${contestTitle} で ${entryTitle} を選定する前に、責任範囲を確認します。`,
    acknowledgementsTitle: '責任範囲の確認',
    checks: [
      'これは比較と相談のためのUXモック選定であり、本番開発契約ではないことを理解しています。',
      '開発範囲、ライセンス、受入テスト、保守は当事者間で別途合意します。',
      'このプロトタイプフローでは、機密情報、認証情報、規制対象の本番データを共有しません。',
    ],
    error: 'すべての責任範囲確認にチェックしてください。',
    viewEntry: '応募詳細を見る',
    confirm: '受賞確認を完了',
    boundary: '責任範囲の注意',
    completedTitle: '受賞者は選定済みです',
    completedCopy: '完了済みコンテストはロックされています。選定結果はアーカイブまたはハンドオフ受領ページで確認してください。',
    archive: 'アーカイブを開く',
    handoff: 'ハンドオフ受領を開く',
  },
} as const;

function NotFoundPanel() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
      <section className="mock-surface rounded-lg p-6">
        <Pill tone="rose">Not found</Pill>
        <h1 className="mt-4 text-3xl font-black">Winner review not found</h1>
        <p className="mt-3 text-navy/70">The contest and entry IDs must both match an available static entry.</p>
        <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
          Back to contests
        </Link>
      </section>
    </main>
  );
}

export function WinnerReviewPage() {
  const { categoryLabel, contestTitle, language } = useLanguage();
  const text = reviewCopy[language];
  const { contestId, entryId } = useParams();
  const navigate = useNavigate();
  const contest = contests.find((item) => item.id === Number(contestId));
  const entry = entries.find((item) => item.id === Number(entryId) && item.contestId === Number(contestId));
  const [checked, setChecked] = useState<string[]>([]);
  const [error, setError] = useState('');

  if (!contest || !entry) {
    return <NotFoundPanel />;
  }
  const contestIdValue = contest.id;
  const entryIdValue = entry.id;

  function toggleCheck(item: string) {
    setChecked((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (checked.length !== text.checks.length) {
      setError(text.error);
      return;
    }
    navigate(`/contests/${contestIdValue}/winner-review/${entryIdValue}/success`);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to={`/contests/${contest.id}`}>
        <ArrowLeft size={16} /> {text.back}
      </Link>

      {contest.status === 'Completed' && (
        <section className="mock-surface rounded-lg p-5">
          <div className="flex flex-wrap gap-2">
            <Pill tone="navy">{categoryLabel(contest.category)}</Pill>
            <Pill tone="green">{statusLabel(contest.status, language)}</Pill>
          </div>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">{text.completedTitle}</h1>
          <p className="mt-3 max-w-3xl text-navy/70">{text.completedCopy}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md bg-contestGreen px-4 py-2 text-sm font-semibold text-white hover:bg-contestGreen/90" to={`/contests/${contest.id}/archive`}>
              {text.archive}
            </Link>
            <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}/handoff/${entry.id}`}>
              {text.handoff}
            </Link>
          </div>
        </section>
      )}

      {contest.status !== 'Completed' && <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <form className="mock-surface rounded-lg p-5" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-2">
            <Pill tone="navy">{categoryLabel(contest.category)}</Pill>
            {entry.winner && <Pill tone="emerald">{text.currentWinner}</Pill>}
            {entry.finalist && <Pill tone="amber">{text.finalist}</Pill>}
          </div>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">{text.title}</h1>
          <p className="mt-3 max-w-3xl text-navy/70">{text.intro(entry.title, contestTitle(contest))}</p>

          <article className="mt-6 rounded-lg border border-navy/10 bg-white p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black">{entry.title}</h2>
                <p className="text-sm font-semibold text-navy/55">{entry.creator}</p>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-neutralPanel p-3">
                <RatingStars rating={entry.rating} />
                <span className="text-2xl font-black text-orange">{entry.score}</span>
              </div>
            </div>
            <p className="mt-4 leading-7 text-navy/70">{entry.summary || entry.review}</p>
          </article>

          <fieldset className="mt-6 grid gap-3">
            <legend className="text-sm font-black">{text.acknowledgementsTitle}</legend>
            {text.checks.map((item) => (
              <label key={item} className="flex items-start gap-3 rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                <input className="mt-1" type="checkbox" checked={checked.includes(item)} onChange={() => toggleCheck(item)} />
                <span>{item}</span>
              </label>
            ))}
            {error && <span className="text-xs font-bold text-rose-700" role="alert">{error}</span>}
          </fieldset>

          <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-navy/10 pt-5">
            <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}/entries/${entry.id}`}>
              {text.viewEntry}
            </Link>
            <Button type="submit">
              <ShieldCheck size={16} /> {text.confirm}
            </Button>
          </div>
        </form>

        <aside className="mock-surface h-fit rounded-lg p-5">
          <h2 className="text-xl font-black">{text.boundary}</h2>
          <p className="mt-3 leading-7 text-navy/70">{safetyNotice}</p>
          <div className="mt-5 grid gap-2">
            {contest.deliverables.map((item) => (
              <div key={item} className="rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>}
    </main>
  );
}
