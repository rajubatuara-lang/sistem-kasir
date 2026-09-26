import { useMemo, useState } from 'react';
import { Search, Eye, ReceiptText, Printer } from 'lucide-react';
import type { Transaction, PaymentMethod, TransactionStatus } from '@/types';
import { formatRupiah, formatDateTime } from '@/lib/format';
import { PaymentBadge, TxStatusBadge } from '@/components/Badges';
import Modal from '@/components/Modal';

interface TransaksiProps {
  transactions: Transaction[];
}

export default function Transaksi({ transactions }: TransaksiProps) {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState<'all' | PaymentMethod>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | TransactionStatus>('all');
  const [detail, setDetail] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (methodFilter !== 'all' && t.method !== methodFilter) return false;
      if (statusFilter !== 'all' && t.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.invoice.toLowerCase().includes(q) && !t.cashier.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [transactions, search, methodFilter, statusFilter]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="card flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor transaksi atau kasir..."
            className="input pl-9"
          />
        </div>
        <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value as 'all' | PaymentMethod)} className="input lg:w-40">
          <option value="all">Semua Metode</option>
          <option value="cash">Cash</option>
          <option value="transfer">Transfer</option>
          <option value="qris">QRIS</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | TransactionStatus)} className="input lg:w-40">
          <option value="all">Semua Status</option>
          <option value="completed">Selesai</option>
          <option value="void">Dibatalkan</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">No. Transaksi</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Kasir</th>
                <th className="px-5 py-3">Item</th>
                <th className="px-5 py-3">Metode</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Total</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-700">{t.invoice}</td>
                  <td className="px-5 py-3 text-slate-500">{formatDateTime(t.date)}</td>
                  <td className="px-5 py-3 text-slate-500">{t.cashier}</td>
                  <td className="px-5 py-3 text-slate-500">{t.items.reduce((s, it) => s + it.qty, 0)} item</td>
                  <td className="px-5 py-3"><PaymentBadge method={t.method} /></td>
                  <td className="px-5 py-3"><TxStatusBadge status={t.status} /></td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-700">{formatRupiah(t.total)}</td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => setDetail(t)}
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50"
                    >
                      <Eye className="h-3.5 w-3.5" /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <ReceiptText className="mb-2 h-10 w-10" />
            <p className="text-sm">Tidak ada transaksi ditemukan</p>
          </div>
        )}
        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
          Menampilkan {filtered.length} dari {transactions.length} transaksi
        </div>
      </div>

      {/* Detail modal */}
      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title="Detail Transaksi"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setDetail(null)}>Tutup</button>
            <button className="btn-primary" onClick={() => window.print()}>
              <Printer className="h-4 w-4" /> Cetak
            </button>
          </>
        }
      >
        {detail && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-bold text-slate-800">{detail.invoice}</p>
                <p className="text-sm text-slate-400">{formatDateTime(detail.date)}</p>
              </div>
              <TxStatusBadge status={detail.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm">
              <div>
                <p className="text-xs text-slate-400">Kasir</p>
                <p className="font-medium text-slate-700">{detail.cashier}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Metode Pembayaran</p>
                <div className="mt-0.5"><PaymentBadge method={detail.method} /></div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Item Pembelian</p>
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left text-xs font-medium text-slate-400">
                      <th className="px-4 py-2.5">Produk</th>
                      <th className="px-4 py-2.5 text-center">Qty</th>
                      <th className="px-4 py-2.5 text-right">Harga</th>
                      <th className="px-4 py-2.5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {detail.items.map((it, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2.5 text-slate-700">{it.name}</td>
                        <td className="px-4 py-2.5 text-center text-slate-500">{it.qty}</td>
                        <td className="px-4 py-2.5 text-right text-slate-500">{formatRupiah(it.price)}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-slate-700">{formatRupiah(it.qty * it.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-1.5 rounded-xl bg-slate-50 p-4 text-sm">
              <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatRupiah(detail.subtotal)}</span></div>
              {detail.discount > 0 && (
                <div className="flex justify-between text-slate-500"><span>Diskon</span><span>-{formatRupiah(detail.discount)}</span></div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-1.5 text-base font-bold text-slate-800">
                <span>Total</span><span>{formatRupiah(detail.total)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
