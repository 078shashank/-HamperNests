import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import { Product } from '../../types';

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onAddToCart }) => {
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Romance Collection",
      price: 89.99,
      image: "https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Romance",
      description: "Perfect for anniversaries and romantic occasions with chocolate, wine, and flowers"
    },
    {
      id: 2,
      name: "Wellness Retreat",
      price: 69.99,
      image: "https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Wellness",
      description: "Self-care essentials including aromatherapy, teas, and relaxation accessories"
    },
    {
      id: 3,
      name: "Gourmet Delights",
      price: 129.99,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Gourmet",
      description: "Artisanal treats, fine cheeses, and premium delicacies for food lovers"
    },
    {
      id: 4,
      name: "New Mom Care",
      price: 79.99,
      image: "https://images.pexels.com/photos/6865156/pexels-photo-6865156.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Baby",
      description: "Thoughtful essentials for new mothers with comfort and care items"
    },
    {
      id: 5,
      name: "Corporate Excellence",
      price: 149.99,
      image: "https://images.pexels.com/photos/6068965/pexels-photo-6068965.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Corporate",
      description: "Professional gift set perfect for business relationships and achievements"
    },
    {
      id: 6,
      name: "Birthday Bliss",
      price: 94.99,
      image: "https://images.pexels.com/photos/1857166/pexels-photo-1857166.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "Birthday",
      description: "Celebration hamper with party essentials, treats, and memorable keepsakes"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-playfair">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Featured
            </span>
            <span className="text-gray-800"> Collections</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked selections that make every moment special
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Collections
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;