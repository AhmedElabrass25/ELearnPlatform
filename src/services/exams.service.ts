import { apiFetch } from "@/lib/api-client";
import { Exam } from "@/types";

/**
 * Get all exams (Admin only)
 */
export async function getAllExams() {
  const response = await apiFetch(`/api/v1/exams`);
  return response?.data;
}


/**
 * Create an exam inside a week
 */
export async function createExamInWeek(
  weekId: string,
  data: { title: string; duration: number; availableFrom?: string; availableUntil?: string; isPublished?: boolean }
) {
  const response = await apiFetch(`/api/v1/weeks/${weekId}/exams`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response?.data;
}

/**
 * Update an exam (title only)
 */
export async function updateExam(
  examId: string,
  data: { title?: string; duration?: number; availableFrom?: string; availableUntil?: string; isPublished?: boolean }
) {
  const response = await apiFetch(`/api/v1/exams/${examId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response?.data;
}

/**
 * Delete an exam
 */
export async function deleteExam(examId: string) {
  const response = await apiFetch(`/api/v1/exams/${examId}`, {
    method: "DELETE",
  });
  return response?.data;
}

// --- Student Endpoints ---

export async function getExamsByWeek(weekId: string) {
  const response = await apiFetch(`/api/v1/weeks/${weekId}/exams`);
  return response?.data;
}

export async function getExamsByCourse(courseId: string) {
  const response = await apiFetch(`/api/v1/courses/${courseId}/exams`);
  console.log(response)
  return response?.data;
}

export async function getExamQuestions(examId: string) {
  const response = await apiFetch(`/api/v1/exams/${examId}/questions`);
  console.log(response)
  return response?.data;
}

export async function startExamAttempt(examId: string) {
  const response = await apiFetch(`/api/v1/exams/${examId}/attempts/start`, {
    method: "POST",
  });
  console.log(response)
  return response?.data;
}

export async function submitExamAttempt(examId: string, payload: { answers: { questionId: string; selectedOption: number }[] }) {
  const response = await apiFetch(`/api/v1/exams/${examId}/attempts/submit`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  console.log(response)
  return response?.data;
}

export async function getMyExamAttempt(examId: string) {
  const response = await apiFetch(`/api/v1/exams/${examId}/attempts/my`);
  console.log(response)
  return response?.data;
}

/**
 * Get all exam attempts for the current user
 */
export async function getMyAllAttempts() {
  const response = await apiFetch(`/api/v1/exams/attempts/my`);
  return response?.data;
}

export async function getAdminExamAttempts(examId: string) {
  const response = await apiFetch(`/api/v1/exams/${examId}/attempts`);
  console.log(response)
  return response?.data;
}
