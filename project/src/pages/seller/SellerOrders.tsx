import React, { useState, useEffect } from 'react';
import SellerLayout from '../../components/layout/SellerLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../hooks/useOrders';
import OrderManagement from '../../components/order/OrderManagement';
import { motion } from 'framer-motion';

const SellerOrders: React.FC = () => {
  const { user } = useAuth();
  const { loading } = useOrders();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id) {
        // In a real implementation, you would fetch orders for this seller
        // For now, we'll use mock data
        const mockOrders = [
          {
            id: '1',
            orderNumber: 'ORD-001',
            customerId: 'customer1',
            status: 'processing',
            subtotal: 89.97,
            taxAmount: 8.99,
            shippingAmount: 5.99,
            discountAmount: 0,
            totalAmount: 98.96,
            currency: 'USD',
            paymentStatus: 'paid',
            paymentMethod: 'Credit Card',
            shippingAddress: {
              id: '1',
              userId: 'customer1',
              type: 'shipping',
              firstName: 'John',
              lastName: 'Doe',
              addressLine1: '123 Main St',
              city: 'New York',
              state: 'NY',
              postalCode: '10001',
              country: 'USA',
              phone: '555-1234',
              isDefault: true,
              createdAt: new Date().toISOString()
            },
            billingAddress: {
              id: '1',
              userId: 'customer1',
              type: 'billing',
              firstName: 'John',
              lastName: 'Doe',
              addressLine1: '123 Main St',
              city: 'New York',
              state: 'NY',
              postalCode: '10001',
              country: 'USA',
              phone: '555-1234',
              isDefault: true,
              createdAt: new Date().toISOString()
            },
            notes: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            orderItems: [
              {
                id: '1',
                orderId: '1',
                productId: '1',
                variantId: '1',
                sellerId: user.id,
                quantity: 1,
                unitPrice: 29.99,
                totalPrice: 29.99,
                customizationData: {
                  image: 'https://example.com/image1.jpg',
                  text: 'Happy Birthday!'
                },
                customizationStatus: 'in_progress',
                customizationNotes: '',
                fulfillmentStatus: 'processing',
                trackingNumber: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                product: {
                  id: '1',
                  name: 'Custom Photo Frame',
                  slug: 'custom-photo-frame',
                  description: 'Beautiful wooden frame that can be customized with your own photos or artwork.',
                  basePrice: 29.99,
                  images: ['https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400'],
                  isCustomizable: true
                }
              },
              {
                id: '2',
                orderId: '1',
                productId: '2',
                variantId: '2',
                sellerId: user.id,
                quantity: 2,
                unitPrice: 29.99,
                totalPrice: 59.98,
                customizationData: {
                  image: 'https://example.com/image2.jpg',
                  text: 'Congratulations!'
                },
                customizationStatus: 'pending',
                customizationNotes: '',
                fulfillmentStatus: 'pending',
                trackingNumber: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                product: {
                  id: '2',
                  name: 'Personalized Mug',
                  slug: 'personalized-mug',
                  description: 'Ceramic mug with custom printing.',
                  basePrice: 29.99,
                  images: ['https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400'],
                  isCustomizable: true
                }
              }
            ]
          },
          {
            id: '2',
            orderNumber: 'ORD-002',
            customerId: 'customer2',
            status: 'confirmed',
            subtotal: 29.99,
            taxAmount: 3.00,
            shippingAmount: 5.99,
            discountAmount: 0,
            totalAmount: 38.98,
            currency: 'USD',
            paymentStatus: 'paid',
            paymentMethod: 'PayPal',
            shippingAddress: {
              id: '2',
              userId: 'customer2',
              type: 'shipping',
              firstName: 'Jane',
              lastName: 'Smith',
              addressLine1: '456 Oak Ave',
              city: 'Los Angeles',
              state: 'CA',
              postalCode: '90210',
              country: 'USA',
              phone: '555-5678',
              isDefault: true,
              createdAt: new Date().toISOString()
            },
            billingAddress: {
              id: '2',
              userId: 'customer2',
              type: 'billing',
              firstName: 'Jane',
              lastName: 'Smith',
              addressLine1: '456 Oak Ave',
              city: 'Los Angeles',
              state: 'CA',
              postalCode: '90210',
              country: 'USA',
              phone: '555-5678',
              isDefault: true,
              createdAt: new Date().toISOString()
            },
            notes: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            orderItems: [
              {
                id: '3',
                orderId: '2',
                productId: '3',
                variantId: '3',
                sellerId: user.id,
                quantity: 1,
                unitPrice: 29.99,
                totalPrice: 29.99,
                customizationData: {
                  image: 'https://example.com/image3.jpg',
                  color: '#FF0000'
                },
                customizationStatus: 'pending',
                customizationNotes: '',
                fulfillmentStatus: 'pending',
                trackingNumber: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                product: {
                  id: '3',
                  name: 'Custom T-Shirt',
                  slug: 'custom-t-shirt',
                  description: 'Comfortable cotton t-shirt with custom design.',
                  basePrice: 29.99,
                  images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
                  isCustomizable: true
                }
              }
            ]
          }
        ];
        setOrders(mockOrders);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
    console.log(`Updating order ${orderId} status to ${status}`);
  };

  const handleUpdateCustomizationStatus = (orderItemId: string, status: string, notes?: string) => {
    setOrders(prev => 
      prev.map(order => ({
        ...order,
        orderItems: order.orderItems.map(item => 
          item.id === orderItemId ? { ...item, customizationStatus: status, customizationNotes: notes || item.customizationNotes } : item
        )
      }))
    );
    console.log(`Updating customization ${orderItemId} status to ${status}`);
  };

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <OrderManagement 
          orders={orders}
          userRole="seller"
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onUpdateCustomizationStatus={handleUpdateCustomizationStatus}
        />
      </motion.div>
    </SellerLayout>
  );
};

export default SellerOrders;
