"use client";

import type { IProduct } from "@/types";
import { FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
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
  Pagination,
  Rating,
  Select,
  type SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";

interface ProductGridProps {
  loading: boolean;
  products: IProduct[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onProductClick?: (product: IProduct) => void;
  showFilters?: boolean;
}

const isNewProduct = (createdAt: Date): boolean => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - new Date(createdAt).getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

const calculateDiscountPercentage = (
  originalPrice: number,
  currentPrice: number
): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

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
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const totalProducts = useMemo(() => products.length, [products.length]);

  const sortedProducts = useMemo(() => {
    const copy = [...products];
    switch (sortBy) {
      case "price-low":
        return copy.sort((a, b) => a.currentPrice - b.currentPrice);
      case "price-high":
        return copy.sort((a, b) => b.currentPrice - a.currentPrice);
      case "rating":
        return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "newest":
      default:
        return copy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [products, sortBy]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
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
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {/* Você pode remover esses botões ou conectar filtros reais */}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
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
                          product.currentPrice
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

        <Pagination
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
        />

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
        </Button>
      </Box>
    </Container>
  );
};
