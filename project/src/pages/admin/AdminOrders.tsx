import React, { useMemo, useState } from 'react';
import OrderManagement from '../../components/order/OrderManagement';
import { Order, OrderItem, User, Product } from '../../types';

const AdminOrders: React.FC = () => {
  // Mock data for demonstration; replace with API calls to Supabase later
  const mockCustomer: User = {
    id: 'u1',
    email: 'jane@example.com',
    role: 'customer',
    firstName: 'Jane',
    lastName: 'Doe',
    isActive: true,
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockProduct: Product = {
    id: 'p1',
    sellerId: 's1',
    categoryId: 'c1',
    name: 'Custom Photo Mug',
    slug: 'custom-photo-mug',
    basePrice: 19.99,
    isCustomizable: true,
    images: [],
    tags: [],
    isActive: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const initialOrders: Order[] = useMemo(() => [
    {
      id: 'o1',
      orderNumber: '10001',
      customerId: mockCustomer.id,
      status: 'pending',
      subtotal: 19.99,
      taxAmount: 1.8,
      shippingAmount: 3.5,
      discountAmount: 0,
      totalAmount: 25.29,
      currency: 'USD',
      paymentStatus: 'pending',
      shippingAddress: {} as any,
      billingAddress: {} as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: mockCustomer,
      orderItems: [
        {
          id: 'oi1',
          orderId: 'o1',
          productId: mockProduct.id,
          sellerId: 's1',
          quantity: 1,
          unitPrice: 19.99,
          totalPrice: 19.99,
          customizationData: { text: 'Happy Bday!' },
          customizationStatus: 'pending',
          fulfillmentStatus: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          product: mockProduct,
        } as OrderItem,
      ],
    },
  ], []);

  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const handleUpdateCustomizationStatus = (
    orderItemId: string,
    status: OrderItem['customizationStatus'],
    notes?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => ({
        ...o,
        orderItems: (o.orderItems || []).map((it) =>
          it.id === orderItemId ? { ...it, customizationStatus: status, customizationNotes: notes } : it
        ),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Management</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <OrderManagement
            orders={orders}
            userRole="admin"
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateCustomizationStatus={handleUpdateCustomizationStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
