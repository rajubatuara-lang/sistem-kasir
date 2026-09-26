import { useMemo, useState } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingCart, Banknote, CreditCard, QrCode, X, Receipt } from 'lucide-react';
import { CATEGORIES, products as seedProducts } from '@/data';
import type { CartItem, PaymentMethod, Product, Transaction } from '@/types';
import { formatRupiah } from '@/lib/format';
import { useToast } from '@/components/ToastProvider';
import Modal from '@/components/Modal';

interface KasirProps {
  products: Product[];
  onCheckout: (tx: Transaction) => void;
}

export default function Kasir({ products, onCheckout }: KasirProps) {
  const { push } = useToast();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [method, setMethod] = useState<PaymentMethod>('cash');
  const [paid, setPaid] = useState('');
  const [receipt, setReceipt] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (p.status !== 'active') return false;
      if (category !== 'Semua' && p.category !== category) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.code.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [products, search, category]);

  const subtotal = cart.reduce((s, c) => s + c.product.price * c.qty, 0);
  const tax = Math.round(subtotal * 0.0); // no tax for MVP
  const total = subtotal + tax;
  const paidNum = parseInt(paid.replace(/[^0-9]/g, ''), 10) || 0;
  const change = paidNum - total;

  const addToCart = (p: Product) => {
    if (p.stock <= 0) {
      push('Produk ini stoknya habis', 'error');
      return;
    }
    setCart((c) => {
      const found = c.find((x) => x.product.id === p.id);
      if (found) {
        if (found.qty >= p.stock) {
          push(`Stok ${p.name} hanya ${p.stock}`, 'error');
          return c;
        }
        return c.map((x) => (x.product.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...c, { product: p, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((c) =>
      c
        .map((x) => {
          if (x.product.id !== id) return x;
          const next = x.qty + delta;
          if (next > x.product.stock) {
            push(`Stok ${x.product.name} hanya ${x.product.stock}`, 'error');
            return x;
          }
          return { ...x, qty: next };
        })
        .filter((x) => x.qty > 0),
    );
  };

  const removeItem = (id: string) => setCart((c) => c.filter((x) => x.product.id !== id));

  const clearCart = () => {
    setCart([]);
    setPaid('');
  };

  const handlePay = () => {
    if (cart.length === 0) {
      push('Keranjang masih kosong', 'error');
      return;
    }
    if (method === 'cash' && paidNum < total) {
      push('Uang dibayar kurang dari total', 'error');
      return;
    }
    const now = new Date();
    const inv = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      invoice: inv,
      date: now.toISOString(),
      cashier: 'Andi Pratama',
      items: cart.map((c) => ({ name: c.product.name, qty: c.qty, price: c.product.price })),
      subtotal,
      discount: 0,
      total,
      method,
      status: 'completed',
    };
    onCheckout(tx);
    setReceipt(tx);
    clearCart();
    push(`Pembayaran berhasil — ${inv}`, 'success');
  };

  const quickCash = [total, 50000, 100000, 150000].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="flex h-full flex-col gap-4 lg:flex-row">
      {/* Product grid */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Search + filter */}
        <div className="card mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk atau kode..."
              className="input pl-9"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={[
                  'shrink-0 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors',
                  category === c ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                ].join(' ')}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              disabled={p.stock <= 0}
              className="card group flex flex-col p-3 text-left transition-all hover:border-brand-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="mb-3 flex h-20 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 text-2xl font-bold text-slate-300">
                {p.name.charAt(0)}
              </div>
              <p className="line-clamp-2 text-sm font-semibold text-slate-700">{p.name}</p>
              <p className="mt-0.5 text-xs text-slate-400">{p.code}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-brand-600">{formatRupiah(p.price)}</span>
                <span className={`text-xs font-medium ${p.stock <= 5 ? 'text-rose-500' : 'text-slate-400'}`}>
                  Stok {p.stock}
                </span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-16 text-slate-400">
              <Search className="mb-2 h-8 w-8" />
              <p className="text-sm">Produk tidak ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Cart */}
      <div className="flex w-full shrink-0 flex-col lg:w-[380px]">
        <div className="card flex max-h-[calc(100vh-7rem)] flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-brand-600" />
              <h3 className="text-sm font-semibold text-slate-800">Keranjang</h3>
              {cart.length > 0 && (
                <span className="badge bg-brand-50 text-brand-700">{cart.reduce((s, c) => s + c.qty, 0)} item</span>
              )}
            </div>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-xs font-medium text-rose-500 hover:text-rose-600">
                Kosongkan
              </button>
            )}
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-300">
                <ShoppingCart className="mb-3 h-12 w-12" />
                <p className="text-sm text-slate-400">Keranjang masih kosong</p>
                <p className="text-xs text-slate-400">Pilih produk untuk mulai transaksi</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((c) => (
                  <div key={c.product.id} className="flex gap-3 rounded-xl border border-slate-100 p-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-400">
                      {c.product.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-700">{c.product.name}</p>
                      <p className="text-xs text-slate-400">{formatRupiah(c.product.price)}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <button
                          onClick={() => updateQty(c.product.id, -1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-slate-700">{c.qty}</span>
                        <button
                          onClick={() => updateQty(c.product.id, 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => removeItem(c.product.id)}
                          className="ml-auto text-slate-300 hover:text-rose-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right text-sm font-semibold text-slate-700">
                      {formatRupiah(c.product.price * c.qty)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary + payment */}
          {cart.length > 0 && (
            <div className="border-t border-slate-100 p-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Pajak</span>
                  <span>{formatRupiah(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-bold text-slate-800">
                  <span>Total</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>

              {/* Payment method */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-slate-500">Metode Pembayaran</p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: 'cash', label: 'Cash', icon: Banknote },
                    { id: 'transfer', label: 'Transfer', icon: CreditCard },
                    { id: 'qris', label: 'QRIS', icon: QrCode },
                  ] as const).map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={[
                          'flex flex-col items-center gap-1 rounded-xl border py-2.5 text-xs font-medium transition-colors',
                          method === m.id
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50',
                        ].join(' ')}
                      >
                        <Icon className="h-4 w-4" />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cash input */}
              {method === 'cash' && (
                <div className="mt-3">
                  <input
                    value={paid}
                    onChange={(e) => setPaid(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Uang dibayar"
                    inputMode="numeric"
                    className="input"
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {quickCash.map((v) => (
                      <button
                        key={v}
                        onClick={() => setPaid(String(v))}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
                      >
                        {formatRupiah(v)}
                      </button>
                    ))}
                  </div>
                  {paidNum > 0 && (
                    <p className={`mt-2 text-sm font-medium ${change >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      Kembalian: {formatRupiah(Math.max(change, 0))}
                    </p>
                  )}
                </div>
              )}

              <button onClick={handlePay} className="btn-primary mt-4 w-full py-3 text-base">
                Bayar {formatRupiah(total)}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Receipt modal */}
      <Modal
        open={!!receipt}
        onClose={() => setReceipt(null)}
        title="Struk Pembayaran"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setReceipt(null)}>
              Tutup
            </button>
            <button className="btn-primary" onClick={() => window.print()}>
              <Receipt className="h-4 w-4" /> Cetak Struk
            </button>
          </>
        }
      >
        {receipt && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-base font-bold text-slate-800">KasirPOS</p>
              <p className="text-xs text-slate-400">Jl. Merdeka No. 123, Jakarta</p>
            </div>
            <div className="border-t border-dashed border-slate-200 pt-3 text-sm text-slate-500">
              <div className="flex justify-between"><span>No. Transaksi</span><span className="font-medium text-slate-700">{receipt.invoice}</span></div>
              <div className="flex justify-between"><span>Tanggal</span><span>{new Date(receipt.date).toLocaleString('id-ID')}</span></div>
              <div className="flex justify-between"><span>Kasir</span><span>{receipt.cashier}</span></div>
              <div className="flex justify-between"><span>Metode</span><span className="uppercase">{receipt.method}</span></div>
            </div>
            <div className="border-t border-dashed border-slate-200 pt-3">
              {receipt.items.map((it, i) => (
                <div key={i} className="mb-2 flex justify-between text-sm">
                  <div>
                    <p className="text-slate-700">{it.name}</p>
                    <p className="text-xs text-slate-400">{it.qty} x {formatRupiah(it.price)}</p>
                  </div>
                  <span className="font-medium text-slate-700">{formatRupiah(it.qty * it.price)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-slate-200 pt-3 text-sm">
              <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatRupiah(receipt.subtotal)}</span></div>
              <div className="flex justify-between font-bold text-slate-800"><span>Total</span><span>{formatRupiah(receipt.total)}</span></div>
              {receipt.method === 'cash' && (
                <>
                  <div className="flex justify-between text-slate-500"><span>Tunai</span><span>{formatRupiah(paidNum || receipt.total)}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Kembalian</span><span>{formatRupiah(Math.max((paidNum || receipt.total) - receipt.total, 0))}</span></div>
                </>
              )}
            </div>
            <p className="text-center text-xs text-slate-400">Terima kasih atas kunjungan Anda!</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
