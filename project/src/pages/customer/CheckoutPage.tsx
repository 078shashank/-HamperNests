import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { useEnhancedCart } from '../../hooks/useEnhancedCart';
import { useOrders } from '../../hooks/useOrders';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, MapPin } from 'lucide-react';
import PaymentProcessor from '../../components/payment/PaymentProcessor';

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, clearCart, getTotalPrice } = useEnhancedCart();
  const { createOrder } = useOrders();
  
  // Address form states
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });
  
  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Prefill forms with user data if available
  useEffect(() => {
    if (user) {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      
      setShippingAddress(prev => ({
        ...prev,
        fullName: fullName || prev.fullName,
        email: user.email || prev.email,
      }));
      
      setBillingAddress(prev => ({
        ...prev,
        fullName: fullName || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);
  
  // Handle form changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle same as shipping checkbox
  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress(shippingAddress);
    }
  }, [sameAsShipping, shippingAddress]);
  
  // Handle order placement
  const handlePaymentSuccess = async (_paymentId: string) => {
    if (!user) return;
    try {
      const result = await createOrder(
        cartItems,
        sameAsShipping ? shippingAddress : billingAddress,
        user.id
      );
      if (result.order) {
        setOrderPlaced(true);
        setOrderId(result.order.id);
        clearCart();
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please contact support.');
    }
  };

  const handlePaymentError = (message: string) => {
    console.error('Payment error:', message);
  };
  
  if (orderPlaced) {
    return (
      <>
        <Header 
          cartCount={0} 
          onCartClick={() => {}}
          user={user}
          onAuthClick={() => {}}
        />
        
        <main className="min-h-screen pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="mx-auto h-16 w-16 text-green-500 mb-4">
                <CheckCircle className="h-16 w-16" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
              <p className="text-gray-600 mb-2">Thank you for your order.</p>
              <p className="text-gray-600 mb-8">Order ID: {orderId}</p>
              
              <div className="space-y-4">
                <button 
                  className="w-full bg-rose-600 text-white py-3 px-4 rounded-lg hover:bg-rose-700 transition-colors font-medium"
                  onClick={() => setOrderPlaced(false)}
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </>
    );
  }
  
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
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
              
              <button 
                className="bg-rose-600 text-white py-3 px-4 rounded-lg hover:bg-rose-700 transition-colors font-medium"
                onClick={() => window.history.back()}
              >
                Back to Shopping
              </button>
            </motion.div>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
          
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Address Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <MapPin className="h-5 w-5 text-rose-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="shippingFullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="shippingFullName"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="shippingEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="shippingEmail"
                      name="email"
                      value={shippingAddress.email}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="shippingPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="shippingPhone"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="shippingAddress"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="shippingCity" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="shippingCity"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="shippingState" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="shippingState"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="shippingZipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="shippingZipCode"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="shippingCountry" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="shippingCountry"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Billing Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-rose-600 mr-2" />
                    <h2 className="text-xl font-bold text-gray-800">Billing Address</h2>
                  </div>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                      className="mr-2 h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                    />
                    Same as shipping address
                  </label>
                </div>
                
                {!sameAsShipping && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="billingFullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="billingFullName"
                        name="fullName"
                        value={billingAddress.fullName}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="billingEmail"
                        name="email"
                        value={billingAddress.email}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="billingPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="billingPhone"
                        name="phone"
                        value={billingAddress.phone}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="billingAddress"
                        name="address"
                        value={billingAddress.address}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        name="city"
                        value={billingAddress.city}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        id="billingState"
                        name="state"
                        value={billingAddress.state}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billingZipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="billingZipCode"
                        name="zipCode"
                        value={billingAddress.zipCode}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        id="billingCountry"
                        name="country"
                        value={billingAddress.country}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <CreditCard className="h-5 w-5 text-rose-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'credit_card' ? 'border-rose-500 bg-rose-50' : 'border-gray-300 hover:border-gray-400'}`}
                    onClick={() => setPaymentMethod('credit_card')}
                  >
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                        {paymentMethod === 'credit_card' && (
                          <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                        )}
                      </div>
                      <span className="font-medium">Credit Card</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-rose-500 bg-rose-50' : 'border-gray-300 hover:border-gray-400'}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                        {paymentMethod === 'paypal' && (
                          <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                        )}
                      </div>
                      <span className="font-medium">PayPal</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'bank_transfer' ? 'border-rose-500 bg-rose-50' : 'border-gray-300 hover:border-gray-400'}`}
                    onClick={() => setPaymentMethod('bank_transfer')}
                  >
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                        {paymentMethod === 'bank_transfer' && (
                          <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                        )}
                      </div>
                      <span className="font-medium">Bank Transfer</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <PaymentProcessor
                    cartItems={cartItems as any}
                    totalAmount={getTotalPrice()}
                    shippingAddress={shippingAddress as any}
                    billingAddress={(sameAsShipping ? shippingAddress : billingAddress) as any}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                  />
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        {item.customizationData && Object.keys(item.customizationData).length > 0 && (
                          <p className="text-sm text-gray-600">
                            Customized
                          </p>
                        )}
                      </div>
                      <p className="font-medium">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
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
                    <div className="flex justify-between text-lg font-bold mt-2">
                      <span>Total</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">Complete payment to place your order.</p>
              </div>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CheckoutPage;
