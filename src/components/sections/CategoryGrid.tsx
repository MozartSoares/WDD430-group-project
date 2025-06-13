'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  useTheme,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface Category {
  id: string;
  name: string;
  image?: string;
  href?: string;
}

interface CategoryGridProps {
  title?: string;
  categories?: Category[];
  onCategoryClick?: (category: Category) => void;
  onBackClick?: () => void;
  showBackButton?: boolean;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Subcategory', image: '/api/placeholder/300/200' },
  { id: '2', name: 'Subcategory', image: '/api/placeholder/300/200' },
  { id: '3', name: 'Subcategory', image: '/api/placeholder/300/200' },
  { id: '4', name: 'Subcategory', image: '/api/placeholder/300/200' },
  { id: '5', name: 'Subcategory', image: '/api/placeholder/300/200' },
  { id: '6', name: 'Subcategory', image: '/api/placeholder/300/200' },
];

export default function CategoryGrid({
  title = "Category Name",
  categories = defaultCategories,
  onCategoryClick,
  onBackClick,
  showBackButton = true,
}: CategoryGridProps) {
  const theme = useTheme();

  const handleCategoryClick = (category: Category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        {showBackButton && (
          <Button
            startIcon={<ArrowBack />}
            onClick={onBackClick}
            sx={{
              color: 'text.secondary',
              mb: 2,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          >
            All Products
          </Button>
        )}
        
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 3,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  backgroundColor: '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: category.image ? `url(${category.image})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {!category.image && (
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'primary.main',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'primary.contrastText',
                        fontWeight: 'bold',
                      }}
                    >
                      {category.name.charAt(0)}
                    </Typography>
                  </Box>
                )}
              </CardMedia>
              
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}