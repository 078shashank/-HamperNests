import React, { useState } from 'react';
import SellerLayout from '../../components/layout/SellerLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useSellerProducts } from '../../hooks/useSellerProducts';
import ProductManagement from '../../components/seller/ProductManagement';
import { motion } from 'framer-motion';
import { Package, Plus, Search } from 'lucide-react';

const SellerProducts: React.FC = () => {
  const { user } = useAuth();
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useSellerProducts(user?.id);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
        </div>
      </SellerLayout>
    );
  }

  if (error) {
    return (
      <SellerLayout>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-red-400">
              <Package className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading products</h3>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 flex items-center justify-center gap-2"
              onClick={() => console.log('Add product functionality to be implemented')}
            >
              <Plus size={20} />
              Add New Product
            </motion.button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {filteredProducts.length > 0 ? (
            <ProductManagement 
              products={filteredProducts}
              onAddProduct={addProduct}
              onEditProduct={updateProduct}
              onDeleteProduct={deleteProduct}
            />
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Package className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
            </div>
          )}
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerProducts;
