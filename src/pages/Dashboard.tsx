import { Wallet, ReceiptText, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import BarChart from '@/components/BarChart';
import { PaymentBadge, TxStatusBadge } from '@/components/Badges';
import { transactions, weeklySales } from '@/data';
import { formatRupiah, formatDateTime } from '@/lib/format';
import type { Page } from '@/types';

interface DashboardProps {
  onNavigate: (p: Page) => void;
}

const dayLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const todayTx = transactions.filter((t) => {
    const d = new Date(t.date);
    const now = new Date();
    return d.toDateString() === now.toDateString() && t.status === 'completed';
  });
  const todayRevenue = todayTx.reduce((s, t) => s + t.total, 0);
  const productsSold = todayTx.reduce((s, t) => s + t.items.reduce((x, it) => x + it.qty, 0), 0);
  const txCount = todayTx.length;

  const recent = [...transactions].slice(0, 6);

  const stats = [
    {
      label: 'Penjualan Hari Ini',
      value: formatRupiah(todayRevenue),
      icon: Wallet,
      trend: '+12.5%',
      up: true,
      color: 'bg-brand-50 text-brand-600',
    },
    {
      label: 'Jumlah Transaksi',
      value: String(txCount),
      icon: ReceiptText,
      trend: '+8.2%',
      up: true,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Produk Terjual',
      value: String(productsSold),
      icon: Package,
      trend: '+5.1%',
      up: true,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Pendapatan Bulan Ini',
      value: formatRupiah(4250000),
      icon: TrendingUp,
      trend: '-2.3%',
      up: false,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-5">
              <div className="flex items-start justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={[
                    'inline-flex items-center gap-0.5 text-xs font-semibold',
                    s.up ? 'text-emerald-600' : 'text-rose-600',
                  ].join(' ')}
                >
                  {s.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {s.trend}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart + best product */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Grafik Penjualan</h3>
              <p className="text-xs text-slate-400">7 hari terakhir</p>
            </div>
            <button
              onClick={() => onNavigate('laporan')}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              Lihat laporan
            </button>
          </div>
          <BarChart data={weeklySales} labels={dayLabels} formatValue={formatRupiah} />
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-800">Produk Terlaris</h3>
          <p className="text-xs text-slate-400">Minggu ini</p>
          <div className="mt-4 space-y-3">
            {[
              { name: 'Nasi Goreng Spesial', qty: 48, pct: 100 },
              { name: 'Es Teh Manis', qty: 42, pct: 87 },
              { name: 'Ayam Geprek', qty: 35, pct: 73 },
              { name: 'Kopi Susu', qty: 28, pct: 58 },
              { name: 'Keripik Singkong', qty: 22, pct: 46 },
            ].map((p, i) => (
              <div key={p.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-[11px] font-semibold text-slate-500">
                      {i + 1}
                    </span>
                    {p.name}
                  </span>
                  <span className="font-semibold text-slate-600">{p.qty}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Transaksi Terbaru</h3>
            <p className="text-xs text-slate-400">Riwayat transaksi terkini</p>
          </div>
          <button
            onClick={() => onNavigate('transaksi')}
            className="text-xs font-medium text-brand-600 hover:text-brand-700"
          >
            Lihat semua
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">No. Transaksi</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Kasir</th>
                <th className="px-5 py-3">Metode</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recent.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-700">{t.invoice}</td>
                  <td className="px-5 py-3 text-slate-500">{formatDateTime(t.date)}</td>
                  <td className="px-5 py-3 text-slate-500">{t.cashier}</td>
                  <td className="px-5 py-3"><PaymentBadge method={t.method} /></td>
                  <td className="px-5 py-3"><TxStatusBadge status={t.status} /></td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-700">{formatRupiah(t.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
