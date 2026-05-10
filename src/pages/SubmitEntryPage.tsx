import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Pill } from '../components/common/Pill';
import { contests } from '../data/contests';
import { useLanguage } from '../i18n/LanguageContext';
import { statusLabel } from '../utils/displayLabels';

const submitCopy = {
  en: {
    back: 'Back to contest',
    title: 'Submit proposal',
    entryTitle: 'Entry title',
    demoUrl: 'Demo URL',
    aiTools: 'AI tools used',
    aiPlaceholder: 'Figma AI, ChatGPT, image generation, none, etc.',
    summary: 'Summary',
    safety: 'Safety checks',
    cancel: 'Cancel',
    submit: 'Submit entry',
    closed: 'Submissions closed',
    completedTitle: 'This contest has already selected a winner.',
    finalistTitle: 'This contest is in finalist review.',
    closedCopy:
      'New entries are locked in this prototype so the lifecycle matches a real design-contest marketplace. You can still inspect entries, compare finalists, or view the archive when available.',
    compare: 'Compare entries',
    errors: {
      title: 'Title is required.',
      demoUrl: 'Demo URL is required.',
      invalidUrl: 'Enter a valid http or https URL.',
      aiTools: 'AI tools disclosure is required.',
      summary: 'Summary is required.',
      safety: 'Complete every safety acknowledgement.',
    },
    checks: [
      'No real customer data, private keys, or credentials are included.',
      'AI-generated assets and tools are disclosed in the submission.',
      'This is a UX mock or prototype, not a production guarantee.',
    ],
  },
  ja: {
    back: 'コンテストへ戻る',
    title: '提案を応募',
    entryTitle: '応募タイトル',
    demoUrl: 'デモURL',
    aiTools: '使用したAIツール',
    aiPlaceholder: 'Figma AI、ChatGPT、画像生成、なし など',
    summary: '提案概要',
    safety: '安全確認',
    cancel: 'キャンセル',
    submit: '応募する',
    closed: '応募受付終了',
    completedTitle: 'このコンテストは受賞者が選定済みです。',
    finalistTitle: 'このコンテストは最終選考中です。',
    closedCopy:
      '実際のデザインコンテストと同じライフサイクルに見えるよう、新規応募はロックされています。応募作品の確認、比較、アーカイブ閲覧は引き続き可能です。',
    compare: '応募作品を比較',
    errors: {
      title: 'タイトルを入力してください。',
      demoUrl: 'デモURLを入力してください。',
      invalidUrl: 'http または https のURLを入力してください。',
      aiTools: 'AIツールの開示を入力してください。',
      summary: '概要を入力してください。',
      safety: 'すべての安全確認にチェックしてください。',
    },
    checks: [
      '実顧客データ、秘密鍵、認証情報を含めていません。',
      'AI生成素材と使用ツールを応募内で開示しています。',
      'これはUXモックまたはプロトタイプであり、本番保証ではありません。',
    ],
  },
} as const;

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function NotFoundPanel() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
      <section className="mock-surface rounded-lg p-6">
        <Pill tone="rose">Not found</Pill>
        <h1 className="mt-4 text-3xl font-black">Contest not found</h1>
        <p className="mt-3 text-navy/70">This static prototype could not find a contest for that ID.</p>
        <Link className="mt-5 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to="/contests">
          Back to contests
        </Link>
      </section>
    </main>
  );
}

