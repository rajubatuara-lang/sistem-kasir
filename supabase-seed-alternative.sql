-- ========================================
-- ALTERNATIVE SEED: TOKO RETAIL/MINIMARKET
-- ========================================
-- Uncomment section yang Anda inginkan

-- ========================================
-- OPTION 1: TOKO SEMBAKO
-- ========================================
/*
INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
  -- Beras & Tepung
  ('SMB-001', 'Beras Premium 5kg', 'Kebutuhan', 75000, 65000, 50, 'active'),
  ('SMB-002', 'Beras Pulen 5kg', 'Kebutuhan', 68000, 58000, 45, 'active'),
  ('SMB-003', 'Tepung Terigu 1kg', 'Kebutuhan', 14000, 11000, 80, 'active'),
  ('SMB-004', 'Tepung Beras 500g', 'Kebutuhan', 8000, 6000, 60, 'active'),
  ('SMB-005', 'Gula Pasir 1kg', 'Kebutuhan', 15000, 12500, 100, 'active'),
  ('SMB-006', 'Gula Merah 500g', 'Kebutuhan', 12000, 9000, 70, 'active'),
  
  -- Minyak & Bumbu
  ('SMB-007', 'Minyak Goreng 1L', 'Kebutuhan', 18000, 15000, 90, 'active'),
  ('SMB-008', 'Minyak Goreng 2L', 'Kebutuhan', 35000, 29000, 60, 'active'),
  ('SMB-009', 'Kecap Manis Botol', 'Kebutuhan', 12000, 9000, 55, 'active'),
  ('SMB-010', 'Saos Sambal Botol', 'Kebutuhan', 10000, 7500, 50, 'active'),
  ('SMB-011', 'Garam 500g', 'Kebutuhan', 5000, 3500, 100, 'active'),
  ('SMB-012', 'Merica Bubuk', 'Kebutuhan', 8000, 6000, 40, 'active'),
  
  -- Mie & Snack Instant
  ('SMB-013', 'Indomie Goreng (40 pcs)', 'Makanan', 120000, 100000, 20, 'active'),
  ('SMB-014', 'Indomie Soto (40 pcs)', 'Makanan', 120000, 100000, 18, 'active'),
  ('SMB-015', 'Mie Sedaap Goreng (40 pcs)', 'Makanan', 115000, 95000, 22, 'active'),
  ('SMB-016', 'Pop Mie', 'Makanan', 6000, 4500, 80, 'active'),
  
  -- Susu & Minuman
  ('SMB-017', 'Susu Kotak UHT 1L', 'Minuman', 18000, 14000, 45, 'active'),
  ('SMB-018', 'Susu Bubuk 400g', 'Minuman', 45000, 38000, 25, 'active'),
  ('SMB-019', 'Teh Celup 25 bags', 'Minuman', 12000, 9000, 60, 'active'),
  ('SMB-020', 'Kopi Sachet (10 pcs)', 'Minuman', 8000, 6000, 70, 'active')
ON CONFLICT (code) DO NOTHING;
*/

