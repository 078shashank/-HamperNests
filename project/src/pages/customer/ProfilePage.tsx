import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

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
          <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and order history...</p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProfilePage;
