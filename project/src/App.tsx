import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { I18nProvider } from './contexts/I18nContext';
import ProtectedRoute from './components/routing/ProtectedRoute';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import ProductsPage from './pages/customer/ProductsPage';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import ProfilePage from './pages/customer/ProfilePage';

// Seller Dashboard
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProducts from './pages/seller/SellerProducts';
import SellerOrders from './pages/seller/SellerOrders';
import SellerCustomizations from './pages/seller/SellerCustomizations';
import SellerAnalytics from './pages/seller/SellerAnalytics';

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Shared Components
import CartSidebar from './components/ui/CartSidebar';
import AuthModal from './components/auth/AuthModal';

import { useCart } from './hooks/useCart';
import { Product } from './types';

// New Pages
import WishlistPage from './pages/customer/WishlistPage';
import CouponsPage from './pages/customer/CouponsPage';

// Chat Component
import ChatButton from './components/chat/ChatButton';



function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#fff',
                  color: '#333',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              
              {/* Customer Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CartPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CheckoutPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/wishlist" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <WishlistPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/coupons" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CouponsPage />
                  </ProtectedRoute>
                } 
              />

              {/* Seller Dashboard Routes */}
              <Route 
                path="/seller" 
                element={
                  <ProtectedRoute requiredRole="seller">
                    <SellerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/seller/products" 
                element={
                  <ProtectedRoute requiredRole="seller">
                    <SellerProducts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/seller/orders" 
                element={
                  <ProtectedRoute requiredRole="seller">
                    <SellerOrders />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/seller/customizations" 
                element={
                  <ProtectedRoute requiredRole="seller">
                    <SellerCustomizations />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/seller/analytics" 
                element={
                  <ProtectedRoute requiredRole="seller">
                    <SellerAnalytics />
                  </ProtectedRoute>
                } 
              />

            {/* Admin Dashboard Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminProducts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/orders" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminOrders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminAnalytics />
                </ProtectedRoute>
              } 
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#333',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </div>
        <ChatButton />
      </Router>
    </I18nProvider>
  </AuthProvider>
  );
}

export default App;