import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, LoginForm, RegisterForm } from '../types';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

// Mock mode when Supabase is not configured
const MOCK_MODE = !import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.VITE_SUPABASE_URL === 'your_supabase_project_url' ||
  import.meta.env.VITE_SUPABASE_URL.includes('placeholder') ||
  import.meta.env.VITE_SUPABASE_URL.includes('your-project-ref');

if (MOCK_MODE) {
  console.log('🔧 Running in MOCK MODE - Supabase not configured. Using localStorage for authentication.');
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginForm) => Promise<boolean>;
  register: (data: RegisterForm) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (MOCK_MODE) {
      // Mock mode - check localStorage for existing user
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        setUser(JSON.parse(mockUser));
      }
      setLoading(false);
      return;
    }

    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      const userProfile: User = {
        id: data.id,
        email: data.email,
        role: data.role,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        avatarUrl: data.avatar_url,
        isActive: data.is_active,
        emailVerified: data.email_verified,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      setUser(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load user profile');
    }
  };

  const login = async (loginData: LoginForm): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (MOCK_MODE) {
        // Mock login - check if user exists in localStorage
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const foundUser = mockUsers.find((u: any) => u.email === loginData.email);
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('mockUser', JSON.stringify(foundUser));
          toast.success('Successfully logged in!');
          return true;
        } else {
          toast.error('User not found. Please register first.');
          return false;
        }
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      if (data.user) {
        await fetchUserProfile(data.user.id);
        toast.success('Successfully logged in!');
        return true;
      }

      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData: RegisterForm): Promise<boolean> => {
    try {
      setLoading(true);

      if (MOCK_MODE) {
        // Mock registration - store user in localStorage
        const mockUser: User = {
          id: `mock-${Date.now()}`,
          email: registerData.email,
          role: registerData.role,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          phone: registerData.phone,
          isActive: true,
          emailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Store in mock users list
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        mockUsers.push(mockUser);
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
        
        // Set as current user
        setUser(mockUser);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        
        const message = registerData.role === 'seller' 
          ? 'Seller account created successfully! Your account will need admin approval before you can list products.'
          : 'Account created successfully!';
        
        toast.success(message);
        return true;
      }

      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: registerData.email,
            role: registerData.role,
            first_name: registerData.firstName,
            last_name: registerData.lastName,
            phone: registerData.phone,
          });

        if (profileError) throw profileError;

        // If seller, create seller profile
        if (registerData.role === 'seller') {
          const { error: sellerError } = await supabase
            .from('seller_profiles')
            .insert({
              user_id: authData.user.id,
              store_name: `${registerData.firstName}'s Store`,
              is_approved: false, // Requires admin approval
            });

          if (sellerError) throw sellerError;
        }

        toast.success('Account created successfully! Please check your email to verify your account.');
        return true;
      }

      return false;
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to create account');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      
      if (MOCK_MODE) {
        // Mock logout - clear localStorage
        localStorage.removeItem('mockUser');
        setUser(null);
        toast.success('Successfully logged out');
        return;
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      toast.success('Successfully logged out');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;

      setLoading(true);

      const updateData: any = {};
      if (profileData.firstName) updateData.first_name = profileData.firstName;
      if (profileData.lastName) updateData.last_name = profileData.lastName;
      if (profileData.phone) updateData.phone = profileData.phone;
      if (profileData.avatarUrl) updateData.avatar_url = profileData.avatarUrl;

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;

      // Update local user state
      setUser({ ...user, ...profileData });
      toast.success('Profile updated successfully');
      return true;
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
