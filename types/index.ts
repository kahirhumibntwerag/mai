export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categorySlug: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  isFeatured: boolean;
  isNewArrival: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  imageUrl: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface WishlistItem {
  productId: string;
  product: Product;
}

export interface OrderItem {
  productId: string;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: Date;
}
