# 📦 Panduan Seed Data Produk

## File Seed yang Tersedia

### 1. **supabase-seed.sql** (Default - 120 Produk)
File seed utama dengan **120 produk lengkap** untuk toko umum/warung makan.

**Kategori:**
- 🍛 **Makanan**: 40 items (Nasi, Mie, Soto, Bakso, dll)
- 🥤 **Minuman**: 35 items (Teh, Kopi, Jus, Susu, dll)
- 🍪 **Snack**: 20 items (Gorengan, Roti, French Fries, dll)
- 🛒 **Kebutuhan**: 10 items (Tisu, Sabun, Plastik, dll)
- 💻 **Elektronik**: 15 items (Powerbank, Kabel, Earphone, dll)

### 2. **supabase-seed-alternative.sql** (4 Template Alternatif)
File dengan 4 template berbeda untuk jenis toko yang berbeda:

- 🏪 **Toko Sembako**: Beras, Minyak, Gula, Mie Instant, dll
- 📱 **Toko Elektronik**: Handphone, Aksesoris, Charger, Smartwatch
- ☕ **Coffee Shop**: Kopi, Non-Coffee, Pastry, Cake
- 💊 **Apotek**: Obat-obatan, Vitamin, Alat Kesehatan

---

## 🚀 Cara Menggunakan

### Method 1: Seed Default (120 Produk)

1. **Buka Supabase Dashboard**
   - https://app.supabase.com
   - Pilih project Anda

2. **Buka SQL Editor**
   - Klik **SQL Editor** di sidebar

3. **Jalankan Seed**
   - Copy seluruh isi file `supabase-seed.sql`
   - Paste di SQL Editor
   - Klik **Run** atau tekan `Ctrl + Enter`

4. **Verifikasi**
   - Klik **Table Editor** → Tabel `products`
   - Harus ada 120 produk ✅

### Method 2: Seed Alternative (Template Khusus)

1. **Buka file** `supabase-seed-alternative.sql`

2. **Pilih Template:**
   - Uncomment section yang Anda inginkan
   - Hapus `/*` di awal dan `*/` di akhir section
   
   **Contoh untuk Coffee Shop:**
   ```sql
   -- Hapus /* dan */ di section COFFEE SHOP
   INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
     ('COF-001', 'Americano', 'Minuman', 20000, 10000, 999, 'active'),
     ...
   ```

3. **Jalankan di SQL Editor**
   - Copy section yang sudah di-uncomment
   - Paste dan Run di Supabase SQL Editor

4. **Kombinasi Template**
   - Anda bisa uncomment beberapa section sekaligus
   - Misal: Sembako + Elektronik

---

## 📊 Detail Seed Default (120 Produk)

### Makanan (40 items)
```
Range Harga: Rp 10.000 - Rp 55.000
Stok Total: ~800 items
Contoh: Nasi Goreng, Mie Ayam, Soto, Rendang, dll
```

### Minuman (35 items)
```
Range Harga: Rp 4.000 - Rp 22.000
Stok Total: ~2.500 items
Contoh: Es Teh, Kopi Susu, Jus, Air Mineral, dll
```

### Snack (20 items)
```
Range Harga: Rp 6.000 - Rp 18.000
Stok Total: ~800 items
Contoh: Pisang Goreng, Donat, French Fries, dll
```

### Kebutuhan (10 items)
```
Range Harga: Rp 2.000 - Rp 35.000
Stok Total: ~900 items
Contoh: Tisu, Masker, Sabun, Kantong Takeaway, dll
```

### Elektronik (15 items)
```
Range Harga: Rp 15.000 - Rp 250.000
Stok Total: ~350 items
Contoh: Powerbank, Kabel, Earphone, Mouse, dll
```

---

## 🎯 Tips & Best Practices

### 1. Mulai dengan Data Kosong
Jika ingin reset dan mulai fresh:
```sql
-- Hapus semua produk
DELETE FROM products;

-- Lalu jalankan seed yang diinginkan
```

### 2. Kombinasi Seed
Anda bisa menggabungkan seed default + alternative:
```sql
-- 1. Jalankan seed default
-- 2. Lalu jalankan seed alternative (coffee shop)
-- 3. Total produk jadi 150+
```

