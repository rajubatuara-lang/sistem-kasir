# Integrasi Supabase - Panduan Lengkap

## ✅ Apa yang Sudah Dikerjakan

Aplikasi sekarang **sudah terintegrasi penuh** dengan Supabase. Semua data yang Anda input akan **otomatis tersimpan ke database Supabase**.

### Fitur yang Sudah Terintegrasi:

#### 1. **Produk (Products)**
- ✅ Tambah produk → Langsung tersimpan ke Supabase
- ✅ Edit produk → Update langsung ke Supabase
- ✅ Hapus produk → Delete dari Supabase
- ✅ Stok otomatis berkurang saat transaksi

#### 2. **Transaksi (Transactions)**
- ✅ Checkout di kasir → Tersimpan ke Supabase
- ✅ Void transaksi → Update status di Supabase
- ✅ Riwayat transaksi → Diambil dari Supabase

#### 3. **Real-time Data**
- ✅ Data produk dimuat dari Supabase saat aplikasi dibuka
- ✅ Data transaksi dimuat dari Supabase saat aplikasi dibuka
- ✅ Semua perubahan langsung sync ke database

---

## 🚀 Cara Menggunakan

### Setup Awal (Hanya Sekali)

1. **Isi credentials** di `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Jalankan SQL schema** di Supabase Dashboard → SQL Editor:
   - Copy isi file `supabase-schema.sql`
   - Paste dan Run

3. **(Opsional) Seed data awal** di SQL Editor:
   - Copy isi file `supabase-seed.sql`
   - Paste dan Run

4. **Restart aplikasi**:
   ```bash
   npm run dev
   ```

### Mulai Menggunakan

Setelah setup, **semua operasi otomatis tersimpan ke Supabase**:

#### ✏️ Tambah Produk Baru
1. Klik menu **"Produk"**
2. Klik tombol **"Tambah Produk"**
3. Isi form dan klik **"Tambah Produk"**
4. ✅ Produk langsung tersimpan ke Supabase!

#### 📝 Edit Produk
1. Di halaman Produk, klik icon **pensil** di produk yang ingin diedit
2. Ubah data dan klik **"Simpan Perubahan"**
3. ✅ Update langsung tersimpan ke Supabase!

#### 🗑️ Hapus Produk
1. Di halaman Produk, klik icon **tempat sampah**
2. Konfirmasi hapus
3. ✅ Produk dihapus dari Supabase!

#### 💰 Transaksi Kasir
1. Klik menu **"Kasir"**
2. Tambah produk ke keranjang
3. Isi pembayaran dan klik **"Proses Pembayaran"**
4. ✅ Transaksi tersimpan ke Supabase!
5. ✅ Stok produk otomatis berkurang di Supabase!

---

## 🔍 Cara Cek Data di Supabase

### Method 1: Via Supabase Dashboard
1. Buka https://app.supabase.com
2. Pilih project Anda
3. Klik **"Table Editor"**
4. Pilih tabel: `products`, `transactions`, atau `categories`
5. Lihat data yang sudah tersimpan

### Method 2: Via Aplikasi
1. Buka menu **"Pengaturan"**
2. Pilih tab **"Database Supabase"**
3. Klik **"Test Koneksi"**
4. Lihat statistik: jumlah products, transactions, categories

---

## 📦 Struktur File Integrasi

### Custom Hooks
- **`src/hooks/useProducts.ts`** - Hook untuk operasi produk
- **`src/hooks/useTransactions.ts`** - Hook untuk operasi transaksi

### Service Layer
- **`src/lib/supabase.ts`** - Konfigurasi Supabase client
- **`src/lib/supabase-service.ts`** - Fungsi CRUD untuk database
- **`src/lib/supabase-test.ts`** - Fungsi untuk test koneksi
- **`src/lib/database.types.ts`** - TypeScript types untuk database

### Komponen
- **`src/App.tsx`** - Main app, menggunakan Supabase hooks
- **`src/pages/Produk.tsx`** - Halaman produk dengan integrasi Supabase
- **`src/pages/Kasir.tsx`** - Halaman kasir (checkout ke Supabase)
- **`src/pages/Transaksi.tsx`** - Halaman transaksi (dari Supabase)

---

## 🔄 Alur Data

### Tambah Produk
```
User Input Form
    ↓
Produk.tsx (save function)
    ↓
App.tsx (addProduct from hook)
    ↓
useProducts.ts (addProduct function)
    ↓
supabase-service.ts (createProduct)
    ↓
Supabase Database
    ↓
Update local state (products)
    ↓
UI Updated
```

### Transaksi Kasir
```
User Checkout
    ↓
Kasir.tsx (onCheckout)
    ↓
App.tsx (handleCheckout)
    ↓
