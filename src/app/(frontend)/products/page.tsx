"use client";

import { Footer, Header, ProductGrid } from "@/components";
import { useProducts } from "@/hooks/useProducts";
import type { IProduct } from "@/types";
import { ChevronRight } from "@mui/icons-material";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SearchParamsHandler({
  onCategoryChange,
  onSearchChange,
}: {
  onCategoryChange: (cat: string | null) => void;
  onSearchChange: (search: string | null) => void;
}) {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  useEffect(() => {
    onCategoryChange(category);
  }, [category, onCategoryChange]);

  useEffect(() => {
    onSearchChange(search);
  }, [search, onSearchChange]);

  return null;
}

function ProductsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const {
    getProducts,
    loading: productLoading,
    error: productError,
  } = useProducts();

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

  const handleCategoryChange = (cat: string | null) => {
    setCategory(cat);
  };

  const handleSearchChange = (search: string | null) => {
    setSearch(search);
  };

  const handleProductClick = (product: any) => {
    router.push(`/products/${product.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getCategoryName = (categoryId: string | null) => {
    const categoryMap: Record<string, string> = {
      pottery: "Pottery & Ceramics",
      jewelry: "Jewelry & Accessories",
      decor: "Home Decor",
      textiles: "Textiles & Fiber Arts",
      wood: "Woodworking",
      glass: "Glass & Metalwork",
    };
    return categoryId ? categoryMap[categoryId] || "Products" : "All Products";
  };

  const pageTitle = search
    ? `Search results for "${search}"`
    : getCategoryName(category);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

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
            onClick={() => router.push("/")}
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
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

        {/* Suspense wrap para o SearchParamsHandler */}
        <Suspense fallback={<div>Loading filters...</div>}>
          <SearchParamsHandler
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
          />
        </Suspense>

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
          products={products}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onProductClick={handleProductClick}
          showFilters={true}
        />
      </Box>

      <Footer />
    </Box>
  );
}

export default ProductsPage;