export function SubmitEntryPage() {
  const { categoryLabel, contestTitle, language } = useLanguage();
  const text = submitCopy[language];
  const { contestId } = useParams();
  const navigate = useNavigate();
  const contest = contests.find((item) => item.id === Number(contestId));
  const [title, setTitle] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [aiTools, setAiTools] = useState('');
  const [summary, setSummary] = useState('');
  const [checked, setChecked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!contest) {
    return <NotFoundPanel />;
  }
  const contestIdValue = contest.id;
  const acceptsSubmissions = contest.status === 'Open';

  function toggleCheck(item: string) {
    setChecked((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!acceptsSubmissions) return;
    const nextErrors: Record<string, string> = {};

    if (!title.trim()) nextErrors.title = text.errors.title;
    if (!demoUrl.trim()) nextErrors.demoUrl = text.errors.demoUrl;
    else if (!isValidUrl(demoUrl)) nextErrors.demoUrl = text.errors.invalidUrl;
    if (!aiTools.trim()) nextErrors.aiTools = text.errors.aiTools;
    if (!summary.trim()) nextErrors.summary = text.errors.summary;
    if (checked.length !== text.checks.length) nextErrors.safety = text.errors.safety;

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      navigate(`/contests/${contestIdValue}/submit/success`);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <Link className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-navy/65 hover:text-orange" to={`/contests/${contest.id}`}>
        <ArrowLeft size={16} /> {text.back}
      </Link>

      <section className="mock-surface rounded-lg p-5">
        <div className="flex flex-wrap gap-2">
          <Pill tone="navy">{categoryLabel(contest.category)}</Pill>
          <Pill>{statusLabel(contest.status, language)}</Pill>
        </div>
        <h1 className="mt-4 text-3xl font-black md:text-5xl">{text.title}</h1>
        <p className="mt-3 max-w-3xl text-navy/70">{contestTitle(contest)}</p>

        {!acceptsSubmissions && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
            <Pill tone="amber">{text.closed}</Pill>
            <h2 className="mt-3 text-2xl font-black">
              {contest.status === 'Completed' ? text.completedTitle : text.finalistTitle}
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-navy/65">
              {text.closedCopy}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90" to={`/contests/${contest.id}`}>
                {text.back}
              </Link>
              <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}/compare`}>
                {text.compare}
              </Link>
            </div>
          </div>
        )}

        {acceptsSubmissions && <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-2 text-sm font-bold">
            {text.entryTitle}
            <input className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2 font-medium" value={title} onChange={(event) => setTitle(event.target.value)} />
            {errors.title && <span className="text-xs text-rose-700">{errors.title}</span>}
          </label>

          <label className="grid gap-2 text-sm font-bold">
            {text.demoUrl}
            <input className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2 font-medium" placeholder="https://example.com/prototype" value={demoUrl} onChange={(event) => setDemoUrl(event.target.value)} />
            {errors.demoUrl && <span className="text-xs text-rose-700">{errors.demoUrl}</span>}
          </label>

          <label className="grid gap-2 text-sm font-bold">
            {text.aiTools}
            <input className="focus-ring rounded-md border border-navy/15 bg-white px-3 py-2 font-medium" placeholder={text.aiPlaceholder} value={aiTools} onChange={(event) => setAiTools(event.target.value)} />
            {errors.aiTools && <span className="text-xs text-rose-700">{errors.aiTools}</span>}
          </label>

          <label className="grid gap-2 text-sm font-bold">
            {text.summary}
            <textarea className="focus-ring min-h-32 rounded-md border border-navy/15 bg-white px-3 py-2 font-medium" value={summary} onChange={(event) => setSummary(event.target.value)} />
            {errors.summary && <span className="text-xs text-rose-700">{errors.summary}</span>}
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-black">{text.safety}</legend>
            {text.checks.map((item) => (
              <label key={item} className="flex items-start gap-3 rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                <input className="mt-1" type="checkbox" checked={checked.includes(item)} onChange={() => toggleCheck(item)} />
                <span>{item}</span>
              </label>
            ))}
            {errors.safety && <span className="text-xs font-bold text-rose-700">{errors.safety}</span>}
          </fieldset>

          <div className="flex flex-wrap justify-end gap-2 border-t border-navy/10 pt-5">
            <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to={`/contests/${contest.id}`}>
              {text.cancel}
            </Link>
            <Button type="submit">
              <CheckCircle2 size={16} /> {text.submit}
            </Button>
          </div>
        </form>}
      </section>
    </main>
  );
}
