export type Page =
  | 'dashboard'
  | 'kasir'
  | 'produk'
  | 'transaksi'
  | 'laporan'
  | 'pengaturan';

export type PaymentMethod = 'cash' | 'transfer' | 'qris';

export type ProductStatus = 'active' | 'inactive';

export type TransactionStatus = 'completed' | 'void' | 'pending';

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: ProductStatus;
  image?: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Transaction {
  id: string;
  invoice: string;
  date: string; // ISO
  cashier: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  total: number;
  method: PaymentMethod;
  status: TransactionStatus;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
