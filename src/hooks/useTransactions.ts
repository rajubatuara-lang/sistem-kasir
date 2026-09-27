import { useState, useEffect } from 'react';
import type { Transaction } from '@/types';
import {
  getAllTransactions,
  createTransaction,
  voidTransaction,
} from '@/lib/supabase-service';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions from Supabase
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add new transaction
  const addTransaction = async (
    transactionData: Omit<Transaction, 'id'>
  ) => {
    try {
      const newTransaction = await createTransaction(transactionData);
      setTransactions((prev) => [newTransaction, ...prev]);
      return { success: true, transaction: newTransaction };
    } catch (err: any) {
      console.error('Error adding transaction:', err);
      return { success: false, error: err.message };
    }
  };

  // Void transaction
  const cancelTransaction = async (id: string) => {
    try {
      await voidTransaction(id);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: 'void' as const } : t))
      );
      return { success: true };
    } catch (err: any) {
      console.error('Error voiding transaction:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    cancelTransaction,
  };
}
