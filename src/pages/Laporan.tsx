import { useMemo, useState } from 'react';
import { Wallet, ReceiptText, Package, TrendingUp, Download, Calendar } from 'lucide-react';
import BarChart from '@/components/BarChart';
import { transactions, weeklySales } from '@/data';
import type { Transaction } from '@/types';
import { formatRupiah, formatDate } from '@/lib/format';
import { PaymentBadge, TxStatusBadge } from '@/components/Badges';
import { useToast } from '@/components/ToastProvider';

const dayLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export default function Laporan() {
  const { push } = useToast();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (t.status !== 'completed') return false;
      const d = new Date(t.date);
      if (from && d < new Date(from)) return false;
      if (to && d > new Date(to + 'T23:59:59')) return false;
      return true;
    });
  }, [from, to]);

  const totalSales = filtered.reduce((s, t) => s + t.total, 0);
  const totalTx = filtered.length;
  const totalItems = filtered.reduce((s, t) => s + t.items.reduce((x, it) => x + it.qty, 0), 0);
  const avgTx = totalTx > 0 ? Math.round(totalSales / totalTx) : 0;

  // Best sellers
  const productMap = new Map<string, { qty: number; revenue: number }>();
  filtered.forEach((t) =>
    t.items.forEach((it) => {
      const cur = productMap.get(it.name) || { qty: 0, revenue: 0 };
      cur.qty += it.qty;
      cur.revenue += it.qty * it.price;
      productMap.set(it.name, cur);
    }),
  );
  const bestSellers = [...productMap.entries()].sort((a, b) => b[1].qty - a[1].qty).slice(0, 5);

  const handleExport = () => {
    push('Laporan berhasil diekspor (CSV)', 'success');
  };

  const summary = [
    { label: 'Total Penjualan', value: formatRupiah(totalSales), icon: Wallet, color: 'bg-brand-50 text-brand-600' },
    { label: 'Total Transaksi', value: String(totalTx), icon: ReceiptText, color: 'bg-blue-50 text-blue-600' },
    { label: 'Produk Terjual', value: String(totalItems), icon: Package, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Rata-rata per Transaksi', value: formatRupiah(avgTx), icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="card flex flex-col gap-3 p-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Dari Tanggal</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="input pl-9" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Sampai Tanggal</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input pl-9" />
            </div>
          </div>
          <button
            onClick={() => { setFrom(''); setTo(''); }}
            className="btn-secondary"
          >
            Reset
          </button>
        </div>
        <button onClick={handleExport} className="btn-primary shrink-0">
          <Download className="h-4 w-4" /> Export Laporan
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-5">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart + best sellers */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-800">Grafik Penjualan</h3>
            <p className="text-xs text-slate-400">Tren 7 hari terakhir</p>
          </div>
          <BarChart data={weeklySales} labels={dayLabels} formatValue={formatRupiah} />
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-800">Produk Terlaris</h3>
          <p className="text-xs text-slate-400">Berdasarkan jumlah terjual</p>
          <div className="mt-4 space-y-3">
            {bestSellers.length === 0 && <p className="py-8 text-center text-sm text-slate-400">Belum ada data</p>}
            {bestSellers.map(([name, data], i) => {
              const max = bestSellers[0]?.[1].qty || 1;
              return (
                <div key={name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-[11px] font-semibold text-slate-500">{i + 1}</span>
                      {name}
                    </span>
                    <span className="font-semibold text-slate-600">{data.qty}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${(data.qty / max) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sales table */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-slate-800">Tabel Laporan Penjualan</h3>
          <p className="text-xs text-slate-400">Detail transaksi pada rentang tanggal terpilih</p>
        </div>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((t: Transaction) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-700">{t.invoice}</td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(t.date)}</td>
                  <td className="px-5 py-3 text-slate-500">{t.cashier}</td>
                  <td className="px-5 py-3 text-slate-500">{t.items.reduce((s, it) => s + it.qty, 0)}</td>
                  <td className="px-5 py-3"><PaymentBadge method={t.method} /></td>
                  <td className="px-5 py-3"><TxStatusBadge status={t.status} /></td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-700">{formatRupiah(t.total)}</td>
                </tr>
              ))}
            </tbody>
            {filtered.length > 0 && (
              <tfoot>
                <tr className="border-t border-slate-200 bg-slate-50 font-semibold text-slate-800">
                  <td className="px-5 py-3" colSpan={6}>Total Penjualan</td>
                  <td className="px-5 py-3 text-right">{formatRupiah(totalSales)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <ReceiptText className="mb-2 h-10 w-10" />
            <p className="text-sm">Tidak ada data pada rentang ini</p>
          </div>
        )}
      </div>
    </div>
  );
}
