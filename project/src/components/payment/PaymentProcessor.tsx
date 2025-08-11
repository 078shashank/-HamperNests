import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { CartItem, Address } from '../../types';
import toast from 'react-hot-toast';

interface PaymentProcessorProps {
  cartItems: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  billingAddress: Address;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  cartItems,
  totalAmount,
  shippingAddress,
  billingAddress,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay'>('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCard = () => {
    const errors = [];
    
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 16) {
      errors.push('Valid card number is required');
    }
    
    if (!cardData.expiryDate || cardData.expiryDate.length < 5) {
      errors.push('Valid expiry date is required');
    }
    
    if (!cardData.cvv || cardData.cvv.length < 3) {
      errors.push('Valid CVV is required');
    }
    
    if (!cardData.cardholderName.trim()) {
      errors.push('Cardholder name is required');
    }
    
    return errors;
  };

  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Validate payment data
      if (paymentMethod === 'card') {
        const errors = validateCard();
        if (errors.length > 0) {
          throw new Error(errors.join(', '));
        }
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would integrate with Stripe, PayPal, etc.
      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Simulate payment success/failure (90% success rate for demo)
      if (Math.random() > 0.1) {
        setPaymentComplete(true);
        toast.success('Payment processed successfully!');
        onPaymentSuccess(paymentId);
      } else {
        throw new Error('Payment declined. Please try a different card.');
      }
      
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment processing failed');
      onPaymentError(error.message || 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-sm p-6 text-center"
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">
          Your order has been placed and you will receive a confirmation email shortly.
        </p>
        <div className="text-sm text-gray-500">
          <p>Order Total: ${totalAmount.toFixed(2)}</p>
          <p>Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Lock className="h-5 w-5 text-green-600" />
        <span className="text-sm text-gray-600">Secure Payment</span>
      </div>

      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card')}
              className="text-rose-600 focus:ring-rose-500"
            />
            <CreditCard className="h-5 w-5 text-gray-400 ml-3 mr-2" />
            <span className="text-gray-900">Credit/Debit Card</span>
          </label>
          
          <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
              className="text-rose-600 focus:ring-rose-500"
            />
            <div className="h-5 w-5 bg-blue-600 rounded ml-3 mr-2"></div>
            <span className="text-gray-900">PayPal</span>
          </label>
          
          <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="apple_pay"
              checked={paymentMethod === 'apple_pay'}
              onChange={(e) => setPaymentMethod(e.target.value as 'apple_pay')}
              className="text-rose-600 focus:ring-rose-500"
            />
            <div className="h-5 w-5 bg-black rounded ml-3 mr-2"></div>
            <span className="text-gray-900">Apple Pay</span>
          </label>
        </div>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={cardData.cardNumber}
              onChange={(e) => setCardData({
                ...cardData,
                cardNumber: formatCardNumber(e.target.value)
              })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardData.expiryDate}
                onChange={(e) => setCardData({
                  ...cardData,
                  expiryDate: formatExpiryDate(e.target.value)
                })}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                value={cardData.cvv}
                onChange={(e) => setCardData({
                  ...cardData,
                  cvv: e.target.value.replace(/\D/g, '').substring(0, 4)
                })}
                placeholder="123"
                maxLength={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardData.cardholderName}
              onChange={(e) => setCardData({
                ...cardData,
                cardholderName: e.target.value
              })}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
        </motion.div>
      )}

      {/* PayPal Integration */}
      {paymentMethod === 'paypal' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-center py-8"
        >
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="h-12 w-12 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold">PP</span>
            </div>
            <p className="text-gray-700">
              You will be redirected to PayPal to complete your payment securely.
            </p>
          </div>
        </motion.div>
      )}

      {/* Apple Pay Integration */}
      {paymentMethod === 'apple_pay' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-center py-8"
        >
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="h-12 w-12 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold">🍎</span>
            </div>
            <p className="text-gray-700">
              Use Touch ID or Face ID to pay with Apple Pay.
            </p>
          </div>
        </motion.div>
      )}

      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}):</span>
            <span>${cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$9.99</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${(totalAmount * 0.08).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Process Payment Button */}
      <button
        onClick={processPayment}
        disabled={isProcessing}
        className="w-full bg-rose-600 text-white py-3 px-4 rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <Lock className="h-5 w-5" />
            <span>Complete Payment - ${totalAmount.toFixed(2)}</span>
          </>
        )}
      </button>

      <div className="text-xs text-gray-500 text-center">
        <p>Your payment information is encrypted and secure.</p>
        <p>By completing this purchase, you agree to our Terms of Service.</p>
      </div>
    </div>
  );
};

export default PaymentProcessor;
