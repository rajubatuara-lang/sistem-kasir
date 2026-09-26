import type { Product, Transaction } from '@/types';

export const CATEGORIES = [
  'Semua',
  'Makanan',
  'Minuman',
  'Snack',
  'Kebutuhan',
  'Elektronik',
];

export const products: Product[] = [
  { id: 'p1', code: 'MKN-001', name: 'Nasi Goreng Spesial', category: 'Makanan', price: 18000, cost: 10000, stock: 45, status: 'active' },
  { id: 'p2', code: 'MKN-002', name: 'Mie Ayam Bakso', category: 'Makanan', price: 15000, cost: 8000, stock: 32, status: 'active' },
  { id: 'p3', code: 'MKN-003', name: 'Ayam Geprek', category: 'Makanan', price: 20000, cost: 12000, stock: 28, status: 'active' },
  { id: 'p4', code: 'MKN-004', name: 'Nasi Padang Komplit', category: 'Makanan', price: 25000, cost: 15000, stock: 15, status: 'active' },
  { id: 'p5', code: 'MKN-005', name: 'Soto Ayam', category: 'Makanan', price: 17000, cost: 9000, stock: 0, status: 'inactive' },
  { id: 'p6', code: 'MNM-001', name: 'Es Teh Manis', category: 'Minuman', price: 5000, cost: 2000, stock: 120, status: 'active' },
  { id: 'p7', code: 'MNM-002', name: 'Es Jeruk', category: 'Minuman', price: 7000, cost: 3000, stock: 80, status: 'active' },
  { id: 'p8', code: 'MNM-003', name: 'Kopi Susu', category: 'Minuman', price: 12000, cost: 6000, stock: 60, status: 'active' },
  { id: 'p9', code: 'MNM-004', name: 'Air Mineral 600ml', category: 'Minuman', price: 4000, cost: 2000, stock: 200, status: 'active' },
  { id: 'p10', code: 'SNK-001', name: 'Keripik Singkong', category: 'Snack', price: 8000, cost: 4000, stock: 50, status: 'active' },
  { id: 'p11', code: 'SNK-002', name: 'Roti Bakar Coklat', category: 'Snack', price: 13000, cost: 7000, stock: 25, status: 'active' },
  { id: 'p12', code: 'SNK-003', name: 'Pisang Goreng', category: 'Snack', price: 10000, cost: 5000, stock: 40, status: 'active' },
  { id: 'p13', code: 'KBT-001', name: 'Tisu Pocket 3s', category: 'Kebutuhan', price: 6000, cost: 3500, stock: 75, status: 'active' },
  { id: 'p14', code: 'KBT-002', name: 'Sabun Cuci Tangan', category: 'Kebutuhan', price: 9000, cost: 5000, stock: 30, status: 'active' },
  { id: 'p15', code: 'ELK-001', name: 'Powerbank 10.000mAh', category: 'Elektronik', price: 150000, cost: 110000, stock: 12, status: 'active' },
  { id: 'p16', code: 'ELK-002', name: 'Kabel USB-C 1m', category: 'Elektronik', price: 25000, cost: 15000, stock: 48, status: 'active' },
  { id: 'p17', code: 'ELK-003', name: 'Earphone Bluetooth', category: 'Elektronik', price: 85000, cost: 60000, stock: 8, status: 'active' },
  { id: 'p18', code: 'MKN-006', name: 'Rendang Paket', category: 'Makanan', price: 30000, cost: 18000, stock: 18, status: 'active' },
  { id: 'p19', code: 'MNM-005', name: 'Cappuccino', category: 'Minuman', price: 18000, cost: 9000, stock: 35, status: 'active' },
  { id: 'p20', code: 'SNK-004', name: 'Donat Coklat', category: 'Snack', price: 9000, cost: 4500, stock: 0, status: 'inactive' },
];

function makeTx(
  i: number,
  daysAgo: number,
  cashier: string,
  method: Transaction['method'],
  total: number,
  items: { name: string; qty: number; price: number }[],
): Transaction {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(9 + (i % 10), (i * 7) % 60, 0, 0);
  const inv = `INV-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${String(i + 1).padStart(4, '0')}`;
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  return {
    id: `t${i + 1}`,
    invoice: inv,
    date: date.toISOString(),
    cashier,
    items,
    subtotal,
    discount: subtotal - total,
    total,
    method,
    status: i % 20 === 19 ? 'void' : 'completed',
  };
}

