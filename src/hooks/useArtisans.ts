"use client";

import type { UpdateUserSchema } from "@/types";
import { useCallback } from "react";
import { useRequests } from "./useRequests";

export const useArtisans = () => {
  const { get, put, delete: del, loading, error } = useRequests();

  // GET /api/user
  const getArtisans = useCallback(async () => {
    return await get("/user");
  }, [get]);

  // GET /api/user/[id]
  const getArtisan = useCallback(
    async (id: string) => {
      return await get(`/user/${id}`);
    },
    [get],
  );

  // PUT /api/user/[id]
  const updateArtisan = useCallback(
    async (id: string, user: UpdateUserSchema) => {
      return await put(`/user/${id}`, user);
    },
    [put],
  );

  // DELETE /api/user/[id]
  const deleteArtisan = useCallback(
    async (id: string) => {
      return await del(`/user/${id}`);
    },
    [del],
  );

  return {
    getArtisans,
    getArtisan,
    updateArtisan,
    deleteArtisan,
    loading,
    error,
  };
};
