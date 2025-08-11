// Comprehensive TypeScript types for Multi-Vendor Gifting Marketplace

export interface User {
  id: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SellerProfile {
  id: string;
  userId: string;
  storeName: string;
  storeDescription?: string;
  storeLogoUrl?: string;
  businessAddress?: string;
  taxId?: string;
  commissionRate: number;
  isApproved: boolean;
  approvalDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku?: string;
  priceAdjustment: number;
  attributes: Record<string, any>; // {color: "red", size: "large"}
  inventoryCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface CustomizationOption {
  type: 'image_upload' | 'text_input' | 'color_picker' | 'dropdown' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[]; // For dropdown/checkbox
  maxLength?: number; // For text input
  allowedFormats?: string[]; // For image upload
  maxFileSize?: number; // For image upload in MB
}

export interface Product {
  id: string;
  sellerId: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  basePrice: number;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  isCustomizable: boolean;
  customizationOptions?: CustomizationOption[];
  images: string[];
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
  // Relations
  seller?: User;
  category?: Category;
  variants?: ProductVariant[];
  reviews?: Review[];
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  customizationData?: Record<string, any>;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
  // Relations
  product?: Product;
  variant?: ProductVariant;
}

export interface Address {
  id: string;
  userId: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  paymentId?: string;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  // Relations
  customer?: User;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  sellerId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customizationData?: Record<string, any>;
  customizationStatus: 'pending' | 'approved' | 'in_progress' | 'completed';
  customizationNotes?: string;
  fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  // Relations
  product?: Product;
  variant?: ProductVariant;
  seller?: User;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  orderItemId: string;
  rating: number; // 1-5
  title?: string;
  comment?: string;
  images?: string[];
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  // Relations
  customer?: User;
  product?: Product;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  // Relations
  product?: Product;
}

export interface CustomizationTemplate {
  id: string;
  userId: string;
  name: string;
  templateData: Record<string, any>;
  productType?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  sellerId?: string; // null for platform-wide coupons
  code: string;
  name: string;
  description?: string;
  discountType: 'percentage' | 'fixed_amount';
  discountValue: number;
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  startsAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'maintenance' | 'promotion';
  targetAudience: 'all' | 'customers' | 'sellers';
  isActive: boolean;
  priority: number;
  startsAt: string;
  expiresAt?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  eventType: string;
  userId?: string;
  sessionId?: string;
  data?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// Dashboard specific types
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

export interface SellerDashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  pendingCustomizations: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'seller';
  phone?: string;
}

export interface ProductForm {
  name: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  isCustomizable: boolean;
  customizationOptions?: CustomizationOption[];
  images: File[];
  tags: string[];
  isFeatured: boolean;
}
  bgColor: string;
  count: string;
}