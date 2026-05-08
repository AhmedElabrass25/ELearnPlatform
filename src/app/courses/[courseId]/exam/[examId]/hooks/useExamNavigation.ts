"use client";

import { useState } from "react";

export const useExamNavigation = (questionsCount: number) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if (currentQuestionIndex < questionsCount - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return {
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    setCurrentQuestionIndex,
  };
};
