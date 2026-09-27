# 🚀 Quick Start - Supabase Integration

## Setup (3 Langkah)

### 1️⃣ Isi Credentials
Edit file `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2️⃣ Buat Tabel di Supabase
1. Buka https://app.supabase.com
2. SQL Editor → Copy `supabase-schema.sql` → Run
3. (Opsional) Copy `supabase-seed.sql` → Run

### 3️⃣ Jalankan Aplikasi
```bash
npm run dev
```

---

## ✅ Verifikasi

1. Buka aplikasi → Menu **Pengaturan** → Tab **Database Supabase**
2. Klik **"Test Koneksi"**
3. Harus muncul **hijau** dengan statistik database

---

## 💾 Cara Kerja

### Semua Data Otomatis Tersimpan ke Supabase!

- ✅ **Tambah Produk** → Tersimpan ke Supabase
- ✅ **Edit Produk** → Update ke Supabase
- ✅ **Hapus Produk** → Delete dari Supabase
- ✅ **Transaksi Kasir** → Tersimpan ke Supabase
- ✅ **Stok Berkurang** → Update di Supabase

### Cek Data
**Via Supabase Dashboard:**
1. Table Editor → Pilih tabel (`products`, `transactions`, `categories`)
2. Lihat data yang tersimpan

**Via Aplikasi:**
1. Menu Pengaturan → Tab Database Supabase
2. Test Koneksi → Lihat statistik

---

## 🐛 Problem? 

### Data tidak tersimpan?
1. ✅ Cek `.env.local` sudah diisi?
2. ✅ Restart dev server? (`Ctrl+C` lalu `npm run dev`)
3. ✅ SQL schema sudah dijalankan?
4. ✅ Cek Console browser (F12) ada error?

### Loading terus?
1. ✅ Tabel sudah dibuat? (jalankan `supabase-schema.sql`)
2. ✅ Koneksi internet OK?
3. ✅ Credentials benar?

---

## 📖 Dokumentasi Lengkap

- **Setup detail:** `SUPABASE_SETUP.md`
- **Cek koneksi:** `CEK-KONEKSI-SUPABASE.md`
- **Integrasi penuh:** `INTEGRASI-SUPABASE.md`

---

**Selesai!** Aplikasi sudah **100% terhubung** dengan Supabase 🎉
