// src/app/(frontend)/products/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Breadcrumbs,
  Link,
  Divider,
  Avatar,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  ExpandMore,
  CheckCircle,
  LocalShipping,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArtisanProfile from '@/components/sections/ArtisanProfile';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductDetailProps {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  colors: string[];
  availableStock: number;
  shippingDays: number;
  features: string[];
  artist: {
    id: string;
    name: string;
    avatar?: string;
    bio: string;
    rating: number;
    reviewCount: number;
  };
  reviews: Array<{
    id: string;
    rating: number;
    title: string;
    comment: string;
    author: string;
    date: string;
  }>;
  relatedProducts: Array<{
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isOnSale?: boolean;
  }>;
}

// Demo data for the product
const demoProduct: ProductDetailProps = {
  id: '1',
  name: 'Product Name',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.',
  shortDescription: 'Short description, color, size',
  price: 95,
  originalPrice: 119,
  discount: 20,
  rating: 4.2,
  reviewCount: 12,
  images: [
    { id: '1', url: '/api/placeholder/400/400', alt: 'Product main image' },
    { id: '2', url: '/api/placeholder/400/400', alt: 'Product side view' },
    { id: '3', url: '/api/placeholder/400/400', alt: 'Product detail' },
    { id: '4', url: '/api/placeholder/400/400', alt: 'Product in use' },
  ],
  colors: ['Black', 'White', 'Brown'],
  availableStock: 5,
  shippingDays: 3,
  features: [
    'Lorem ipsum dolor sit amet',
    'Consectetur adipiscing elit',
    'Nulla quam velit, vulputate eu pharetra nec',
    'Mattis ac neque'
  ],
  artist: {
    id: 'artist1',
    name: 'Artisan Name',
    avatar: '/api/placeholder/80/80',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    rating: 4.5,
    reviewCount: 156
  },
  reviews: [
    {
      id: '1',
      rating: 5,
      title: 'Great value and quality',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Based on 156 reviews',
      date: '2024-01-15'
    },
    {
      id: '2',
      rating: 4,
      title: 'Beautiful design!',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Based on 156 reviews',
      date: '2024-01-10'
    },
    {
      id: '3',
      rating: 5,
      title: 'Exactly what I wanted',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Based on 156 reviews',
      date: '2024-01-05'
    }
  ],
  relatedProducts: [
    { id: '2', name: 'Product Name', price: 95, originalPrice: 119, image: '/api/placeholder/250/250', isOnSale: true },
    { id: '3', name: 'Product Name', price: 95, image: '/api/placeholder/250/250' },
    { id: '4', name: 'Product Name', price: 95, image: '/api/placeholder/250/250' },
    { id: '5', name: 'Product Name', price: 95, image: '/api/placeholder/250/250' },
    { id: '6', name: 'Product Name', price: 95, image: '/api/placeholder/250/250' }
  ]
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [cartCount, setCartCount] = useState(0);

  // In real implementation, you'd fetch product data based on params.id
  const product = demoProduct;

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    // Add to cart logic here
  };

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        cartItemCount={cartCount}
        isLoggedIn={false}
        onLoginClick={() => router.push('/login')}
        onCartClick={() => router.push('/cart')}
      />

      <Container maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" onClick={() => router.push('/')}>
            All Products
          </Link>
          <Link underline="hover" color="inherit" onClick={() => router.push('/category')}>
            Category
          </Link>
          <Typography color="text.primary">Subcategory</Typography>
        </Breadcrumbs>

        {/* Main Product Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Main Image */}
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url(${product.images[selectedImage]?.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!product.images[selectedImage]?.url && (
                  <Typography color="text.secondary">Product Image</Typography>
                )}
              </Box>

              {/* Thumbnail Images */}
              <Grid container spacing={1}>
                {product.images.map((image, index) => (
                  <Grid item xs={3} key={image.id}>
                    <Box
                      onClick={() => handleImageSelect(index)}
                      sx={{
                        width: '100%',
                        height: 80,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 1,
                        cursor: 'pointer',
                        border: selectedImage === index ? 2 : 1,
                        borderColor: selectedImage === index ? 'primary.main' : 'grey.300',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">IMG</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {product.shortDescription}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h5" color="primary.main" fontWeight="bold">
                ${product.price}
              </Typography>
              {product.originalPrice && (
                <>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                  >
                    ${product.originalPrice}
                  </Typography>
                  <Chip label={`-${product.discount}%`} color="error" size="small" />
                </>
              )}
            </Box>

            <Typography variant="caption" color="text.secondary" gutterBottom display="block">
              {product.availableStock} in stock
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Rating value={product.rating} precision={0.5} readOnly size="small" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviewCount})
              </Typography>
            </Box>

            {/* Color Selection */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Color</InputLabel>
              <Select value={selectedColor} label="Color" onChange={handleColorChange}>
                {product.colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" sx={{ mt: 1 }}>
                <Link underline="hover" color="primary">Change</Link>
              </Typography>
            </FormControl>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              fullWidth
              onClick={handleAddToCart}
              sx={{ mb: 2 }}
            >
              ADD TO CART
            </Button>

            {/* Shipping Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CheckCircle color="success" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Available</Typography>
              <Box sx={{ mx: 2 }}>
                <LocalShipping fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" component="span">
                  Shipping within {product.shippingDays} days
                </Typography>
              </Box>
            </Box>

            {/* Product Description */}
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            {/* Features List */}
            <Stack spacing={1} sx={{ mb: 3 }}>
              {product.features.map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle color="success" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{feature}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Expandable Sections */}
        <Box sx={{ mb: 6 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Product Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Detailed product specifications and information would go here.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Size & Measurements</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Size chart and measurement information would go here.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Product Reviews</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>({product.reviewCount})</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={3}>
                {product.reviews.map((review) => (
                  <Box key={review.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={review.rating} readOnly size="small" />
                      <Typography variant="subtitle2" sx={{ ml: 2 }}>{review.title}</Typography>
                    </Box>
                    <Typography variant="body2" paragraph>{review.comment}</Typography>
                    <Typography variant="caption" color="text.secondary">{review.author}</Typography>
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* About the Artisan Section */}
        <ArtisanProfile 
          artist={product.artist}
          showContainer={false}
        />

        {/* Related Products */}
        <Box>
          <Typography variant="h5" gutterBottom>Related products</Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
            {product.relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} sx={{ minWidth: 200, flexShrink: 0 }}>
                {relatedProduct.isOnSale && (
                  <Chip
                    label="SALE"
                    color="error"
                    size="small"
                    sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}
                  />
                )}
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography color="text.secondary">Product Image</Typography>
                </CardMedia>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>{relatedProduct.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Description, color, size</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Typography variant="subtitle1" color="primary.main">
                      ${relatedProduct.price}
                    </Typography>
                    {relatedProduct.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                      >
                        ${relatedProduct.originalPrice}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>

      <Footer
        onContactClick={() => console.log('Contact clicked')}
        onLinkClick={(href) => console.log('Footer link:', href)}
      />
    </Box>
  );
}
