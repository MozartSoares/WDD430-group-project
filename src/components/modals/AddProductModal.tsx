// src/components/modals/AddProductModal.tsx
"use client";

import { ImageUpload } from "@/components/common/ImageUpload";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import type { IProduct } from "@/types";
import type { CreateProductSchema } from "@/types/products/schemas";
import { Add, Close, Delete } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductAdded: (product: IProduct) => void;
  artistId: string;
}

export const AddProductModal = ({
  open,
  onClose,
  onProductAdded,
  artistId,
}: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    currentPrice: "",
    originalPrice: "",
    categoryId: "",
    dimensions: "",
    stockQuantity: "1",
  });
  const [imageData, setImageData] = useState<string | null>(null);
  const [materials, setMaterials] = useState<string[]>([]);
  const [currentMaterial, setCurrentMaterial] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const { createProduct, loading: productLoading } = useProducts();
  const { getCategories, loading: categoriesLoading } = useCategories();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await getCategories();
        if (categoriesResponse.success && categoriesResponse.categories) {
          setCategories(categoriesResponse.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const handleSelectChange = (field: string) => (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageChange = (base64: string | null) => {
    setImageData(base64);
  };

  const addMaterial = () => {
    if (currentMaterial.trim() && !materials.includes(currentMaterial.trim())) {
      setMaterials((prev) => [...prev, currentMaterial.trim()]);
      setCurrentMaterial("");
    }
  };

  const removeMaterial = (materialToRemove: string) => {
    setMaterials((prev) =>
      prev.filter((material) => material !== materialToRemove),
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addMaterial();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.currentPrice || Number.parseFloat(formData.currentPrice) <= 0)
      newErrors.currentPrice = "Valid price is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.stockQuantity || Number.parseInt(formData.stockQuantity) < 0)
      newErrors.stockQuantity = "Valid stock quantity is required";

    if (
      formData.originalPrice &&
      Number.parseFloat(formData.originalPrice) <=
        Number.parseFloat(formData.currentPrice)
    ) {
      newErrors.originalPrice =
        "Original price must be higher than current price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const newProduct: CreateProductSchema = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        currentPrice: Number.parseFloat(formData.currentPrice),
        originalPrice: formData.originalPrice
          ? Number.parseFloat(formData.originalPrice)
          : Number.parseFloat(formData.currentPrice),
        categoryId: formData.categoryId,
        userId: artistId,
        stockQuantity: Number.parseInt(formData.stockQuantity),
        materials: materials.length > 0 ? materials : undefined,
        dimensions: formData.dimensions || undefined,
        imageUrl: imageData ? imageData : undefined,
      };

      const productResponse = await createProduct(newProduct);
      if (productResponse.success && productResponse.product) {
        onProductAdded(productResponse.product);
      }
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      currentPrice: "",
      originalPrice: "",
      categoryId: "",
      dimensions: "",
      stockQuantity: "1",
    });
    setImageData(null);
    setMaterials([]);
    setCurrentMaterial("");
    setErrors({});
    setLoading(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Add New Product
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Product Name *"
              value={formData.name}
              onChange={handleInputChange("name")}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
              placeholder="e.g., Handcrafted Ceramic Vase"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.categoryId}>
              <InputLabel>Category *</InputLabel>
              <Select
                value={formData.categoryId}
                onChange={handleSelectChange("categoryId")}
                label="Category *"
                disabled={categoriesLoading}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category._id.toString()}
                    value={category._id.toString()}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.categoryId && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1.75 }}
                >
                  {errors.categoryId}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description *"
              value={formData.description}
              onChange={handleInputChange("description")}
              fullWidth
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description}
              placeholder="Describe your product, its features, and what makes it special..."
            />
          </Grid>

          {/* Product Image */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Product Image
            </Typography>
            <ImageUpload
              currentImage={imageData ?? undefined}
              onImageChange={handleImageChange}
              variant="product"
            />
          </Grid>

          {/* Pricing */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Pricing & Stock
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Current Price *"
              value={formData.currentPrice}
              onChange={handleInputChange("currentPrice")}
              fullWidth
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={!!errors.currentPrice}
              helperText={errors.currentPrice}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Original Price (Optional)"
              value={formData.originalPrice}
              onChange={handleInputChange("originalPrice")}
              fullWidth
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={!!errors.originalPrice}
              helperText={errors.originalPrice || "For showing discounts"}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Stock Quantity *"
              value={formData.stockQuantity}
              onChange={handleInputChange("stockQuantity")}
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
              error={!!errors.stockQuantity}
              helperText={errors.stockQuantity}
            />
          </Grid>

          {/* Product Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Product Details
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Dimensions (Optional)"
              value={formData.dimensions}
              onChange={handleInputChange("dimensions")}
              fullWidth
              placeholder='e.g., 8" H x 4" W x 4" D'
              helperText="Product dimensions"
            />
          </Grid>

          {/* Materials */}
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Materials (Optional)
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                label="Add Material"
                value={currentMaterial}
                onChange={(e) => setCurrentMaterial(e.target.value)}
                onKeyPress={handleKeyPress}
                size="small"
                placeholder="e.g., Oak Wood, Sterling Silver"
              />
              <Button
                variant="outlined"
                onClick={addMaterial}
                disabled={!currentMaterial.trim()}
                startIcon={<Add />}
              >
                Add
              </Button>
            </Box>

            {materials.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {materials.map((material) => (
                  <Chip
                    key={material}
                    label={material}
                    onDelete={() => removeMaterial(material)}
                    deleteIcon={<Delete />}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </Grid>

          {/* Guidelines */}
          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="body2">
                <strong>Tips:</strong> Use clear, descriptive names and
                high-quality images. Detailed descriptions help customers
                understand your craftsmanship and materials used.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || productLoading}
          sx={{ minWidth: 120 }}
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