### 3. Modifikasi Harga
Sesuaikan harga dengan lokasi Anda:
```sql
-- Contoh: Naikkan semua harga 10%
UPDATE products 
SET price = price * 1.1, 
    cost = cost * 1.1;
```

### 4. Update Stok Massal
```sql
-- Set semua stok jadi 100
UPDATE products SET stock = 100;

-- Set stok minuman jadi 200
UPDATE products 
SET stock = 200 
WHERE category = 'Minuman';
```

### 5. Nonaktifkan Produk Tertentu
```sql
-- Nonaktifkan produk yang stok habis
UPDATE products 
SET status = 'inactive' 
WHERE stock = 0;
```

---

## 🔄 Update Seed Data

### Tambah Produk Baru Lewat SQL
```sql
INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
  ('NEW-001', 'Produk Baru', 'Makanan', 15000, 9000, 50, 'active');
```

### Tambah Banyak Produk Sekaligus
```sql
INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
  ('NEW-001', 'Produk 1', 'Makanan', 15000, 9000, 50, 'active'),
  ('NEW-002', 'Produk 2', 'Makanan', 18000, 11000, 40, 'active'),
  ('NEW-003', 'Produk 3', 'Minuman', 12000, 7000, 60, 'active');
```

---

## ⚠️ Troubleshooting

### Error: "duplicate key value violates unique constraint"

**Penyebab:** Kode produk sudah ada di database

**Solusi 1:** Hapus data lama
```sql
DELETE FROM products WHERE code LIKE 'MKN-%';
-- Lalu jalankan seed lagi
```

**Solusi 2:** SQL sudah handle dengan `ON CONFLICT DO NOTHING`
- Artinya produk yang sudah ada tidak akan di-insert ulang
- Hanya produk baru yang akan ditambahkan

### Error: "permission denied"

**Solusi:**
- Pastikan RLS policies sudah dibuat
- Jalankan `supabase-schema.sql` dulu

### Stok Produk Tidak Berubah di UI

**Solusi:**
- Refresh halaman (F5)
- Atau tutup dan buka aplikasi lagi

---

## 📈 Statistik Seed Default

```
Total Produk      : 120 items
Total Nilai Stok  : ~Rp 50.000.000 (cost)
Total Nilai Jual  : ~Rp 70.000.000 (price)
Potensi Profit    : ~Rp 20.000.000 (40%)

Kategori Terbanyak : Makanan (33%)
Stok Terbanyak     : Minuman (~2.500 pcs)
Harga Tertinggi    : Webcam HD (Rp 250.000)
Harga Terendah     : Kantong Takeaway S (Rp 2.000)
```

---

## 🎨 Customisasi

### Buat Template Sendiri

1. Copy structure dari seed existing
2. Ganti kode, nama, kategori, harga
3. Sesuaikan dengan kebutuhan toko Anda

**Template:**
```sql
INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
  ('XXX-001', 'Nama Produk', 'Kategori', harga_jual, harga_modal, stok, 'active');
```

### Generate ID Otomatis

ID akan auto-generate jika tidak diisi:
```sql
-- Tanpa ID (akan auto-generate UUID)
INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
  ('XXX-001', 'Nama Produk', 'Kategori', 15000, 9000, 50, 'active');
```

---

## 📚 Resources

- **SQL Schema:** `supabase-schema.sql`
- **Setup Guide:** `SUPABASE_SETUP.md`
- **Integration Guide:** `INTEGRASI-SUPABASE.md`
- **Quick Start:** `QUICK-START.md`

---

## ✅ Checklist After Seeding

- [ ] Jalankan seed SQL di Supabase
- [ ] Cek Table Editor → Tabel products → Data muncul
- [ ] Buka aplikasi → Menu Produk
- [ ] Data produk tampil di aplikasi
- [ ] Coba tambah produk baru → Tersimpan
- [ ] Coba edit produk → Terupdate
- [ ] Coba transaksi → Stok berkurang

**Jika semua centang, seed data berhasil!** 🎉

---

**Need Help?**
- Cek file `CEK-KONEKSI-SUPABASE.md` untuk troubleshooting
- Atau cek Console browser (F12) untuk error messages
