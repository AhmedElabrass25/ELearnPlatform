"use client";
import { useState } from "react";
import { startExamAttempt, submitExamAttempt } from "@/services/exams.service";
import { useExamTimer } from "./useExamTimer";
import { useExamQuestions } from "./useExamQuestions";
import { useExamNavigation } from "./useExamNavigation";
export const useExamAttempt = (exam: any, initialAttempt: any) => {
    const isInitiallySubmitted = initialAttempt?.status === "submitted" || initialAttempt?.isCompleted || initialAttempt?.score !== undefined;
    const initialStatus = isInitiallySubmitted ? "submitted" : initialAttempt ? "in_progress" : "not_started";
    
    const [attemptState, setAttemptState] = useState<"not_started" | "in_progress" | "submitted">(initialStatus);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [score, setScore] = useState(initialAttempt?.score || 0);
    const [totalPossibleScore, setTotalPossibleScore] = useState(exam?.totalMarks || 0);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    const { questions, isLoading: isQuestionsLoading, error: questionsError } = useExamQuestions(exam._id, attemptState);
    const { currentQuestionIndex, nextQuestion, prevQuestion, setCurrentQuestionIndex } = useExamNavigation(questions.length);
    
    const handleSubmit = async () => {
        setIsActionLoading(true);
        try {
            const payload = {
                answers: Object.entries(answers).map(([qId, idx]) => ({
                    questionId: qId,
                    selectedOption: idx
                }))
            };
            const res = await submitExamAttempt(exam._id, payload);
            const resultData = res?.data || res;
            setScore(resultData?.score || 0);
            
            const computedTotal = resultData?.totalScore || resultData?.totalPoints || exam?.totalMarks || (questions.length > 0 ? questions.reduce((acc: number, q: any) => acc + (q.score || 1), 0) : 0);
            setTotalPossibleScore(computedTotal);
            setAttemptState("submitted");
        } catch (error) {
            console.error("Failed to submit exam", error);
            setActionError("حدث خطأ أثناء تقديم الاختبار");
        } finally {
            setIsActionLoading(false);
        }
    };

    const { timeLeft } = useExamTimer(exam.duration, attemptState, handleSubmit);

    const handleStartExam = async () => {
        setIsActionLoading(true);
        setActionError(null);
        try {
            await startExamAttempt(exam._id);
            setAttemptState("in_progress");
        } catch (err: any) {
            setActionError(err.message || "حدث خطأ أثناء بدء الاختبار");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleAnswerSelect = (questionId: string, optionIndex: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    };

    return {
        attemptState,
        questions,
        currentQuestionIndex,
        answers,
        score,
        totalPossibleScore,
        timeLeft,
        isLoading: isQuestionsLoading || isActionLoading,
        error: questionsError || actionError,
        handleStartExam,
        handleAnswerSelect,
        nextQuestion,
        prevQuestion,
        handleSubmit,
        setCurrentQuestionIndex
    };
};
