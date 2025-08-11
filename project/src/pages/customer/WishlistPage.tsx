import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import WishlistItem from '../../components/wishlist/WishlistItem';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // In a real app, this would be an API call
        const mockWishlist: WishlistItem[] = [
          {
            id: '1',
            name: 'Personalized Photo Mug',
            price: 19.99,
            originalPrice: 24.99,
            image: 'https://via.placeholder.com/150',
            inStock: true,
          },
          {
            id: '2',
            name: 'Custom Engraved Watch',
            price: 89.99,
            image: 'https://via.placeholder.com/150',
            inStock: true,
          },
          {
            id: '3',
            name: 'Handmade Leather Journal',
            price: 34.99,
            image: 'https://via.placeholder.com/150',
            inStock: false,
          },
        ];
        
        setWishlist(mockWishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    // In a real app, you would also update the backend
  };

  const handleMoveToCart = (id: string) => {
    const item = wishlist.find((item) => item.id === id);
    if (item) {
      // In a real app, you would add the item to the cart in the backend
      alert(`Added ${item.name} to cart!`);
      handleRemoveFromWishlist(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              My Wishlist
            </h1>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Your wishlist is empty
              </h3>
              <p className="mt-1 text-gray-500">
                Start adding items you love to your wishlist.
              </p>
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ShoppingCart className="w-5 h-5 mr-2 -ml-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {wishlist.map((item) => (
                    <WishlistItem
                      key={item.id}
                      {...item}
                      onRemove={handleRemoveFromWishlist}
                      onMoveToCart={handleMoveToCart}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Link
                  to="/products"
                  className="text-base font-medium text-blue-600 hover:text-blue-500"
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
