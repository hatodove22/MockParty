import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Star, Trophy } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { useLanguage } from '../i18n/LanguageContext';

const checks = [
  'No real data, API keys, or confidential information is included.',
  'AI tools and outside assets are declared.',
  'Use rights for selected entries are understood.',
  'The work is not presented as production-ready development.',
];

const creatorCopy = {
  en: {
    leaderboard: 'Creator leaderboard preview',
    leaderboardCopy: 'A marketplace mock needs visible creator quality signals, not only submission fields.',
    stats: ['Shortlist rate', 'Avg. review score', 'Repeat clients'],
    creators: [
      ['Mika UX Lab', 'Booking SaaS, mobile flows', '94', '12 finalist entries'],
      ['Proto Clinical', 'Research ops and consent states', '91', '7 shortlist rounds'],
      ['Answerflow Design', 'AI admin and review queues', '90', '5 premium contests'],
    ],
    reviewQueue: 'Review queue standards',
    queueItems: ['Declare AI tools and outside assets', 'Keep data synthetic and non-confidential', 'Show the screen states clients must compare'],
  },
  ja: {
    leaderboard: 'クリエイター実績プレビュー',
    leaderboardCopy: '提出フォームだけでなく、クリエイター品質のシグナルも見えるとマーケットプレイスらしくなります。',
    stats: ['ショートリスト率', '平均レビュー点', 'リピート依頼'],
    creators: [
      ['Mika UX Lab', '予約SaaS、モバイルフロー', '94', 'ファイナリスト12件'],
      ['Proto Clinical', '研究運用と同意確認ステート', '91', 'ショートリスト7回'],
      ['Answerflow Design', 'AI管理画面とレビューキュー', '90', 'Premiumコンペ5件'],
    ],
    reviewQueue: 'レビュー待ち基準',
    queueItems: ['AIツールと外部素材を開示する', 'データは合成・非機密にする', 'クライアントが比較すべき画面状態を示す'],
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
  const { language, t } = useLanguage();
  const creatorText = creatorCopy[language];
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const [title, setTitle] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [aiTools, setAiTools] = useState('');
  const [summary, setSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ready = useMemo(() => checks.every((item) => accepted[item]), [accepted]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!title.trim()) nextErrors.title = 'Proposal title is required.';
    if (!demoUrl.trim()) nextErrors.demoUrl = 'Demo URL is required.';
    else if (!validDemoUrl(demoUrl)) nextErrors.demoUrl = 'Enter a valid http or https URL.';
    if (!aiTools.trim()) nextErrors.aiTools = 'AI tool disclosure is required.';
    if (!summary.trim()) nextErrors.summary = 'Proposal summary is required.';
    if (!ready) nextErrors.checks = 'Complete every responsibility check before submitting.';

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
          <Pill tone="emerald">Review queue</Pill>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">{t('mockProposalSubmitted')}</h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/70">
            The static creator flow has moved this proposal into a review-ready state. No account, upload, or API request was created.
          </p>
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
            <Pill tone="emerald">Prototype only</Pill>
            <Pill tone="orange">AI disclosure required</Pill>
            <Pill tone="navy">Review-ready entries</Pill>
          </div>
          <section className="mock-surface mt-8 rounded-lg p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-contestGreen">Marketplace proof</p>
                <h2 className="mt-1 text-2xl font-black">{creatorText.leaderboard}</h2>
              </div>
              <Trophy className="text-contestGreen" size={26} />
            </div>
            <p className="mt-3 text-sm leading-6 text-navy/65">{creatorText.leaderboardCopy}</p>
            <div className="mt-5 grid gap-3">
              {creatorText.creators.map(([name, specialty, score, note]) => (
                <article key={name} className="flex items-center gap-3 rounded-md bg-neutralPanel p-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-sm font-black text-white">
                    {name.slice(0, 2)}
                  </div>
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
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-2 text-sm font-bold">
            Proposal title
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder="Flow-first Admin" value={title} onChange={(event) => setTitle(event.target.value)} />
            {errors.title && <span className="text-xs text-rose-700">{errors.title}</span>}
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Demo URL
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder="https://example.com/mock" value={demoUrl} onChange={(event) => setDemoUrl(event.target.value)} />
            {errors.demoUrl && <span className="text-xs text-rose-700">{errors.demoUrl}</span>}
          </label>
          <label className="grid gap-2 text-sm font-bold">
            AI tools used
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" placeholder="Image model, UI generator, editor" value={aiTools} onChange={(event) => setAiTools(event.target.value)} />
            {errors.aiTools && <span className="text-xs text-rose-700">{errors.aiTools}</span>}
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Proposal summary
            <textarea className="focus-ring min-h-28 rounded-md border border-navy/15 px-3 py-2" value={summary} onChange={(event) => setSummary(event.target.value)} />
            {errors.summary && <span className="text-xs text-rose-700">{errors.summary}</span>}
          </label>
          <div className="grid gap-2">
            {checks.map((item) => (
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
            {errors.checks && <span className="text-xs font-bold text-rose-700">{errors.checks}</span>}
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
    </main>
  );
}
