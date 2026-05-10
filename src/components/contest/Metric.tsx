import type { ReactNode } from 'react';

export function Metric({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="mock-surface rounded-lg p-4">
      <div className="flex items-center justify-between text-navy/55">
        <span className="text-xs font-bold uppercase tracking-normal">{label}</span>
        {icon}
      </div>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}
