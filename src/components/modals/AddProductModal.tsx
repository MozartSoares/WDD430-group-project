// src/components/modals/AddProductModal.tsx
"use client";

import type { DemoProduct } from "@/data/demoData";
import { Add, Close, CloudUpload, Delete } from "@mui/icons-material";
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
import { useState } from "react";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductAdded: (product: DemoProduct) => void;
  artistId: string;
}

const categories = [
  "Ceramics",
  "Jewelry",
  "Furniture",
  "Textiles",
  "Glass Art",
  "Leather Goods",
  "Wood Crafts",
  "Bath & Body",
  "Metal Work",
  "Paper Crafts",
  "Fiber Arts",
  "Home Decor",
];

export const AddProductModal = ({
  open,
  onClose,
  onProductAdded,
  artistId,
}: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    materials: "",
    dimensions: "",
    stockQuantity: "1",
  });
  const [materials, setMaterials] = useState<string[]>([]);
  const [currentMaterial, setCurrentMaterial] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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
    if (!formData.price || Number.parseFloat(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.stockQuantity || Number.parseInt(formData.stockQuantity) < 0)
      newErrors.stockQuantity = "Valid stock quantity is required";

    if (
      formData.originalPrice &&
      Number.parseFloat(formData.originalPrice) <=
        Number.parseFloat(formData.price)
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const price = Number.parseFloat(formData.price);
      const originalPrice = formData.originalPrice
        ? Number.parseFloat(formData.originalPrice)
        : undefined;
      const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : undefined;

      const newProduct: DemoProduct = {
        id: `product_${Date.now()}`,
        artistId,
        name: formData.name,
        description: formData.description,
        price,
        originalPrice,
        rating: 0,
        reviewCount: 0,
        isNew: true, // Will be calculated based on createdAt
        discount,
        category: formData.category,
        materials: materials.length > 0 ? materials : undefined,
        dimensions: formData.dimensions || undefined,
        createdAt: new Date().toISOString(),
        inStock: true,
        stockQuantity: Number.parseInt(formData.stockQuantity),
      };

      onProductAdded(newProduct);
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
      price: "",
      originalPrice: "",
      category: "",
      materials: "",
      dimensions: "",
      stockQuantity: "1",
    });
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
          {/* Product Name */}
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              value={formData.name}
              onChange={handleInputChange("name")}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
              placeholder="e.g. Handcrafted Ceramic Vase"
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              value={formData.description}
              onChange={handleInputChange("description")}
              fullWidth
              multiline
              rows={3}
              required
              error={!!errors.description}
              helperText={errors.description}
              placeholder="Describe your product, its features, and what makes it special..."
            />
          </Grid>

          {/* Price and Original Price */}
          <Grid item xs={6}>
            <TextField
              label="Price"
              value={formData.price}
              onChange={handleInputChange("price")}
              fullWidth
              required
              type="number"
              error={!!errors.price}
              helperText={errors.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Original Price (Optional)"
              value={formData.originalPrice}
              onChange={handleInputChange("originalPrice")}
              fullWidth
              type="number"
              error={!!errors.originalPrice}
              helperText={errors.originalPrice || "For sale items only"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={handleSelectChange("category")}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1.5 }}
                >
                  {errors.category}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Stock Quantity */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock Quantity"
              value={formData.stockQuantity}
              onChange={handleInputChange("stockQuantity")}
              fullWidth
              required
              type="number"
              error={!!errors.stockQuantity}
              helperText={errors.stockQuantity}
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Materials */}
          <Grid item xs={12}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Materials
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <TextField
                  placeholder="Add material (e.g. Clay, Wood, Silver)"
                  value={currentMaterial}
                  onChange={(e) => setCurrentMaterial(e.target.value)}
                  onKeyPress={handleKeyPress}
                  size="small"
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="outlined"
                  onClick={addMaterial}
                  disabled={!currentMaterial.trim()}
                  startIcon={<Add />}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {materials.map((material, index) => (
                  <Chip
                    key={Math.random()}
                    label={material}
                    onDelete={() => removeMaterial(material)}
                    deleteIcon={<Delete />}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Dimensions */}
          <Grid item xs={12}>
            <TextField
              label="Dimensions (Optional)"
              value={formData.dimensions}
              onChange={handleInputChange("dimensions")}
              fullWidth
              placeholder="e.g. 8&quot; H x 4&quot; W or 48&quot; L x 24&quot; W x 18&quot; H"
              helperText="Include height, width, depth, or other relevant measurements"
            />
          </Grid>

          {/* Image Upload Placeholder */}
          <Grid item xs={12}>
            <Box
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                backgroundColor: "#f9f9f9",
              }}
            >
              <CloudUpload sx={{ fontSize: 48, color: "#ccc", mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Image upload will be available in the full version
              </Typography>
              <Typography variant="caption" color="text.secondary">
                For now, placeholder images will be used
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {formData.originalPrice &&
          formData.price &&
          Number.parseFloat(formData.originalPrice) >
            Number.parseFloat(formData.price) && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>Sale Item:</strong> This product will show a{" "}
              {Math.round(
                ((Number.parseFloat(formData.originalPrice) -
                  Number.parseFloat(formData.price)) /
                  Number.parseFloat(formData.originalPrice)) *
                  100,
              )}
              % discount
            </Alert>
          )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
