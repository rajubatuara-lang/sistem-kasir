-- ========================================
-- SEED DATA: PRODUCTS (120 Items)
-- ========================================
-- ID akan auto-generate oleh Supabase (UUID)

-- KATEGORI: MAKANAN (40 items)
INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
  -- Makanan Utama
  ('MKN-001', 'Nasi Goreng Spesial', 'Makanan', 18000, 10000, 45, 'active'),
  ('MKN-002', 'Mie Ayam Bakso', 'Makanan', 15000, 8000, 32, 'active'),
  ('MKN-003', 'Ayam Geprek', 'Makanan', 20000, 12000, 28, 'active'),
  ('MKN-004', 'Nasi Padang Komplit', 'Makanan', 25000, 15000, 15, 'active'),
  ('MKN-005', 'Soto Ayam', 'Makanan', 17000, 9000, 22, 'active'),
  ('MKN-006', 'Rendang Paket', 'Makanan', 30000, 18000, 18, 'active'),
  ('MKN-007', 'Nasi Uduk Komplit', 'Makanan', 22000, 13000, 25, 'active'),
  ('MKN-008', 'Nasi Kuning Ayam', 'Makanan', 19000, 11000, 30, 'active'),
  ('MKN-009', 'Mie Goreng Seafood', 'Makanan', 23000, 14000, 20, 'active'),
  ('MKN-010', 'Nasi Liwet', 'Makanan', 21000, 12500, 15, 'active'),
  
  -- Nasi + Lauk
  ('MKN-011', 'Nasi + Ayam Bakar', 'Makanan', 24000, 15000, 18, 'active'),
  ('MKN-012', 'Nasi + Ikan Bakar', 'Makanan', 26000, 16000, 12, 'active'),
  ('MKN-013', 'Nasi + Telur Dadar', 'Makanan', 12000, 7000, 50, 'active'),
  ('MKN-014', 'Nasi + Tempe Goreng', 'Makanan', 10000, 5500, 60, 'active'),
  ('MKN-015', 'Nasi + Tahu Isi', 'Makanan', 11000, 6000, 45, 'active'),
  ('MKN-016', 'Nasi + Sate Ayam', 'Makanan', 28000, 17000, 20, 'active'),
  ('MKN-017', 'Nasi + Pecel Lele', 'Makanan', 19000, 11000, 25, 'active'),
  ('MKN-018', 'Nasi + Bebek Goreng', 'Makanan', 32000, 20000, 10, 'active'),
  
  -- Mie & Pasta
  ('MKN-019', 'Mie Ayam Original', 'Makanan', 13000, 7500, 40, 'active'),
  ('MKN-020', 'Mie Goreng Jawa', 'Makanan', 15000, 8500, 35, 'active'),
  ('MKN-021', 'Kwetiau Goreng', 'Makanan', 18000, 10500, 22, 'active'),
  ('MKN-022', 'Bihun Goreng', 'Makanan', 16000, 9000, 28, 'active'),
  ('MKN-023', 'Mie Rebus Bakso', 'Makanan', 17000, 9500, 30, 'active'),
  ('MKN-024', 'Indomie Goreng Telur', 'Makanan', 12000, 6000, 55, 'active'),
  
  -- Sop & Soto
  ('MKN-025', 'Soto Betawi', 'Makanan', 20000, 12000, 18, 'active'),
  ('MKN-026', 'Rawon Daging', 'Makanan', 24000, 15000, 12, 'active'),
  ('MKN-027', 'Sop Buntut', 'Makanan', 35000, 22000, 8, 'active'),
  ('MKN-028', 'Sop Iga', 'Makanan', 32000, 20000, 10, 'active'),
  ('MKN-029', 'Gado-Gado', 'Makanan', 16000, 9000, 25, 'active'),
  ('MKN-030', 'Pecel Sayur', 'Makanan', 14000, 8000, 30, 'active'),
  
  -- Bakso & Siomay
  ('MKN-031', 'Bakso Urat Jumbo', 'Makanan', 19000, 11000, 22, 'active'),
  ('MKN-032', 'Bakso Beranak', 'Makanan', 18000, 10500, 25, 'active'),
  ('MKN-033', 'Siomay Bandung', 'Makanan', 15000, 8500, 28, 'active'),
  ('MKN-034', 'Batagor Bandung', 'Makanan', 16000, 9000, 20, 'active'),
  
  -- Menu Stok Terbatas / Habis
  ('MKN-035', 'Nasi Tumpeng Mini', 'Makanan', 45000, 28000, 5, 'active'),
  ('MKN-036', 'Paket Nasi Kotak A', 'Makanan', 20000, 12000, 8, 'active'),
  ('MKN-037', 'Paket Nasi Kotak B', 'Makanan', 25000, 15000, 6, 'active'),
  ('MKN-038', 'Nasi Goreng Kambing', 'Makanan', 28000, 17000, 3, 'active'),
  ('MKN-039', 'Seafood Platter', 'Makanan', 55000, 35000, 0, 'inactive'),
  ('MKN-040', 'Paket Shabu-Shabu', 'Makanan', 48000, 30000, 0, 'inactive'),

