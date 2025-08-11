import React from 'react';
import SellerLayout from '../../components/layout/SellerLayout';

const SellerCustomizations: React.FC = () => {
  return (
    <SellerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Customizations</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">Customization approval interface will be implemented here...</p>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerCustomizations;
