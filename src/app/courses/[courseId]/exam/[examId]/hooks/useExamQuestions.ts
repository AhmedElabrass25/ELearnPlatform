"use client";

import { useState, useEffect } from "react";
import { getExamQuestions } from "@/services/exams.service";

export const useExamQuestions = (examId: string, attemptState: string) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await getExamQuestions(examId);
      setQuestions(res);
    } catch (error: any) {
      setError(error.message || "حدث خطأ أثناء تحميل الأسئلة");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (attemptState === "in_progress" && questions.length === 0) {
      loadQuestions();
    }
  }, [attemptState, questions.length]);

  return { questions, isLoading, error, loadQuestions };
};