-- KATEGORI: MINUMAN (35 items)
  -- Minuman Dingin
  ('MNM-001', 'Es Teh Manis', 'Minuman', 5000, 2000, 150, 'active'),
  ('MNM-002', 'Es Jeruk', 'Minuman', 7000, 3000, 120, 'active'),
  ('MNM-003', 'Es Kelapa Muda', 'Minuman', 12000, 7000, 35, 'active'),
  ('MNM-004', 'Es Campur', 'Minuman', 15000, 8500, 28, 'active'),
  ('MNM-005', 'Es Cincau', 'Minuman', 8000, 4500, 45, 'active'),
  ('MNM-006', 'Es Buah Segar', 'Minuman', 14000, 8000, 30, 'active'),
  ('MNM-007', 'Es Alpukat', 'Minuman', 13000, 7500, 25, 'active'),
  ('MNM-008', 'Es Teler', 'Minuman', 16000, 9500, 22, 'active'),
  ('MNM-009', 'Jus Mangga', 'Minuman', 12000, 7000, 30, 'active'),
  ('MNM-010', 'Jus Alpukat', 'Minuman', 13000, 7500, 28, 'active'),
  ('MNM-011', 'Jus Strawberry', 'Minuman', 15000, 9000, 20, 'active'),
  ('MNM-012', 'Jus Melon', 'Minuman', 11000, 6500, 32, 'active'),
  ('MNM-013', 'Jus Jambu', 'Minuman', 10000, 6000, 25, 'active'),
  
  -- Kopi & Susu
  ('MNM-014', 'Kopi Susu', 'Minuman', 12000, 6000, 80, 'active'),
  ('MNM-015', 'Cappuccino', 'Minuman', 18000, 9000, 50, 'active'),
  ('MNM-016', 'Kopi Hitam', 'Minuman', 8000, 4000, 70, 'active'),
  ('MNM-017', 'Es Kopi Susu', 'Minuman', 14000, 7500, 65, 'active'),
  ('MNM-018', 'Americano', 'Minuman', 15000, 8000, 45, 'active'),
  ('MNM-019', 'Latte', 'Minuman', 20000, 11000, 40, 'active'),
  ('MNM-020', 'Mochaccino', 'Minuman', 22000, 12500, 35, 'active'),
  ('MNM-021', 'Susu Coklat', 'Minuman', 10000, 5500, 55, 'active'),
  ('MNM-022', 'Susu Strawberry', 'Minuman', 11000, 6000, 48, 'active'),
  ('MNM-023', 'Milkshake Vanilla', 'Minuman', 18000, 10000, 30, 'active'),
  ('MNM-024', 'Milkshake Coklat', 'Minuman', 19000, 10500, 28, 'active'),
  
  -- Minuman Hangat
  ('MNM-025', 'Teh Hangat', 'Minuman', 4000, 1800, 100, 'active'),
  ('MNM-026', 'Kopi Hangat', 'Minuman', 7000, 3500, 85, 'active'),
  ('MNM-027', 'Jahe Hangat', 'Minuman', 8000, 4000, 40, 'active'),
  ('MNM-028', 'Susu Hangat', 'Minuman', 9000, 5000, 50, 'active'),
  
  -- Minuman Kemasan
  ('MNM-029', 'Air Mineral 600ml', 'Minuman', 4000, 2000, 250, 'active'),
  ('MNM-030', 'Air Mineral 1500ml', 'Minuman', 7000, 4000, 150, 'active'),
  ('MNM-031', 'Teh Botol Sosro', 'Minuman', 6000, 3500, 180, 'active'),
  ('MNM-032', 'Pocari Sweat', 'Minuman', 9000, 5500, 120, 'active'),
  ('MNM-033', 'Coca Cola 330ml', 'Minuman', 8000, 5000, 140, 'active'),
  ('MNM-034', 'Fanta 330ml', 'Minuman', 8000, 5000, 130, 'active'),
  ('MNM-035', 'Sprite 330ml', 'Minuman', 8000, 5000, 125, 'active'),

