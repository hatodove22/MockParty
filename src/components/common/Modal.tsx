import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy/45 p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="mock-surface max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg">
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
          <h2 className="text-lg font-black">{title}</h2>
          <button aria-label="close" className="focus-ring rounded-md p-2 hover:bg-navy/5" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
