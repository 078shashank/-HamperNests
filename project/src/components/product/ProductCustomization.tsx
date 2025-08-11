import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Type, Palette, Image as ImageIcon } from 'lucide-react';
import { Product, CustomizationOption } from '../../types';

interface ProductCustomizationProps {
  product: Product;
  onCustomizationChange: (data: Record<string, any>) => void;
  customizationData: Record<string, any>;
}

const ProductCustomization: React.FC<ProductCustomizationProps> = ({
  product,
  onCustomizationChange,
  customizationData
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileUpload = (optionKey: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
      onCustomizationChange({
        ...customizationData,
        [optionKey]: {
          file: file,
          preview: result,
          name: file.name
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (optionKey: string, value: string) => {
    onCustomizationChange({
      ...customizationData,
      [optionKey]: value
    });
  };

  const handleColorChange = (optionKey: string, color: string) => {
    onCustomizationChange({
      ...customizationData,
      [optionKey]: color
    });
  };

  const renderCustomizationOption = (option: CustomizationOption, index: number) => {
    const optionKey = `option_${index}`;

    switch (option.type) {
      case 'image_upload':
        return (
          <div key={optionKey} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {option.label} {option.required && <span className="text-red-500">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors">
              <input
                type="file"
                accept={option.allowedFormats?.join(',') || 'image/*'}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (option.maxFileSize && file.size > option.maxFileSize * 1024 * 1024) {
                      alert(`File size must be less than ${option.maxFileSize}MB`);
                      return;
                    }
                    handleFileUpload(optionKey, file);
                  }
                }}
                className="hidden"
                id={`file-${optionKey}`}
              />
              <label
                htmlFor={`file-${optionKey}`}
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                {customizationData[optionKey]?.preview ? (
                  <div className="relative">
                    <img
                      src={customizationData[optionKey].preview}
                      alt="Preview"
                      className="max-w-32 max-h-32 object-contain rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                    <span className="text-sm text-gray-600">Click to upload image</span>
                    {option.maxFileSize && (
                      <span className="text-xs text-gray-500">Max size: {option.maxFileSize}MB</span>
                    )}
                  </>
                )}
              </label>
            </div>
          </div>
        );

      case 'text_input':
        return (
          <div key={optionKey} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {option.label} {option.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <Type className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={customizationData[optionKey] || ''}
                onChange={(e) => handleTextChange(optionKey, e.target.value)}
                maxLength={option.maxLength}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                placeholder={`Enter ${option.label.toLowerCase()}`}
              />
              {option.maxLength && (
                <span className="text-xs text-gray-500 mt-1">
                  {(customizationData[optionKey] || '').length}/{option.maxLength}
                </span>
              )}
            </div>
          </div>
        );

      case 'color_picker':
        return (
          <div key={optionKey} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {option.label} {option.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center space-x-3">
              <Palette className="h-5 w-5 text-gray-400" />
              <input
                type="color"
                value={customizationData[optionKey] || '#000000'}
                onChange={(e) => handleColorChange(optionKey, e.target.value)}
                className="w-16 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <span className="text-sm text-gray-600">
                {customizationData[optionKey] || '#000000'}
              </span>
            </div>
          </div>
        );

      case 'dropdown':
        return (
          <div key={optionKey} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {option.label} {option.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={customizationData[optionKey] || ''}
              onChange={(e) => handleTextChange(optionKey, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="">Select {option.label.toLowerCase()}</option>
              {option.options?.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  if (!product.isCustomizable || !product.customizationOptions?.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 space-y-6"
    >
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">Customize Your Product</h3>
        <p className="text-sm text-gray-600 mt-1">
          Make this product uniquely yours with these customization options
        </p>
      </div>

      <div className="space-y-6">
        {product.customizationOptions.map((option, index) => 
          renderCustomizationOption(option, index)
        )}
      </div>

      {/* Preview Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Preview</h4>
        <div className="bg-gray-50 rounded-lg p-4 min-h-32 flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Customization preview"
              className="max-w-full max-h-48 object-contain rounded-lg"
            />
          ) : (
            <p className="text-gray-500 text-sm">
              Upload an image or make customizations to see preview
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCustomization;
