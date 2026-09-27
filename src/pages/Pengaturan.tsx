import { useState } from 'react';
import { Store, User, CreditCard, Settings as SettingsIcon, Save, Upload, Database, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';
import { testConnectionWithFeedback } from '@/lib/supabase-test';

type Tab = 'toko' | 'kasir' | 'pembayaran' | 'umum' | 'database';

export default function Pengaturan() {
  const { push } = useToast();
  const [tab, setTab] = useState<Tab>('toko');
  const [dbTestLoading, setDbTestLoading] = useState(false);
  const [dbTestResult, setDbTestResult] = useState<{ success: boolean; message: string; details?: any } | null>(null);

  const [store, setStore] = useState({
    name: 'Toko Berkah Jaya',
    address: 'Jl. Merdeka No. 123, Jakarta Pusat',
    phone: '0812-3456-7890',
    email: 'toko@berkahjaya.com',
    taxRate: '0',
  });

  const [cashier, setCashier] = useState({
    name: 'Andi Pratama',
    username: 'andi',
    email: 'andi@berkahjaya.com',
    role: 'Kasir',
  });

  const [payment, setPayment] = useState({
    cashEnabled: true,
    transferEnabled: true,
    qrisEnabled: true,
    bankName: 'BCA',
    bankAccount: '1234567890',
    bankHolder: 'Toko Berkah Jaya',
    qrisMerchant: 'BRILINKXXX',
  });

  const [general, setGeneral] = useState({
    currency: 'IDR',
    receiptFooter: 'Terima kasih atas kunjungan Anda!',
    lowStockThreshold: '5',
    printAuto: false,
  });

  const saveTab = (which: Tab) => {
    push(`Pengaturan ${which} berhasil disimpan`, 'success');
  };

  const testDatabaseConnection = async () => {
    setDbTestLoading(true);
    setDbTestResult(null);
    
    try {
      const result = await testConnectionWithFeedback();
      setDbTestResult(result);
      
      if (result.success) {
        push('Koneksi Supabase berhasil!', 'success');
      } else {
        push('Koneksi Supabase gagal', 'error');
      }
    } catch (error: any) {
      setDbTestResult({
        success: false,
        message: `Error: ${error.message}`,
      });
      push('Gagal test koneksi', 'error');
    } finally {
      setDbTestLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof Store }[] = [
    { id: 'toko', label: 'Profil Toko', icon: Store },
    { id: 'kasir', label: 'Informasi Kasir', icon: User },
    { id: 'pembayaran', label: 'Pengaturan Pembayaran', icon: CreditCard },
    { id: 'umum', label: 'Pengaturan Umum', icon: SettingsIcon },
    { id: 'database', label: 'Database Supabase', icon: Database },
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Tab nav */}
      <div className="card h-fit w-full p-2 lg:w-64 lg:shrink-0">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={[
                'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                tab === t.id ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100',
              ].join(' ')}
            >
              <Icon className={['h-5 w-5', tab === t.id ? 'text-brand-600' : 'text-slate-400'].join(' ')} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="card min-w-0 flex-1 p-6">
        {tab === 'toko' && (
          <div className="max-w-2xl space-y-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Profil Toko</h3>
              <p className="text-sm text-slate-400">Informasi yang tampil pada struk dan laporan</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <Store className="h-8 w-8" />
              </div>
              <button className="btn-secondary">
                <Upload className="h-4 w-4" /> Ganti Logo
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Nama Toko</label>
                <input value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} className="input" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Alamat</label>
                <textarea value={store.address} onChange={(e) => setStore({ ...store, address: e.target.value })} rows={2} className="input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Telepon</label>
                <input value={store.phone} onChange={(e) => setStore({ ...store, phone: e.target.value })} className="input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Email</label>
                <input value={store.email} onChange={(e) => setStore({ ...store, email: e.target.value })} className="input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Tarif Pajak (%)</label>
                <input value={store.taxRate} onChange={(e) => setStore({ ...store, taxRate: e.target.value.replace(/[^0-9]/g, '') })} inputMode="numeric" className="input" />
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => saveTab('toko')} className="btn-primary"><Save className="h-4 w-4" /> Simpan Perubahan</button>
            </div>
          </div>
        )}

        {tab === 'kasir' && (
          <div className="max-w-2xl space-y-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Informasi Kasir</h3>
              <p className="text-sm text-slate-400">Data pengguna yang sedang aktif</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">AD</div>
              <div>
                <p className="font-semibold text-slate-700">{cashier.name}</p>
                <p className="text-sm text-slate-400">{cashier.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Nama Lengkap</label>
                <input value={cashier.name} onChange={(e) => setCashier({ ...cashier, name: e.target.value })} className="input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Username</label>
                <input value={cashier.username} onChange={(e) => setCashier({ ...cashier, username: e.target.value })} className="input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Email</label>
                <input value={cashier.email} onChange={(e) => setCashier({ ...cashier, email: e.target.value })} className="input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Peran</label>
                <select value={cashier.role} onChange={(e) => setCashier({ ...cashier, role: e.target.value })} className="input">
                  <option>Admin</option>
                  <option>Kasir</option>
                  <option>Manager</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => saveTab('kasir')} className="btn-primary"><Save className="h-4 w-4" /> Simpan Perubahan</button>
            </div>
          </div>
        )}

        {tab === 'pembayaran' && (
          <div className="max-w-2xl space-y-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Pengaturan Pembayaran</h3>
              <p className="text-sm text-slate-400">Aktifkan metode pembayaran yang tersedia</p>
            </div>
            <div className="space-y-3">
              {([
                { key: 'cashEnabled', label: 'Cash / Tunai', desc: 'Pembayaran tunai di lokasi' },
                { key: 'transferEnabled', label: 'Transfer Bank', desc: 'Pembayaran via transfer rekening' },
                { key: 'qrisEnabled', label: 'QRIS', desc: 'Pembayaran via scan kode QR' },
              ] as const).map((m) => (
                <label key={m.key} className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{m.label}</p>
                    <p className="text-xs text-slate-400">{m.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPayment({ ...payment, [m.key]: !payment[m.key] })}
                    className={[
                      'relative h-6 w-11 rounded-full transition-colors',
                      payment[m.key] ? 'bg-brand-600' : 'bg-slate-300',
                    ].join(' ')}
                  >
                    <span className={['absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', payment[m.key] ? 'translate-x-5' : 'translate-x-0.5'].join(' ')} />
                  </button>
                </label>
              ))}
            </div>
            {payment.transferEnabled && (
              <div className="grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">Nama Bank</label>
                  <input value={payment.bankName} onChange={(e) => setPayment({ ...payment, bankName: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">No. Rekening</label>
                  <input value={payment.bankAccount} onChange={(e) => setPayment({ ...payment, bankAccount: e.target.value })} className="input" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">Atas Nama</label>
                  <input value={payment.bankHolder} onChange={(e) => setPayment({ ...payment, bankHolder: e.target.value })} className="input" />
                </div>
              </div>
            )}
            {payment.qrisEnabled && (
              <div className="rounded-xl bg-slate-50 p-4">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">ID Merchant QRIS</label>
                <input value={payment.qrisMerchant} onChange={(e) => setPayment({ ...payment, qrisMerchant: e.target.value })} className="input" />
              </div>
            )}
            <div className="flex justify-end">
              <button onClick={() => saveTab('pembayaran')} className="btn-primary"><Save className="h-4 w-4" /> Simpan Perubahan</button>
            </div>
          </div>
        )}

        {tab === 'umum' && (
          <div className="max-w-2xl space-y-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Pengaturan Umum</h3>
              <p className="text-sm text-slate-400">Preferensi aplikasi dan tampilan struk</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Mata Uang</label>
                <select value={general.currency} onChange={(e) => setGeneral({ ...general, currency: e.target.value })} className="input">
                  <option>IDR (Rp)</option>
                  <option>USD ($)</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Batas Stok Menipis</label>
                <input value={general.lowStockThreshold} onChange={(e) => setGeneral({ ...general, lowStockThreshold: e.target.value.replace(/[^0-9]/g, '') })} inputMode="numeric" className="input" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Footer Struk</label>
                <textarea value={general.receiptFooter} onChange={(e) => setGeneral({ ...general, receiptFooter: e.target.value })} rows={2} className="input" />
              </div>
            </div>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Cetak struk otomatis</p>
                <p className="text-xs text-slate-400">Cetak struk setelah pembayaran selesai</p>
              </div>
              <button
                type="button"
                onClick={() => setGeneral({ ...general, printAuto: !general.printAuto })}
                className={['relative h-6 w-11 rounded-full transition-colors', general.printAuto ? 'bg-brand-600' : 'bg-slate-300'].join(' ')}
              >
                <span className={['absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', general.printAuto ? 'translate-x-5' : 'translate-x-0.5'].join(' ')} />
              </button>
            </label>
            <div className="flex justify-end">
              <button onClick={() => saveTab('umum')} className="btn-primary"><Save className="h-4 w-4" /> Simpan Perubahan</button>
            </div>
          </div>
        )}

        {tab === 'database' && (
          <div className="max-w-2xl space-y-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Database Supabase</h3>
              <p className="text-sm text-slate-400">Cek koneksi dan status database</p>
            </div>

            {/* Environment Variables Info */}
            <div className="rounded-xl border border-slate-200 p-4">
              <h4 className="mb-3 text-sm font-semibold text-slate-700">Environment Variables</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">VITE_SUPABASE_URL</span>
                  <span className={import.meta.env.VITE_SUPABASE_URL ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">VITE_SUPABASE_ANON_KEY</span>
                  <span className={import.meta.env.VITE_SUPABASE_ANON_KEY ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
              </div>
              {import.meta.env.VITE_SUPABASE_URL && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <span className="text-xs text-slate-400">URL: </span>
                  <span className="text-xs text-slate-600 font-mono">{import.meta.env.VITE_SUPABASE_URL}</span>
                </div>
              )}
            </div>

            {/* Test Connection Button */}
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <Database className="mx-auto h-12 w-12 text-slate-400 mb-3" />
              <p className="text-sm font-medium text-slate-700 mb-2">Test Koneksi Database</p>
              <p className="text-xs text-slate-500 mb-4">Klik tombol di bawah untuk mengecek koneksi ke Supabase</p>
              <button
                onClick={testDatabaseConnection}
                disabled={dbTestLoading}
                className="btn-primary inline-flex items-center gap-2"
              >
                {dbTestLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4" />
                    Test Koneksi
                  </>
                )}
              </button>
            </div>

            {/* Test Result */}
            {dbTestResult && (
              <div className={[
                'rounded-xl border-2 p-5',
                dbTestResult.success 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-red-200 bg-red-50'
              ].join(' ')}>
                <div className="flex items-start gap-3">
                  {dbTestResult.success ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className={[
                      'text-sm font-semibold mb-1',
                      dbTestResult.success ? 'text-green-800' : 'text-red-800'
                    ].join(' ')}>
                      {dbTestResult.success ? 'Koneksi Berhasil!' : 'Koneksi Gagal'}
                    </h4>
                    <p className={[
                      'text-sm',
                      dbTestResult.success ? 'text-green-700' : 'text-red-700'
                    ].join(' ')}>
                      {dbTestResult.message}
                    </p>
                    
                    {dbTestResult.success && dbTestResult.details && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-xs font-medium text-green-800 mb-2">Database Statistics:</p>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white rounded-lg p-2.5 text-center">
                            <div className="text-lg font-bold text-green-700">{dbTestResult.details.products}</div>
                            <div className="text-xs text-green-600">Products</div>
                          </div>
                          <div className="bg-white rounded-lg p-2.5 text-center">
                            <div className="text-lg font-bold text-green-700">{dbTestResult.details.transactions}</div>
                            <div className="text-xs text-green-600">Transactions</div>
                          </div>
                          <div className="bg-white rounded-lg p-2.5 text-center">
                            <div className="text-lg font-bold text-green-700">{dbTestResult.details.categories}</div>
                            <div className="text-xs text-green-600">Categories</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!dbTestResult.success && (
                      <div className="mt-3 pt-3 border-t border-red-200">
                        <p className="text-xs font-medium text-red-800 mb-1">Troubleshooting:</p>
                        <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
                          <li>Pastikan file .env.local berisi URL dan Anon Key yang benar</li>
                          <li>Cek apakah tabel sudah dibuat di Supabase (jalankan supabase-schema.sql)</li>
                          <li>Pastikan RLS policies sudah di-setup dengan benar</li>
                          <li>Restart dev server setelah mengubah .env.local</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">📚 Panduan Setup</h4>
              <p className="text-xs text-blue-700 mb-3">
                Lihat file <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">SUPABASE_SETUP.md</code> untuk panduan lengkap setup Supabase.
              </p>
              <div className="space-y-2 text-xs text-blue-700">
                <div>1. Isi credentials di file <code className="bg-blue-100 px-1 py-0.5 rounded font-mono">.env.local</code></div>
                <div>2. Jalankan SQL schema di Supabase Dashboard</div>
                <div>3. (Opsional) Jalankan seed data</div>
                <div>4. Test koneksi di halaman ini</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
