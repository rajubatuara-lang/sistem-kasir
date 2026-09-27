import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/lib/supabase-service';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts((prev) => [newProduct, ...prev]);
      return { success: true, product: newProduct };
    } catch (err: any) {
      console.error('Error adding product:', err);
      return { success: false, error: err.message };
    }
  };

  // Update existing product
  const editProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const updated = await updateProduct(id, productData);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
      return { success: true, product: updated };
    } catch (err: any) {
      console.error('Error updating product:', err);
      return { success: false, error: err.message };
    }
  };

  // Delete product
  const removeProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (err: any) {
      console.error('Error deleting product:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
}
