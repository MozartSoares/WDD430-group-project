// src/app/(frontend)/artisans/[id]/page.tsx
"use client";

import { Footer, Header } from "@/components/layout/";
import {
  type DemoProduct,
  type DemoUser,
  getProductsByArtistId,
  getUserByArtistId,
} from "@/data/demoData";
import {
  CalendarToday,
  ChevronRight,
  Language,
  LocationOn,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Link,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ArtisanPage() {
  const params = useParams();
  const router = useRouter();
  const [artisan, setArtisan] = useState<DemoUser | null>(null);
  const [artisanProducts, setArtisanProducts] = useState<DemoProduct[]>([]);

  useEffect(() => {
    const artistId = params.id as string;
    if (artistId) {
      const user = getUserByArtistId(artistId);
      if (user) {
        setArtisan(user);
        const products = getProductsByArtistId(artistId);
        setArtisanProducts(products);
      }
    }
  }, [params.id]);

  if (!artisan) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header cartItemCount={0} onCartClick={() => {}} />
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
        <Footer onContactClick={() => {}} onLinkClick={() => {}} />
      </Box>
    );
  }

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const calculateAverageRating = () => {
    if (artisanProducts.length === 0) return 0;
    const totalRating = artisanProducts.reduce(
      (sum, product) => sum + product.rating,
      0,
    );
    return totalRating / artisanProducts.length;
  };

  const getTotalReviews = () => {
    return artisanProducts.reduce(
      (sum, product) => sum + product.reviewCount,
      0,
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header cartItemCount={0} onCartClick={() => {}} />

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

        {/* Artisan Profile Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          {/* Cover Image */}
          {artisan.coverImage && (
            <Box
              sx={{
                height: 200,
                backgroundImage: `url(${artisan.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                mb: 3,
              }}
            />
          )}

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
            <Avatar
              src={artisan.profileImage}
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
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {artisan.location}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Joined {formatJoinDate(artisan.joinDate)}
                  </Typography>
                </Box>

                {artisan.website && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Language fontSize="small" color="action" />
                    <Typography
                      variant="body2"
                      color="primary"
                      component="a"
                      href={`https://${artisan.website}`}
                      target="_blank"
                      sx={{
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {artisan.website}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Social Media Links */}
              {/* {artisan.socialMedia && (
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {artisan.socialMedia.instagram && (
                    <Tooltip title={`Follow on Instagram: ${artisan.socialMedia.instagram}`}>
                      <IconButton size="small" color="primary">
                        <Instagram />
                      </IconButton>
                    </Tooltip>
                  )}
                  {artisan.socialMedia.facebook && (
                    <Tooltip title={`Visit Facebook: ${artisan.socialMedia.facebook}`}>
                      <IconButton size="small" color="primary">
                        <Facebook />
                      </IconButton>
                    </Tooltip>
                  )}
                  {artisan.socialMedia.etsy && (
                    <Tooltip title={`Shop on Etsy: ${artisan.socialMedia.etsy}`}>
                      <IconButton size="small" color="primary">
                        <Store />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              )} */}

              {/* Specialties */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {artisan.specialties?.map((specialty, index) => (
                  <Chip
                    key={Math.random()}
                    label={specialty}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>

              {/* Stats */}
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
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {calculateAverageRating().toFixed(1)}
                    </Typography>
                    <Rating
                      value={calculateAverageRating()}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {getTotalReviews()} reviews
                  </Typography>
                </Box>
              </Box>

              {/* Bio */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {artisan.bio}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Products Section */}
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
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.images}
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
                            ${product.price}
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
                        {product.discount && (
                          <Chip
                            label={`-${product.discount}%`}
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

      <Footer onContactClick={() => {}} onLinkClick={() => {}} />
    </Box>
  );
}

export default ArtisanPage;