-- KATEGORI: SNACK (20 items)
  ('SNK-001', 'Keripik Singkong', 'Snack', 8000, 4000, 80, 'active'),
  ('SNK-002', 'Roti Bakar Coklat', 'Snack', 13000, 7000, 35, 'active'),
  ('SNK-003', 'Pisang Goreng', 'Snack', 10000, 5000, 50, 'active'),
  ('SNK-004', 'Donat Coklat', 'Snack', 9000, 4500, 45, 'active'),
  ('SNK-005', 'Donat Keju', 'Snack', 10000, 5000, 40, 'active'),
  ('SNK-006', 'Donat Strawberry', 'Snack', 10000, 5000, 38, 'active'),
  ('SNK-007', 'Croissant', 'Snack', 15000, 8500, 25, 'active'),
  ('SNK-008', 'Roti Bakar Keju', 'Snack', 14000, 7500, 32, 'active'),
  ('SNK-009', 'French Fries', 'Snack', 16000, 9000, 40, 'active'),
  ('SNK-010', 'Onion Rings', 'Snack', 17000, 9500, 30, 'active'),
  ('SNK-011', 'Chicken Nugget', 'Snack', 18000, 10500, 35, 'active'),
  ('SNK-012', 'Sosis Bakar', 'Snack', 12000, 7000, 42, 'active'),
  ('SNK-013', 'Tahu Crispy', 'Snack', 10000, 5500, 45, 'active'),
  ('SNK-014', 'Risoles Mayo', 'Snack', 8000, 4500, 38, 'active'),
  ('SNK-015', 'Lemper Ayam', 'Snack', 7000, 4000, 50, 'active'),
  ('SNK-016', 'Pastel Isi', 'Snack', 7000, 4000, 48, 'active'),
  ('SNK-017', 'Bakwan Jagung', 'Snack', 6000, 3500, 55, 'active'),
  ('SNK-018', 'Cireng Isi', 'Snack', 8000, 4500, 40, 'active'),
  ('SNK-019', 'Baso Goreng', 'Snack', 9000, 5000, 35, 'active'),
  ('SNK-020', 'Martabak Mini', 'Snack', 12000, 7000, 20, 'active'),

-- KATEGORI: KEBUTUHAN (10 items)
  ('KBT-001', 'Tisu Pocket 3s', 'Kebutuhan', 6000, 3500, 100, 'active'),
  ('KBT-002', 'Sabun Cuci Tangan', 'Kebutuhan', 9000, 5000, 45, 'active'),
  ('KBT-003', 'Hand Sanitizer 60ml', 'Kebutuhan', 12000, 7000, 60, 'active'),
  ('KBT-004', 'Masker 1 Box (50pcs)', 'Kebutuhan', 35000, 22000, 25, 'active'),
  ('KBT-005', 'Plastik Kresek Putih', 'Kebutuhan', 15000, 9000, 40, 'active'),
  ('KBT-006', 'Sedotan Plastik (100pcs)', 'Kebutuhan', 10000, 6000, 35, 'active'),
  ('KBT-007', 'Tisu Makan 1 Pack', 'Kebutuhan', 8000, 4500, 55, 'active'),
  ('KBT-008', 'Kantong Takeaway S', 'Kebutuhan', 2000, 1200, 200, 'active'),
  ('KBT-009', 'Kantong Takeaway M', 'Kebutuhan', 3000, 1800, 180, 'active'),
  ('KBT-010', 'Kantong Takeaway L', 'Kebutuhan', 4000, 2500, 150, 'active'),

-- KATEGORI: ELEKTRONIK (15 items)
  ('ELK-001', 'Powerbank 10.000mAh', 'Elektronik', 150000, 110000, 15, 'active'),
  ('ELK-002', 'Kabel USB-C 1m', 'Elektronik', 25000, 15000, 65, 'active'),
  ('ELK-003', 'Earphone Bluetooth', 'Elektronik', 85000, 60000, 12, 'active'),
  ('ELK-004', 'Kabel Lightning 1m', 'Elektronik', 30000, 18000, 45, 'active'),
  ('ELK-005', 'Charger Fast Charging', 'Elektronik', 75000, 50000, 20, 'active'),
  ('ELK-006', 'Holder HP Universal', 'Elektronik', 35000, 22000, 28, 'active'),
  ('ELK-007', 'Kabel Aux Audio 1m', 'Elektronik', 15000, 9000, 40, 'active'),
  ('ELK-008', 'USB Flash Drive 16GB', 'Elektronik', 50000, 35000, 18, 'active'),
  ('ELK-009', 'USB Flash Drive 32GB', 'Elektronik', 75000, 52000, 15, 'active'),
  ('ELK-010', 'Mouse Wireless', 'Elektronik', 65000, 45000, 10, 'active'),
  ('ELK-011', 'Keyboard Wireless', 'Elektronik', 120000, 85000, 8, 'active'),
  ('ELK-012', 'Webcam HD', 'Elektronik', 250000, 180000, 5, 'active'),
  ('ELK-013', 'Speaker Bluetooth Mini', 'Elektronik', 95000, 68000, 12, 'active'),
  ('ELK-014', 'Lampu LED USB', 'Elektronik', 20000, 12000, 30, 'active'),
  ('ELK-015', 'Ring Light Mini', 'Elektronik', 180000, 130000, 6, 'active')

ON CONFLICT (code) DO NOTHING;

-- Catatan:
-- Total: 120 produk
-- Makanan: 40 items
-- Minuman: 35 items
-- Snack: 20 items
-- Kebutuhan: 10 items
-- Elektronik: 15 items
