import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { Category, ContestPackage } from '../../types';
import { categories } from '../../data/categories';
import { packages } from '../../data/packages';
import { blockedPurpose, canAdvancePurpose } from '../../utils/guards';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Pill } from '../common/Pill';

const purposeOptions = {
  en: ['Compare UX direction', 'Review screen mockups', 'Test a user flow', 'See a simple motion idea', blockedPurpose],
  ja: ['UXの方向性を比較する', '画面モックを確認する', 'ユーザーフローを検証する', '簡単な動きの案を見る', blockedPurpose],
} as const;

const safetyCopy = {
  en: [
    'No real customer data, personal data, or confidential information is included.',
    'No API keys, authentication information, or payment information is included.',
    'Submitted work is for prototype review and not production use.',
    'Development contracts, acceptance testing, maintenance, and security are handled directly by the parties.',
  ],
  ja: [
    '実在の顧客データ、個人情報、機密情報を含めていません。',
    'APIキー、認証情報、決済情報を含めていません。',
    '提出物はプロトタイプ審査用であり、本番利用を保証しません。',
    '開発契約、受入テスト、保守、セキュリティは当事者間で別途扱います。',
  ],
} as const;

const packageCopy = {
  en: {
    Starter: { name: 'Starter', entries: '3-5 entries', days: '5 days', description: 'Best for a quick direction check before deeper design work.' },
    Standard: { name: 'Standard', entries: '5-8 entries', days: '7 days', description: 'Recommended for serious UX exploration with clearer feedback.' },
    Premium: { name: 'Premium', entries: '8-12 entries', days: '10 days', description: 'For complex flows and multiple screen-state comparisons.' },
    recommended: 'Recommended',
  },
  ja: {
    Starter: { name: 'スターター', entries: '3-5件の応募', days: '5日間', description: '深いデザイン作業の前に、方向性を素早く確認するためのプランです。' },
    Standard: { name: 'スタンダード', entries: '5-8件の応募', days: '7日間', description: 'より明確なフィードバックを含む、本格的なUX探索に向いた推奨プランです。' },
    Premium: { name: 'プレミアム', entries: '8-12件の応募', days: '10日間', description: '複雑なフローや複数の画面状態を比較するためのプランです。' },
    recommended: 'おすすめ',
  },
} as const;

interface ContestWizardProps {
  open?: boolean;
  onClose?: () => void;
  embedded?: boolean;
  onComplete?: () => void;
}

const wizardCopy = {
  en: {
    steps: ['Category', 'Package', 'Brief', 'Safety', 'Review'],
    chooseCategory: 'Choose one category to continue.',
    choosePackage: 'Choose a package to continue.',
    addBrief: 'Add a contest title and goal.',
    safety: 'Confirm every safety checkpoint before review.',
    productionBlocked: 'MockContest does not handle production development. Switch the purpose to UX mock comparison before continuing.',
    productionNotice: 'MockContest does not handle production development.',
    switchPurpose: 'Switch to UX mock comparison',
    safetyLink: 'Safety',
    titleLabel: 'Contest title',
    goalLabel: 'Goal',
    purposeLabel: 'Purpose',
    categoryLabel: 'Category',
    packageLabel: 'Package',
    briefLabel: 'Brief',
    notSelected: 'Not selected',
    untitled: 'Untitled contest',
    noGoal: 'No goal entered.',
    confirmedCount: (count: number, total: number) => `${count} of ${total} safety checks confirmed.`,
    modalTitle: 'Open a contest',
    completion: {
      category: 'Choose a category before confirming.',
      package: 'Choose a package before confirming.',
      brief: 'Add a contest title and goal before confirming.',
      safety: 'Confirm every safety checkpoint before confirming.',
    },
    back: 'Back',
    next: 'Next',
    confirm: 'Confirm mock contest',
  },
  ja: {
    steps: ['カテゴリ', 'パッケージ', '依頼内容', '安全確認', '確認'],
    chooseCategory: '続行するにはカテゴリを1つ選んでください。',
    choosePackage: '続行するにはパッケージを選んでください。',
    addBrief: 'コンテストタイトルと目的を入力してください。',
    safety: '確認へ進む前に、すべての安全項目にチェックしてください。',
    productionBlocked: 'MockContestは本番開発を扱いません。続行するには用途をUXモック比較へ切り替えてください。',
    productionNotice: 'MockContestは本番開発を扱いません。',
    switchPurpose: 'UXモック比較へ切り替える',
    safetyLink: '安全方針',
    titleLabel: 'コンテストタイトル',
    goalLabel: '目的',
    purposeLabel: '用途',
    categoryLabel: 'カテゴリ',
    packageLabel: 'パッケージ',
    briefLabel: '依頼内容',
    notSelected: '未選択',
    untitled: '無題のコンテスト',
    noGoal: '目的が未入力です。',
    confirmedCount: (count: number, total: number) => `${total}件中${count}件の安全確認が完了しています。`,
    modalTitle: 'コンテストを開始',
    completion: {
      category: '確定前にカテゴリを選んでください。',
      package: '確定前にパッケージを選んでください。',
      brief: '確定前にコンテストタイトルと目的を入力してください。',
      safety: '確定前にすべての安全項目を確認してください。',
    },
    back: '戻る',
    next: '次へ',
    confirm: 'モックコンテストを確認',
  },
} as const;

