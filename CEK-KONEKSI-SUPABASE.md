# Cara Cek Koneksi Supabase

Ada beberapa cara untuk mengecek apakah aplikasi sudah terhubung dengan Supabase:

## 🎯 Cara 1: Via UI (Paling Mudah)

1. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

2. Buka browser dan akses aplikasi (biasanya `http://localhost:5173`)

3. Klik menu **"Pengaturan"** di sidebar

4. Pilih tab **"Database Supabase"**

5. Klik tombol **"Test Koneksi"**

6. Lihat hasilnya:
   - ✅ **Hijau** = Koneksi berhasil, akan tampil jumlah data di database
   - ❌ **Merah** = Koneksi gagal, akan tampil pesan error dan troubleshooting

---

## 💻 Cara 2: Via Browser Console

1. Jalankan aplikasi dan buka di browser

2. Tekan **F12** untuk membuka Developer Tools

3. Pilih tab **Console**

4. Ketik perintah ini dan tekan Enter:
   ```javascript
   // Import fungsi test
   import('./src/lib/supabase-test.ts').then(module => {
     module.testSupabaseConnection();
   });
   ```

5. Lihat output di console:
   - ✅ Akan muncul log detail tentang koneksi
   - 📊 Statistik database (jumlah products, transactions, categories)
   - ❌ Atau pesan error jika gagal

---

## 🔧 Cara 3: Manual Check - Environment Variables

Pastikan file `.env.local` sudah diisi dengan benar:

```bash
# Windows PowerShell
Get-Content .env.local

# Atau buka dengan text editor
```

File harus berisi:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Cek di Supabase Dashboard:**
1. Buka https://app.supabase.com
2. Pilih project Anda
3. Klik **Settings** → **API**
4. Copy:
   - **URL** → ke `VITE_SUPABASE_URL`
   - **anon public** key → ke `VITE_SUPABASE_ANON_KEY`

---

## 🗄️ Cara 4: Cek Database Schema

Pastikan tabel sudah dibuat di Supabase:

1. Buka Supabase Dashboard
2. Klik **Table Editor**
3. Harus ada 3 tabel:
   - ✅ `products`
   - ✅ `transactions`
   - ✅ `categories`

**Jika belum ada:**
1. Klik **SQL Editor**
2. Copy isi file `supabase-schema.sql`
3. Paste dan klik **Run**

---

## 🔍 Cara 5: Cek Network Request

1. Jalankan aplikasi dan buka di browser
2. Tekan **F12** → Tab **Network**
3. Klik tombol "Test Koneksi" di halaman Pengaturan
4. Di Network tab, cari request ke Supabase:
   - URL harus mengarah ke `https://your-project-id.supabase.co`
   - Status: **200 OK** = berhasil
   - Status: **400/401/403** = ada masalah dengan credentials
   - Status: **404** = tabel tidak ditemukan

---

## ❗ Troubleshooting

### Problem: "Missing Supabase environment variables"

**Solusi:**
1. Pastikan file `.env.local` ada di root project
2. Isi dengan URL dan Anon Key yang benar
3. **Restart dev server** (Ctrl+C, lalu `npm run dev` lagi)
4. Refresh browser

### Problem: "Permission denied" atau "Row Level Security"

**Solusi:**
1. Pastikan SQL schema sudah dijalankan (termasuk RLS policies)
2. Cek di Supabase Dashboard → Authentication → Policies
3. Pastikan policies untuk `products`, `transactions`, dan `categories` sudah ada

### Problem: "duplicate key value" saat seed data

**Solusi:**
- Normal jika data sudah ada
- Atau hapus dulu data yang ada:
  ```sql
  DELETE FROM products;
  DELETE FROM transactions;
  DELETE FROM categories;
  ```
- Lalu jalankan seed lagi

### Problem: Koneksi berhasil tapi data kosong

**Solusi:**
- Jalankan file `supabase-seed.sql` untuk insert data awal
- Atau tambah data manual via Supabase Dashboard → Table Editor

---

## ✅ Checklist Setup

Pastikan semua ini sudah dilakukan:

- [ ] File `.env.local` sudah dibuat dan diisi
- [ ] SQL schema (`supabase-schema.sql`) sudah dijalankan di Supabase
- [ ] Ada 3 tabel: products, transactions, categories
- [ ] RLS policies sudah dibuat
- [ ] Dev server sudah di-restart setelah menambah .env.local
- [ ] Test koneksi di halaman Pengaturan → Database Supabase

---

## 📚 Resources

- File setup lengkap: `SUPABASE_SETUP.md`
- SQL schema: `supabase-schema.sql`
- SQL seed data: `supabase-seed.sql`
- Service functions: `src/lib/supabase-service.ts`
- Test functions: `src/lib/supabase-test.ts`

---

**Setelah koneksi berhasil**, Anda bisa mulai:
- Mengintegrasikan fungsi CRUD ke komponen
- Mengganti data dummy dengan data real dari Supabase
- Menambahkan fitur real-time updates
