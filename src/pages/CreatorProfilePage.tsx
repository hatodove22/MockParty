import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileImage, Pencil, ShieldCheck, Star, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { entries } from '../data/entries';
import { contests } from '../data/contests';
import { useLanguage } from '../i18n/LanguageContext';
import { creatorSlug } from '../utils/creatorSlug';
import { entrySummary, entryTitle } from '../utils/entryDisplay';

const profileCopy = {
  en: {
    notFound: 'Creator not found',
    back: 'Back to creators',
    verified: 'Verified mock creator',
    intro: 'Prototype-focused UX proposals with declared AI and asset usage.',
    ai: 'AI disclosure verified',
    media: 'Portfolio media ready',
    avg: 'Avg. score',
    edit: 'Edit mock profile',
    editMode: 'Mock edit mode',
    editTitle: 'Profile editing preview',
    editCopy: 'Adjust public availability, AI disclosure, and portfolio review status without creating a real account or upload.',
    availability: 'Availability',
    accepting: 'Accepting invites',
    paused: 'Paused',
    rights: 'Rights preference',
    rightsOptions: ['Prototype review only', 'Open to production consult', 'License discussion required'],
    mediaQueue: 'Portfolio media states',
    mediaItems: ['Dashboard sample approved', 'Mobile flow awaiting review', 'Annotation pack ready to publish'],
    uploadSlot: 'Mock upload slot',
    uploadCopy: 'Drop-zone preview only. No file leaves this browser.',
    portfolio: 'Portfolio setup',
    samples: ['Dashboard mockups', 'Mobile flow samples', 'Review annotations'],
    readiness: 'Account readiness',
    readinessItems: ['Public profile complete', 'Synthetic portfolio samples attached', 'Rights handoff checklist acknowledged'],
    stats: ['Entries', 'Finalists', 'Winner'],
    winner: 'Winner',
    finalist: 'Finalist',
    viewEntry: 'View entry',
    note: 'This profile is static mock data. It demonstrates how a real marketplace could expose creator reliability, shortlist history, and prototype-only disclosures.',
  },
  ja: {
    notFound: 'クリエイターが見つかりません',
    back: 'クリエイター一覧へ戻る',
    verified: '認証済みモッククリエイター',
    intro: 'AIと素材利用を開示した、プロトタイプ重視のUX提案を行います。',
    ai: 'AI利用開示を確認済み',
    media: 'ポートフォリオ画像準備済み',
    avg: '平均スコア',
    edit: 'モックプロフィールを編集',
    editMode: 'モック編集モード',
    editTitle: 'プロフィール編集プレビュー',
    editCopy: '実アカウントや実アップロードを作らず、公開稼働状況、AI開示、ポートフォリオ審査状態を調整するモックです。',
    availability: '稼働状況',
    accepting: '招待受付中',
    paused: '一時停止',
    rights: '権利設定',
    rightsOptions: ['プロトタイプ審査のみ', '本番相談も可', 'ライセンス協議が必要'],
    mediaQueue: 'ポートフォリオ画像状態',
    mediaItems: ['ダッシュボードサンプル承認済み', 'モバイルフロー審査待ち', '注釈パック公開準備済み'],
    uploadSlot: 'モックアップロード枠',
    uploadCopy: 'ドロップゾーンのプレビューのみです。ファイルはブラウザ外へ送信されません。',
    portfolio: 'ポートフォリオ設定',
    samples: ['ダッシュボードモック', 'モバイルフローサンプル', 'レビュー注釈'],
    readiness: 'アカウント準備状況',
    readinessItems: ['公開プロフィール完了', '合成ポートフォリオサンプル添付済み', '権利ハンドオフチェックリスト確認済み'],
    stats: ['応募', 'ファイナリスト', '受賞'],
    winner: '受賞作品',
    finalist: 'ファイナリスト',
    viewEntry: '応募を見る',
    note: 'このプロフィールは静的なモックデータです。実際のマーケットプレイスで、クリエイターの信頼性、候補入り実績、プロトタイプ限定の開示をどう見せるかを示します。',
  },
} as const;

