import { apiFetch } from "@/lib/api-client";
import { Path, Course } from "@/types";

/**
 * Get all tracks
 */
export async function getTracks(): Promise<Path[]> {
  const response = await apiFetch<any>("/api/v1/tracks");
  return response?.data || [];
}

/**
 * Get track details by ID
 */
export async function getTrackById(trackId: string): Promise<Path> {
  const response = await apiFetch<any>(`/api/v1/tracks/${trackId}`);
  return response?.data;
}

/**
 * Get courses within a track
 */
export async function getTrackCourses(trackId: string): Promise<Course[]> {
  const response = await apiFetch<any>(`/api/v1/tracks/${trackId}/courses`);
  return response?.data || [];
}

/**
 * Create a new track
 */
export async function createTrack(formData: FormData) {
  const response = await apiFetch("/api/v1/tracks", {
    method: "POST",
    body: formData,
  });
  return response?.data;
}

/**
 * Update an existing track
 */
export async function updateTrack(trackId: string, formData: FormData) {
  const response = await apiFetch(`/api/v1/tracks/${trackId}`, {
    method: "PUT",
    body: formData,
  });
  return response?.data;
}

/**
 * Delete a track
 */
export async function deleteTrack(trackId: string) {
  const response = await apiFetch(`/api/v1/tracks/${trackId}`, {
    method: "DELETE",
  });
  return response?.data;
}
