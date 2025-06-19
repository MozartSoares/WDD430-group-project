"use client";
import {
  CategoryGrid,
  Footer,
  Header,
  HeroSection,
  ProductGrid,
} from "@/components";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import type { ICategory, IProduct } from "@/types";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(3);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const {
    getCategories,
    loading: categoryLoading,
    error: categoryError,
  } = useCategories();
  const {
    getProducts,
    loading: productLoading,
    error: productError,
  } = useProducts();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await getCategories();
        if (categoriesResponse.success && categoriesResponse.categories) {
          setCategories(categoriesResponse.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getProducts();
        if (productsResponse.success && productsResponse.products) {
          setProducts(productsResponse.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (category: ICategory) => {
    router.push(`/products?category=${category._id}`);
  };

  const handleProductClick = (product: IProduct) => {
    router.push(`/products/${product._id}`);
  };

  const handleBackClick = () => {
    router.push("/products");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onCartClick={() => console.log("Cart clicked")} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection
          title="Discover Unique Handcrafted Treasures"
          subtitle="Connect with talented artisans and find one-of-a-kind pieces that tell a story. From pottery to jewelry, discover the perfect handmade item for your home or as a special gift."
        />

        {/* Category Section */}

        <CategoryGrid
          title="Shop by Category"
          categories={categories}
          loading={categoryLoading}
          onCategoryClick={handleCategoryClick}
          onBackClick={handleBackClick}
          showBackButton={false}
        />

        {/* Featured Products */}
        <ProductGrid
          loading={productLoading}
          products={products}
          currentPage={1}
          onProductClick={handleProductClick}
          showFilters={true}
        />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Home;