type WizardText = (typeof wizardCopy)[keyof typeof wizardCopy];

function statusText(step: number, category: Category | '', selectedPackage: ContestPackage | undefined, title: string, goal: string, safetyChecks: boolean[], copy: WizardText) {
  if (step === 0 && !category) return copy.chooseCategory;
  if (step === 1 && !selectedPackage) return copy.choosePackage;
  if (step === 2 && (!title.trim() || !goal.trim())) return copy.addBrief;
  if (step === 3 && safetyChecks.some((checked) => !checked)) return copy.safety;
  return '';
}

function completionError(category: Category | '', selectedPackage: ContestPackage | undefined, title: string, goal: string, safetyChecks: boolean[], copy: WizardText) {
  if (!category) return copy.completion.category;
  if (!selectedPackage) return copy.completion.package;
  if (!title.trim() || !goal.trim()) return copy.completion.brief;
  if (safetyChecks.some((checked) => !checked)) return copy.completion.safety;
  return '';
}

export function ContestWizard({ open = true, onClose = () => undefined, embedded = false, onComplete }: ContestWizardProps) {
  const { categoryLabel, language } = useLanguage();
  const packageText = packageCopy[language];
  const text = wizardCopy[language];
  const purposes = purposeOptions[language];
  const safetyItems = safetyCopy[language];
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<Category | ''>('');
  const [selectedPackageName, setSelectedPackageName] = useState<ContestPackage['name'] | ''>('');
  const [title, setTitle] = useState('New UX mock contest');
  const [goal, setGoal] = useState('We want to compare screen directions before contracting production development.');
  const [purpose, setPurpose] = useState<string>(purposes[0]);
  const [safetyChecks, setSafetyChecks] = useState(() => safetyItems.map(() => false));
  const [error, setError] = useState('');
  const selectedPackage = useMemo(() => packages.find((pack) => pack.name === selectedPackageName), [selectedPackageName]);
  const purposeAllowed = useMemo(() => canAdvancePurpose(purpose), [purpose]);
  const steps = text.steps;

  const stepStatus = statusText(step, category, selectedPackage, title, goal, safetyChecks, text);

  function goToStep(nextStep: number) {
    setError('');
    setStep(nextStep);
  }

  function continueWizard() {
    if (!purposeAllowed) {
      setError(text.productionBlocked);
      return;
    }

    if (stepStatus) {
      setError(stepStatus);
      return;
    }

    if (step === steps.length - 1) {
      const finalError = completionError(category, selectedPackage, title, goal, safetyChecks, text);
      if (finalError) {
        setError(finalError);
        return;
      }
      onComplete?.();
      onClose();
      return;
    }

    goToStep(step + 1);
  }

  const content = (
    <div className={embedded ? 'mock-surface rounded-lg p-5' : ''}>
      <div className="mb-5 grid gap-2 sm:grid-cols-5">
        {steps.map((label, index) => (
          <button
            key={label}
            className={`focus-ring rounded-md px-3 py-2 text-sm font-bold ${step === index ? 'bg-navy text-white' : 'bg-neutralPanel text-navy/70'}`}
            onClick={() => goToStep(index)}
            aria-current={step === index ? 'step' : undefined}
          >
            {index + 1}. {label}
          </button>
        ))}
      </div>

      <div className="mb-4 min-h-6">
        {(error || stepStatus) && (
          <p id="contest-wizard-status" className={`text-sm font-bold ${error ? 'text-rose-700' : 'text-navy/55'}`} role={error ? 'alert' : undefined}>
            {error || stepStatus}
          </p>
        )}
      </div>

      {step === 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((item) => (
            <button
              key={item}
              className={`focus-ring rounded-lg border bg-white p-4 text-left font-bold hover:border-orange ${
                category === item ? 'border-orange shadow-sm' : 'border-navy/10'
              }`}
              onClick={() => {
                setCategory(item);
                setError('');
              }}
              aria-pressed={category === item}
            >
              {categoryLabel(item)}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-3 md:grid-cols-3">
          {packages.map((pack) => (
            <button
              key={pack.name}
              className={`focus-ring rounded-lg border bg-white p-4 text-left hover:border-orange ${
                selectedPackageName === pack.name ? 'border-orange shadow-sm' : 'border-navy/10'
              }`}
              onClick={() => {
                setSelectedPackageName(pack.name);
                setError('');
              }}
              aria-pressed={selectedPackageName === pack.name}
            >
              {pack.recommended && <Pill tone="orange">{packageText.recommended}</Pill>}
              <h3 className="mt-3 text-xl font-black">{packageText[pack.name].name}</h3>
              <p className="mt-1 text-2xl font-black text-orange">{pack.price}</p>
              <p className="mt-2 text-sm text-navy/65">{packageText[pack.name].description}</p>
              <p className="mt-3 text-xs font-bold text-navy/50">
                {packageText[pack.name].entries} - {packageText[pack.name].days}
              </p>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-bold">
            {text.titleLabel}
            <input
              className="focus-ring rounded-md border border-navy/15 px-3 py-2"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-invalid={step === 2 && !title.trim()}
            aria-describedby="contest-wizard-status"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            {text.goalLabel}
            <textarea
              className="focus-ring min-h-24 rounded-md border border-navy/15 px-3 py-2"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              aria-invalid={step === 2 && !goal.trim()}
              aria-describedby="contest-wizard-status"
            />
          </label>
          <div>
            <p className="mb-2 text-sm font-bold">{text.purposeLabel}</p>
            <div className="flex flex-wrap gap-2">
              {purposes.map((item) => (
                <Button
                  key={item}
                  variant={purpose === item ? 'secondary' : 'ghost'}
                  onClick={() => {
                    setPurpose(item);
                    setError('');
                  }}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          {!purposeAllowed && (
            <div className="grid gap-3 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-800 sm:grid-cols-[1fr_auto_auto] sm:items-center">
              <span className="flex gap-2">
                <AlertTriangle size={18} /> {text.productionNotice}
              </span>
              <Button
                variant="danger"
                onClick={() => {
                  setPurpose(purposes[0]);
                  setError('');
                }}
              >
                {text.switchPurpose}
              </Button>
              <Link className="font-black underline" to="/safety" onClick={onClose}>
                {text.safetyLink}
              </Link>
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3" aria-describedby="contest-wizard-status">
          {safetyItems.map((item, index) => (
            <label key={item} className="flex items-start gap-3 rounded-lg border border-navy/10 bg-white p-3 text-sm font-semibold">
              <input
                type="checkbox"
                className="mt-1"
                checked={safetyChecks[index]}
                onChange={(event) => {
                  setSafetyChecks((current) => current.map((checked, checkedIndex) => (checkedIndex === index ? event.target.checked : checked)));
                  setError('');
                }}
              />
              {item}
            </label>
          ))}
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-neutralPanel p-4">
              <p className="text-xs font-bold text-navy/50">{text.categoryLabel}</p>
              <p className="mt-1 font-black">{category ? categoryLabel(category) : text.notSelected}</p>
            </div>
            <div className="rounded-lg bg-neutralPanel p-4">
              <p className="text-xs font-bold text-navy/50">{text.packageLabel}</p>
              <p className="mt-1 font-black">
                {selectedPackage ? `${packageText[selectedPackage.name].name} - ${selectedPackage.price}` : text.notSelected}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-navy/10 bg-white p-4">
            <p className="text-xs font-bold text-navy/50">{text.briefLabel}</p>
            <h3 className="mt-2 text-xl font-black">{title || text.untitled}</h3>
            <p className="mt-2 text-navy/70">{goal || text.noGoal}</p>
            <p className="mt-3 text-sm font-bold text-navy/55">{text.purposeLabel}: {purpose}</p>
          </div>
          <div className="flex gap-3 rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-900">
            <ShieldCheck size={20} />
            <p>{text.confirmedCount(safetyChecks.filter(Boolean).length, safetyItems.length)}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="ghost" onClick={() => goToStep(Math.max(0, step - 1))} disabled={step === 0}>
          {text.back}
        </Button>
        <Button onClick={continueWizard}>
          {step === steps.length - 1 ? (
            <>
              <CheckCircle2 size={16} /> {text.confirm}
            </>
          ) : (
            text.next
          )}
        </Button>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <Modal open={open} onClose={onClose} title={text.modalTitle}>
      {content}
    </Modal>
  );
}
