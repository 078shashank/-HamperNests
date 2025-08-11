import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      variants={cardVariants}
      whileHover={{ y: -10 }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Wishlist Button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={18} className="text-gray-600 hover:text-pink-500 transition-colors" />
        </motion.button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-pink-600">
          {product.category}
        </div>

        {/* Quick Add Button */}
        <motion.button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingBag size={16} />
          Quick Add
        </motion.button>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-yellow-400 fill-current" />
          ))}
          <span className="text-sm text-gray-500 ml-1">(4.8)</span>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 font-playfair group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-pink-600 font-playfair">
            ${product.price}
          </div>
          
          <motion.button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 rounded-full font-semibold hover:from-pink-200 hover:to-rose-200 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag size={16} />
            Add
          </motion.button>
        </div>
      </div>

      {/* Glassmorphism Border */}
      <div className="absolute inset-0 border border-pink-100 rounded-3xl pointer-events-none group-hover:border-pink-200 transition-colors duration-300" />
    </motion.div>
  );
};

export default ProductCard;