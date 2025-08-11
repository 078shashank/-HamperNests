import React from 'react';
import AnalyticsDashboard from '../../components/analytics/AnalyticsDashboard';

const AdminAnalytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Platform Analytics</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <AnalyticsDashboard userRole="admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
