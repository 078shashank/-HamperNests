import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useEnhancedCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, customizationData?: Record<string, any>, variantId?: string) => {
    setIsLoading(true);
    
    try {
      const existingItemIndex = cartItems.findIndex(
        item => item.productId === product.id && 
        item.variantId === variantId &&
        JSON.stringify(item.customizationData) === JSON.stringify(customizationData)
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists with same customization
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += 1;
        setCartItems(updatedItems);
        toast.success('Item quantity updated in cart');
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `cart_${Date.now()}_${Math.random()}`,
          userId: user?.id || '',
          productId: product.id,
          variantId,
          quantity: 1,
          customizationData,
          unitPrice: product.basePrice,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          product
        };
        
        setCartItems([...cartItems, newItem]);
        toast.success('Item added to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity, updatedAt: new Date().toISOString() } : item
    );
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const basePrice = item.unitPrice * item.quantity;
      // Add variant price adjustment if applicable
      const variantAdjustment = item.variant?.priceAdjustment || 0;
      return total + basePrice + (variantAdjustment * item.quantity);
    }, 0);
  };

  const getItemsByseller = () => {
    const sellerGroups: Record<string, CartItem[]> = {};
    
    cartItems.forEach(item => {
      const sellerId = item.product?.sellerId || 'unknown';
      if (!sellerGroups[sellerId]) {
        sellerGroups[sellerId] = [];
      }
      sellerGroups[sellerId].push(item);
    });
    
    return sellerGroups;
  };

  const hasCustomizedItems = () => {
    return cartItems.some(item => item.customizationData && Object.keys(item.customizationData).length > 0);
  };

  const validateCart = () => {
    const errors: string[] = [];
    
    cartItems.forEach(item => {
      if (!item.product) {
        errors.push(`Product not found for cart item ${item.id}`);
      }
      
      if (item.product?.isCustomizable && item.product.customizationOptions) {
        item.product.customizationOptions.forEach((option, index) => {
          if (option.required && !item.customizationData?.[`option_${index}`]) {
            errors.push(`Required customization "${option.label}" missing for ${item.product?.name}`);
          }
        });
      }
    });
    
    return { isValid: errors.length === 0, errors };
  };

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemsByseller,
    hasCustomizedItems,
    validateCart
  };
};
