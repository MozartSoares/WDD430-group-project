// src/components/sections/ProductGrid.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Chip,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Pagination,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

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
  colors?: string[];
  sizes?: string[];
}

interface ProductGridProps {
  products?: Product[];
  totalProducts?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onProductClick?: (product: Product) => void;
  onSortChange?: (sortBy: string) => void;
  onFilterClick?: () => void;
  showFilters?: boolean;
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Product Name',
    description: 'Description, color, size',
    price: 95,
    originalPrice: 119,
    rating: 4.5,
    reviewCount: 42,
    isNew: true,
    discount: 20,
  },
  {
    id: '2',
    name: 'Product Name',
    description: 'Description, color, size',
    price: 95,
    rating: 4.0,
    reviewCount: 28,
    isNew: true,
  },
  // Add more products as needed
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `${i + 3}`,
    name: 'Product Name',
    description: 'Description, color, size',
    price: 95,
    rating: 4.2,
    reviewCount: 15,
    isNew: i % 3 === 0,
  })),
];

export default function ProductGrid({
  products = defaultProducts,
  totalProducts = 28,
  currentPage = 1,
  onPageChange,
  onProductClick,
  onSortChange,
  onFilterClick,
  showFilters = true,
}: ProductGridProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sortBy, setSortBy] = useState('');
  const [activeFilters, setActiveFilters] = useState(['New Arrivals']);

  const handleSortChange = (event: any) => {
    const value = event.target.value;
    setSortBy(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Filters and Sort Section */}
      {showFilters && (
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<FilterList />}
                  onClick={onFilterClick}
                  sx={{
                    backgroundColor: 'text.primary',
                    color: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'text.secondary',
                    },
                  }}
                >
                  Sort by
                </Button>
                
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'text.primary',
                    color: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'text.secondary',
                    },
                  }}
                >
                  New Arrivals
                </Button>
                
                <Button
                  variant="outlined"
                  sx={{ color: 'text.secondary', borderColor: 'text.secondary' }}
                >
                  Sales
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  sx={{ color: 'text.secondary', borderColor: 'text.secondary' }}
                >
                  All filters
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
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
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                },
                position: 'relative',
              }}
              onClick={() => handleProductClick(product)}
            >
              {/* Product Image */}
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: '#F3F4F6',
                    backgroundImage: product.image ? `url(${product.image})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Badges */}
                {product.isNew && (
                  <Chip
                    label="NEW"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: 'text.primary',
                      color: 'background.paper',
                      fontWeight: 'bold',
                    }}
                  />
                )}
                
                {product.discount && (
                  <Chip
                    label={`-${product.discount}%`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'error.main',
                      color: 'error.contrastText',
                      fontWeight: 'bold',
                    }}
                  />
                )}
              </Box>

              {/* Product Info */}
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="subtitle2"
                  component="h3"
                  sx={{
                    fontWeight: 500,
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {product.name}
                </Typography>
                
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 1 }}
                >
                  {product.description}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating
                    value={product.rating}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                    ({product.reviewCount})
                  </Typography>
                </Box>

                {/* Price */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{ fontWeight: 600, color: 'text.primary' }}
                  >
                    ${product.price}
                  </Typography>
                  
                  {product.originalPrice && (
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                      }}
                    >
                      ${product.originalPrice}
                    </Typography>
                  )}
                  
                  {product.discount && (
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{
                        color: 'error.main',
                        fontWeight: 500,
                      }}
                    >
                      -{product.discount}%
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing 10 of {totalProducts} products
        </Typography>
        
        <Pagination
          count={Math.ceil(totalProducts / 10)}
          page={currentPage}
          onChange={(_, page) => onPageChange && onPageChange(page)}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              },
            },
          }}
        />
        
        {/* Show More Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'text.primary',
            color: 'background.paper',
            px: 4,
            py: 1.5,
            mt: 2,
            '&:hover': {
              backgroundColor: 'text.secondary',
            },
          }}
        >
          SHOW MORE
        </Button>
      </Box>
    </Container>
  );
}