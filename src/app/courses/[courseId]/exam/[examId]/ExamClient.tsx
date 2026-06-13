"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle, LogOut, ArrowLeft } from "lucide-react";
import { ExamIntro } from "./components/ExamIntro";
import { ExamSubmitted } from "./components/ExamSubmitted";
import { ExamInProgress } from "./components/ExamInProgress";
import { useExamAttempt } from "./hooks/useExamAttempt";
import { Button } from "@/components/ui/button";
import { Exam } from "@/types";

interface ExamClientProps {
    exam: Exam;
    courseId: string;
    initialAttempt: any;
}

export default function ExamClient({ exam, courseId, initialAttempt }: ExamClientProps) {
    const router = useRouter();
    const [showLeaveWarning, setShowLeaveWarning] = useState(false);
    const [isSubmittingAndLeaving, setIsSubmittingAndLeaving] = useState(false);
    const pendingNavRef = useRef<string | null>(null);

    const {
        attemptState,
        questions,
        currentQuestionIndex,
        answers,
        score,
        totalPossibleScore,
        resultData,
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

    // Block browser-level navigation (refresh/close tab)
    useEffect(() => {
        if (attemptState !== "in_progress") return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [attemptState]);

    // Intercept all <a> link clicks for Next.js client navigation
    useEffect(() => {
        if (attemptState !== "in_progress") return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");
            if (!link || !link.href) return;

            try {
                const url = new URL(link.href);
                // Only intercept same-origin navigation to a different path
                if (
                    url.origin === window.location.origin &&
                    url.pathname !== window.location.pathname
                ) {
                    e.preventDefault();
                    e.stopPropagation();
                    pendingNavRef.current = url.pathname;
                    setShowLeaveWarning(true);
                }
            } catch {
                // ignore invalid URLs
            }
        };

        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    }, [attemptState]);

    const handleLeaveConfirm = async () => {
        setIsSubmittingAndLeaving(true);
        try {
            await handleSubmit();
        } finally {
            setIsSubmittingAndLeaving(false);
            setShowLeaveWarning(false);
            if (pendingNavRef.current) {
                router.push(pendingNavRef.current);
            }
        }
    };

    const handleLeaveCancel = () => {
        setShowLeaveWarning(false);
        pendingNavRef.current = null;
    };

    return (
        <>
            {/* Leave Warning Modal */}
            {showLeaveWarning && (
                <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-amber-500" />
                            </div>
                            <h2 className="text-2xl font-bold">تحذير! الاختبار جاري</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                إذا غادرت الصفحة الآن، سيتم <strong className="text-foreground">تقديم إجاباتك الحالية تلقائياً</strong> وعرض النتيجة.
                                لا يمكنك العودة والتعديل بعد ذلك.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-8">
                            <Button
                                variant="outline"
                                className="flex-1 h-12 rounded-xl font-bold"
                                onClick={handleLeaveCancel}
                                disabled={isSubmittingAndLeaving}
                            >
                                <ArrowLeft className="w-4 h-4 ml-2" />
                                العودة للاختبار
                            </Button>
                            <Button
                                className="flex-1 h-12 rounded-xl font-bold bg-red-500 hover:bg-red-600 text-white"
                                onClick={handleLeaveConfirm}
                                disabled={isSubmittingAndLeaving}
                            >
                                {isSubmittingAndLeaving ? (
                                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                                ) : (
                                    <LogOut className="w-4 h-4 ml-2" />
                                )}
                                {isSubmittingAndLeaving ? "جاري التقديم..." : "تقديم والمغادرة"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Exam States */}
            {attemptState === "not_started" && (
                <ExamIntro exam={exam} isLoading={isLoading} error={error} onStartExam={handleStartExam} />
            )}

            {attemptState === "submitted" && (
                <ExamSubmitted 
                    score={score} 
                    totalPossibleScore={totalPossibleScore} 
                    courseId={courseId} 
                    resultData={resultData}
                    questions={questions}
                />
            )}

            {attemptState === "in_progress" && questions.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-lg font-medium animate-pulse">جاري تحميل الأسئلة...</p>
                </div>
            )}

            {attemptState === "in_progress" && questions.length > 0 && (
                <>
                    {/* Auto-submission Overlay */}
                    {timeLeft === 0 && (
                        <div className="fixed inset-0 z-[150] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
                            <div className="flex flex-col items-center gap-6 text-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                                    <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black mb-2">انتهى الوقت!</h2>
                                    <p className="text-xl text-muted-foreground font-medium">جاري حفظ إجاباتك وإغلاق الاختبار تلقائياً...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <ExamInProgress
                        exam={exam}
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        answers={answers}
                        timeLeft={timeLeft}
                        isLoading={isLoading}
                        error={error}
                        onAnswerSelect={handleAnswerSelect}
                        onPrevQuestion={prevQuestion}
                        onNextQuestion={nextQuestion}
                        onSubmit={handleSubmit}
                        onNavigateQuestion={setCurrentQuestionIndex}
                    />
                </>
            )}
        </>
    );
}
