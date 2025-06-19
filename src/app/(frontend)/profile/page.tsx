// src/app/(frontend)/profile/page.tsx
"use client";

import { AddProductModal, Footer, Header } from "@/components";
import { ImageUpload } from "@/components/common/ImageUpload";
import { useArtisans } from "@/hooks/useArtisans";
import type { IProduct, IUser } from "@/types";
import { Add, CalendarToday, Cancel, Edit, Save } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
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

function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editedProfile, setEditedProfile] = useState<Partial<IUser>>({});
  const {
    getArtisan,
    updateArtisan,
    loading: userLoading,
    error: userError,
  } = useArtisans();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.id) {
        const user = await getArtisan(session?.user?.id);
        setUser(user.user);
        setEditedProfile(user.user);
        setProducts(user.user.products);
      }
    };
    fetchUser();
  }, [session]);

  if (userLoading && !user) {
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

  if (userError && !user) {
    router.push("/login");
    return null;
  }

  if (!user && !userLoading) {
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

  if (!user) {
    return null;
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile(user!);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const updatedUser = { ...user, ...editedProfile };
    const updatedUserResponse = await updateArtisan(
      user!._id.toString(),
      updatedUser,
    );
    if (updatedUserResponse.success) {
      setUser(updatedUserResponse.user);
    }
    setIsEditing(false);
  };

  const handleInputChange =
    (field: keyof IUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedProfile((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleImageChange = (base64: string | null) => {
    setEditedProfile((prev) => ({
      ...prev,
      imageUrl: base64 || undefined,
    }));
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

  const handleProductAdded = (newProduct: IProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
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
      <Header />

      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        {/* Profile Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Box
            sx={{ display: "flex", alignItems: "flex-start", gap: 3, mb: 3 }}
          >
            {isEditing ? (
              <ImageUpload
                currentImage={editedProfile.imageUrl || user?.imageUrl}
                onImageChange={handleImageChange}
                variant="avatar"
                size={120}
              />
            ) : (
              <Avatar
                src={user?.imageUrl}
                sx={{ width: 120, height: 120, fontSize: "3rem" }}
              >
                <img src={user?.imageUrl} alt={user?.name} />
                {/* {user?.name?.charAt(0)} */}
              </Avatar>
            )}

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
                    {user?.name}
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
                {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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
                      {user.biography}
                    </Typography>
                  )}
                </Box> */}

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Joined {formatJoinDate(user?.createdAt?.toString() ?? "")}
                  </Typography>
                </Box>

                {/* {user.website && (
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
                        href={`https://${user.website}`}
                        target="_blank"
                      >
                        {user.website}
                      </Typography>
                    )}
                  </Box>
                )} */}
              </Box>

              {/* Specialties */}
              {/* <Box sx={{ mb: 2 }}>
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
                    {user.specialties?.map((specialty) => (
                      <Chip
                        key={Math.random()}
                        label={specialty}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )} */}
              {/* </Box> */}

              {/* Bio */}
              {isEditing ? (
                <TextField
                  label="Bio"
                  value={editedProfile.biography || ""}
                  onChange={handleInputChange("biography")}
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
                  {user?.biography}
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
              My Products ({products.length})
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

          {products.length === 0 ? (
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
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.name}>
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
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        >
                          ${product.currentPrice}
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

      <Footer />

      {/* Add Product Modal */}
      <AddProductModal
        open={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onProductAdded={handleProductAdded}
        artistId={user?._id.toString() ?? ""}
      />
    </Box>
  );
}

export default ProfilePage;
