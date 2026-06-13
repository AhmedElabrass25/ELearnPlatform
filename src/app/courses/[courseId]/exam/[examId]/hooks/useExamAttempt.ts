"use client";
import { useState, useCallback } from "react";
import { startExamAttempt, submitExamAttempt, getMyExamAttempt } from "@/services/exams.service";
import { useExamTimer } from "./useExamTimer";
import { useExamQuestions } from "./useExamQuestions";
import { useExamNavigation } from "./useExamNavigation";
import { Exam, Question } from "@/types";

export const useExamAttempt = (exam: Exam, initialAttempt: any) => {
    const attemptData = Array.isArray(initialAttempt) ? initialAttempt[0] : initialAttempt;
        const status = attemptData?.status?.toLowerCase()?.replace(/\s/g, "");
    const isInitiallySubmitted =
        status === "submit" ||
        status === "submitted" ||
        status === "auto_submitted" ||
        status === "completed" ||
        status === "done" ||
        attemptData?.isCompleted === true;
    const isInitiallyInProgress = 
        status === "in_progress" || 
        status === "inprogress" || 
        status === "started";

    let initialStatus: "not_started" | "in_progress" | "submitted" = "not_started";
    if (isInitiallySubmitted) {
        initialStatus = "submitted";
    } else if (isInitiallyInProgress) {
        initialStatus = "in_progress";
    }

    const [attemptState, setAttemptState] = useState<"not_started" | "in_progress" | "submitted">(initialStatus);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [resultData, setResultData] = useState<any>(attemptData);
    const [score, setScore] = useState(
        attemptData?.score ?? attemptData?.result ?? attemptData?.grade ?? 0
    );
    const [totalPossibleScore, setTotalPossibleScore] = useState(
        attemptData?.totalScore || attemptData?.totalMarks || exam?.totalMarks || 0
    );
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    const { questions, isLoading: isQuestionsLoading, error: questionsError } = useExamQuestions((exam._id || exam.id) as string, attemptState);
    const { currentQuestionIndex, nextQuestion, prevQuestion, setCurrentQuestionIndex } = useExamNavigation(questions.length);
    
    const handleSubmit = useCallback(async () => {
        setIsActionLoading(true);
        setActionError(null);
        try {
            const targetExamId = (exam._id || exam.id) as string;
            let currentQuestions = questions;
            
            // If questions haven't loaded yet, try to load them now so we can submit correctly
            if (currentQuestions.length === 0) {
                try {
                    const { getExamQuestions } = await import("@/services/exams.service");
                    currentQuestions = await getExamQuestions(targetExamId);
                } catch (e) {
                    console.error("Could not fetch questions for submission", e);
                }
            }

            // Ensure we send all questions to satisfy backend 'must have at least one answer'
            // Use 999 for unselected options to satisfy 'must be 0 or greater' while being incorrect
            const finalAnswers = currentQuestions.map(q => {
                const qId = q._id || q.id;
                return {
                    questionId: qId,
                    selectedOption: answers[qId] !== undefined ? answers[qId] : 999
                };
            });

            // If we still have no questions, we can't satisfy the backend's "at least one answer" rule
            // unless we send a dummy answer (not recommended but may be necessary)
            if (finalAnswers.length === 0) {
                throw new Error("لا يمكن تسليم اختبار بدون أسئلة. يرجى التأكد من تحميل الأسئلة.");
            }

            const payload = {
                answers: finalAnswers
            };
            
            console.log("[ExamSubmission] Sending payload:", JSON.stringify(payload, null, 2));
            const freshResult = await submitExamAttempt(targetExamId, payload);
            console.log("[ExamSubmission] Success! Response:", JSON.stringify(freshResult, null, 2));
            
            setResultData(freshResult);
            setScore(freshResult?.score ?? freshResult?.result ?? freshResult?.grade ?? 0);
            
            const computedTotal = freshResult?.totalScore || freshResult?.totalPoints || exam?.totalMarks || 0;
            setTotalPossibleScore(computedTotal);
            
            console.log("[ExamSubmission] Transitioning to 'submitted' state");
            setAttemptState("submitted");
        } catch (error: any) {
            console.error("[ExamSubmission] Failed!", error);
            setActionError(error.message || "حدث خطأ أثناء تقديم الاختبار");
        } finally {
            setIsActionLoading(false);
        }
    }, [exam._id, exam.id, exam.totalMarks, answers, questions]);

    const { timeLeft } = useExamTimer(exam.duration || 0, attemptState, handleSubmit);

    const handleStartExam = useCallback(async () => {
        setIsActionLoading(true);
        setActionError(null);
        try {
            const targetExamId = (exam._id || exam.id) as string;
            await startExamAttempt(targetExamId);
            setAttemptState("in_progress");
        } catch (err: any) {
            const errMsg = (err.message || "").toLowerCase();
            if (errMsg.includes("already") || errMsg.includes("active") || errMsg.includes("started")) {
                setAttemptState("in_progress");
            } else {
                setActionError(err.message || "حدث خطأ أثناء بدء الاختبار");
            }
        } finally {
            setIsActionLoading(false);
        }
    }, [exam._id, exam.id]);

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
        resultData,
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
