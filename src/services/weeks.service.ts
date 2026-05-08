import { apiFetch } from "@/lib/api-client";
import { Week, Lesson, Exam, Material } from "@/types";

/**
 * Get Course Weeks
 */
export async function getCourseWeeks(courseId: string): Promise<Week[]> {
  const response = await apiFetch<any>(`/api/v1/courses/${courseId}/weeks`);
  return response?.data;
}

/**
 * Add Week to Course
 */
export async function addWeekToCourse(courseId: string, data: { title: string; description: string;}) {
  const response = await apiFetch(`/api/v1/courses/${courseId}/weeks`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response?.data;
}

/**
 * Update Week
 */
export async function updateWeek(weekId: string, data: { title?: string; description?: string; order?: number; active?: boolean }) {
  const response = await apiFetch(`/api/v1/weeks/${weekId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response?.data;
}

/**
 * Delete Week
 */
export async function deleteWeek(weekId: string) {
  const response = await apiFetch(`/api/v1/weeks/${weekId}`, {
    method: "DELETE",
  });
  return response?.data;
}

/**
 * Get Week Content (Lessons, Exams, Materials)
 */
export async function getWeekContent(weekId: string) {
  const response = await apiFetch<any>(`/api/v1/weeks/${weekId}/content`);
  return response?.data;
}

/**
 * Add Lesson to Week
 */
export async function addLessonToWeek(weekId: string, formData: FormData) {
  const response = await apiFetch(`/api/v1/weeks/${weekId}/lessons`, {
    method: "POST",
    body: formData,
  });
  return response?.data;
}

/**
 * Update Lesson in Week
 */
export async function updateLessonInWeek(weekId: string, lessonId: string, formData: FormData) {
  const response = await apiFetch(`/api/v1/weeks/${weekId}/lessons/${lessonId}`, {
    method: "PUT",
    body: formData,
  });
  return response?.data;
}

/**
 * Delete Lesson from Week
 */
export async function deleteLessonInWeek(weekId: string, lessonId: string) {
  const response = await apiFetch(`/api/v1/weeks/${weekId}/lessons/${lessonId}`, {
    method: "DELETE",
  });
  return response?.data;
}
export async function getWeekLessons(weekId: string): Promise<Lesson[]> {
  const response = await apiFetch<any>(`/api/v1/weeks/${weekId}/lessons`);
  return response?.data || [];
}
