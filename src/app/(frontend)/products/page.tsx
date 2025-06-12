// src/app/(frontend)/products/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import Header from '@/components/layout/Header';
import ProductGrid from '@/components/sections/ProductGrid';
import { demoProducts } from '@/data/demoData';

import Footer from '@/components/layout/Footer';

// Demo products data
// const demoProducts = [
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
//   // Add more products for pagination
//   ...Array.from({ length: 18 }, (_, i) => ({
//     id: `${i + 11}`,
//     name: `Handcrafted Item ${i + 11}`,
//     description: 'Beautiful handmade piece',
//     price: 75 + (i * 10),
//     rating: 4.0 + (Math.random() * 1),
//     reviewCount: Math.floor(Math.random() * 50) + 5,
//     isNew: i % 4 === 0,
//     discount: i % 5 === 0 ? 15 : undefined,
//     originalPrice: i % 5 === 0 ? 75 + (i * 10) + 20 : undefined,
//   })),
// ];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get search and filter params
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  const handleProductClick = (product: any) => {
    router.push(`/products/${product.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortBy: string) => {
    console.log('Sort changed to:', sortBy);
  };

  const handleFilterClick = () => {
    console.log('Filter clicked');
  };

  const getCategoryName = (categoryId: string | null) => {
    const categoryMap: Record<string, string> = {
      pottery: 'Pottery & Ceramics',
      jewelry: 'Jewelry & Accessories',
      decor: 'Home Decor',
      textiles: 'Textiles & Fiber Arts',
      wood: 'Woodworking',
      glass: 'Glass & Metalwork',
    };
    return categoryId ? categoryMap[categoryId] || 'Products' : 'All Products';
  };

  const pageTitle = search 
    ? `Search results for "${search}"` 
    : getCategoryName(category);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header 
        cartItemCount={3} 
        onCartClick={() => console.log('Cart clicked')} 
      />
      
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<ChevronRight fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link
            component="button"
            variant="body2"
            onClick={() => router.push('/')}
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Home
          </Link>
          <Typography color="text.primary" variant="body2">
            {pageTitle}
          </Typography>
        </Breadcrumbs>

        {/* Page Title */}
        <Typography variant="h4" component="h1" gutterBottom>
          {pageTitle}
        </Typography>

        {search && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Showing results for: <strong>"{search}"</strong>
          </Typography>
        )}

        {category && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Browse our collection of {getCategoryName(category).toLowerCase()}
          </Typography>
        )}
      </Container>
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        <ProductGrid
          products={demoProducts}
          totalProducts={28}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onProductClick={handleProductClick}
          onSortChange={handleSortChange}
          onFilterClick={handleFilterClick}
          showFilters={true}
        />
      </Box>

      <Footer 
        onContactClick={() => console.log('Contact clicked')}
        onLinkClick={() => console.log('Footer link clicked')}
      />
    </Box>
  );
}