-- ========================================
-- OPTION 2: TOKO ELEKTRONIK
-- ========================================
/*
INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
  -- HP & Tablet
  ('ELK-101', 'Samsung Galaxy A14', 'Elektronik', 2500000, 2200000, 5, 'active'),
  ('ELK-102', 'Xiaomi Redmi Note 12', 'Elektronik', 2800000, 2450000, 4, 'active'),
  ('ELK-103', 'Oppo A78', 'Elektronik', 3200000, 2850000, 3, 'active'),
  ('ELK-104', 'Tablet Samsung Tab A8', 'Elektronik', 3500000, 3100000, 2, 'active'),
  
  -- Aksesoris HP
  ('ELK-105', 'Tempered Glass', 'Elektronik', 25000, 15000, 50, 'active'),
  ('ELK-106', 'Case HP Softcase', 'Elektronik', 35000, 20000, 60, 'active'),
  ('ELK-107', 'Case HP Hardcase', 'Elektronik', 45000, 28000, 45, 'active'),
  ('ELK-108', 'Popsocket', 'Elektronik', 15000, 8000, 80, 'active'),
  
  -- Charger & Kabel
  ('ELK-109', 'Charger 20W Fast Charging', 'Elektronik', 85000, 60000, 30, 'active'),
  ('ELK-110', 'Kabel Data Type-C 1m', 'Elektronik', 25000, 15000, 70, 'active'),
  ('ELK-111', 'Kabel Data Lightning 1m', 'Elektronik', 35000, 22000, 50, 'active'),
  ('ELK-112', 'Kabel Data Micro USB 1m', 'Elektronik', 15000, 9000, 60, 'active'),
  
  -- Audio
  ('ELK-113', 'TWS Earbuds Bluetooth', 'Elektronik', 250000, 180000, 15, 'active'),
  ('ELK-114', 'Headphone Wireless', 'Elektronik', 350000, 260000, 10, 'active'),
  ('ELK-115', 'Speaker Bluetooth JBL', 'Elektronik', 450000, 350000, 8, 'active'),
  
  -- Powerbank
  ('ELK-116', 'Powerbank 10.000mAh', 'Elektronik', 150000, 110000, 25, 'active'),
  ('ELK-117', 'Powerbank 20.000mAh', 'Elektronik', 250000, 190000, 18, 'active'),
  ('ELK-118', 'Powerbank Solar 30.000mAh', 'Elektronik', 380000, 290000, 10, 'active'),
  
  -- Smartwatch & Fitness
  ('ELK-119', 'Smartwatch M6', 'Elektronik', 280000, 210000, 12, 'active'),
  ('ELK-120', 'Smartwatch Xiaomi Band', 'Elektronik', 450000, 360000, 8, 'active')
ON CONFLICT (code) DO NOTHING;
*/

-- ========================================
-- OPTION 3: COFFEE SHOP
-- ========================================
/*
INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
  -- Coffee Hot
  ('COF-001', 'Americano', 'Minuman', 20000, 10000, 999, 'active'),
  ('COF-002', 'Espresso', 'Minuman', 18000, 9000, 999, 'active'),
  ('COF-003', 'Cappuccino', 'Minuman', 25000, 13000, 999, 'active'),
  ('COF-004', 'Cafe Latte', 'Minuman', 28000, 15000, 999, 'active'),
  ('COF-005', 'Flat White', 'Minuman', 30000, 16000, 999, 'active'),
  ('COF-006', 'Mochaccino', 'Minuman', 32000, 17000, 999, 'active'),
  ('COF-007', 'Caramel Macchiato', 'Minuman', 35000, 19000, 999, 'active'),
  ('COF-008', 'Hazelnut Latte', 'Minuman', 33000, 18000, 999, 'active'),
  ('COF-009', 'Vanilla Latte', 'Minuman', 33000, 18000, 999, 'active'),
  
  -- Coffee Cold
  ('COF-010', 'Iced Americano', 'Minuman', 22000, 11000, 999, 'active'),
  ('COF-011', 'Iced Latte', 'Minuman', 30000, 16000, 999, 'active'),
  ('COF-012', 'Iced Cappuccino', 'Minuman', 28000, 15000, 999, 'active'),
  ('COF-013', 'Iced Caramel Macchiato', 'Minuman', 38000, 21000, 999, 'active'),
  ('COF-014', 'Cold Brew', 'Minuman', 32000, 17000, 999, 'active'),
  ('COF-015', 'Affogato', 'Minuman', 35000, 19000, 999, 'active'),
  
  -- Non Coffee
  ('COF-016', 'Hot Chocolate', 'Minuman', 25000, 13000, 999, 'active'),
  ('COF-017', 'Matcha Latte', 'Minuman', 30000, 16000, 999, 'active'),
  ('COF-018', 'Taro Latte', 'Minuman', 28000, 15000, 999, 'active'),
  ('COF-019', 'Red Velvet Latte', 'Minuman', 32000, 17000, 999, 'active'),
  ('COF-020', 'Thai Tea', 'Minuman', 22000, 11000, 999, 'active'),
  
  -- Pastry & Cake
  ('COF-021', 'Croissant Plain', 'Snack', 18000, 10000, 30, 'active'),
  ('COF-022', 'Croissant Almond', 'Snack', 22000, 13000, 25, 'active'),
  ('COF-023', 'Chocolate Cake Slice', 'Snack', 28000, 16000, 20, 'active'),
  ('COF-024', 'Cheesecake Slice', 'Snack', 32000, 19000, 18, 'active'),
  ('COF-025', 'Tiramisu', 'Snack', 35000, 21000, 15, 'active'),
  ('COF-026', 'Brownies', 'Snack', 20000, 11000, 25, 'active'),
  ('COF-027', 'Cookies (3 pcs)', 'Snack', 15000, 8000, 40, 'active'),
  ('COF-028', 'Muffin Blueberry', 'Snack', 18000, 10000, 22, 'active'),
  ('COF-029', 'Donut Glazed', 'Snack', 12000, 6500, 35, 'active'),
  ('COF-030', 'Bagel Cream Cheese', 'Snack', 25000, 14000, 20, 'active')
ON CONFLICT (code) DO NOTHING;
*/