1. Save transaction to Supabase
2. Update stock for each product
    ↓
Supabase Database
    ↓
Update local state
    ↓
UI Updated
```

---

## 🐛 Troubleshooting

### Problem: Data tidak tersimpan

**Cek 1: Environment Variables**
```bash
# Cek apakah .env.local sudah diisi
Get-Content .env.local
```
Harus ada `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`

**Cek 2: Restart Dev Server**
```bash
# Stop server (Ctrl+C)
# Jalankan lagi
npm run dev
```

**Cek 3: Console Browser**
- Tekan F12 → Tab Console
- Lihat apakah ada error merah
- Error "Missing Supabase environment variables" → Isi .env.local dan restart
- Error "Permission denied" → Cek RLS policies di Supabase

**Cek 4: Network Tab**
- F12 → Tab Network
- Coba tambah produk
- Lihat request ke Supabase
- Status 200 = OK
- Status 400/401/403 = Problem dengan credentials atau permissions

### Problem: Loading terus

**Solusi:**
1. Pastikan tabel sudah dibuat di Supabase (jalankan `supabase-schema.sql`)
2. Cek koneksi internet
3. Cek di Console browser apakah ada error

### Problem: "duplicate key value"

**Solusi:**
- Kode produk atau invoice sudah ada di database
- Gunakan kode yang unik
- Atau hapus data yang sudah ada di Supabase Table Editor

---

## 📊 Monitoring & Debugging

### Via Console Browser
```javascript
// Buka Console (F12) dan ketik:

// Test koneksi
import('./src/lib/supabase-test.ts').then(m => m.testSupabaseConnection());

// Cek semua produk
import('./src/lib/supabase-service.ts').then(m => 
  m.getAllProducts().then(console.table)
);

// Cek semua transaksi
import('./src/lib/supabase-service.ts').then(m => 
  m.getAllTransactions().then(console.table)
);
```

### Via Supabase Dashboard
1. **Table Editor** - Lihat data secara visual
2. **SQL Editor** - Query manual
3. **Logs** - Lihat request logs
4. **API Docs** - Dokumentasi API auto-generated

---

## 🎯 Next Steps (Opsional)

Setelah integrasi dasar bekerja, Anda bisa:

### 1. Real-time Updates
Tambahkan Supabase Realtime untuk auto-refresh data tanpa reload:
```typescript
// Example di useProducts.ts
useEffect(() => {
  const subscription = supabase
    .channel('products')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'products' },
      (payload) => {
        fetchProducts(); // Refresh data
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### 2. Authentication
Setup user login dengan Supabase Auth:
- Multiple kasir dengan akun berbeda
- Role-based access (Admin, Kasir, Manager)
- Login history

### 3. Storage
Upload foto produk ke Supabase Storage:
- Foto produk
- Logo toko
- File laporan

### 4. Advanced Features
- Filter laporan by date range
- Export data to Excel/PDF
- Backup & restore
- Multi-store management

---

## 📚 Resources

### Dokumentasi
- [Supabase Docs](https://supabase.com/docs)
- [JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Realtime](https://supabase.com/docs/guides/realtime)
- [Auth](https://supabase.com/docs/guides/auth)

### File Terkait
- Setup: `SUPABASE_SETUP.md`
- Cek Koneksi: `CEK-KONEKSI-SUPABASE.md`
- SQL Schema: `supabase-schema.sql`
- SQL Seed: `supabase-seed.sql`

---

## ✅ Checklist Verifikasi

Pastikan semua ini sudah beres:

- [ ] File `.env.local` sudah diisi dengan URL dan Anon Key
- [ ] SQL schema sudah dijalankan di Supabase
- [ ] Dev server sudah di-restart setelah setup .env.local
- [ ] Test koneksi di menu Pengaturan → Database Supabase berhasil (hijau)
- [ ] Coba tambah 1 produk baru di aplikasi
- [ ] Cek di Supabase Table Editor → products → data muncul ✅
- [ ] Coba lakukan transaksi di kasir
- [ ] Cek di Supabase Table Editor → transactions → data muncul ✅
- [ ] Cek stok produk berkurang di tabel products ✅

**Jika semua centang**, aplikasi sudah **100% terintegrasi** dengan Supabase! 🎉

---

## 💡 Tips

1. **Selalu cek Console browser** (F12) untuk melihat error
2. **Gunakan Supabase Table Editor** untuk verify data
3. **Backup database** secara berkala via SQL dump
4. **Monitor usage** di Supabase Dashboard untuk tracking limits
5. **Jangan commit `.env.local`** ke Git (sudah di-exclude)

---

**Need Help?** Cek file `CEK-KONEKSI-SUPABASE.md` untuk troubleshooting detail!