export const transactions: Transaction[] = [
  makeTx(0, 0, 'Andi', 'qris', 53000, [
    { name: 'Nasi Goreng Spesial', qty: 2, price: 18000 },
    { name: 'Es Teh Manis', qty: 2, price: 5000 },
    { name: 'Keripik Singkong', qty: 1, price: 8000 },
  ]),
  makeTx(1, 0, 'Andi', 'cash', 27000, [
    { name: 'Mie Ayam Bakso', qty: 1, price: 15000 },
    { name: 'Es Jeruk', qty: 1, price: 7000 },
    { name: 'Pisang Goreng', qty: 1, price: 10000 },
  ]),
  makeTx(2, 0, 'Budi', 'transfer', 43000, [
    { name: 'Ayam Geprek', qty: 2, price: 20000 },
    { name: 'Air Mineral 600ml', qty: 1, price: 4000 },
  ]),
  makeTx(3, 0, 'Citra', 'qris', 18000, [
    { name: 'Kopi Susu', qty: 1, price: 12000 },
    { name: 'Roti Bakar Coklat', qty: 1, price: 13000 },
  ]),
  makeTx(4, 1, 'Andi', 'cash', 55000, [
    { name: 'Nasi Padang Komplit', qty: 2, price: 25000 },
    { name: 'Es Teh Manis', qty: 1, price: 5000 },
  ]),
  makeTx(5, 1, 'Budi', 'cash', 35000, [
    { name: 'Soto Ayam', qty: 1, price: 17000 },
    { name: 'Es Jeruk', qty: 1, price: 7000 },
    { name: 'Donat Coklat', qty: 1, price: 9000 },
  ]),
  makeTx(6, 1, 'Citra', 'qris', 175000, [
    { name: 'Powerbank 10.000mAh', qty: 1, price: 150000 },
    { name: 'Es Teh Manis', qty: 1, price: 5000 },
    { name: 'Keripik Singkong', qty: 1, price: 8000 },
    { name: 'Kopi Susu', qty: 1, price: 12000 },
  ]),
  makeTx(7, 1, 'Andi', 'transfer', 60000, [
    { name: 'Rendang Paket', qty: 2, price: 30000 },
  ]),
  makeTx(8, 2, 'Budi', 'cash', 30000, [
    { name: 'Nasi Goreng Spesial', qty: 1, price: 18000 },
    { name: 'Cappuccino', qty: 1, price: 18000 },
  ]),
  makeTx(9, 2, 'Citra', 'qris', 121000, [
    { name: 'Earphone Bluetooth', qty: 1, price: 85000 },
    { name: 'Kabel USB-C 1m', qty: 1, price: 25000 },
    { name: 'Air Mineral 600ml', qty: 1, price: 4000 },
    { name: 'Es Teh Manis', qty: 1, price: 5000 },
    { name: 'Keripik Singkong', qty: 1, price: 8000 },
  ]),
  makeTx(10, 2, 'Andi', 'cash', 40000, [
    { name: 'Ayam Geprek', qty: 2, price: 20000 },
  ]),
  makeTx(11, 3, 'Budi', 'transfer', 9000, [
    { name: 'Donat Coklat', qty: 1, price: 9000 },
  ]),
  makeTx(12, 3, 'Citra', 'cash', 25000, [
    { name: 'Nasi Padang Komplit', qty: 1, price: 25000 },
  ]),
  makeTx(13, 4, 'Andi', 'qris', 47000, [
    { name: 'Rendang Paket', qty: 1, price: 30000 },
    { name: 'Cappuccino', qty: 1, price: 18000 },
  ]),
  makeTx(14, 4, 'Budi', 'cash', 32000, [
    { name: 'Nasi Goreng Spesial', qty: 1, price: 18000 },
    { name: 'Ayam Geprek', qty: 1, price: 20000 },
  ]),
  makeTx(15, 5, 'Citra', 'transfer', 150000, [
    { name: 'Powerbank 10.000mAh', qty: 1, price: 150000 },
  ]),
  makeTx(16, 5, 'Andi', 'cash', 52000, [
    { name: 'Soto Ayam', qty: 2, price: 17000 },
    { name: 'Es Teh Manis', qty: 2, price: 5000 },
    { name: 'Keripik Singkong', qty: 1, price: 8000 },
  ]),
  makeTx(17, 6, 'Budi', 'qris', 30000, [
    { name: 'Rendang Paket', qty: 1, price: 30000 },
  ]),
  makeTx(18, 6, 'Citra', 'cash', 27000, [
    { name: 'Mie Ayam Bakso', qty: 1, price: 15000 },
    { name: 'Kopi Susu', qty: 1, price: 12000 },
  ]),
  makeTx(19, 7, 'Andi', 'cash', 85000, [
    { name: 'Earphone Bluetooth', qty: 1, price: 85000 },
  ]),
];

// 7-day sales for chart (index 0 = 6 days ago ... 6 = today)
export const weeklySales: number[] = [127000, 189000, 243000, 156000, 297000, 178000, 213000];
