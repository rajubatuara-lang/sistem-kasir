import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ToastProvider } from '@/components/ToastProvider';
import Dashboard from '@/pages/Dashboard';
import Kasir from '@/pages/Kasir';
import Produk from '@/pages/Produk';
import Transaksi from '@/pages/Transaksi';
import Laporan from '@/pages/Laporan';
import Pengaturan from '@/pages/Pengaturan';
import { useProducts } from '@/hooks/useProducts';
import { useTransactions } from '@/hooks/useTransactions';
import type { Page, Transaction } from '@/types';

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

  // Use Supabase hooks
  const {
    products,
    loading: productsLoading,
    addProduct,
    editProduct,
    removeProduct,
  } = useProducts();
  
  const {
    transactions,
    loading: transactionsLoading,
    addTransaction,
  } = useTransactions();

  const handleCheckout = async (tx: Transaction) => {
    // Save transaction to Supabase
    const result = await addTransaction(tx);
    
    if (result.success) {
      // Update stock for each item in the transaction
      for (const item of tx.items) {
        const product = products.find((p) => p.name === item.name);
        if (product) {
          await editProduct(product.id, {
            stock: Math.max(product.stock - item.qty, 0),
          });
        }
      }
    }
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
            
            {page === 'kasir' && (
              productsLoading ? (
                <LoadingSpinner message="Memuat produk..." />
              ) : (
                <Kasir products={products} onCheckout={handleCheckout} />
              )
            )}
            
            {page === 'produk' && (
              productsLoading ? (
                <LoadingSpinner message="Memuat produk..." />
              ) : (
                <Produk
                  products={products}
                  onAdd={addProduct}
                  onEdit={editProduct}
                  onDelete={removeProduct}
                />
              )
            )}
            
            {page === 'transaksi' && (
              transactionsLoading ? (
                <LoadingSpinner message="Memuat transaksi..." />
              ) : (
                <Transaksi transactions={transactions} />
              )
            )}
            
            {page === 'laporan' && <Laporan />}
            {page === 'pengaturan' && <Pengaturan />}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
