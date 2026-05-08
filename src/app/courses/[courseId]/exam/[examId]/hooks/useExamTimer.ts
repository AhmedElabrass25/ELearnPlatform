"use client";

import { useState, useEffect } from "react";

export const useExamTimer = (
  duration: number,
  attemptState: string,
  onTimeUp: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (attemptState !== "in_progress" || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attemptState, isTimeUp, onTimeUp]);

  return { timeLeft, isTimeUp };
};
