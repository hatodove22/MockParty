import { ArrowLeft, CheckCircle2, MessageSquare, MousePointerClick } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Pill } from '../components/common/Pill';
import { RatingStars } from '../components/common/RatingStars';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { useLanguage } from '../i18n/LanguageContext';
import { creatorSlug } from '../utils/creatorSlug';
import { entryCriteria, entryDiscussion, entrySummary, entryTags, entryTitle } from '../utils/entryDisplay';
import { statusLabel } from '../utils/displayLabels';

const detailCopy = {
  en: {
    notFound: 'Entry not found',
    notFoundCopy: 'The contest or entry ID does not match an available static prototype entry.',
    backToContests: 'Back to contests',
    backToContest: 'Back to contest',
    by: 'by',
    annotated: 'Annotated screen notes',
    threadTitle: 'Threaded client notes',
    client: 'Client',
    creator: 'Creator',
    score: 'Score',
    rating: 'Rating',
    submitted: 'Submitted',
    recent: 'Recently submitted',
    summary: 'Review summary',
    criteria: 'Review criteria',
    discussion: 'Discussion',
    actions: 'Entry actions',
    comments: 'comments',
    views: 'views',
    reviewWinner: 'Review as winner',
    winnerLocked: 'Winner already selected',
    backToEntries: 'Back to entries',
    boundary: 'This static detail view summarizes prototype comparison signals only. Production build scope, acceptance, security, and support remain separate agreements.',
    fallbackDiscussion: (comments: number, views: number) => [`${comments} review comments are available in this static summary.`, `${views} client views recorded for comparison.`],
    pins: ['Primary flow clarity', 'State comparison', 'Decision support'],
    winner: 'Winner',
    finalist: 'Finalist',
  },
  ja: {
    notFound: '応募が見つかりません',
    notFoundCopy: 'コンテストまたは応募IDが、利用可能な静的プロトタイプの応募と一致しません。',
    backToContests: 'コンテスト一覧へ戻る',
    backToContest: 'コンテストへ戻る',
    by: '作成',
    annotated: '注釈付き画面メモ',
    threadTitle: 'クライアントメモのスレッド',
    client: 'クライアント',
    creator: 'クリエイター',
    score: 'スコア',
    rating: '評価',
    submitted: '提出日',
    recent: '最近提出',
    summary: 'レビュー要約',
    criteria: 'レビュー観点',
    discussion: 'ディスカッション',
    actions: '応募アクション',
    comments: '件のコメント',
    views: '回表示',
    reviewWinner: '受賞候補として確認',
    winnerLocked: '受賞選定済み',
    backToEntries: '応募一覧へ戻る',
    boundary: 'この静的詳細画面は、プロトタイプ比較の判断材料のみを要約します。本番開発範囲、受入、セキュリティ、サポートは別契約です。',
    fallbackDiscussion: (comments: number, views: number) => [`この静的要約では${comments}件のレビューコメントを確認できます。`, `比較用に${views}回のクライアント表示が記録されています。`],
    pins: ['主要フローの明確さ', '状態比較', '意思決定支援'],
    winner: '受賞作品',
    finalist: 'ファイナリスト',
  },
} as const;

function NotFoundPanel() {
  const { language } = useLanguage();
  const text = detailCopy[language];
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
      <section className="mock-surface rounded-lg p-6">
        <Pill tone="rose">Not found</Pill>
        <h1 className="mt-4 text-3xl font-black">{text.notFound}</h1>
        <p className="mt-3 text-navy/70">{text.notFoundCopy}</p>
        <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
          {text.backToContests}
        </Link>
      </section>
    </main>
  );
}

