"use client";

import type { CreateCategorySchema, UpdateCategorySchema } from "@/types";
import { useCallback } from "react";
import { useRequests } from "./useRequests";

export const useCategories = () => {
  const { get, post, put, delete: del, loading, error } = useRequests();

  // GET /api/categories
  const getCategories = useCallback(async () => {
    return await get("/categories");
  }, [get]);

  // POST /api/categories
  const createCategory = useCallback(
    async (category: CreateCategorySchema) => {
      return await post("/categories", category);
    },
    [post],
  );

  // GET /api/categories/[id]
  const getCategory = useCallback(
    async (id: string) => {
      return await get(`/categories/${id}`);
    },
    [get],
  );

  // PUT /api/categories/[id]
  const updateCategory = useCallback(
    async (id: string, category: UpdateCategorySchema) => {
      return await put(`/categories/${id}`, category);
    },
    [put],
  );

  // DELETE /api/categories/[id]
  const deleteCategory = useCallback(
    async (id: string) => {
      return await del(`/categories/${id}`);
    },
    [del],
  );

  return {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
  };
};
