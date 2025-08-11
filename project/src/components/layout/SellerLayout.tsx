import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  BarChart3, 
  LogOut,
  Gift,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SellerLayoutProps {
  children: React.ReactNode;
}

const SellerLayout: React.FC<SellerLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/seller',
      icon: LayoutDashboard,
      current: location.pathname === '/seller',
    },
    {
      name: 'Products',
      href: '/seller/products',
      icon: Package,
      current: location.pathname.startsWith('/seller/products'),
    },
    {
      name: 'Orders',
      href: '/seller/orders',
      icon: ShoppingCart,
      current: location.pathname === '/seller/orders',
    },
    {
      name: 'Customizations',
      href: '/seller/customizations',
      icon: Settings,
      current: location.pathname === '/seller/customizations',
    },
    {
      name: 'Analytics',
      href: '/seller/analytics',
      icon: BarChart3,
      current: location.pathname === '/seller/analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200">
            <Link to="/seller" className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-rose-600" />
              <span className="text-xl font-bold text-gray-900">Seller Hub</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-rose-100 text-rose-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    item.current ? 'text-rose-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-rose-600" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">Seller</p>
              </div>
              <button
                onClick={logout}
                className="ml-3 text-gray-400 hover:text-gray-600"
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
