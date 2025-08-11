import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../contexts/AuthContext';
import ProductCustomization from '../../components/product/ProductCustomization';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ReviewList from '../../components/reviews/ReviewList';
import ReviewForm from '../../components/reviews/ReviewForm';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [customizationData, setCustomizationData] = useState<Record<string, any>>({});
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<any[]>([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        // In a real implementation, you would fetch the product by slug
        // For now, we'll simulate a product with customization options
        const mockProduct = {
          id: 1,
          name: 'Custom Photo Frame',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400',
          category: 'Home Decor',
          description: 'Beautiful wooden frame that can be customized with your own photos or artwork.',
          stock: 15,
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          isCustomizable: true,
          customizationOptions: [
            {
              type: 'image_upload',
              label: 'Upload your photo',
              required: true,
              allowedFormats: ['image/jpeg', 'image/png'],
              maxFileSize: 5
            },
            {
              type: 'text_input',
              label: 'Add a message',
              required: false,
              maxLength: 100
            },
            {
              type: 'color_picker',
              label: 'Frame color',
              required: false
            }
          ]
        };
        
        setProduct(mockProduct);
      } catch (error) {
        toast.error('Failed to load product');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    // Simulate fetching reviews for this product
    const mock = [
      {
        id: 'r1',
        user: { name: 'Ava Patel' },
        rating: 5,
        comment: 'Great quality and the customization came out perfect! Fast shipping too.',
        date: new Date().toLocaleDateString(),
        images: [],
      },
      {
        id: 'r2',
        user: { name: 'Liam Chen' },
        rating: 4,
        comment: 'Loved it overall. Would be great to have more color options.',
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
      },
    ];
    setReviews(mock);
  }, [slug]);

  const handleCustomizationChange = (data: Record<string, any>) => {
    setCustomizationData(data);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Check if required customization options are filled
    if (product.isCustomizable && product.customizationOptions) {
      const requiredOptions = product.customizationOptions.filter((opt: any) => opt.required);
      for (const option of requiredOptions) {
        const optionKey = `option_${product.customizationOptions.indexOf(option)}`;
        if (!customizationData[optionKey]) {
          toast.error(`Please complete required customization: ${option.label}`);
          return;
        }
      }
    }
    
    toast.success(`${product.name} added to cart!`);
    // In a real implementation, you would dispatch an action to add to cart
    console.log('Adding to cart:', { product, customizationData, quantity });
  };

  const handleSubmitReview = async (data: { rating: number; comment: string; images: File[] }) => {
    if (!user) {
      toast.error('Please sign in to submit a review');
      return;
    }
    try {
      setSubmittingReview(true);
      // TODO: upload images and persist to Supabase; for now, append locally
      const newReview = {
        id: `r-${Date.now()}`,
        user: { name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : (user.email || 'You') },
        rating: data.rating,
        comment: data.comment,
        date: new Date().toLocaleDateString(),
        images: [],
      };
      setReviews(prev => [newReview, ...prev]);
      toast.success('Thanks for your review!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header 
          cartCount={0} 
          onCartClick={() => {}}
          user={user}
          onAuthClick={() => {}}
        />
        
        <main className="min-h-screen pt-24 pb-12">
          <div className="container mx-auto px-4 flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (!product) {
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
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
              <p className="text-gray-600">The product you're looking for doesn't exist or is no longer available.</p>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold text-rose-600 mb-6">${product.price.toFixed(2)}</p>
              
              <div className="prose max-w-none mb-8">
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2">
                  Category: <span className="font-medium text-gray-700">{product.category}</span>
                </p>
                <p className="text-sm text-gray-500">
                  In Stock: <span className="font-medium text-gray-700">{product.stock} items</span>
                </p>
              </div>
              
              {/* Customization Options */}
              {product.isCustomizable && product.customizationOptions && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Customize Your Product</h2>
                  <ProductCustomization 
                    product={product}
                    onCustomizationChange={handleCustomizationChange}
                    customizationData={customizationData}
                  />
                </div>
              )}
              
              {/* Quantity and Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-700">{quantity}</span>
                  <button 
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </motion.button>
              </div>
              
              {/* Additional Actions */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-gray-600 hover:text-rose-600"
                >
                  <Heart size={20} />
                  <span>Wishlist</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-gray-600 hover:text-rose-600"
                >
                  <Share2 size={20} />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>
          </div>
          {/* Reviews Section */}
          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
            <div className="mb-8">
              <ReviewForm onSubmit={handleSubmitReview} isSubmitting={submittingReview} />
            </div>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailPage;
