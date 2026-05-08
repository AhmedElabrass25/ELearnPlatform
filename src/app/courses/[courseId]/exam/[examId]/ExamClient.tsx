"use client";

import { Loader2 } from "lucide-react";
import { ExamIntro } from "./components/ExamIntro";
import { ExamSubmitted } from "./components/ExamSubmitted";
import { ExamInProgress } from "./components/ExamInProgress";
import { useExamAttempt } from "./hooks/useExamAttempt";

interface ExamClientProps {
    exam: any;
    courseId: string;
    initialAttempt: any;
}

export default function ExamClient({ exam, courseId, initialAttempt }: ExamClientProps) {
    const {
        attemptState,
        questions,
        currentQuestionIndex,
        answers,
        score,
        totalPossibleScore,
        timeLeft,
        isLoading,
        error,
        handleStartExam,
        handleAnswerSelect,
        nextQuestion,
        prevQuestion,
        handleSubmit,
        setCurrentQuestionIndex
    } = useExamAttempt(exam, initialAttempt);

    if (attemptState === "not_started") {
        return <ExamIntro exam={exam} isLoading={isLoading} error={error} onStartExam={handleStartExam} />;
    }

    if (attemptState === "submitted") {
        return <ExamSubmitted score={score} totalPossibleScore={totalPossibleScore} courseId={courseId}
         />;
    }

    if (questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-lg font-medium animate-pulse">جاري تحميل الأسئلة...</p>
            </div>
        );
    }

    return (
        <ExamInProgress 
            exam={exam}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            timeLeft={timeLeft}
            isLoading={isLoading}
            onAnswerSelect={handleAnswerSelect}
            onPrevQuestion={prevQuestion}
            onNextQuestion={nextQuestion}
            onSubmit={handleSubmit}
            onNavigateQuestion={setCurrentQuestionIndex}
        />
    );
}