export function CreatorProfilePage() {
  const { contestTitle, language } = useLanguage();
  const text = profileCopy[language];
  const [editing, setEditing] = useState(false);
  const [acceptingInvites, setAcceptingInvites] = useState(true);
  const [rightsPreference, setRightsPreference] = useState(0);
  const { creatorSlug: slug } = useParams();
  const creatorEntries = entries.filter((entry) => creatorSlug(entry.creator) === slug);
  const creator = creatorEntries[0]?.creator;
  const averageScore = creatorEntries.length
    ? Math.round(creatorEntries.reduce((total, entry) => total + entry.score, 0) / creatorEntries.length)
    : 0;

  if (!creator) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6">
          <Pill tone="rose">Not found</Pill>
          <h1 className="mt-4 text-3xl font-black">{text.notFound}</h1>
          <Link to="/creators">
            <Button className="mt-5">{text.back}</Button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to="/creators">
        <ArrowLeft size={16} /> {text.back}
      </Link>
      <section className="mock-surface rounded-lg p-5">
        <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="grid size-20 place-items-center rounded-full bg-navy text-2xl font-black text-white">{creator.slice(0, 2)}</div>
          <div>
            <Pill tone="green">{text.verified}</Pill>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">{creator}</h1>
            <p className="mt-2 text-navy/65">{text.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-neutralPanel px-3 py-2 text-sm font-bold text-navy/65">
                <ShieldCheck size={16} className="text-contestGreen" /> {text.ai}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-neutralPanel px-3 py-2 text-sm font-bold text-navy/65">
                <FileImage size={16} className="text-orange" /> {text.media}
              </span>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-lg bg-neutralPanel p-4 text-center">
              <p className="text-xs font-bold text-navy/50">{text.avg}</p>
              <p className="mt-1 text-3xl font-black text-orange">{averageScore}</p>
            </div>
            <button
              className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60"
              onClick={() => setEditing((current) => !current)}
              aria-pressed={editing}
            >
              <Pencil size={16} /> {text.edit}
            </button>
          </div>
        </div>
      </section>
      {editing && (
        <section className="mt-6 grid gap-4 rounded-lg border border-orange/25 bg-orange/5 p-5 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-orange">{text.editMode}</p>
            <h2 className="mt-2 text-2xl font-black">{text.editTitle}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-navy/65">{text.editCopy}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold">
                {text.availability}
                <button
                  type="button"
                  className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60"
                  onClick={() => setAcceptingInvites((current) => !current)}
                  aria-pressed={acceptingInvites}
                >
                  {acceptingInvites ? text.accepting : text.paused}
                </button>
              </label>
              <label className="grid gap-2 text-sm font-bold">
                {text.rights}
                <select
                  className="focus-ring min-h-10 rounded-md border border-navy/15 bg-white px-3 py-2"
                  value={rightsPreference}
                  onChange={(event) => setRightsPreference(Number(event.target.value))}
                >
                  {text.rightsOptions.map((option, index) => (
                    <option key={option} value={index}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <aside className="rounded-lg border border-dashed border-orange/40 bg-white p-4">
            <UploadCloud className="text-orange" size={28} />
            <h3 className="mt-3 font-black">{text.uploadSlot}</h3>
            <p className="mt-2 text-sm leading-6 text-navy/60">{text.uploadCopy}</p>
          </aside>
        </section>
      )}
      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="mock-surface rounded-lg p-5">
          <p className="text-sm font-black uppercase tracking-wide text-contestGreen">{text.portfolio}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {text.samples.map((item, index) => (
              <div key={item} className={`min-h-32 rounded-md bg-gradient-to-br ${index === 0 ? 'from-orange-200 to-rose-200' : index === 1 ? 'from-mint to-cyan-100' : 'from-amber-100 to-orange-200'} p-3`}>
                <div className="h-full rounded-md border border-white/70 bg-white/55 p-3">
                  <div className="h-3 w-20 rounded bg-navy/20" />
                  <div className="mt-4 grid gap-2">
                    <div className="h-8 rounded bg-white/70" />
                    <div className="h-8 rounded bg-navy/10" />
                  </div>
                </div>
                <p className="mt-2 text-sm font-black">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-2">
            <p className="text-sm font-black uppercase tracking-wide text-navy/45">{text.mediaQueue}</p>
            {text.mediaItems.map((item) => (
              <div key={item} className="flex gap-2 rounded-md bg-neutralPanel p-3 text-sm font-bold text-navy/70">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
              </div>
            ))}
          </div>
        </div>
        <aside className="mock-surface rounded-lg p-5">
          <p className="text-sm font-black uppercase tracking-wide text-contestGreen">{text.readiness}</p>
          <div className="mt-4 grid gap-2">
            {text.readinessItems.map((item) => (
              <div key={item} className="flex gap-2 rounded-md bg-neutralPanel p-3 text-sm font-bold text-navy/70">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
              </div>
            ))}
          </div>
        </aside>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          [text.stats[0], String(creatorEntries.length)],
          [text.stats[1], String(creatorEntries.filter((entry) => entry.finalist).length)],
          [text.stats[2], String(creatorEntries.filter((entry) => entry.winner).length)],
        ].map(([label, value]) => (
          <article key={label} className="mock-surface rounded-lg p-4">
            <p className="text-sm font-bold text-navy/50">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </article>
        ))}
      </section>
      <section className="mt-6 grid gap-4">
        {creatorEntries.map((entry) => {
          const contest = contests.find((item) => item.id === entry.contestId);
          return (
            <article key={entry.id} className="mock-surface grid gap-4 rounded-lg p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
              {contest && <img className="h-24 w-full rounded-md object-cover md:w-28" src={contest.thumbnail} alt={`${contestTitle(contest)} thumbnail`} />}
              <div>
                <div className="flex flex-wrap gap-2">
                  {entry.winner && <Pill tone="emerald">{text.winner}</Pill>}
                  {entry.finalist && <Pill tone="amber">{text.finalist}</Pill>}
                </div>
                <h2 className="mt-2 text-xl font-black">{entryTitle(entry, language)}</h2>
                <p className="mt-1 text-sm text-navy/60">{contest ? contestTitle(contest) : ''}</p>
                <p className="mt-2 text-sm leading-6 text-navy/70">{entrySummary(entry, language)}</p>
              </div>
              <div className="grid gap-2">
                <span className="inline-flex items-center justify-center gap-1 rounded-md bg-neutralPanel px-3 py-2 font-black text-orange">
                  <Star size={16} /> {entry.score}
                </span>
                <Link to={`/contests/${entry.contestId}/entries/${entry.id}`}>
                  <Button variant="ghost">{text.viewEntry}</Button>
                </Link>
              </div>
            </article>
          );
        })}
      </section>
      <section className="mt-6 rounded-lg bg-mint p-5">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-1 shrink-0 text-contestGreen" />
          <p className="font-semibold text-navy/70">{text.note}</p>
        </div>
      </section>
    </main>
  );
}
