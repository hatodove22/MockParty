import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import type { Category, Contest } from '../types';

type Language = 'en' | 'ja';

const messages = {
  en: {
    brandTagline: 'AI UX mock contests',
    browseContests: 'Browse contests',
    creators: 'Creators',
    activeExample: 'Active example',
    safety: 'Safety',
    openContest: 'Open contest',
    creatorRegistration: 'Creator registration',
    language: 'Japanese',
    heroTitle: 'Get dozens of UX mockups. Pick the clearest direction.',
    heroCopy:
      'Answer a few simple questions, invite AI-assisted creators, compare prototype directions, and choose a winner before production work begins.',
    startContest: 'Start a contest',
    browseOpenContests: 'Browse open contests',
    howItWorks: 'How it works',
    liveContests: 'Live design contests',
    liveContestCopy: 'Prize, design count, package, and responsibility tags stay visible.',
    marketplaceFlow: 'Contest marketplace flow',
    prototypeOnly: 'Prototype review only',
    noProductionGuarantee: 'No production guarantee',
    standardPrize: 'Standard prize',
    expectedEntries: 'Expected designs',
    productionGuarantee: 'Production guarantee',
    pageBrowseTitle: 'Browse design contests',
    pageBrowseCopy: 'Find UX mock contests by category, prize, deadline, package, and responsibility boundary.',
    search: 'Search',
    searchPlaceholder: 'Search contests',
    guaranteedOnly: 'Guaranteed only',
    noContestsTitle: 'No contests match these filters.',
    noContestsCopy: 'Reset the filters to see every open contest, or start a new contest if this brief needs a fresh direction.',
    resetFilters: 'Reset filters',
    viewDetails: 'View details',
    designs: 'designs',
    creatorsCount: 'creators',
    daysLeft: 'days left',
    packagePurchased: 'package purchased',
    includingFees: 'including platform fees',
    guaranteed: 'Guaranteed',
    private: 'Private',
    featured: 'Featured',
    noGenAi: 'No production AI data',
    footerCopy:
      'UX mock comparison prototype for pre-development review. Production development, maintenance, and commercial release guarantees are outside this prototype.',
    ethicalResponsibility: 'Ethical responsibility',
    realDataProhibited: 'Real data prohibited',
    selfTestsPassed: 'Self-tests passed',
    contestNotFound: 'Contest not found',
    entryNotFound: 'Entry not found',
    backToContests: 'Back to contests',
    backHome: 'Back home',
    submitProposal: 'Submit proposal',
    consultWinner: 'Consult on selected winner',
    developmentNotice: 'Development responsibility notice',
    entriesTab: 'Entries',
    briefTab: 'Brief',
    feedbackTab: 'Feedback',
    safetyTab: 'Safety',
    noEntriesYet: 'No entries yet',
    firstSubmit: 'Be the first to submit',
    noEntriesCopy: 'This static contest has no entries attached yet.',
    selectAsWinner: 'Select as winner',
    viewEntryDetails: 'View entry details',
    reviewAsWinner: 'Review as winner',
    entryActions: 'Entry actions',
    reviewSummary: 'Review summary',
    reviewCriteria: 'Review criteria',
    discussion: 'Discussion',
    submitted: 'Submitted',
    proposalSubmitted: 'Proposal submitted',
    winnerReviewed: 'Winner reviewed',
    responsibilityComplete: 'Responsibility review complete',
    openMockContest: 'Open a mock contest',
    openMockContestCopy:
      'Set up a static prototype contest for comparing UX directions, screen mockups, flow ideas, and safety boundaries before any production work.',
    contestDraftCreated: 'Contest draft created',
    contestDraftCopy: 'This static prototype has completed the creation flow. No API request or local storage entry was created.',
    startAnotherContest: 'Start another contest',
    viewActiveExample: 'View active example',
    readSafety: 'Read safety',
    safetyChecks: 'Safety checks',
    next: 'Next',
    back: 'Back',
    confirmMockContest: 'Confirm mock contest',
    category: 'Category',
    package: 'Package',
    title: 'Title',
    goal: 'Goal',
    purpose: 'Purpose',
    review: 'Review',
    creatorPageTitle: 'Submit fast AI-assisted UX proposals.',
    creatorPageCopy:
      'Join contests with clear prototype boundaries, show your mockup process, and build a track record through shortlisted entries.',
    submitMockProposal: 'Submit mock proposal',
    mockProposalSubmitted: 'Mock proposal submitted',
    submitAnother: 'Submit another',
  },
  ja: {
    brandTagline: 'AI UXモックコンテスト',
    browseContests: 'コンテストを探す',
    creators: 'クリエイター',
    activeExample: '実例を見る',
    safety: '安全と責任',
    openContest: 'コンテストを開始',
    creatorRegistration: 'クリエイター登録',
    language: 'English',
    heroTitle: '複数のUXモックを集め、いちばん伝わる方向性を選ぶ。',
    heroCopy:
      '短い質問に答えるだけで、AI支援クリエイターから複数のプロトタイプ案を集め、本番制作前に比較・選定できます。',
    startContest: 'コンテストを始める',
    browseOpenContests: '募集中のコンテストを見る',
    howItWorks: '流れを見る',
    liveContests: '開催中のデザインコンテスト',
    liveContestCopy: '賞金、応募数、パッケージ、責任範囲タグを一覧で確認できます。',
    marketplaceFlow: 'コンテスト型マーケットプレイス',
    prototypeOnly: 'プロトタイプ審査のみ',
    noProductionGuarantee: '本番制作保証なし',
    standardPrize: '標準賞金',
    expectedEntries: '想定応募数',
    productionGuarantee: '本番保証',
    pageBrowseTitle: 'デザインコンテストを探す',
    pageBrowseCopy: 'カテゴリ、賞金、締切、パッケージ、責任範囲からUXモックコンテストを探せます。',
    search: '検索',
    searchPlaceholder: 'コンテストを検索',
    guaranteedOnly: '保証付きのみ',
    noContestsTitle: '条件に合うコンテストがありません。',
    noContestsCopy: '条件をリセットするか、この依頼に合う新しいコンテストを開始してください。',
    resetFilters: '条件をリセット',
    viewDetails: '詳細を見る',
    designs: 'デザイン',
    creatorsCount: 'クリエイター',
    daysLeft: '残り日数',
    packagePurchased: '購入済みパッケージ',
    includingFees: 'プラットフォーム手数料込み',
    guaranteed: '賞金保証',
    private: '非公開',
    featured: '注目',
    noGenAi: '本番AIデータ利用なし',
    footerCopy:
      '開発前レビューのためのUXモック比較プロトタイプです。本番開発、保守、商用リリース保証はこのプロトタイプの範囲外です。',
    ethicalResponsibility: '倫理と責任',
    realDataProhibited: '実データ禁止',
    selfTestsPassed: 'セルフテスト済み',
    contestNotFound: 'コンテストが見つかりません',
    entryNotFound: '応募作品が見つかりません',
    backToContests: 'コンテスト一覧へ戻る',
    backHome: 'ホームへ戻る',
    submitProposal: '提案を応募',
    consultWinner: '選定候補を相談',
    developmentNotice: '制作責任に関する注意',
    entriesTab: '応募作品',
    briefTab: '依頼内容',
    feedbackTab: 'フィードバック',
    safetyTab: '安全',
    noEntriesYet: 'まだ応募がありません',
    firstSubmit: '最初に提案する',
    noEntriesCopy: 'この静的コンテストには、まだ応募データが紐づいていません。',
    selectAsWinner: '受賞候補に選ぶ',
    viewEntryDetails: '応募詳細を見る',
    reviewAsWinner: '受賞候補として確認',
    entryActions: '応募アクション',
    reviewSummary: 'レビュー概要',
    reviewCriteria: '評価観点',
    discussion: 'ディスカッション',
    submitted: '提出日',
    proposalSubmitted: '提案を応募しました',
    winnerReviewed: '受賞確認済み',
    responsibilityComplete: '責任範囲の確認が完了しました',
    openMockContest: 'モックコンテストを開始',
    openMockContestCopy:
      'UX方向性、画面モック、フロー案、安全境界を本番制作前に比較するための静的コンテストを設定します。',
    contestDraftCreated: 'コンテスト下書きを作成しました',
    contestDraftCopy: '静的プロトタイプ上で作成フローが完了しました。API送信やローカル保存は行っていません。',
    startAnotherContest: '別のコンテストを開始',
    viewActiveExample: '実例を見る',
    readSafety: '安全方針を読む',
    safetyChecks: '安全確認',
    next: '次へ',
    back: '戻る',
    confirmMockContest: 'モックコンテストを確認',
    category: 'カテゴリ',
    package: 'パッケージ',
    title: 'タイトル',
    goal: '目的',
    purpose: '用途',
    review: '確認',
    creatorPageTitle: 'AI支援のUX提案をすばやく応募。',
    creatorPageCopy:
      '明確なプロトタイプ範囲のコンテストに参加し、制作プロセスを示しながらショートリスト実績を積めます。',
    submitMockProposal: 'モック提案を応募',
    mockProposalSubmitted: 'モック提案を応募しました',
    submitAnother: 'もう一件応募',
  },
} as const;

