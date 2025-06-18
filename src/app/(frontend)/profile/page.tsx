// src/app/(frontend)/profile/page.tsx
"use client";

import { AddProductModal, Footer, Header } from "@/components";

import {
  Add,
  CalendarToday,
  Cancel,
  Edit,
  Language,
  LocationOn,
  Save,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

// Types for data

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
}
interface User {
  id: string;
  name: string;
  profileImage?: string;
  coverImage?: string;
  location?: string;
  joinDate: string;
  website?: string;
  specialties?: string[];
  bio?: string;
  artistId: number;
}

function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [editedProfile, setEditedProfile] = useState<Partial<User>>({});

  useEffect(() => {
    if (session?.user?.email) {
      const fetchData = async () => {
        try {
          const userRes = await fetch("/api/user");
          const user: User = await userRes.json();
          setUserData(user);
          setEditedProfile(user);

          const productsRes = await fetch(`/api/products?artistId=${user.id}`);
          const products: Product[] = await productsRes.json();
          setUserProducts(products);
        } catch (error) {
          console.error("Failed to load profile data:", error);
        }
      };

      fetchData();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (!userData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>User not found</Typography>
      </Box>
    );
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile(userData);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const updatedUser = { ...userData, ...editedProfile };
    setUserData(updatedUser);
    setIsEditing(false);

  };


  const handleInputChange = (field: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProfile((prev) => ({ ...prev, [field]: event.target.value }));
  };


  const handleSpecialtiesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const specialties = event.target.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setEditedProfile((prev) => ({
      ...prev,
      specialties,
    }));
  };

  const handleProductAdded = (newProduct: Product) => {
    setUserProducts((prev) => [newProduct, ...prev]);
    setShowAddProduct(false);
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header cartItemCount={0} onCartClick={() => {}} />

      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        {/* Profile Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Box
            sx={{ display: "flex", alignItems: "flex-start", gap: 3, mb: 3 }}
          >
            <Avatar
              src={userData.profileImage}
              sx={{ width: 120, height: 120, fontSize: "3rem" }}
            >
              {userData.name.charAt(0)}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                {isEditing ? (
                  <TextField
                    value={editedProfile.name || ""}
                    onChange={handleInputChange("name")}
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: "2rem" }}
                  />
                ) : (
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 600 }}
                  >
                    {userData.name}
                  </Typography>
                )}

                <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSave}
                        color="primary"
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleEditToggle}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={handleEditToggle}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <LocationOn fontSize="small" color="action" />
                  {isEditing ? (
                    <TextField
                      value={editedProfile.location || ""}
                      onChange={handleInputChange("location")}
                      variant="outlined"
                      size="small"
                      placeholder="Your location"
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {userData.location}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Joined {formatJoinDate(userData.joinDate)}
                  </Typography>
                </Box>

                {userData.website && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Language fontSize="small" color="action" />
                    {isEditing ? (
                      <TextField
                        value={editedProfile.website || ""}
                        onChange={handleInputChange("website")}
                        variant="outlined"
                        size="small"
                        placeholder="Your website"
                      />
                    ) : (
                      <Typography
                        variant="body2"
                        color="primary"
                        component="a"
                        href={`https://${userData.website}`}
                        target="_blank"
                      >
                        {userData.website}
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>

              {/* Specialties */}
              <Box sx={{ mb: 2 }}>
                {isEditing ? (
                  <TextField
                    label="Specialties (comma separated)"
                    value={editedProfile.specialties?.join(", ") || ""}
                    onChange={handleSpecialtiesChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="e.g. Ceramics, Pottery, Glazing"
                  />
                ) : (
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {userData.specialties?.map((specialty, index) => (
                      <Chip
                        key={Math.random()}
                        label={specialty}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Bio */}
              {isEditing ? (
                <TextField
                  label="Bio"
                  value={editedProfile.bio || ""}
                  onChange={handleInputChange("bio")}
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Tell your story..."
                />
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {userData.bio}
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Products Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              My Products ({userProducts.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowAddProduct(true)}
              sx={{ borderRadius: 2 }}
            >
              Add Product
            </Button>
          </Box>

          {userProducts.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No products listed yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Start selling by adding your first product
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setShowAddProduct(true)}
              >
                Add Your First Product
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {userProducts.map((product) => (
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
                      image="/api/placeholder/300/200"
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
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        >
                          ${product.price}
                        </Typography>
                        {product.isNew && (
                          <Chip label="New" size="small" color="success" />
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

      {/* Add Product Modal */}
      <AddProductModal
        open={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onProductAdded={handleProductAdded}
        artistId={userData.artistId}
        />
    </Box>
  );
}

export default ProfilePage;