export function EntryDetailPage() {
  const { categoryLabel, language } = useLanguage();
  const text = detailCopy[language];
  const { contestId, entryId } = useParams();
  const contest = contests.find((item) => item.id === Number(contestId));
  const entry = entries.find((item) => item.id === Number(entryId) && item.contestId === Number(contestId));

  if (!contest || !entry) {
    return <NotFoundPanel />;
  }

  const criteria = entryCriteria(entry, language).length ? entryCriteria(entry, language) : entryTags(entry, language);
  const discussion = entryDiscussion(entry, language).length ? entryDiscussion(entry, language) : text.fallbackDiscussion(entry.comments, entry.views);
  const title = entryTitle(entry, language);
  const submitted = entry.submittedAt ? new Date(entry.submittedAt).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US') : text.recent;
  const annotationPins = [
    { label: '1', className: 'left-[18%] top-[24%]', note: criteria[0] ?? text.pins[0] },
    { label: '2', className: 'left-[52%] top-[48%]', note: criteria[1] ?? text.pins[1] },
    { label: '3', className: 'right-[12%] bottom-[18%]', note: criteria[2] ?? text.pins[2] },
  ];
  const threads = annotationPins.map((pin, index) => ({
    ...pin,
    clientNote: discussion[index % discussion.length],
    creatorReply: language === 'ja'
      ? `${pin.note}を基準に、次の提出では画面状態と責任範囲をより明確にします。`
      : `I will clarify the screen state and responsibility boundary around ${pin.note.toLowerCase()} in the next pass.`,
  }));
  const canReviewWinner = contest.status !== 'Completed';

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to={`/contests/${contest.id}`}>
        <ArrowLeft size={16} /> {text.backToContest}
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <article className="mock-surface rounded-lg p-5">
          <div className="flex flex-wrap gap-2">
            <Pill tone="navy">{categoryLabel(contest.category)}</Pill>
            {entry.winner && <Pill tone="emerald">{text.winner}</Pill>}
            {entry.finalist && <Pill tone="amber">{text.finalist}</Pill>}
            <Pill>{statusLabel(contest.status, language)}</Pill>
          </div>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">{title}</h1>
          <Link className="mt-2 inline-flex font-semibold text-navy/55 hover:text-orange" to={`/creators/${creatorSlug(entry.creator)}`}>
            {text.by} {entry.creator}
          </Link>

          <div className={`relative mt-6 h-72 rounded-lg bg-gradient-to-br ${entry.gradient} p-4`}>
            <div className="grid h-full gap-4 rounded-md border border-white/80 bg-white/50 p-4 md:grid-cols-[1fr_180px]">
              <div className="rounded-md bg-white/75 p-4">
                <div className="h-4 w-32 rounded bg-navy/20" />
                <div className="mt-5 grid gap-3">
                  <div className="h-16 rounded bg-navy/10" />
                  <div className="h-16 rounded bg-orange/20" />
                  <div className="h-16 rounded bg-white" />
                </div>
              </div>
              <div className="grid gap-3">
                <div className="rounded bg-white/80" />
                <div className="rounded bg-navy/15" />
                <div className="rounded bg-orange/30" />
              </div>
            </div>
            {annotationPins.map((pin) => (
              <div key={pin.label} className={`absolute ${pin.className} group`}>
                <span className="grid size-8 place-items-center rounded-full bg-orange text-sm font-black text-white shadow-soft ring-4 ring-white/80">
                  {pin.label}
                </span>
                <span className="pointer-events-none absolute left-9 top-0 hidden w-44 rounded-md bg-navy px-3 py-2 text-xs font-bold leading-5 text-white shadow-soft group-hover:block">
                  {pin.note}
                </span>
              </div>
            ))}
          </div>

          <section className="mt-4 rounded-lg border border-navy/10 bg-white p-4">
            <h2 className="text-sm font-black uppercase tracking-wide text-contestGreen">{text.annotated}</h2>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {annotationPins.map((pin) => (
                <div key={pin.label} className="flex gap-2 rounded-md bg-neutralPanel p-3 text-sm font-bold text-navy/70">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-orange text-xs text-white">{pin.label}</span>
                  {pin.note}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-4 rounded-lg border border-navy/10 bg-white p-4">
            <h2 className="text-sm font-black uppercase tracking-wide text-contestGreen">{text.threadTitle}</h2>
            <div className="mt-3 grid gap-3">
              {threads.map((thread) => (
                <article key={thread.label} className="rounded-md bg-neutralPanel p-3">
                  <div className="flex items-center gap-2 text-sm font-black text-navy">
                    <span className="grid size-6 place-items-center rounded-full bg-orange text-xs text-white">{thread.label}</span>
                    {thread.note}
                  </div>
                  <div className="mt-3 grid gap-2 text-sm leading-6">
                    <p className="rounded-md bg-white p-3 text-navy/70"><span className="font-black text-navy">{text.client}: </span>{thread.clientNote}</p>
                    <p className="rounded-md border border-contestGreen/20 bg-mint/70 p-3 text-navy/70"><span className="font-black text-navy">{text.creator}: </span>{thread.creatorReply}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-md bg-neutralPanel p-4">
              <p className="text-xs font-bold text-navy/50">{text.score}</p>
              <p className="mt-1 text-2xl font-black text-orange">{entry.score}</p>
            </div>
            <div className="rounded-md bg-neutralPanel p-4">
              <p className="text-xs font-bold text-navy/50">{text.rating}</p>
              <div className="mt-2">
                <RatingStars rating={entry.rating} />
              </div>
            </div>
            <div className="rounded-md bg-neutralPanel p-4">
              <p className="text-xs font-bold text-navy/50">{text.submitted}</p>
              <p className="mt-1 font-black">{submitted}</p>
            </div>
          </div>

          <section className="mt-6">
            <h2 className="text-xl font-black">{text.summary}</h2>
            <p className="mt-3 leading-7 text-navy/70">{entrySummary(entry, language)}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-black">{text.criteria}</h2>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {criteria.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                  <CheckCircle2 size={16} className="text-emerald-700" /> {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-black">{text.discussion}</h2>
            <div className="mt-3 grid gap-3">
              {discussion.map((item) => (
                <p key={item} className="rounded-md border border-navy/10 bg-white p-3 text-sm leading-6 text-navy/70">
                  {item}
                </p>
              ))}
            </div>
          </section>
        </article>

        <aside className="mock-surface h-fit rounded-lg p-5">
          <h2 className="text-xl font-black">{text.actions}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold text-navy/65">
            <span className="inline-flex items-center gap-1">
              <MessageSquare size={16} /> {entry.comments}{language === 'ja' ? text.comments : ` ${text.comments}`}
            </span>
            <span>{entry.views}{language === 'ja' ? text.views : ` ${text.views}`}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {entryTags(entry, language).map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
          <div className="mt-6 grid gap-2">
            {canReviewWinner ? (
              <Link className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90" to={`/contests/${contest.id}/winner-review/${entry.id}`}>
                <MousePointerClick size={16} /> {text.reviewWinner}
              </Link>
            ) : (
              <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-neutralPanel px-4 py-2 text-sm font-semibold text-navy/60">
                <CheckCircle2 size={16} /> {text.winnerLocked}
              </span>
            )}
            <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}`}>
              {text.backToEntries}
            </Link>
          </div>
          <div className="mt-6 rounded-md bg-neutralPanel p-4 text-sm leading-6 text-navy/70">
            {text.boundary}
          </div>
        </aside>
      </section>
    </main>
  );
}
