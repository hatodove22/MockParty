import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { Category, ContestPackage } from '../../types';
import { categories } from '../../data/categories';
import { packages } from '../../data/packages';
import { blockedPurpose, canAdvancePurpose } from '../../utils/guards';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Pill } from '../common/Pill';

const purposes = ['Compare UX direction', 'Review screen mockups', 'Test a user flow', 'See a simple motion idea', blockedPurpose];
const safetyItems = [
  'No real customer data, personal data, or confidential information is included.',
  'No API keys, authentication information, or payment information is included.',
  'Submitted work is for prototype review and not production use.',
  'Development contracts, acceptance testing, maintenance, and security are handled directly by the parties.',
];

interface ContestWizardProps {
  open?: boolean;
  onClose?: () => void;
  embedded?: boolean;
  onComplete?: () => void;
}

function statusText(step: number, category: Category | '', selectedPackage: ContestPackage | undefined, title: string, goal: string, safetyChecks: boolean[]) {
  if (step === 0 && !category) return 'Choose one category to continue.';
  if (step === 1 && !selectedPackage) return 'Choose a package to continue.';
  if (step === 2 && (!title.trim() || !goal.trim())) return 'Add a contest title and goal.';
  if (step === 3 && safetyChecks.some((checked) => !checked)) return 'Confirm every safety checkpoint before review.';
  return '';
}

function completionError(category: Category | '', selectedPackage: ContestPackage | undefined, title: string, goal: string, safetyChecks: boolean[]) {
  if (!category) return 'Choose a category before confirming.';
  if (!selectedPackage) return 'Choose a package before confirming.';
  if (!title.trim() || !goal.trim()) return 'Add a contest title and goal before confirming.';
  if (safetyChecks.some((checked) => !checked)) return 'Confirm every safety checkpoint before confirming.';
  return '';
}

export function ContestWizard({ open = true, onClose = () => undefined, embedded = false, onComplete }: ContestWizardProps) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<Category | ''>('');
  const [selectedPackageName, setSelectedPackageName] = useState<ContestPackage['name'] | ''>('');
  const [title, setTitle] = useState('New UX mock contest');
  const [goal, setGoal] = useState('We want to compare screen directions before contracting production development.');
  const [purpose, setPurpose] = useState(purposes[0]);
  const [safetyChecks, setSafetyChecks] = useState(() => safetyItems.map(() => false));
  const [error, setError] = useState('');
  const selectedPackage = useMemo(() => packages.find((pack) => pack.name === selectedPackageName), [selectedPackageName]);
  const purposeAllowed = useMemo(() => canAdvancePurpose(purpose), [purpose]);
  const steps = ['Category', 'Package', 'Brief', 'Safety', 'Review'];

  const stepStatus = statusText(step, category, selectedPackage, title, goal, safetyChecks);

  function goToStep(nextStep: number) {
    setError('');
    setStep(nextStep);
  }

  function continueWizard() {
    if (!purposeAllowed) {
      setError('MockContest does not handle production development. Switch the purpose to UX mock comparison before continuing.');
      return;
    }

    if (stepStatus) {
      setError(stepStatus);
      return;
    }

    if (step === steps.length - 1) {
      const finalError = completionError(category, selectedPackage, title, goal, safetyChecks);
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
          >
            {index + 1}. {label}
          </button>
        ))}
      </div>

      <div className="mb-4 min-h-6">
        {(error || stepStatus) && (
          <p className={`text-sm font-bold ${error ? 'text-rose-700' : 'text-navy/55'}`}>
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
            >
              {item}
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
            >
              {pack.recommended && <Pill tone="orange">Recommended</Pill>}
              <h3 className="mt-3 text-xl font-black">{pack.name}</h3>
              <p className="mt-1 text-2xl font-black text-orange">{pack.price}</p>
              <p className="mt-2 text-sm text-navy/65">{pack.description}</p>
              <p className="mt-3 text-xs font-bold text-navy/50">
                {pack.entries} - {pack.days}
              </p>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-bold">
            Contest title
            <input
              className="focus-ring rounded-md border border-navy/15 px-3 py-2"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Goal
            <textarea
              className="focus-ring min-h-24 rounded-md border border-navy/15 px-3 py-2"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            />
          </label>
          <div>
            <p className="mb-2 text-sm font-bold">Purpose</p>
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
                <AlertTriangle size={18} /> MockContest does not handle production development.
              </span>
              <Button
                variant="danger"
                onClick={() => {
                  setPurpose('Compare UX direction');
                  setError('');
                }}
              >
                Switch to UX mock comparison
              </Button>
              <Link className="font-black underline" to="/safety" onClick={onClose}>
                Safety
              </Link>
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
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
              <p className="text-xs font-bold text-navy/50">Category</p>
              <p className="mt-1 font-black">{category || 'Not selected'}</p>
            </div>
            <div className="rounded-lg bg-neutralPanel p-4">
              <p className="text-xs font-bold text-navy/50">Package</p>
              <p className="mt-1 font-black">
                {selectedPackage ? `${selectedPackage.name} - ${selectedPackage.price}` : 'Not selected'}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-navy/10 bg-white p-4">
            <p className="text-xs font-bold text-navy/50">Brief</p>
            <h3 className="mt-2 text-xl font-black">{title || 'Untitled contest'}</h3>
            <p className="mt-2 text-navy/70">{goal || 'No goal entered.'}</p>
            <p className="mt-3 text-sm font-bold text-navy/55">Purpose: {purpose}</p>
          </div>
          <div className="flex gap-3 rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-900">
            <ShieldCheck size={20} />
            <p>{safetyChecks.filter(Boolean).length} of {safetyItems.length} safety checks confirmed.</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="ghost" onClick={() => goToStep(Math.max(0, step - 1))} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={continueWizard}>
          {step === steps.length - 1 ? (
            <>
              <CheckCircle2 size={16} /> Confirm mock contest
            </>
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <Modal open={open} onClose={onClose} title="Open a contest">
      {content}
    </Modal>
  );
}
