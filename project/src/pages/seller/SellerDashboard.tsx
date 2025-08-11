import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertCircle,
  Plus,
  Eye,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SellerDashboardStats } from '../../types';
import SellerLayout from '../../components/layout/SellerLayout';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<SellerDashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingCustomizations: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading seller stats
    setTimeout(() => {
      setStats({
        totalRevenue: 12450.50,
        totalOrders: 89,
        totalProducts: 24,
        pendingCustomizations: 7,
        revenueGrowth: 12.5,
        ordersGrowth: 8.3,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: `+${stats.revenueGrowth}%`,
      changeType: 'increase' as const,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      change: `+${stats.ordersGrowth}%`,
      changeType: 'increase' as const,
      color: 'bg-blue-500',
    },
    {
      title: 'Products Listed',
      value: stats.totalProducts.toString(),
      icon: Package,
      change: '+2 this month',
      changeType: 'neutral' as const,
      color: 'bg-purple-500',
    },
    {
      title: 'Pending Customizations',
      value: stats.pendingCustomizations.toString(),
      icon: AlertCircle,
      change: 'Needs attention',
      changeType: 'warning' as const,
      color: 'bg-orange-500',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'List a new customizable product',
      icon: Plus,
      href: '/seller/products/new',
      color: 'bg-rose-500',
    },
    {
      title: 'View Orders',
      description: 'Manage your customer orders',
      icon: Eye,
      href: '/seller/orders',
      color: 'bg-blue-500',
    },
    {
      title: 'Customizations',
      description: 'Review pending customizations',
      icon: Settings,
      href: '/seller/customizations',
      color: 'bg-orange-500',
    },
    {
      title: 'Analytics',
      description: 'View detailed performance metrics',
      icon: TrendingUp,
      href: '/seller/analytics',
      color: 'bg-green-500',
    },
  ];

  if (isLoading) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your store's performance and pending tasks.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  <p className={`text-sm mt-1 ${
                    card.changeType === 'increase' ? 'text-green-600' :
                    card.changeType === 'warning' ? 'text-orange-600' :
                    'text-gray-600'
                  }`}>
                    {card.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.a
                key={action.title}
                href={action.href}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className={`inline-flex p-2 rounded-lg ${action.color} mb-3`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New order received</p>
                <p className="text-xs text-gray-500">Custom mug with photo upload - 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Customization pending</p>
                <p className="text-xs text-gray-500">T-shirt design needs approval - 4 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Product updated</p>
                <p className="text-xs text-gray-500">Holiday Gift Box - 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboard;
