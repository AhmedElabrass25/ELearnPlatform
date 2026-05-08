import { apiFetch } from "@/lib/api-client";
import { Question } from "@/types";

/**
 * Get all questions for an exam
 */
export async function getExamQuestions(examId: string): Promise<Question[]> {
  const response = await apiFetch<any>(`/api/v1/exams/${examId}/questions`);
  return response?.data || [];
}

/**
 * Create a question in an exam
 */
export async function createQuestion(
  examId: string,
  data: { questionText: string; options: { text: string; isCorrect: boolean }[]; mark: number }
) {
  const response = await apiFetch(`/api/v1/exams/${examId}/questions`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response?.data;
}

/**
 * Get a single question
 */
export async function getQuestion(examId: string, questionId: string): Promise<Question> {
  const response = await apiFetch<any>(`/api/v1/exams/${examId}/questions/${questionId}`);
  return response?.data;
}

/**
 * Update a question
 */
export async function updateQuestion(
  examId: string,
  questionId: string,
  data: { questionText?: string; options?: { text: string; isCorrect: boolean }[]; mark?: number }
) {
  const response = await apiFetch(`/api/v1/exams/${examId}/questions/${questionId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response?.data;
}

/**
 * Delete a question
 */
export async function deleteQuestion(examId: string, questionId: string) {
  const response = await apiFetch(`/api/v1/exams/${examId}/questions/${questionId}`, {
    method: "DELETE",
  });
  return response?.data;
}
