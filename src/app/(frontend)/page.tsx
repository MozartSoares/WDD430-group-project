// src/app/(frontend)/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import CategoryGrid from '@/components/sections/CategoryGrid';
import ProductGrid from '@/components/sections/ProductGrid';
import { demoProducts } from '@/data/demoData';
import Footer from '@/components/layout/Footer';

// Types for demo data
interface Category {
  id: string;
  name: string;
  image?: string;
  href?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image?: string;
  isNew?: boolean;
  discount?: number;
}

// Demo data with navigation hrefs
const demoCategories: Category[] = [
  { id: '1', name: 'Pottery & Ceramics', image: '/api/placeholder/300/200', href: '/products?category=pottery' },
  { id: '2', name: 'Jewelry & Accessories', image: '/api/placeholder/300/200', href: '/products?category=jewelry' },
  { id: '3', name: 'Home Decor', image: '/api/placeholder/300/200', href: '/products?category=decor' },
  { id: '4', name: 'Textiles & Fiber Arts', image: '/api/placeholder/300/200', href: '/products?category=textiles' },
  { id: '5', name: 'Woodworking', image: '/api/placeholder/300/200', href: '/products?category=wood' },
  { id: '6', name: 'Glass & Metalwork', image: '/api/placeholder/300/200', href: '/products?category=glass' },
];

// const demoProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Handcrafted Ceramic Vase',
//     description: 'Blue glaze, medium size',
//     price: 85,
//     originalPrice: 100,
//     rating: 4.8,
//     reviewCount: 24,
//     isNew: true,
//     discount: 15,
//   },
//   {
//     id: '2',
//     name: 'Sterling Silver Necklace',
//     description: 'Artisan made, 18 inch',
//     price: 120,
//     rating: 4.9,
//     reviewCount: 42,
//     isNew: true,
//   },
//   {
//     id: '3',
//     name: 'Wooden Coffee Table',
//     description: 'Oak wood, rustic finish',
//     price: 350,
//     rating: 4.7,
//     reviewCount: 18,
//   },
//   {
//     id: '4',
//     name: 'Hand-woven Throw Blanket',
//     description: 'Wool blend, earth tones',
//     price: 95,
//     originalPrice: 120,
//     rating: 4.6,
//     reviewCount: 31,
//     discount: 20,
//   },
//   {
//     id: '5',
//     name: 'Glass Art Sculpture',
//     description: 'Blue and green swirl',
//     price: 180,
//     rating: 4.5,
//     reviewCount: 12,
//     isNew: true,
//   },
//   {
//     id: '6',
//     name: 'Leather Wallet',
//     description: 'Handstitched, brown',
//     price: 45,
//     rating: 4.8,
//     reviewCount: 67,
//   },
//   {
//     id: '7',
//     name: 'Ceramic Dinner Plates Set',
//     description: 'Set of 4, white glaze',
//     price: 75,
//     rating: 4.4,
//     reviewCount: 23,
//   },
//   {
//     id: '8',
//     name: 'Macrame Wall Hanging',
//     description: 'Natural cotton, large',
//     price: 65,
//     rating: 4.7,
//     reviewCount: 35,
//     isNew: true,
//   },
//   {
//     id: '9',
//     name: 'Handmade Soap Set',
//     description: 'Lavender scented, 3 bars',
//     price: 25,
//     rating: 4.6,
//     reviewCount: 89,
//   },
//   {
//     id: '10',
//     name: 'Custom Wood Sign',
//     description: 'Personalized, pine wood',
//     price: 55,
//     originalPrice: 70,
//     rating: 4.9,
//     reviewCount: 15,
//     discount: 21,
//   },
// ];

export default function Home() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(3);

  // Event handlers with navigation
  const handleCategoryClick = (category: Category) => {
    if (category.href) {
      router.push(category.href);
    } else {
      router.push(`/products?category=${category.id}`);
    }
  };

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleBackClick = () => {
    router.push('/products');
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
  };

  const handleSortChange = (sortBy: string) => {
    console.log('Sort changed to:', sortBy);
  };

  const handleFilterClick = () => {
    console.log('Filter clicked');
  };

  const handleContactClick = () => {
    console.log('Contact clicked');
  };

  const handleFooterLinkClick = (href: string) => {
    console.log('Footer link clicked:', href);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header
        cartItemCount={cartCount}
        onCartClick={() => console.log('Cart clicked')}
      />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <HeroSection
          title="Discover Unique Handcrafted Treasures"
          subtitle="Connect with talented artisans and find one-of-a-kind pieces that tell a story. From pottery to jewelry, discover the perfect handmade item for your home or as a special gift."
        />

        {/* Category Section */}
        <CategoryGrid
          title="Shop by Category"
          categories={demoCategories}
          onCategoryClick={handleCategoryClick}
          onBackClick={handleBackClick}
          showBackButton={false}
        />

        {/* Featured Products */}
        <ProductGrid
          products={demoProducts}
          totalProducts={28}
          currentPage={1}
          onPageChange={handlePageChange}
          onProductClick={handleProductClick}
          onSortChange={handleSortChange}
          onFilterClick={handleFilterClick}
          showFilters={true}
        />
      </Box>

      {/* Footer */}
      <Footer
        onContactClick={handleContactClick}
        onLinkClick={handleFooterLinkClick}
      />
    </Box>
  );
}