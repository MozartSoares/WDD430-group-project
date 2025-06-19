"use client";

import type { CreateProductSchema, UpdateProductSchema } from "@/types";
import { useCallback } from "react";
import { useRequests } from "./useRequests";

export const useProducts = () => {
  const { get, post, put, delete: del, loading, error } = useRequests();

  // GET /api/products
  const getProducts = useCallback(async () => {
    return await get("/products");
  }, [get]);

  // POST /api/products
  const createProduct = useCallback(
    async (product: CreateProductSchema) => {
      return await post("/products", product);
    },
    [post],
  );

  // GET /api/products/[id]
  const getProduct = useCallback(
    async (id: string) => {
      return await get(`/products/${id}`);
    },
    [get],
  );

  // PUT /api/products/[id]
  const updateProduct = useCallback(
    async (id: string, product: UpdateProductSchema) => {
      return await put(`/products/${id}`, product);
    },
    [put],
  );

  // DELETE /api/products/[id]
  const deleteProduct = useCallback(
    async (id: string) => {
      return await del(`/products/${id}`);
    },
    [del],
  );

  return {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    loading,
    error,
  };
};
