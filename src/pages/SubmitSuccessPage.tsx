import { CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Pill } from '../components/common/Pill';
import { contests } from '../data/contests';
import { useLanguage } from '../i18n/LanguageContext';

const successCopy = {
  en: {
    notFound: 'Contest not found',
    backToContests: 'Back to contests',
    pill: 'Submitted',
    title: 'Proposal submitted',
    copy: (title: string) => `Your static prototype submission for ${title} has passed the required form checks.`,
    backToContest: 'Back to contest',
    browse: 'Browse contests',
  },
  ja: {
    notFound: 'コンテストが見つかりません',
    backToContests: 'コンテスト一覧へ戻る',
    pill: '応募済み',
    title: '提案を応募しました',
    copy: (title: string) => `${title} への静的プロトタイプ提案は、必須フォームチェックを通過しました。`,
    backToContest: 'コンテストへ戻る',
    browse: 'コンテストを見る',
  },
} as const;

export function SubmitSuccessPage() {
  const { contestId } = useParams();
  const { contestTitle, language } = useLanguage();
  const text = successCopy[language];
  const contest = contests.find((item) => item.id === Number(contestId));

  if (!contest) {
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
    <main className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <section className="mock-surface rounded-lg p-6 text-center">
        <CheckCircle2 className="mx-auto text-emerald-700" size={44} />
        <Pill tone="emerald">{text.pill}</Pill>
        <h1 className="mt-4 text-3xl font-black">{text.title}</h1>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/70">
          {text.copy(contestTitle(contest))}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90" to={`/contests/${contest.id}`}>
            {text.backToContest}
          </Link>
          <Link className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange/60" to="/contests">
            {text.browse}
          </Link>
        </div>
      </section>
    </main>
  );
}
