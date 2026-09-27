# Setup Supabase untuk Sistem Kasir

## Langkah-langkah Setup

### 1. Konfigurasi Environment Variables

Edit file `.env.local` dan masukkan credentials Supabase Anda:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Penting:** 
- Gunakan **ANON KEY** untuk aplikasi frontend, bukan Service Role Key
- Jangan commit file `.env.local` ke Git
- Service Role Key hanya untuk backend/server-side operations

### 2. Buat Database Schema

1. Buka Supabase Dashboard: https://app.supabase.com
2. Pilih project Anda
3. Klik **SQL Editor** di sidebar
4. Copy isi file `supabase-schema.sql`
5. Paste di SQL Editor dan klik **Run**

Ini akan membuat:
- Tabel `products`
- Tabel `transactions`
- Tabel `categories`
- Indexes untuk performa
- Row Level Security (RLS) policies
- Triggers untuk auto-update timestamp

### 3. Seed Data Awal (Opsional)

Untuk mengisi data produk awal:

1. Di SQL Editor
2. Copy isi file `supabase-seed.sql`
3. Paste dan klik **Run**

### 4. Verifikasi Setup

Cek apakah tabel sudah terbuat:
1. Klik **Table Editor** di sidebar
2. Anda harus melihat tabel: `products`, `transactions`, `categories`

### 5. Jalankan Aplikasi

```bash
npm install
npm run dev
```

## Struktur Database

### Tabel: products

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| code | VARCHAR | Kode produk unik |
| name | VARCHAR | Nama produk |
| category | VARCHAR | Kategori produk |
| price | NUMERIC | Harga jual |
| cost | NUMERIC | Harga modal |
| stock | INTEGER | Stok tersedia |
| status | VARCHAR | active/inactive |
| image | TEXT | URL gambar (nullable) |
| created_at | TIMESTAMPTZ | Waktu dibuat |
| updated_at | TIMESTAMPTZ | Waktu diupdate |

### Tabel: transactions

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| invoice | VARCHAR | Nomor invoice unik |
| date | TIMESTAMPTZ | Tanggal transaksi |
| cashier | VARCHAR | Nama kasir |
| items | JSONB | Array item yang dibeli |
| subtotal | NUMERIC | Total sebelum diskon |
| discount | NUMERIC | Jumlah diskon |
| total | NUMERIC | Total akhir |
| method | VARCHAR | cash/transfer/qris |
| status | VARCHAR | completed/void/pending |
| created_at | TIMESTAMPTZ | Waktu dibuat |
| updated_at | TIMESTAMPTZ | Waktu diupdate |

### Tabel: categories

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Nama kategori |
| created_at | TIMESTAMPTZ | Waktu dibuat |

## API Functions

File `src/lib/supabase-service.ts` menyediakan fungsi-fungsi:

### Products
- `getAllProducts()` - Ambil semua produk
- `getProductById(id)` - Ambil produk by ID
- `getProductsByCategory(category)` - Ambil produk by kategori
- `createProduct(product)` - Buat produk baru
- `updateProduct(id, product)` - Update produk
- `deleteProduct(id)` - Hapus produk
- `updateProductStock(id, quantity)` - Update stok
- `getLowStockProducts(threshold)` - Produk stok rendah

### Transactions
- `getAllTransactions()` - Ambil semua transaksi
- `getTransactionById(id)` - Ambil transaksi by ID
- `getTransactionsByDateRange(start, end)` - Transaksi by range tanggal
- `createTransaction(transaction)` - Buat transaksi baru
- `updateTransaction(id, transaction)` - Update transaksi
- `voidTransaction(id)` - Void transaksi

### Categories
- `getAllCategories()` - Ambil semua kategori
- `createCategory(name)` - Buat kategori baru

### Statistics
- `getDailySales(days)` - Data penjualan harian
- `getTodaySales()` - Total penjualan hari ini
- `getTodayTransactionCount()` - Jumlah transaksi hari ini

## Security (Row Level Security)

Saat ini, RLS policies di-set untuk:
- **READ**: Semua user bisa membaca
- **INSERT/UPDATE/DELETE**: Semua user bisa melakukan operasi

**Rekomendasi untuk production:**
1. Implementasi authentication
2. Ubah policies untuk restrict berdasarkan user role
3. Gunakan Supabase Auth untuk user management

## Troubleshooting

### Error: Missing Supabase environment variables
- Pastikan file `.env.local` ada dan berisi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY
- Restart dev server setelah menambahkan env variables

### Error: Permission denied
- Cek RLS policies di Supabase Dashboard
- Pastikan policies sudah dibuat dengan benar

### Error: duplicate key value violates unique constraint
- Kode produk atau invoice sudah ada
- Gunakan kode/invoice yang unik

## Next Steps

Setelah setup berhasil, Anda bisa:
1. Integrasikan fungsi-fungsi dari `supabase-service.ts` ke komponen React
2. Replace data dummy di `src/data.ts` dengan fetch dari Supabase
3. Implementasi real-time updates dengan Supabase Realtime
4. Setup authentication untuk kasir
5. Deploy aplikasi ke hosting (Vercel, Netlify, dll)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
