import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { useEnhancedCart } from '../../hooks/useEnhancedCart';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useEnhancedCart();

  const handleCheckout = () => {
    if (!user) {
      alert('Please sign in to checkout');
      return;
    }
    
    // In a real implementation, you would navigate to the checkout page
    console.log('Proceeding to checkout');
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header 
          cartCount={0} 
          onCartClick={() => {}}
          user={user}
          onAuthClick={() => {}}
        />
        
        <main className="min-h-screen pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                <ShoppingCart className="h-16 w-16" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header 
        cartCount={cartItems.length} 
        onCartClick={() => {}}
        user={user}
        onAuthClick={() => {}}
      />
      
      <main className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 last:border-b-0 p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={item.product?.images?.[0] || 'https://placehold.co/100'} 
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{item.product?.name}</h3>
                            <p className="text-gray-600">${item.unitPrice.toFixed(2)}</p>
                            
                            {/* Customization Preview */}
                            {item.customizationData && Object.keys(item.customizationData).length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">Customizations:</p>
                                <ul className="text-sm text-gray-700 list-disc pl-5 mt-1">
                                  {Object.entries(item.customizationData).map(([key, value]) => (
                                    <li key={key}>
                                      {key}: {typeof value === 'object' ? value.name : value}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center mt-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 text-gray-700">{item.quantity}</span>
                            <button 
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-rose-600 text-white py-3 px-4 rounded-lg hover:bg-rose-700 transition-colors font-medium"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </motion.button>
                
                <Link 
                  to="/products" 
                  className="block text-center mt-4 text-rose-600 hover:text-rose-700 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CartPage;
