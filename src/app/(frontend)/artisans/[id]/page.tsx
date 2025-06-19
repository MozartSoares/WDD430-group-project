// src/app/(frontend)/artisans/[id]/page.tsx
"use client";

import { Footer, Header } from "@/components/layout/";
import { useArtisans } from "@/hooks/useArtisans";
import { useProducts } from "@/hooks/useProducts";
import type { IProduct, IUser } from "@/types";
import { CalendarToday, ChevronRight } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Link,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function ArtisanPage() {
  const params = useParams();
  const router = useRouter();
  const [artisan, setArtisan] = useState<IUser | null>(null);
  const { getArtisan, loading, error } = useArtisans();
  const [artisanProducts, setArtisanProducts] = useState<IProduct[]>([]);
  const { calculateDiscountPercentage } = useProducts();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const artistId = params.id as string;
    if (!artistId) return;
    const fetchArtisan = async () => {
      try {
        const artisanResponse = await getArtisan(artistId);
        if (artisanResponse.success && artisanResponse.users) {
          setArtisan(artisanResponse.users);
        }
      } catch (error) {
        console.error("Error fetching artisan:", error);
      }
    };
    fetchArtisan();
  }, [params.id]);

  if (loading && !artisan) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <CircularProgress />
        <Footer />
      </Box>
    );
  }

  if (!loading || !artisan) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography variant="h5">Artisan not found</Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const totalReviews = useMemo(() => {
    return artisanProducts.reduce(
      (sum, product) => sum + (product.reviewCount ?? 0),
      0,
    );
  }, [artisanProducts]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
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
          <Link
            component="button"
            variant="body2"
            onClick={() => router.push("/artisans")}
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Artisans
          </Link>
          <Typography color="text.primary" variant="body2">
            {artisan.name}
          </Typography>
        </Breadcrumbs>

        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          {artisan.imageUrl && (
            <Box
              sx={{
                height: 200,
                backgroundImage: `url(${artisan.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                mb: 3,
              }}
            />
          )}

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
            <Avatar
              src={artisan.imageUrl}
              sx={{ width: 120, height: 120, fontSize: "3rem" }}
            >
              {artisan.name.charAt(0)}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                {artisan.name}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Joined {formatJoinDate(artisan.createdAt.toString())}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {artisanProducts.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Products
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {artisan.averageRating?.toFixed(1)}
                      </Typography>
                      <Rating
                        value={artisan.averageRating}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {totalReviews} reviews
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {artisan.biography}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 600, mb: 3 }}
          >
            Products by {artisan.name} ({artisanProducts.length})
          </Typography>

          {artisanProducts.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No products available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This artisan hasn&apos;t listed any products yet.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {artisanProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id.toString()}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                    onClick={() => router.push(`/products/${product._id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.imageUrl}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        noWrap
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {product.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({product.reviewCount})
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 600 }}
                          >
                            ${product.currentPrice}
                          </Typography>
                          {product.originalPrice && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ textDecoration: "line-through" }}
                            >
                              ${product.originalPrice}
                            </Typography>
                          )}
                        </Box>
                        {product.isNew && (
                          <Chip label="New" size="small" color="success" />
                        )}
                        {product.originalPrice < product.currentPrice && (
                          <Chip
                            label={`-${calculateDiscountPercentage(product.originalPrice, product.currentPrice)}%`}
                            size="small"
                            color="error"
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}

export default ArtisanPage;
