import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { categories } from '../../data/categories';
import { packages } from '../../data/packages';
import { blockedPurpose, canAdvancePurpose } from '../../utils/guards';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Pill } from '../common/Pill';

const purposes = ['Compare UX direction', 'Review screen mockups', 'Test a user flow', 'See a simple motion idea', blockedPurpose];

export function ContestWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState(purposes[0]);
  const canContinue = useMemo(() => step !== 2 || canAdvancePurpose(purpose), [purpose, step]);

  const steps = ['Category', 'Package', 'Brief', 'Safety'];

  return (
    <Modal open={open} onClose={onClose} title="Open a contest">
      <div className="mb-5 grid grid-cols-4 gap-2">
        {steps.map((label, index) => (
          <button
            key={label}
            className={`focus-ring rounded-md px-3 py-2 text-sm font-bold ${step === index ? 'bg-navy text-white' : 'bg-neutralPanel text-navy/70'}`}
            onClick={() => setStep(index)}
          >
            {index + 1}. {label}
          </button>
        ))}
      </div>

      {step === 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <button key={category} className="focus-ring rounded-lg border border-navy/10 bg-white p-4 text-left font-bold hover:border-orange">
              {category}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-3 md:grid-cols-3">
          {packages.map((pack) => (
            <div key={pack.name} className="rounded-lg border border-navy/10 bg-white p-4">
              {pack.recommended && <Pill tone="orange">Recommended</Pill>}
              <h3 className="mt-3 text-xl font-black">{pack.name}</h3>
              <p className="mt-1 text-2xl font-black text-orange">{pack.price}</p>
              <p className="mt-2 text-sm text-navy/65">{pack.description}</p>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-bold">
            Contest title
            <input className="focus-ring rounded-md border border-navy/15 px-3 py-2" defaultValue="New UX mock contest" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Goal
            <textarea className="focus-ring min-h-24 rounded-md border border-navy/15 px-3 py-2" defaultValue="We want to compare screen directions before contracting production development." />
          </label>
          <div>
            <p className="mb-2 text-sm font-bold">Purpose</p>
            <div className="flex flex-wrap gap-2">
              {purposes.map((item) => (
                <Button key={item} variant={purpose === item ? 'secondary' : 'ghost'} onClick={() => setPurpose(item)}>
                  {item}
                </Button>
              ))}
            </div>
          </div>
          {!canContinue && (
            <div className="flex gap-2 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-800">
              <AlertTriangle size={18} /> MockContest does not handle production development. Submit this as UX mock comparison instead.
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          {[
            'No real customer data, personal data, or confidential information is included.',
            'No API keys, authentication information, or payment information is included.',
            'Submitted work is for prototype review and not production use.',
            'Development contracts, acceptance testing, maintenance, and security are handled directly by the parties.',
          ].map((item) => (
            <label key={item} className="flex items-start gap-3 rounded-lg border border-navy/10 bg-white p-3 text-sm font-semibold">
              <input type="checkbox" className="mt-1" />
              {item}
            </label>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={() => (step === 3 ? onClose() : setStep(step + 1))} disabled={!canContinue}>
          {step === 3 ? (
            <>
              <CheckCircle2 size={16} /> Confirm mock contest
            </>
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </Modal>
  );
}
