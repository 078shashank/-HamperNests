import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { DashboardStats, SellerDashboardStats } from '../../types';

interface AnalyticsDashboardProps {
  userRole: 'seller' | 'admin';
  sellerId?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userRole, sellerId }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [stats, setStats] = useState<DashboardStats | SellerDashboardStats | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (userRole === 'admin') {
        setStats({
          totalRevenue: 125450.75,
          totalOrders: 1247,
          totalProducts: 3456,
          totalCustomers: 892,
          revenueGrowth: 15.3,
          ordersGrowth: 12.7
        } as DashboardStats);
      } else {
        setStats({
          totalRevenue: 12450.50,
          totalOrders: 89,
          totalProducts: 24,
          pendingCustomizations: 7,
          revenueGrowth: 12.5,
          ordersGrowth: 8.3
        } as SellerDashboardStats);
      }

      // Generate sample chart data
      const generateChartData = () => {
        const data = [];
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
        
        for (let i = days; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          
          data.push({
            date: date.toISOString().split('T')[0],
            revenue: Math.floor(Math.random() * 1000) + 500,
            orders: Math.floor(Math.random() * 20) + 5,
            visitors: Math.floor(Math.random() * 200) + 100
          });
        }
        return data;
      };

      setChartData(generateChartData());
      setIsLoading(false);
    };

    loadAnalytics();
  }, [timeRange, userRole, sellerId]);

  const StatCard: React.FC<{
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: React.ElementType;
    color: string;
  }> = ({ title, value, change, changeType, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {changeType === 'increase' ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : changeType === 'decrease' ? (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            ) : null}
            <span className={`text-sm ${
              changeType === 'increase' ? 'text-green-600' :
              changeType === 'decrease' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {change}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const SimpleChart: React.FC<{ data: any[]; type: 'revenue' | 'orders' }> = ({ data, type }) => {
    const maxValue = Math.max(...data.map(d => d[type]));
    
    return (
      <div className="h-64 flex items-end space-x-1 px-4">
        {data.slice(-30).map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-rose-500 rounded-t opacity-70 hover:opacity-100 transition-opacity"
            style={{
              height: `${(item[type] / maxValue) * 100}%`,
              minHeight: '4px'
            }}
            title={`${item.date}: ${type === 'revenue' ? '$' : ''}${item[type]}`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  const adminStats = stats as DashboardStats;
  const sellerStats = stats as SellerDashboardStats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">
            {userRole === 'admin' ? 'Platform-wide performance metrics' : 'Your store performance metrics'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-rose-500 focus:border-rose-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue.toLocaleString()}`}
          change={`+${stats?.revenueGrowth}%`}
          changeType="increase"
          icon={DollarSign}
          color="bg-green-500"
        />
        
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders.toString() || '0'}
          change={`+${stats?.ordersGrowth}%`}
          changeType="increase"
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        
        <StatCard
          title={userRole === 'admin' ? 'Total Customers' : 'Products Listed'}
          value={userRole === 'admin' ? adminStats?.totalCustomers?.toString() || '0' : sellerStats?.totalProducts?.toString() || '0'}
          change={userRole === 'admin' ? '+5.2%' : '+2 this month'}
          changeType={userRole === 'admin' ? 'increase' : 'neutral'}
          icon={userRole === 'admin' ? Users : Package}
          color="bg-purple-500"
        />
        
        <StatCard
          title={userRole === 'admin' ? 'Total Products' : 'Pending Customizations'}
          value={userRole === 'admin' ? adminStats?.totalProducts?.toString() || '0' : sellerStats?.pendingCustomizations?.toString() || '0'}
          change={userRole === 'admin' ? '+12.3%' : 'Needs attention'}
          changeType={userRole === 'admin' ? 'increase' : 'neutral'}
          icon={Package}
          color="bg-orange-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <div className="text-sm text-gray-500">
              Last {timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : timeRange === '90d' ? '90 days' : 'year'}
            </div>
          </div>
          <SimpleChart data={chartData} type="revenue" />
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Orders Trend</h3>
            <div className="text-sm text-gray-500">
              Last {timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : timeRange === '90d' ? '90 days' : 'year'}
            </div>
          </div>
          <SimpleChart data={chartData} type="orders" />
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-3">
            {[
              { name: 'Custom Photo Mug', sales: 45, revenue: 675 },
              { name: 'Personalized T-Shirt', sales: 32, revenue: 896 },
              { name: 'Custom Gift Box', sales: 28, revenue: 1120 },
              { name: 'Engraved Keychain', sales: 24, revenue: 360 },
            ].map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Insights */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Repeat Customers</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Avg. Order Value</span>
                <span className="text-sm font-medium">$47.50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Customer Satisfaction</span>
                <span className="text-sm font-medium">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'New order received', time: '2 hours ago', type: 'order' },
              { action: 'Product customization approved', time: '4 hours ago', type: 'customization' },
              { action: 'Customer review posted', time: '6 hours ago', type: 'review' },
              { action: 'New product listed', time: '1 day ago', type: 'product' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'order' ? 'bg-green-500' :
                  activity.type === 'customization' ? 'bg-blue-500' :
                  activity.type === 'review' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
