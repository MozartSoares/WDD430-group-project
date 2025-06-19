"use client";

import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import type React from "react";
import { useRef, useState } from "react";

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (base64: string | null) => void;
  variant?: "avatar" | "product";
  size?: number;
  disabled?: boolean;
}

export const ImageUpload = ({
  currentImage,
  onImageChange,
  variant = "product",
  size = 120,
  disabled = false,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setPreview(base64);
        onImageChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (variant === "avatar") {
    return (
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Avatar
          src={preview || undefined}
          sx={{
            width: size,
            height: size,
            cursor: disabled ? "default" : "pointer",
            "&:hover": disabled
              ? {}
              : {
                  opacity: 0.8,
                },
          }}
          onClick={handleClick}
        >
          {!preview && <PhotoCamera />}
        </Avatar>

        {!disabled && (
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            onClick={handleClick}
          >
            <PhotoCamera fontSize="small" />
          </IconButton>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileSelect}
          disabled={disabled}
          aria-label="Upload avatar image"
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          border: "2px dashed",
          borderColor: preview ? "primary.main" : "grey.300",
          borderRadius: 2,
          p: 3,
          textAlign: "center",
          cursor: disabled ? "default" : "pointer",
          transition: "all 0.2s",
          "&:hover": disabled
            ? {}
            : {
                borderColor: "primary.main",
                backgroundColor: "action.hover",
              },
        }}
        onClick={handleClick}
      >
        {preview ? (
          <Box>
            <Box
              component="img"
              src={preview}
              sx={{
                maxWidth: "100%",
                maxHeight: 200,
                borderRadius: 1,
                mb: 2,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Click to change image
            </Typography>
            {!disabled && (
              <Button
                size="small"
                color="error"
                onClick={handleRemove}
                sx={{ mt: 1 }}
              >
                Remove Image
              </Button>
            )}
          </Box>
        ) : (
          <Box>
            <PhotoCamera sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
            <Typography variant="body1" gutterBottom>
              {disabled ? "No image selected" : "Click to upload image"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              JPG, PNG, GIF up to 5MB
            </Typography>
          </Box>
        )}
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileSelect}
        disabled={disabled}
        aria-label="Upload product image"
      />
    </Box>
  );
};
