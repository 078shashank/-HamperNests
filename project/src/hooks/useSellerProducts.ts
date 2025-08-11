import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import toast from 'react-hot-toast';

export const useSellerProducts = (sellerId: string | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSellerProducts = async () => {
    if (!sellerId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error: any) {
      setError(error.message);
      toast.error('Failed to fetch seller products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{ ...product, seller_id: sellerId }])
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => [data, ...prev]);
      toast.success('Product added successfully');
      return data;
    } catch (error: any) {
      toast.error('Failed to add product: ' + error.message);
      return null;
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
      toast.success('Product updated successfully');
      return data;
    } catch (error: any) {
      toast.error('Failed to update product: ' + error.message);
      return null;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete product: ' + error.message);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, [sellerId]);

  return {
    products,
    loading,
    error,
    fetchSellerProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
