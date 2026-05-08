import { apiFetch } from "@/lib/api-client";
import { Course } from "@/types";

/**
 * Get all courses
 */
export async function getAllCourses(): Promise<Course[]> {
  const response = await apiFetch<any>("/api/v1/courses");
  console.log(response);
  return response?.data;  
}

/**
 * Get course details by ID
 */
export async function getCourseById(courseId: string): Promise<Course> {
  const response = await apiFetch<any>(`/api/v1/courses/${courseId}`);
  console.log(response);
  return response?.data; 
}

/**
 * Create a new course in a track
 */
export async function createCourseInTrack(trackId: string, formData: FormData) {
  const response = await apiFetch(`/api/v1/tracks/${trackId}/courses`, {
    method: "POST",
    body: formData,
  });
  return response.data;
}

/**
 * Update an existing course
 */
export async function updateCourse(courseId: string, formData: FormData) {
  const response = await apiFetch(`/api/v1/courses/${courseId}`, {
    method: "PUT",
    body: formData,
  });
  return response?.data;
}

/**
 * Delete a course
 */
export async function deleteCourse(courseId: string) {
  const response = await apiFetch(`/api/v1/courses/${courseId}`, {
    method: "DELETE",
  });
  return response?.data;
}
