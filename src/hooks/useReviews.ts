"use client";

import type { CreateReviewSchema, UpdateReviewSchema } from "@/types";
import { useCallback } from "react";
import { useRequests } from "./useRequests";

export const useReviews = () => {
  const { get, post, put, delete: del, loading, error } = useRequests();

  // GET /api/reviews
  const getReviews = useCallback(async () => {
    return await get("/reviews");
  }, [get]);

  // POST /api/reviews
  const createReview = useCallback(
    async (review: CreateReviewSchema) => {
      return await post("/reviews", review);
    },
    [post],
  );

  // GET /api/reviews/[id]
  const getReview = useCallback(
    async (id: string) => {
      return await get(`/reviews/${id}`);
    },
    [get],
  );

  // PUT /api/reviews/[id]
  const updateReview = useCallback(
    async (id: string, review: UpdateReviewSchema) => {
      return await put(`/reviews/${id}`, review);
    },
    [put],
  );

  // DELETE /api/reviews/[id]
  const deleteReview = useCallback(
    async (id: string) => {
      return await del(`/reviews/${id}`);
    },
    [del],
  );

  return {
    getReviews,
    createReview,
    getReview,
    updateReview,
    deleteReview,
    loading,
    error,
  };
};
