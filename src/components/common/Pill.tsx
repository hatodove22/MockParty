import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

const toneClasses = {
  navy: 'bg-navy/10 text-navy',
  orange: 'bg-orange/10 text-orange',
  green: 'bg-contestGreen/10 text-contestGreen',
  emerald: 'bg-emerald-100 text-emerald-800',
  amber: 'bg-amber-100 text-amber-800',
  rose: 'bg-rose-100 text-rose-800',
  slate: 'bg-slate-100 text-slate-700',
};

export function Pill({
  children,
  tone = 'slate',
}: {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
}) {
  return <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-bold', toneClasses[tone])}>{children}</span>;
}
