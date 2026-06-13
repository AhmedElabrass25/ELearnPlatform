import { useState, useEffect, useRef } from "react";

export const useExamTimer = (
  duration: number,
  attemptState: string,
  onTimeUp: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  // Use a ref for the callback to avoid re-starting the timer when onTimeUp changes
  const onTimeUpRef = useRef(onTimeUp);
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (attemptState !== "in_progress" || isTimeUp || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attemptState, isTimeUp]);

  // Separate effect to trigger the callback when timeLeft hits 0
  useEffect(() => {
    if (timeLeft === 0 && !isTimeUp && attemptState === "in_progress") {
      setIsTimeUp(true);
      onTimeUpRef.current();
    }
  }, [timeLeft, isTimeUp, attemptState]);

  return { timeLeft, isTimeUp };
};
