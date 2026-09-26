import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ToastProvider } from '@/components/ToastProvider';
import Dashboard from '@/pages/Dashboard';
import Kasir from '@/pages/Kasir';
import Produk from '@/pages/Produk';
import Transaksi from '@/pages/Transaksi';
import Laporan from '@/pages/Laporan';
import Pengaturan from '@/pages/Pengaturan';
import { products as seedProducts, transactions as seedTransactions } from '@/data';
import type { Page, Product, Transaction } from '@/types';

const PAGE_META: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Ringkasan aktivitas toko Anda hari ini' },
  kasir: { title: 'Kasir', subtitle: 'Lakukan transaksi penjualan baru' },
  produk: { title: 'Produk', subtitle: 'Kelola katalog dan stok produk' },
  transaksi: { title: 'Transaksi', subtitle: 'Riwayat seluruh transaksi' },
  laporan: { title: 'Laporan', subtitle: 'Analisa penjualan dan performa toko' },
  pengaturan: { title: 'Pengaturan', subtitle: 'Konfigurasi toko, kasir, dan sistem' },
};

function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);

  const handleCheckout = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
    // Reduce stock
    setProducts((prev) =>
      prev.map((p) => {
        const item = tx.items.find((it) => it.name === p.name);
        if (!item) return p;
        return { ...p, stock: Math.max(p.stock - item.qty, 0) };
      }),
    );
  };

  const meta = PAGE_META[page];

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-slate-100">
        <Sidebar
          current={page}
          onNavigate={setPage}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            title={meta.title}
            subtitle={meta.subtitle}
            onOpenMobile={() => setMobileOpen(true)}
          />

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
            {page === 'kasir' && <Kasir products={products} onCheckout={handleCheckout} />}
            {page === 'produk' && <Produk products={products} setProducts={setProducts} />}
            {page === 'transaksi' && <Transaksi transactions={transactions} />}
            {page === 'laporan' && <Laporan />}
            {page === 'pengaturan' && <Pengaturan />}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
