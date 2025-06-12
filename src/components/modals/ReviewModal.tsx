// src/components/modals/ReviewModal.tsx
'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Rating,
  Alert,
} from '@mui/material';
import {
  Close,
  Star,
} from '@mui/icons-material';
import type { DemoReview } from '@/data/demoData';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  onReviewAdded: (review: DemoReview) => void;
  productId: string;
  productName: string;
  userId: string;
  userName: string;
}

export default function ReviewModal({ 
  open, 
  onClose, 
  onReviewAdded, 
  productId, 
  productName, 
  userId, 
  userName 
}: ReviewModalProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!rating || rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!comment.trim()) {
      newErrors.comment = 'Please write a review comment';
    } else if (comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReview: DemoReview = {
        id: `review_${Date.now()}`,
        productId,
        userId,
        userName,
        rating: rating!,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
        helpful: 0,
      };

      onReviewAdded(newReview);
      handleClose();
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRating(null);
    setComment('');
    setErrors({});
    setLoading(false);
    onClose();
  };

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue);
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
    if (errors.comment) {
      setErrors(prev => ({ ...prev, comment: '' }));
    }
  };

  const getRatingLabel = (value: number) => {
    const labels = {
      1: 'Poor',
      2: 'Fair', 
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels[value as keyof typeof labels] || '';
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Write a Review
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Product Info */}
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Share your experience with this product
          </Typography>
        </Box>

        {/* Rating Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Overall Rating *
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Rating
              name="product-rating"
              value={rating}
              onChange={handleRatingChange}
              size="large"
              precision={1}
              emptyIcon={<Star style={{ opacity: 0.3 }} fontSize="inherit" />}
            />
            {rating && (
              <Typography variant="body2" color="text.secondary">
                {getRatingLabel(rating)}
              </Typography>
            )}
          </Box>
          {errors.rating && (
            <Typography variant="caption" color="error">
              {errors.rating}
            </Typography>
          )}
        </Box>

        {/* Comment Section */}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Your Review *"
            value={comment}
            onChange={handleCommentChange}
            fullWidth
            multiline
            rows={4}
            error={!!errors.comment}
            helperText={errors.comment || `${comment.length}/500 characters`}
            placeholder="Tell others about your experience with this product. What did you like? How was the quality? Would you recommend it?"
            inputProps={{ maxLength: 500 }}
          />
        </Box>

        {/* Guidelines */}
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Review Guidelines:</strong> Please be honest and constructive. 
            Focus on the product quality, craftsmanship, and your overall experience.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !rating || !comment.trim()}
          sx={{ minWidth: 120 }}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}