import { supabase } from './supabase';
import type { Product, Transaction } from '@/types';

// ============= PRODUCTS =============

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    throw error;
  }

  return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('name');

  if (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }

  return data || [];
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert({
      code: product.code,
      name: product.name,
      category: product.category,
      price: product.price,
      cost: product.cost,
      stock: product.stock,
      status: product.status,
      image: product.image || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }

  return data;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }

  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

export async function updateProductStock(id: string, quantity: number): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({ stock: quantity })
    .eq('id', id);

  if (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
}

// ============= TRANSACTIONS =============

export async function getAllTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }

  return data || [];
}

export async function getTransactionById(id: string): Promise<Transaction | null> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }

  return data;
}

export async function getTransactionsByDateRange(
  startDate: string,
  endDate: string
): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions by date range:', error);
    throw error;
  }

  return data || [];
}

export async function createTransaction(
  transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>
): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      invoice: transaction.invoice,
      date: transaction.date,
      cashier: transaction.cashier,
      items: transaction.items as any,
      subtotal: transaction.subtotal,
      discount: transaction.discount,
      total: transaction.total,
      method: transaction.method,
      status: transaction.status,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }

  return data;
}

export async function updateTransaction(
  id: string,
  transaction: Partial<Transaction>
): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .update(transaction)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }

  return data;
}

export async function voidTransaction(id: string): Promise<void> {
  const { error } = await supabase
    .from('transactions')
    .update({ status: 'void' })
    .eq('id', id);

  if (error) {
    console.error('Error voiding transaction:', error);
    throw error;
  }
}

// ============= CATEGORIES =============

export async function getAllCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('name')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return data?.map(c => c.name) || [];
}

export async function createCategory(name: string): Promise<void> {
  const { error } = await supabase
    .from('categories')
    .insert({ name });

  if (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

// ============= STATISTICS =============

export async function getDailySales(days: number = 7): Promise<number[]> {
  const result: number[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const { data, error } = await supabase
      .from('transactions')
      .select('total')
      .eq('status', 'completed')
      .gte('date', date.toISOString())
      .lt('date', nextDate.toISOString());

    if (error) {
      console.error('Error fetching daily sales:', error);
      result.push(0);
    } else {
      const total = data?.reduce((sum, t) => sum + t.total, 0) || 0;
      result.push(total);
    }
  }

  return result;
}

export async function getTodaySales(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { data, error } = await supabase
    .from('transactions')
    .select('total')
    .eq('status', 'completed')
    .gte('date', today.toISOString())
    .lt('date', tomorrow.toISOString());

  if (error) {
    console.error('Error fetching today sales:', error);
    return 0;
  }

  return data?.reduce((sum, t) => sum + t.total, 0) || 0;
}

export async function getTodayTransactionCount(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { count, error } = await supabase
    .from('transactions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed')
    .gte('date', today.toISOString())
    .lt('date', tomorrow.toISOString());

  if (error) {
    console.error('Error fetching transaction count:', error);
    return 0;
  }

  return count || 0;
}

export async function getLowStockProducts(threshold: number = 10): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .lte('stock', threshold)
    .eq('status', 'active')
    .order('stock');

  if (error) {
    console.error('Error fetching low stock products:', error);
    throw error;
  }

  return data || [];
}
