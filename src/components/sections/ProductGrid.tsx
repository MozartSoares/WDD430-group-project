"use client";

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import type { ICategory, IProduct } from "@/types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  type SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface ProductGridProps {
  loading: boolean;
  products: IProduct[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onProductClick?: (product: IProduct) => void;
  showFilters?: boolean;
}

export const ProductGrid = ({
  loading = true,
  products,
  currentPage = 1,
  onPageChange,
  onProductClick,
  showFilters = true,
}: ProductGridProps) => {
  const theme = useTheme();
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { calculateDiscountPercentage } = useProducts();
  const [categoriesMap, setCategoriesMap] = useState<Map<string, ICategory>>(
    new Map(),
  );
  const [categories, setCategories] = useState<ICategory[]>([]);

  const { getCategories } = useCategories();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.categories);
      setCategoriesMap(
        new Map(
          response.categories.map((category: ICategory) => [
            category._id.toString(),
            category,
          ]),
        ),
      );
    };
    fetchCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter(
      (product) => product.categoryId?.toString() === selectedCategory,
    );
  }, [products, selectedCategory]);

  const totalProducts = useMemo(
    () => filteredProducts.length,
    [filteredProducts.length],
  );

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        return copy.sort((a, b) => a.currentPrice - b.currentPrice);
      case "price-high":
        return copy.sort((a, b) => b.currentPrice - a.currentPrice);
      case "rating":
        return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:
        return copy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
  }, [filteredProducts, sortBy]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductClick = (product: IProduct) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Filters and Sort Section */}
      {showFilters && (
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      key={category._id.toString()}
                      value={category._id.toString()}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {selectedCategory !== "all" && (
                  <Chip
                    label={`Category: ${categoriesMap.get(selectedCategory)?.name || "Unknown"}`}
                    onDelete={() => setSelectedCategory("all")}
                    sx={{ mr: 1, mb: 1 }}
                  />
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
              >
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort by"
                    onChange={handleSortChange}
                  >
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <Box sx={{ mb: 3 }}>
              {activeFilters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  onDelete={() => removeFilter(filter)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          )}

          {/* Product Count */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {totalProducts} Products
          </Typography>
        </Box>
      )}

      {/* Products Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          sortedProducts.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2.4}
              key={product._id.toString()}
            >
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[4],
                  },
                  position: "relative",
                }}
                onClick={() => handleProductClick(product)}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      backgroundColor: "#F3F4F6",
                      backgroundImage: product.imageUrl
                        ? `url(${product.imageUrl})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {product.isNew && (
                    <Chip
                      label="NEW"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        backgroundColor: "text.primary",
                        color: "background.paper",
                        fontWeight: "bold",
                      }}
                    />
                  )}

                  {product?.currentPrice < product?.originalPrice && (
                    <Chip
                      label={`-${calculateDiscountPercentage(product.originalPrice, product.currentPrice)}%`}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "error.main",
                        color: "error.contrastText",
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    component="h3"
                    sx={{
                      fontWeight: 500,
                      mb: 0.5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 1 }}
                  >
                    {product.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating
                      value={product.rating}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      ({product.reviewCount})
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      ${product.currentPrice}
                    </Typography>

                    {product.originalPrice && (
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                        }}
                      >
                        ${product.originalPrice}
                      </Typography>
                    )}

                    {product.currentPrice < product.originalPrice && (
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{
                          color: "error.main",
                          fontWeight: 500,
                        }}
                      >
                        -
                        {calculateDiscountPercentage(
                          product.originalPrice,
                          product.currentPrice,
                        )}
                        %
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {totalProducts} products
        </Typography>

        {/* <Pagination
          count={Math.ceil(totalProducts / 10)}
          page={currentPage}
          onChange={(_, page) => onPageChange && onPageChange(page)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              "&:hover": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
              },
            },
          }}
        /> */}
        {/* 
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "text.primary",
            color: "background.paper",
            px: 4,
            py: 1.5,
            mt: 2,
            "&:hover": {
              backgroundColor: "text.secondary",
            },
          }}
        >
          SHOW MORE
        </Button> */}
      </Box>
    </Container>
  );
};
