import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../contexts/AuthContext';

const ProductsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Header 
        cartCount={0} 
        onCartClick={() => {}}
        user={user}
        onAuthClick={() => {}}
      />
      
      <main className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">All Products</h1>
          <p className="text-gray-600">Browse our collection of customizable gifts...</p>
          {/* Product grid will be implemented here */}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductsPage;