const categoryLabels: Record<Language, Record<Category | 'All', string>> = {
  en: {
    All: 'All',
    'SaaS screens': 'SaaS screens',
    'Business apps': 'Business apps',
    'LP / Web': 'LP / Web',
    'AI tools': 'AI tools',
    'Research / Education': 'Research / Education',
    'Internal DX': 'Internal DX',
    'Booking / CRM': 'Booking / CRM',
  },
  ja: {
    All: 'すべて',
    'SaaS screens': 'SaaS画面',
    'Business apps': '業務アプリ',
    'LP / Web': 'LP / Web',
    'AI tools': 'AIツール',
    'Research / Education': '研究・教育',
    'Internal DX': '社内DX',
    'Booking / CRM': '予約・CRM',
  },
};

const contestCopy: Record<Language, Record<number, { title: string; brief: string }>> = {
  en: {},
  ja: {
    1: {
      title: '小規模サロン予約SaaSのUXモック',
      brief: '小規模サロン向けに、予約、スタッフ空き状況、リピート顧客フローを比較します。',
    },
    2: {
      title: '研究参加者スケジューリングツールのプロトタイプ',
      brief: '研究者が候補者、空き状況、同意確認を調整しやすくするスケジューリングフローを試作します。',
    },
    3: {
      title: '社内CSV処理ダッシュボードの情報設計',
      brief: 'CSV取り込み、検証、例外処理、レビューを扱う社内業務ダッシュボードを明快にします。',
    },
    4: {
      title: 'B2B AIチャットボット管理画面のUX方向性',
      brief: 'プロンプトライブラリ、レビューキュー、リリース準備チェックの管理画面を比較します。',
    },
    5: {
      title: '業務オンボーディングポータルの初期画面モック',
      brief: '本番ポータルへ進む前に、社内業務オンボーディングの軽量な初期画面を検討します。',
    },
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof messages.en) => string;
  categoryLabel: (category: Category | 'All') => string;
  contestTitle: (contest: Contest) => string;
  contestBrief: (contest: Contest) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    return window.localStorage.getItem('mockcontest-language') === 'ja' ? 'ja' : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem('mockcontest-language', language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === 'en' ? 'ja' : 'en')),
      t: (key) => messages[language][key],
      categoryLabel: (category) => categoryLabels[language][category],
      contestTitle: (contest) => contestCopy[language][contest.id]?.title ?? contest.title,
      contestBrief: (contest) => contestCopy[language][contest.id]?.brief ?? contest.brief,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}
