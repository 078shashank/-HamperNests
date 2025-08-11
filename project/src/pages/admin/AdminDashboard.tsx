import React from 'react';
import { Link } from 'react-router-dom';
import AnalyticsDashboard from '../../components/analytics/AnalyticsDashboard';
import { Users, Package, ClipboardList, BarChart3 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/admin/users" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Manage</p>
                <p className="text-xl font-semibold text-gray-900">Users</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>

          <Link to="/admin/products" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Moderate</p>
                <p className="text-xl font-semibold text-gray-900">Products</p>
              </div>
              <div className="p-3 rounded-full bg-orange-500">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>

          <Link to="/admin/orders" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Monitor</p>
                <p className="text-xl font-semibold text-gray-900">Orders</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>

          <Link to="/admin/analytics" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">View</p>
                <p className="text-xl font-semibold text-gray-900">Analytics</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>
        </div>

        {/* Embedded Analytics Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <AnalyticsDashboard userRole="admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
