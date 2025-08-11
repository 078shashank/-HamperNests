import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  AlertCircle, 
  Eye, 
  MessageSquare,
  Download,
  Filter
} from 'lucide-react';
import { Order, OrderItem } from '../../types';

interface OrderManagementProps {
  orders: Order[];
  userRole: 'seller' | 'admin';
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onUpdateCustomizationStatus: (orderItemId: string, status: OrderItem['customizationStatus'], notes?: string) => void;
}

const OrderManagement: React.FC<OrderManagementProps> = ({
  orders,
  userRole,
  onUpdateOrderStatus,
  onUpdateCustomizationStatus
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [customizationNotes, setCustomizationNotes] = useState<string>('');

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCustomizationStatusColor = (status: OrderItem['customizationStatus']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  const handleCustomizationUpdate = (orderItemId: string, newStatus: OrderItem['customizationStatus']) => {
    onUpdateCustomizationStatus(orderItemId, newStatus, customizationNotes);
    setCustomizationNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">
            {userRole === 'seller' ? 'Manage your orders and customizations' : 'Monitor all platform orders'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order.orderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.customer?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.orderItems?.length || 0} items
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.orderItems?.filter(item => item.customizationData).length || 0} customized
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-rose-600 hover:text-rose-900 mr-3"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Order #{selectedOrder.orderNumber}
                  </h3>
                  <p className="text-gray-600">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}</p>
                    <p>{selectedOrder.customer?.email}</p>
                    <p>{selectedOrder.customer?.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}</p>
                    <p>{selectedOrder.shippingAddress.addressLine1}</p>
                    {selectedOrder.shippingAddress.addressLine2 && (
                      <p>{selectedOrder.shippingAddress.addressLine2}</p>
                    )}
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
                <div className="space-y-4">
                  {selectedOrder.orderItems?.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.product?.name}</h5>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity} × ${item.unitPrice.toFixed(2)}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            Total: ${item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                        
                        {item.customizationData && (
                          <div className="ml-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCustomizationStatusColor(item.customizationStatus)}`}>
                              {item.customizationStatus}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Customization Details */}
                      {item.customizationData && (
                        <div className="border-t border-gray-100 pt-3 mt-3">
                          <h6 className="font-medium text-gray-900 mb-2">Customization Details</h6>
                          <div className="space-y-2">
                            {Object.entries(item.customizationData).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="font-medium text-gray-700">{key}: </span>
                                {typeof value === 'object' && value.preview ? (
                                  <div className="mt-1">
                                    <img 
                                      src={value.preview} 
                                      alt="Customization" 
                                      className="w-20 h-20 object-cover rounded border"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{value.name}</p>
                                  </div>
                                ) : (
                                  <span className="text-gray-600">{String(value)}</span>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Customization Actions for Sellers */}
                          {userRole === 'seller' && item.customizationStatus === 'pending' && (
                            <div className="mt-4 space-y-3">
                              <textarea
                                value={customizationNotes}
                                onChange={(e) => setCustomizationNotes(e.target.value)}
                                placeholder="Add notes for the customer..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                                rows={2}
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleCustomizationUpdate(item.id, 'approved')}
                                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleCustomizationUpdate(item.id, 'in_progress')}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                >
                                  Start Work
                                </button>
                                <button
                                  onClick={() => handleCustomizationUpdate(item.id, 'completed')}
                                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                                >
                                  Mark Complete
                                </button>
                              </div>
                            </div>
                          )}

                          {item.customizationNotes && (
                            <div className="mt-3 p-2 bg-gray-50 rounded">
                              <p className="text-sm text-gray-700">
                                <strong>Notes:</strong> {item.customizationNotes}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Shipping:</span>
                  <span>${selectedOrder.shippingAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Tax:</span>
                  <span>${selectedOrder.taxAmount.toFixed(2)}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span>Discount:</span>
                    <span>-${selectedOrder.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-semibold border-t border-gray-200 pt-2 mt-2">
                  <span>Total:</span>
                  <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {statusFilter === 'all' ? 'No orders have been placed yet' : `No ${statusFilter} orders found`}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
