import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import Hero from '../../components/sections/Hero';
import FeaturedProducts from '../../components/sections/FeaturedProducts';
import Categories from '../../components/sections/Categories';
import Testimonials from '../../components/sections/Testimonials';
import Newsletter from '../../components/sections/Newsletter';
import Footer from '../../components/layout/Footer';
import CartSidebar from '../../components/ui/CartSidebar';
import AuthModal from '../../components/auth/AuthModal';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types';

const HomePage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  const { user } = useAuth();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <Header 
        cartCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)}
        user={user}
        onAuthClick={handleAuthClick}
      />
      
      <main className="relative">
        <Hero />
        <FeaturedProducts onAddToCart={handleAddToCart} />
        <Categories />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />

      {/* Cart Sidebar */}
      {isCartOpen && (
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
          totalPrice={getTotalPrice()}
          user={user}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default HomePage;
