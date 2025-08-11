import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Package, DollarSign, Image as ImageIcon } from 'lucide-react';
import { Product, CustomizationOption } from '../../types';

interface ProductManagementProps {
  products: Product[];
  onAddProduct: (product: Partial<Product>) => void;
  onEditProduct: (id: string, product: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    shortDescription: '',
    basePrice: 0,
    sku: '',
    isCustomizable: false,
    customizationOptions: [] as CustomizationOption[],
    tags: [] as string[],
    isFeatured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      onEditProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      onAddProduct(formData);
    }
    
    setFormData({
      name: '',
      categoryId: '',
      description: '',
      shortDescription: '',
      basePrice: 0,
      sku: '',
      isCustomizable: false,
      customizationOptions: [],
      tags: [],
      isFeatured: false
    });
    setShowAddForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId,
      description: product.description || '',
      shortDescription: product.shortDescription || '',
      basePrice: product.basePrice,
      sku: product.sku || '',
      isCustomizable: product.isCustomizable,
      customizationOptions: product.customizationOptions || [],
      tags: product.tags,
      isFeatured: product.isFeatured
    });
    setShowAddForm(true);
  };

  const addCustomizationOption = () => {
    setFormData({
      ...formData,
      customizationOptions: [
        ...formData.customizationOptions,
        {
          type: 'text_input',
          label: '',
          required: false
        }
      ]
    });
  };

  const updateCustomizationOption = (index: number, option: CustomizationOption) => {
    const updatedOptions = [...formData.customizationOptions];
    updatedOptions[index] = option;
    setFormData({
      ...formData,
      customizationOptions: updatedOptions
    });
  };

  const removeCustomizationOption = (index: number) => {
    setFormData({
      ...formData,
      customizationOptions: formData.customizationOptions.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your product catalog and customization options</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Product Form Modal */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Basic Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Brief product description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Detailed product description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Base Price *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.basePrice}
                        onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SKU
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                        placeholder="Product SKU"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isCustomizable}
                        onChange={(e) => setFormData({ ...formData, isCustomizable: e.target.checked })}
                        className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Customizable Product</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured Product</span>
                    </label>
                  </div>
                </div>

                {/* Customization Options */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">Customization Options</h4>
                    {formData.isCustomizable && (
                      <button
                        type="button"
                        onClick={addCustomizationOption}
                        className="text-rose-600 hover:text-rose-700 text-sm flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Option</span>
                      </button>
                    )}
                  </div>

                  {formData.isCustomizable && (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {formData.customizationOptions.map((option, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <select
                                value={option.type}
                                onChange={(e) => updateCustomizationOption(index, {
                                  ...option,
                                  type: e.target.value as CustomizationOption['type']
                                })}
                                className="text-sm border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="text_input">Text Input</option>
                                <option value="image_upload">Image Upload</option>
                                <option value="color_picker">Color Picker</option>
                                <option value="dropdown">Dropdown</option>
                              </select>
                              
                              <input
                                type="text"
                                placeholder="Label"
                                value={option.label}
                                onChange={(e) => updateCustomizationOption(index, {
                                  ...option,
                                  label: e.target.value
                                })}
                                className="text-sm border border-gray-300 rounded px-2 py-1"
                              />
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => removeCustomizationOption(index)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <label className="flex items-center text-sm">
                            <input
                              type="checkbox"
                              checked={option.required}
                              onChange={(e) => updateCustomizationOption(index, {
                                ...option,
                                required: e.target.checked
                              })}
                              className="rounded border-gray-300 text-rose-600 focus:ring-rose-500 mr-2"
                            />
                            Required
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                {product.isCustomizable && (
                  <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full">
                    Customizable
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.shortDescription || product.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-900">
                  ${product.basePrice.toFixed(2)}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Package className="h-4 w-4" />
                  <span>{product.sku || 'No SKU'}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first product to your store</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700"
          >
            Add Your First Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
