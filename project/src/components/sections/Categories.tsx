import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift, Briefcase, Baby, Cake, Sparkles } from 'lucide-react';

const Categories: React.FC = () => {
  const categories = [
    {
      name: "Romance",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      count: "12 Collections"
    },
    {
      name: "Special Occasions",
      icon: Gift,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      count: "18 Collections"
    },
    {
      name: "Corporate",
      icon: Briefcase,
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      count: "8 Collections"
    },
    {
      name: "New Parents",
      icon: Baby,
      color: "from-green-400 to-blue-500",
      bgColor: "bg-green-50",
      count: "6 Collections"
    },
    {
      name: "Birthdays",
      icon: Cake,
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      count: "15 Collections"
    },
    {
      name: "Luxury",
      icon: Sparkles,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      count: "10 Collections"
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-playfair">
            <span className="text-gray-800">Shop by </span>
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect hamper for any occasion or recipient
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.name}
                className="group relative cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`${category.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-white/50`}>
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <IconComponent size={32} className="text-white" />
                    </div>
                    
                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 font-playfair group-hover:text-pink-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {category.count}
                  </p>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  {/* Arrow */}
                  <motion.div
                    className="absolute bottom-6 right-6 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg 
                      className="w-4 h-4 text-pink-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 border-2 border-pink-500 text-pink-600 rounded-full font-semibold text-lg hover:bg-pink-50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Categories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;