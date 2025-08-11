import React from 'react';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WishlistItemProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  inStock,
  onRemove,
  onMoveToCart,
}) => {
  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-6">
      <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
        <div className="flex justify-between">
          <Link
            to={`/products/${id}`}
            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            {name}
          </Link>
          <button
            onClick={() => onRemove(id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove from wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-2 flex items-center">
          <span className="text-lg font-semibold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={() => onMoveToCart(id)}
            disabled={!inStock}
            className={`flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              inStock
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {inStock ? 'Move to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