-- ========================================
-- OPTION 4: APOTEK
-- ========================================
/*
INSERT INTO products (code, name, category, price, cost, stock, status) VALUES
  -- Obat Umum
  ('APT-001', 'Paracetamol 500mg (Strip)', 'Kebutuhan', 5000, 3000, 150, 'active'),
  ('APT-002', 'Ibuprofen 400mg (Strip)', 'Kebutuhan', 8000, 5500, 120, 'active'),
  ('APT-003', 'Amoxicillin 500mg (Strip)', 'Kebutuhan', 15000, 11000, 80, 'active'),
  ('APT-004', 'Antimo (Strip)', 'Kebutuhan', 7000, 4500, 100, 'active'),
  ('APT-005', 'Promag (Strip)', 'Kebutuhan', 6000, 4000, 110, 'active'),
  ('APT-006', 'Mixagrip (Strip)', 'Kebutuhan', 8000, 5500, 90, 'active'),
  ('APT-007', 'Bodrex (Strip)', 'Kebutuhan', 6000, 4000, 95, 'active'),
  ('APT-008', 'Decolgen (Strip)', 'Kebutuhan', 9000, 6500, 85, 'active'),
  
  -- Vitamin & Suplemen
  ('APT-009', 'Vitamin C 1000mg (Strip)', 'Kebutuhan', 12000, 8500, 70, 'active'),
  ('APT-010', 'Vitamin E 400 IU (Strip)', 'Kebutuhan', 15000, 11000, 60, 'active'),
  ('APT-011', 'Multivitamin (Botol)', 'Kebutuhan', 45000, 35000, 35, 'active'),
  ('APT-012', 'Madu Murni 350ml', 'Kebutuhan', 50000, 38000, 40, 'active'),
  
  -- Alat Kesehatan
  ('APT-013', 'Masker Medis (Box 50pcs)', 'Kebutuhan', 35000, 25000, 55, 'active'),
  ('APT-014', 'Alkohol 70% 100ml', 'Kebutuhan', 12000, 8000, 80, 'active'),
  ('APT-015', 'Hand Sanitizer 100ml', 'Kebutuhan', 15000, 10000, 75, 'active'),
  ('APT-016', 'Termometer Digital', 'Elektronik', 75000, 55000, 25, 'active'),
  ('APT-017', 'Plester Luka Kotak', 'Kebutuhan', 8000, 5500, 90, 'active'),
  ('APT-018', 'Perban 5cm', 'Kebutuhan', 10000, 7000, 60, 'active'),
  ('APT-019', 'Kasa Steril', 'Kebutuhan', 5000, 3500, 100, 'active'),
  ('APT-020', 'Betadine 15ml', 'Kebutuhan', 18000, 13000, 45, 'active')
ON CONFLICT (code) DO NOTHING;
*/

-- Pilih salah satu section di atas dengan menghapus /* dan */
-- Atau kombinasikan beberapa section sesuai kebutuhan toko Anda