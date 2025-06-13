// src/app/(frontend)/page.tsx
"use client";
import {
  CategoryGrid,
  Footer,
  Header,
  HeroSection,
  ProductGrid,
} from "@/components";
import { demoProducts } from "@/data/demoData";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  {
    id: "1",
    name: "Pottery & Ceramics",
    image: "/api/placeholder/300/200",
    href: "/products?category=pottery",
  },
  {
    id: "2",
    name: "Jewelry & Accessories",
    image: "/api/placeholder/300/200",
    href: "/products?category=jewelry",
  },
  {
    id: "3",
    name: "Home Decor",
    image: "/api/placeholder/300/200",
    href: "/products?category=decor",
  },
  {
    id: "4",
    name: "Textiles & Fiber Arts",
    image: "/api/placeholder/300/200",
    href: "/products?category=textiles",
  },
  {
    id: "5",
    name: "Woodworking",
    image: "/api/placeholder/300/200",
    href: "/products?category=wood",
  },
  {
    id: "6",
    name: "Glass & Metalwork",
    image: "/api/placeholder/300/200",
    href: "/products?category=glass",
  },
];

export const Home = () => {
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
    router.push("/products");
  };

  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
  };

  const handleSortChange = (sortBy: string) => {
    console.log("Sort changed to:", sortBy);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  const handleContactClick = () => {
    console.log("Contact clicked");
  };

  const handleFooterLinkClick = (href: string) => {
    console.log("Footer link clicked:", href);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Header
        cartItemCount={cartCount}
        onCartClick={() => console.log("Cart clicked")}
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
};
