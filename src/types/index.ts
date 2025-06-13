export * from "./products";
export * from "./user";

// src/types/index.ts

// export interface Category {
//   id: string;
//   name: string;
//   description?: string;
//   image?: string;
//   href?: string;
//   parentId?: string;
//   subcategories?: Category[];
//   productCount?: number;
// }

// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   originalPrice?: number;
//   rating: number;
//   reviewCount: number;
//   images?: string[];
//   image?: string; // Primary image
//   isNew?: boolean;
//   isFeatured?: boolean;
//   discount?: number;
//   colors?: string[];
//   sizes?: string[];
//   materials?: string[];
//   dimensions?: {
//     length?: number;
//     width?: number;
//     height?: number;
//     weight?: number;
//     unit?: string;
//   };
//   categoryId: string;
//   artistId: string;
//   stock: number;
//   sku?: string;
//   tags?: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface Artist {
//   id: string;
//   name: string;
//   bio?: string;
//   avatar?: string;
//   location?: string;
//   rating: number;
//   reviewCount: number;
//   specialties?: string[];
//   joinedDate: Date;
//   isVerified?: boolean;
//   socialLinks?: {
//     instagram?: string;
//     facebook?: string;
//     website?: string;
//   };
// }

// export interface User {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   avatar?: string;
//   role: "customer" | "artist" | "admin";
//   addresses?: Address[];
//   preferences?: {
//     newsletter: boolean;
//     smsUpdates: boolean;
//   };
//   createdAt: Date;
// }

// export interface Address {
//   id: string;
//   type: "shipping" | "billing";
//   firstName: string;
//   lastName: string;
//   company?: string;
//   addressLine1: string;
//   addressLine2?: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
//   isDefault: boolean;
// }

// export interface CartItem {
//   id: string;
//   productId: string;
//   product: Product;
//   quantity: number;
//   selectedColor?: string;
//   selectedSize?: string;
//   customizations?: Record<string, any>;
//   addedAt: Date;
// }

// export interface Cart {
//   id: string;
//   userId?: string;
//   items: CartItem[];
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   total: number;
//   updatedAt: Date;
// }

// export interface Order {
//   id: string;
//   orderNumber: string;
//   userId: string;
//   status:
//     | "pending"
//     | "confirmed"
//     | "processing"
//     | "shipped"
//     | "delivered"
//     | "cancelled";
//   items: CartItem[];
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   total: number;
//   shippingAddress: Address;
//   billingAddress: Address;
//   paymentMethod: string;
//   trackingNumber?: string;
//   estimatedDelivery?: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface Review {
//   id: string;
//   productId: string;
//   userId: string;
//   user: Pick<User, "firstName" | "lastName" | "avatar">;
//   rating: number;
//   title?: string;
//   comment: string;
//   images?: string[];
//   isVerified: boolean;
//   helpfulCount: number;
//   createdAt: Date;
// }

// export interface FilterOptions {
//   categories?: string[];
//   priceRange?: {
//     min: number;
//     max: number;
//   };
//   rating?: number;
//   colors?: string[];
//   sizes?: string[];
//   materials?: string[];
//   isNew?: boolean;
//   onSale?: boolean;
//   inStock?: boolean;
// }

// export interface SortOption {
//   value: string;
//   label: string;
//   field: keyof Product;
//   direction: "asc" | "desc";
// }

// export interface PaginationInfo {
//   page: number;
//   limit: number;
//   total: number;
//   totalPages: number;
//   hasNext: boolean;
//   hasPrev: boolean;
// }

// export interface ApiResponse<T> {
//   data: T;
//   message?: string;
//   success: boolean;
//   pagination?: PaginationInfo;
// }

// export interface SearchFilters extends FilterOptions {
//   query?: string;
//   sortBy?: string;
//   page?: number;
//   limit?: number;
// }
