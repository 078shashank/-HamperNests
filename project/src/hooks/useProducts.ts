import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error: any) {
      setError(error.message);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(6);

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast.error('Failed to fetch featured products');
      return [];
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category);

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast.error('Failed to fetch products by category');
      return [];
    }
  };

  const getProductById = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      toast.error('Failed to fetch product');
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getFeaturedProducts,
    getProductsByCategory,
    getProductById,
  };
};