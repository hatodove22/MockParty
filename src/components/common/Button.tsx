import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const variants: Record<Variant, string> = {
  primary: 'bg-contestGreen text-white hover:bg-contestGreen/90',
  secondary: 'bg-navy text-white hover:bg-navy/90',
  ghost: 'bg-white text-navy border border-navy/15 hover:border-contestGreen/60',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
