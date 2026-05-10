import type { Entry } from '../types';
import type { Language } from '../i18n/LanguageContext';

interface EntryDisplay {
  title: string;
  tags: string[];
  review: string;
  summary: string;
  reviewCriteria: string[];
  discussion: string[];
}

const entryCopy: Record<Language, Record<number, EntryDisplay>> = {
  en: {},
  ja: {
    101: {
      title: 'フロー優先管理画面',
      tags: ['フローマップ', 'モバイル状態', '低リスク'],
      review: '予約から顧客履歴までの導線が最も説明しやすく、検証しやすい案です。',
      summary: '予約、リピート顧客情報、スタッフ空き状況を1つの確認レーンにまとめた受付向けダッシュボードです。',
      reviewCriteria: ['予約導線の明確さ', 'リピート顧客の復帰導線', 'モバイル予定表の読みやすさ'],
      discussion: ['クライアントはハンドオフ前に装飾パネルを減らすよう依頼しました。', 'クリエイターはAI画像利用と手作業でのFigma調整を記録しました。'],
    },
    102: {
      title: 'コンパクトカレンダーコンソール',
      tags: ['高密度UI', 'カレンダー', '高速比較'],
      review: 'スタッフ計画には強い密度がありますが、初回来店顧客の導線はもう少し分離が必要です。',
      summary: 'スタッフ稼働率と予約変更の速さに焦点を当てた、カレンダー中心の業務コンソールです。',
      reviewCriteria: ['スタッフ稼働状況の把握', 'カレンダー密度', '新規顧客導線の分離'],
      discussion: ['レビュアーはオンボーディング導線が圧縮されすぎていると指摘しました。', 'クリエイターはデスクトップとタブレットの予定表状態を提出しました。'],
    },
    103: {
      title: 'あたたかい受付デスク',
      tags: ['親しみやすい', '顧客プロフィール', 'プロトタイプ'],
      review: '受付デスクの比喩は親しみやすい一方、反復利用には装飾的すぎる操作部品があります。',
      summary: '顧客履歴、予約リマインダー、サービスらしさをやわらかく見せる受付デスク案です。',
      reviewCriteria: ['顧客プロフィールの有用性', '業務画面としての抑制', 'サービスのトーン'],
      discussion: ['クライアントはトーンを評価しつつ、スタッフ表示をよりコンパクトにするよう依頼しました。', 'クリエイターはイラストがレビュー用プレースホルダーであると明記しました。'],
    },
    201: {
      title: '同意確認主導スケジューラー',
      tags: ['同意確認', '監査履歴', '研究運用'],
      review: '同意と空き状況のチェックポイントが見えやすく、法務画面のように重くなりすぎていません。',
      summary: '候補者へ連絡する前に、同意状況と候補者の空き状況を確認できる参加者スケジューラーです。',
      reviewCriteria: ['同意チェックポイントの視認性', '研究者の作業負荷', '監査履歴の明確さ'],
      discussion: ['レビュアーは辞退候補者向けの空状態コピーを強めるよう依頼しました。', 'クリエイターはAI支援によるレイアウト探索を開示しました。'],
    },
    301: {
      title: '例外レビュー作業台',
      tags: ['CSV検証', 'エラーキュー', '社内DX'],
      review: '例外キューは実用的で、各インポート後にオペレーターが次に取るべき行動を明確にします。',
      summary: 'インポート検証、エラー分類、レビュー担当割り当てを扱う社内ダッシュボードです。',
      reviewCriteria: ['エラー分類', 'オペレーターのトリアージ速度', 'バッチ履歴の明確さ'],
      discussion: ['運用チームは警告とブロックエラーの違いをより明確にするよう求めました。', 'クリエイターは応募内に実データ不使用の声明を含めました。'],
    },
    401: {
      title: 'プロンプトリリースコンソール',
      tags: ['プロンプトライブラリ', 'レビューキュー', '準備状況'],
      review: 'バージョンの準備状況、レビュアーメモ、デプロイブロッカーをリリース前に比較しやすい案です。',
      summary: 'プロンプトバージョン、承認メモ、デプロイ準備チェックを管理する画面です。',
      reviewCriteria: ['プロンプトバージョン比較', '承認判断のしやすさ', 'デプロイ準備状況'],
      discussion: ['クライアントは本番キーと学習データをプロトタイプ審査から外すよう依頼しました。', 'クリエイターはUXモック判断と実装範囲を分離しました。'],
    },
  },
};

function display(entry: Entry, language: Language) {
  return entryCopy[language][entry.id];
}

export function entryTitle(entry: Entry, language: Language) {
  return display(entry, language)?.title ?? entry.title;
}

export function entryTags(entry: Entry, language: Language) {
  return display(entry, language)?.tags ?? entry.tags;
}

export function entryReview(entry: Entry, language: Language) {
  return display(entry, language)?.review ?? entry.review;
}

export function entrySummary(entry: Entry, language: Language) {
  return display(entry, language)?.summary ?? entry.summary;
}

export function entryCriteria(entry: Entry, language: Language) {
  return display(entry, language)?.reviewCriteria ?? entry.reviewCriteria;
}

export function entryDiscussion(entry: Entry, language: Language) {
  return display(entry, language)?.discussion ?? entry.discussion;
}
