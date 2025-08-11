import React from 'react';
import { Tag, Percent, Clock, Check, X } from 'lucide-react';

interface CouponCardProps {
  code: string;
  discount: number;
  description: string;
  validUntil: string;
  isApplied: boolean;
  onApply: () => void;
  onRemove: () => void;
  isExpired?: boolean;
  minPurchase?: number;
}

const CouponCard: React.FC<CouponCardProps> = ({
  code,
  discount,
  description,
  validUntil,
  isApplied,
  onApply,
  onRemove,
  isExpired = false,
  minPurchase,
}) => {
  const handleClick = () => {
    if (isExpired) return;
    
    if (isApplied) {
      onRemove();
    } else {
      onApply();
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 transition-all ${
        isExpired
          ? 'bg-gray-50 border-gray-200 opacity-70'
          : isApplied
          ? 'border-green-500 bg-green-50'
          : 'border-gray-200 hover:border-blue-500 hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <div
            className={`p-2 rounded-full ${
              isExpired
                ? 'bg-gray-200 text-gray-500'
                : isApplied
                ? 'bg-green-100 text-green-600'
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            {isExpired ? (
              <X className="w-5 h-5" />
            ) : isApplied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Tag className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{code}</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {discount}% OFF
              </span>
              {isExpired && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Expired
                </span>
              )}
              {isApplied && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Applied
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            {minPurchase && (
              <p className="text-xs text-gray-500 mt-1">
                Min. purchase: ${minPurchase}
              </p>
            )}
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 mr-1" />
              <span>Expires: {new Date(validUntil).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        {!isExpired && (
          <button
            onClick={handleClick}
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              isApplied
                ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            {isApplied ? 'Remove' : 'Apply'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
