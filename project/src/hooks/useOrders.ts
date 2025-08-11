import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CartItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export const useOrders = () => {
  const [loading, setLoading] = useState(false);

  const createOrder = async (
    cartItems: CartItem[],
    shippingAddress: ShippingAddress,
    userId: string
  ) => {
    try {
      setLoading(true);
      // Support both basic cart shape and enhanced cart shape
      const total = cartItems.reduce((sum: number, item: any) => {
        const price = typeof item.unitPrice === 'number' ? item.unitPrice : item.price;
        return sum + (price * item.quantity);
      }, 0);
      const orderId = uuidv4();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          user_id: userId,
          total,
          status: 'pending',
          shipping_address: shippingAddress,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item: any) => ({
        id: uuidv4(),
        order_id: orderId,
        product_id: item.productId ?? item.product?.id ?? item.id,
        quantity: item.quantity,
        price: typeof item.unitPrice === 'number' ? item.unitPrice : item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast.success('Order placed successfully!');
      return { order, error: null };
    } catch (error: any) {
      toast.error('Failed to place order: ' + error.message);
      return { order: null, error };
    } finally {
      setLoading(false);
    }
  };

  const getUserOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast.error('Failed to fetch orders');
      return [];
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
      toast.success('Order status updated');
    } catch (error: any) {
      toast.error('Failed to update order status');
    }
  };

  return {
    loading,
    createOrder,
    getUserOrders,
    updateOrderStatus,
  };
};