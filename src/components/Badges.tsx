import type { PaymentMethod, ProductStatus, TransactionStatus } from '@/types';

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  if (status === 'active') {
    return <span className="badge bg-emerald-50 text-emerald-700">Aktif</span>;
  }
  return <span className="badge bg-slate-100 text-slate-500">Nonaktif</span>;
}

export function PaymentBadge({ method }: { method: PaymentMethod }) {
  const map: Record<PaymentMethod, { label: string; cls: string }> = {
    cash: { label: 'Cash', cls: 'bg-emerald-50 text-emerald-700' },
    transfer: { label: 'Transfer', cls: 'bg-blue-50 text-blue-700' },
    qris: { label: 'QRIS', cls: 'bg-violet-50 text-violet-700' },
  };
  const m = map[method];
  return <span className={`badge ${m.cls}`}>{m.label}</span>;
}

export function TxStatusBadge({ status }: { status: TransactionStatus }) {
  const map: Record<TransactionStatus, { label: string; cls: string }> = {
    completed: { label: 'Selesai', cls: 'bg-emerald-50 text-emerald-700' },
    void: { label: 'Dibatalkan', cls: 'bg-rose-50 text-rose-700' },
    pending: { label: 'Pending', cls: 'bg-amber-50 text-amber-700' },
  };
  const s = map[status];
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
}
