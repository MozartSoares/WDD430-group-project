"use client";

import { Footer, Header, ProductGrid } from "@/components";
import { demoProducts } from "@/data/demoData";
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

  const handleSortChange = (sortBy: string) => {
    console.log("Sort changed to:", sortBy);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
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
      <Header
        cartItemCount={3}
        onCartClick={() => console.log("Cart clicked")}
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
        onContactClick={() => console.log("Contact clicked")}
        onLinkClick={() => console.log("Footer link clicked")}
      />
    </Box>
  );
}

export default ProductsPage;
