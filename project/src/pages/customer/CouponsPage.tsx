import React, { useState } from 'react';
import { ArrowLeft, Tag, Percent, Search, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import CouponCard from '../../components/coupons/CouponCard';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  description: string;
  validUntil: string;
  minPurchase?: number;
  isExpired: boolean;
}

const CouponsPage: React.FC = () => {
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for available coupons
  const availableCoupons: Coupon[] = [
    {
      id: '1',
      code: 'WELCOME20',
      discount: 20,
      description: '20% off on your first order',
      validUntil: '2023-12-31',
      minPurchase: 30,
      isExpired: false,
    },
    {
      id: '2',
      code: 'FREESHIP',
      discount: 10,
      description: 'Free shipping on orders over $50',
      validUntil: '2023-11-30',
      minPurchase: 50,
      isExpired: false,
    },
    {
      id: '3',
      code: 'SUMMER25',
      discount: 25,
      description: 'Summer special - 25% off on all items',
      validUntil: '2023-09-30',
      isExpired: true,
    },
    {
      id: '4',
      code: 'BIRTHDAY15',
      discount: 15,
      description: 'Happy Birthday! Enjoy 15% off',
      validUntil: '2023-12-31',
      isExpired: false,
    },
  ];

  const handleApplyCoupon = (couponId: string) => {
    setAppliedCoupons([...appliedCoupons, couponId]);
  };

  const handleRemoveCoupon = (couponId: string) => {
    setAppliedCoupons(appliedCoupons.filter((id) => id !== couponId));
  };

  const filteredCoupons = availableCoupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCoupons = filteredCoupons.filter((coupon) => !coupon.isExpired);
  const expiredCoupons = filteredCoupons.filter((coupon) => coupon.isExpired);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900">My Coupons</h1>
            <p className="mt-2 text-sm text-gray-600">
              Apply available coupons to your next purchase
            </p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search coupons..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {activeCoupons.length > 0 ? (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Tag className="w-5 h-5 text-blue-600 mr-2" />
                  Available Coupons
                </h2>
                <div className="space-y-3">
                  {activeCoupons.map((coupon) => (
                    <CouponCard
                      key={coupon.id}
                      code={coupon.code}
                      discount={coupon.discount}
                      description={coupon.description}
                      validUntil={coupon.validUntil}
                      minPurchase={coupon.minPurchase}
                      isApplied={appliedCoupons.includes(coupon.id)}
                      isExpired={coupon.isExpired}
                      onApply={() => handleApplyCoupon(coupon.id)}
                      onRemove={() => handleRemoveCoupon(coupon.id)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {expiredCoupons.length > 0 && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <X className="w-5 h-5 text-gray-400 mr-2" />
                  Expired Coupons
                </h2>
                <div className="space-y-3">
                  {expiredCoupons.map((coupon) => (
                    <CouponCard
                      key={coupon.id}
                      code={coupon.code}
                      discount={coupon.discount}
                      description={coupon.description}
                      validUntil={coupon.validUntil}
                      minPurchase={coupon.minPurchase}
                      isApplied={appliedCoupons.includes(coupon.id)}
                      isExpired={true}
                      onApply={() => {}}
                      onRemove={() => {}}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {appliedCoupons.length > 0 && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-sm text-green-700">
                  {appliedCoupons.length} coupon{appliedCoupons.length !== 1 ? 's' : ''} applied. 
                  They will be available at checkout.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponsPage;
