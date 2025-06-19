// src/app/(frontend)/products/[id]/page.tsx
"use client";

import { Footer, Header, ReviewModal } from "@/components";

import { useCartWidget } from "@/components/providers/CartProvider";
import { useProducts } from "@/hooks/useProducts";
import type { IProduct, IReview, IUser } from "@/types";
import {
  Add,
  ChevronRight,
  FavoriteOutlined,
  RateReview,
  Remove,
  ShareOutlined,
  Verified,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [artisan, setArtisan] = useState<IUser | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const { increaseCartQuantity } = useCartWidget();
  const {
    getProduct,
    loading: productLoading,
    error: productError,
    calculateDiscountPercentage,
  } = useProducts();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const productId = params.id as string;
    const fetchProduct = async () => {
      try {
        const productResponse = await getProduct(productId);
        if (productResponse.success && productResponse.product) {
          setProduct(productResponse.product);
          setReviews(productResponse.product.reviews ?? []);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    if (!session || !session.user) return;
    const userId = session.user.id;
    if (userId && product) {
      setCanReview(userId !== product.userId.toString());
    }
  }, [session, product]);

  if (productLoading || !product) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product && !productLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h5">Product not found</Typography>
      </Box>
    );
  }
  if (!product) {
    return null;
  }

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(product.stockQuantity, prev + change)),
    );
  };

  const handleAddToCart = async () => {
    await increaseCartQuantity(product._id.toString(), quantity);
  };

  const handleReviewAdded = (newReview: IReview) => {
    setReviews((prev) => [newReview, ...prev]);

    // Update product review count and rating
    const updatedReviews = [newReview, ...reviews];
    const newRating =
      updatedReviews.reduce((sum, review) => sum + review.rating, 0) /
      updatedReviews.length;

    setProduct((prev) =>
      prev
        ? {
            ...prev,
            rating: Math.round(newRating * 10) / 10,
            reviewCount: updatedReviews.length,
          }
        : null,
    );

    setCanReview(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
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
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Home
          </Link>
          <Link
            component="button"
            variant="body2"
            onClick={() => router.push("/products")}
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Products
          </Link>
          <Typography color="text.primary" variant="body2">
            {product.name}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              {product.isNew && (
                <Chip label="New" color="success" size="small" />
              )}
              {product.currentPrice < product.originalPrice && (
                <Chip
                  label={`-${calculateDiscountPercentage(
                    product.originalPrice,
                    product.currentPrice,
                  )}%`}
                  color="error"
                  size="small"
                />
              )}
            </Box>

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount} reviews)
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                ${product.currentPrice}
              </Typography>
              {product.originalPrice > product.currentPrice && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${product.originalPrice}
                </Typography>
              )}
            </Box>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              {product.description}
            </Typography>

            {/* Product Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Product Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {product.category?.name}
                  </Typography>
                </Grid>
                {product.materials && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Materials
                    </Typography>
                    <Typography variant="body1">
                      {product.materials.join(", ")}
                    </Typography>
                  </Grid>
                )}
                {product.dimensions && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Dimensions
                    </Typography>
                    <Typography variant="body1">
                      {product.dimensions}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    In Stock
                  </Typography>
                  <Typography variant="body1">
                    {product.stockQuantity} available
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Typography variant="body1">Quantity:</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              >
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ px: 2, minWidth: 40, textAlign: "center" }}>
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockQuantity}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                disabled={!product.stockQuantity}
                sx={{ flexGrow: 1, py: 1.5 }}
              >
                {product.stockQuantity ? "Add to Cart" : "Out of Stock"}
              </Button>
              <IconButton size="large" color="primary">
                <FavoriteOutlined />
              </IconButton>
              <IconButton size="large" color="primary">
                <ShareOutlined />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Artisan Section */}
        {artisan && (
          <Paper elevation={2} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Meet the Artisan
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar src={artisan.imageUrl} sx={{ width: 80, height: 80 }}>
                {artisan.name.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {artisan.name}
                  </Typography>
                  <Verified color="primary" fontSize="small" />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {artisan.biography}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => router.push(`/artisans/${artisan._id}`)}
                >
                  View Profile
                </Button>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Reviews Section */}
        <Paper elevation={2} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Customer Reviews ({reviews.length})
            </Typography>
            {canReview && session && (
              <Button
                variant="contained"
                startIcon={<RateReview />}
                onClick={() => setShowReviewModal(true)}
              >
                Write Review
              </Button>
            )}
          </Box>

          {!session && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography>
                Please{" "}
                <Link
                  onClick={() => router.push("/login")}
                  sx={{ cursor: "pointer" }}
                >
                  sign in
                </Link>{" "}
                to write a review.
              </Typography>
            </Alert>
          )}

          {session && !canReview && reviews.length > 0 && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography>You cannot review your own product.</Typography>
            </Alert>
          )}

          {reviews.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No reviews yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Be the first to review this product!
              </Typography>
            </Box>
          ) : (
            <Box>
              {reviews.map((review, index) => (
                <Box key={review._id.toString()}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {review.user?.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {review.user?.name}
                        </Typography>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(review.createdAt.toString())}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {review.comment}
                      </Typography>
                    </Box>
                  </Box>
                  {index < reviews.length - 1 && <Divider sx={{ my: 3 }} />}
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Container>

      <Footer />

      {/* Review Modal */}
      {canReview && session && (
        <ReviewModal
          open={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onReviewAdded={handleReviewAdded}
          product={product}
          user={session?.user as IUser & { id: string }}
        />
      )}
    </Box>
  );
}

export default ProductDetailPage;
