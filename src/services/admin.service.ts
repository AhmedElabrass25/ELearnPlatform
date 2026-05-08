import { apiFetch } from "@/lib/api-client";

/**
 * Get all users (Admin only)
 */
export async function getAllUsers(page: number = 1, limit: number = 5) {
  const response = await apiFetch(`/api/v1/users?page=${page}&limit=${limit}`, {
    method: "GET",
  });
  return response
}
