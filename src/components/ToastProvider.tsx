import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Toast } from '@/types';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

interface ToastContextValue {
  push: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const remove = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-900/10 animate-[slideIn_0.2s_ease-out]"
            style={{ animationName: 'slideIn' }}
          >
            {t.type === 'success' && <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />}
            {t.type === 'error' && <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />}
            {t.type === 'info' && <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />}
            <p className="text-sm font-medium text-slate-700">{t.message}</p>
            <button onClick={() => remove(t.id)} className="ml-1 text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <style>{`@keyframes slideIn { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }`}</style>
    </ToastContext.Provider>
  );
}
