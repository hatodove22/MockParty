import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, CheckCircle2, FileImage, Star, Trophy } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { contests } from '../data/contests';
import { useLanguage } from '../i18n/LanguageContext';
import { packageLabel } from '../utils/displayLabels';

const formCopy = {
  en: {
    checks: [
      'No real data, API keys, or confidential information is included.',
      'AI tools and outside assets are declared.',
      'Use rights for selected entries are understood.',
      'The work is not presented as production-ready development.',
    ],
    labels: {
      title: 'Proposal title',
      demoUrl: 'Demo URL',
      aiTools: 'AI tools used',
      summary: 'Proposal summary',
    },
    placeholders: {
      title: 'Flow-first Admin',
      demoUrl: 'https://example.com/mock',
      aiTools: 'Image model, UI generator, editor',
    },
    errors: {
      title: 'Proposal title is required.',
      demoUrlRequired: 'Demo URL is required.',
      demoUrlInvalid: 'Enter a valid http or https URL.',
      aiTools: 'AI tool disclosure is required.',
      summary: 'Proposal summary is required.',
      checks: 'Complete every responsibility check before submitting.',
    },
    submittedPill: 'Review queue',
    submittedCopy: 'The static creator flow has moved this proposal into a review-ready state. No account, upload, or API request was created.',
    pills: ['Prototype only', 'AI disclosure required', 'Review-ready entries'],
    marketplaceProof: 'Marketplace proof',
  },
  ja: {
    checks: [
      '実データ、APIキー、機密情報を含めていません。',
      'AIツールと外部素材の利用を開示しています。',
      '選定された応募の利用権条件を理解しています。',
      '本番開発として利用可能な成果物とは表示していません。',
    ],
    labels: {
      title: '提案タイトル',
      demoUrl: 'デモURL',
      aiTools: '使用したAIツール',
      summary: '提案概要',
    },
    placeholders: {
      title: 'Flow-first Admin',
      demoUrl: 'https://example.com/mock',
      aiTools: '画像生成、UI生成、編集ツール',
    },
    errors: {
      title: '提案タイトルを入力してください。',
      demoUrlRequired: 'デモURLを入力してください。',
      demoUrlInvalid: 'http または https の有効なURLを入力してください。',
      aiTools: 'AIツールの利用開示を入力してください。',
      summary: '提案概要を入力してください。',
      checks: '応募前にすべての責任範囲チェックを完了してください。',
    },
    submittedPill: 'レビュー待ち',
    submittedCopy: 'この静的クリエイターフローでは、提案がレビュー待ち状態へ移動したことを表現しています。アカウント作成、アップロード、API送信は行われません。',
    pills: ['プロトタイプ限定', 'AI利用開示が必要', 'レビュー可能な応募'],
    marketplaceProof: 'マーケットプレイスの信頼材料',
  },
} as const;

const creatorCopy = {
  en: {
    leaderboard: 'Creator leaderboard preview',
    leaderboardCopy: 'A marketplace mock needs visible creator quality signals, not only submission fields.',
    creators: [
      ['Mika UX Lab', 'Booking SaaS, mobile flows', '94', '12 finalist entries'],
      ['Proto Clinical', 'Research ops and consent states', '91', '7 shortlist rounds'],
      ['Answerflow Design', 'AI admin and review queues', '90', '5 premium contests'],
    ],
    reviewQueue: 'Review queue standards',
    queueItems: ['Declare AI tools and outside assets', 'Keep data synthetic and non-confidential', 'Show the screen states clients must compare'],
    verification: 'Creator verification preview',
    verificationItems: ['Portfolio sample attached', 'AI-use policy accepted', 'Rights handoff checklist reviewed'],
    upload: 'Portfolio media slot',
    available: 'Available contests',
    availableTitle: 'Open briefs ready for proposals',
    daysLeft: 'days left',
    entries: 'entries',
  },
  ja: {
    leaderboard: 'クリエイター実績プレビュー',
    leaderboardCopy: '応募フォームだけでなく、クリエイター品質のシグナルが見えるマーケットプレイスらしさを表現します。',
    creators: [
      ['Mika UX Lab', '予約SaaS、モバイルフロー', '94', 'ファイナリスト応募12件'],
      ['Proto Clinical', '研究運用と同意確認ステート', '91', 'ショートリスト7回'],
      ['Answerflow Design', 'AI管理画面とレビューキュー', '90', 'プレミアムコンテスト5件'],
    ],
    reviewQueue: 'レビュー待ち基準',
    queueItems: ['AIツールと外部素材を開示する', 'データは合成かつ非機密にする', 'クライアントが比較すべき画面状態を示す'],
    verification: 'クリエイター認証プレビュー',
    verificationItems: ['ポートフォリオサンプル添付済み', 'AI利用ポリシー同意済み', '権利譲渡チェックリスト確認済み'],
    upload: 'ポートフォリオ画像枠',
    available: '応募可能なコンテスト',
    availableTitle: '提案を受け付けている公開ブリーフ',
    daysLeft: '日残り',
    entries: '件の応募',
  },
} as const;

function validDemoUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function CreatorPage() {
  const { categoryLabel, contestTitle, language, t } = useLanguage();
  const creatorText = creatorCopy[language];
  const formText = formCopy[language];
  const openContests = contests.filter((contest) => contest.status === 'Open').slice(0, 3);
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const [title, setTitle] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [aiTools, setAiTools] = useState('');
  const [summary, setSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ready = useMemo(() => formText.checks.every((item) => accepted[item]), [accepted, formText.checks]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!title.trim()) nextErrors.title = formText.errors.title;
    if (!demoUrl.trim()) nextErrors.demoUrl = formText.errors.demoUrlRequired;
    else if (!validDemoUrl(demoUrl)) nextErrors.demoUrl = formText.errors.demoUrlInvalid;
    if (!aiTools.trim()) nextErrors.aiTools = formText.errors.aiTools;
    if (!summary.trim()) nextErrors.summary = formText.errors.summary;
    if (!ready) nextErrors.checks = formText.errors.checks;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
        <section className="mock-surface rounded-lg p-6 text-center">
          <CheckCircle2 className="mx-auto text-emerald-700" size={44} />
          <Pill tone="emerald">{formText.submittedPill}</Pill>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">{t('mockProposalSubmitted')}</h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/70">{formText.submittedCopy}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button onClick={() => setSubmitted(false)}>{t('submitAnother')}</Button>
            <Link to="/contests">
              <Button variant="ghost">{t('browseContests')}</Button>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h1 className="text-3xl font-black md:text-5xl">{t('creatorPageTitle')}</h1>
          <p className="mt-4 text-lg leading-8 text-navy/70">{t('creatorPageCopy')}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {formText.pills.map((pill, index) => (
              <Pill key={pill} tone={index === 0 ? 'emerald' : index === 1 ? 'orange' : 'navy'}>{pill}</Pill>
            ))}
          </div>
          <section className="mock-surface mt-8 rounded-lg p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-contestGreen">{formText.marketplaceProof}</p>
                <h2 className="mt-1 text-2xl font-black">{creatorText.leaderboard}</h2>
              </div>
              <Trophy className="text-contestGreen" size={26} />
            </div>
            <p className="mt-3 text-sm leading-6 text-navy/65">{creatorText.leaderboardCopy}</p>
            <div className="mt-5 grid gap-3">
              {creatorText.creators.map(([name, specialty, score, note]) => (
                <article key={name} className="flex items-center gap-3 rounded-md bg-neutralPanel p-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-sm font-black text-white">{name.slice(0, 2)}</div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-black">{name}</h3>
                    <p className="text-sm text-navy/60">{specialty}</p>
                    <p className="text-xs font-bold text-navy/45">{note}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 text-sm font-black text-orange">
                    <Star size={15} /> {score}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="mock-surface rounded-lg p-5">
          <div className="mb-5 grid gap-3 rounded-lg border border-navy/10 bg-neutralPanel p-4 sm:grid-cols-[1fr_180px]">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-contestGreen">{creatorText.verification}</p>
              <div className="mt-3 grid gap-2">
                {creatorText.verificationItems.map((item) => (
                  <div key={item} className="flex gap-2 text-sm font-bold text-navy/65">
                    <BadgeCheck size={16} className="mt-0.5 shrink-0 text-contestGreen" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid min-h-32 place-items-center rounded-md border border-dashed border-navy/20 bg-white text-center text-sm font-black text-navy/45">
              <div>
                <FileImage className="mx-auto mb-2 text-orange" size={26} />
                {creatorText.upload}
              </div>
            </div>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <label className="grid gap-2 text-sm font-bold">
              {formText.labels.title}
              <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder={formText.placeholders.title} value={title} onChange={(event) => setTitle(event.target.value)} aria-invalid={Boolean(errors.title)} />
              {errors.title && <span className="text-xs text-rose-700" role="alert">{errors.title}</span>}
            </label>
            <label className="grid gap-2 text-sm font-bold">
              {formText.labels.demoUrl}
              <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder={formText.placeholders.demoUrl} value={demoUrl} onChange={(event) => setDemoUrl(event.target.value)} aria-invalid={Boolean(errors.demoUrl)} />
              {errors.demoUrl && <span className="text-xs text-rose-700" role="alert">{errors.demoUrl}</span>}
            </label>
            <label className="grid gap-2 text-sm font-bold">
              {formText.labels.aiTools}
              <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder={formText.placeholders.aiTools} value={aiTools} onChange={(event) => setAiTools(event.target.value)} aria-invalid={Boolean(errors.aiTools)} />
              {errors.aiTools && <span className="text-xs text-rose-700" role="alert">{errors.aiTools}</span>}
            </label>
            <label className="grid gap-2 text-sm font-bold">
              {formText.labels.summary}
              <textarea className="focus-ring min-h-28 rounded-md border border-navy/15 px-3 py-2" value={summary} onChange={(event) => setSummary(event.target.value)} aria-invalid={Boolean(errors.summary)} />
              {errors.summary && <span className="text-xs text-rose-700" role="alert">{errors.summary}</span>}
            </label>
            <div className="grid gap-2">
              {formText.checks.map((item) => (
                <label key={item} className="flex items-start gap-3 rounded-md bg-neutralPanel p-3 text-sm font-semibold">
                  <input
                    className="mt-1"
                    type="checkbox"
                    checked={Boolean(accepted[item])}
                    onChange={(event) => setAccepted((current) => ({ ...current, [item]: event.target.checked }))}
                  />
                  {item}
                </label>
              ))}
              {errors.checks && <span className="text-xs font-bold text-rose-700" role="alert">{errors.checks}</span>}
            </div>
            <Button type="submit">{t('submitMockProposal')}</Button>
          </form>
        </section>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {creatorText.queueItems.map((item, index) => (
          <article key={item} className="rounded-lg border border-navy/10 bg-white p-4">
            <p className="text-sm font-black text-contestGreen">
              {creatorText.reviewQueue} {index + 1}
            </p>
            <p className="mt-2 font-semibold text-navy/70">{item}</p>
          </article>
        ))}
      </section>
      <section className="mock-surface mt-8 rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-contestGreen">{creatorText.available}</p>
            <h2 className="mt-1 text-2xl font-black">{creatorText.availableTitle}</h2>
          </div>
          <Link to="/contests">
            <Button variant="ghost">{t('browseContests')}</Button>
          </Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {openContests.map((contest) => (
            <Link key={contest.id} className="focus-ring rounded-lg border border-navy/10 bg-white p-4 hover:border-orange" to={`/contests/${contest.id}`}>
              <div className="flex flex-wrap gap-2">
                <Pill tone="navy">{categoryLabel(contest.category)}</Pill>
                <Pill tone="orange">{packageLabel(contest.packageName, language)}</Pill>
              </div>
              <h3 className="mt-3 text-lg font-black">{contestTitle(contest)}</h3>
              <p className="mt-2 text-sm font-semibold text-navy/55">
                {contest.prize} / {contest.daysLeft} {creatorText.daysLeft} / {contest.entries} {creatorText.entries}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
