import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Memuat data...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="h-12 w-12 animate-spin text-brand-600 mb-4" />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}
