"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Exam, Question } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight, ChevronLeft, Clock, Timer, AlertCircle, Trophy, Home, RotateCcw } from "lucide-react";
import Link from "next/link";

interface ExamClientProps {
    exam: Exam;
    courseId: string;
}

export default function ExamClient({ exam, courseId }: ExamClientProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes default
    const [isTimeUp, setIsTimeUp] = useState(false);

    const questions = exam.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    useEffect(() => {
        if (isSubmitted || isTimeUp) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    autoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isSubmitted, isTimeUp]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleAnswerSelect = (questionId: string, answer: any) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        let totalScore = 0;
        questions.forEach((q) => {
            const userAnswer = answers[q.id];
            if (q.type === 'true-false') {
                if (userAnswer === q.correctAnswer) {
                    totalScore += q.score;
                }
            } else if (q.type === 'mcq' || q.type === 'single-select') {
                if (userAnswer === q.correctAnswer) {
                    totalScore += q.score;
                }
            }
        });
        return totalScore;
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setIsSubmitted(true);
    };

    const autoSubmit = () => {
        setIsTimeUp(true);
        handleSubmit();
    };

    const totalPossibleScore = questions.reduce((acc, q) => acc + q.score, 0);
    const percentage = (score / totalPossibleScore) * 100;

    if (isSubmitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto space-y-8 py-12"
            >
                <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
                    <div className="h-2 bg-primary" />
                    <CardHeader className="text-center pb-2">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-bold">اكتمل الاختبار!</CardTitle>
                        <CardDescription className="text-lg">لقد أتممت بالإجابة على جميع الأسئلة</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/50 p-6 rounded-2xl">
                                <p className="text-sm text-muted-foreground mb-1">نقاطك</p>
                                <p className="text-4xl font-black text-primary">{score} / {totalPossibleScore}</p>
                            </div>
                            <div className="bg-muted/50 p-6 rounded-2xl">
                                <p className="text-sm text-muted-foreground mb-1">النسبة</p>
                                <p className="text-4xl font-black text-primary">{Math.round(percentage)}%</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-bold">
                                <span>النتيجة الإجمالية</span>
                                <span>{Math.round(percentage)}%</span>
                            </div>
                            <Progress value={percentage} className="h-3" />
                        </div>

                        {percentage >= 50 ? (
                            <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center gap-3 justify-center">
                                <CheckCircle2 className="w-6 h-6" />
                                <p className="font-bold">أحسنت! لقد اجتزت الاختبار بنجاح.</p>
                            </div>
                        ) : (
                            <div className="p-4 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 flex items-center gap-3 justify-center">
                                <AlertCircle className="w-6 h-6" />
                                <p className="font-bold">يمكنك المذاكرة أكثر والمحاولة مرة أخرى.</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex gap-4 justify-center pb-8">
                        <Button variant="outline" className="h-12 px-6 font-bold" onClick={() => window.location.reload()}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            إعادة الاختبار
                        </Button>
                        <Button className="h-12 px-8 font-bold text-white" asChild>
                            <Link href={`/courses/${courseId}`}>
                                العودة للدورة
                                <Home className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            {/* Header with info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            سؤال {currentQuestionIndex + 1} من {questions.length}
                        </Badge>
                        {exam.title}
                    </h1>
                </div>
                
                <div className={`flex items-center gap-3 px-4 py-2 rounded-full border-2 ${timeLeft < 120 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-card border-border'}`}>
                    <Timer className="w-5 h-5" />
                    <span className="text-xl font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
            </div>

            <Progress value={progress} className="h-2 mb-8" />

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="border-2 shadow-lg min-h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl leading-relaxed">
                                {currentQuestion.text}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-3 pt-4">
                                {currentQuestion.type === 'true-false' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[true, false].map((val) => (
                                            <button
                                                key={String(val)}
                                                onClick={() => handleAnswerSelect(currentQuestion.id, val)}
                                                className={`p-6 text-xl font-bold rounded-2xl border-2 transition-all flex items-center justify-center gap-4 ${
                                                    answers[currentQuestion.id] === val
                                                        ? 'bg-primary/10 border-primary text-primary shadow-inner'
                                                        : 'bg-card border-border hover:border-primary/50 text-muted-foreground'
                                                }`}
                                            >
                                                {val === true ? 'صح' : 'خطأ'}
                                                {answers[currentQuestion.id] === val && <CheckCircle2 className="w-6 h-6" />}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {currentQuestion.options?.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                                                className={`w-full p-4 md:p-5 text-right rounded-xl border-2 transition-all flex items-center gap-4 group ${
                                                    answers[currentQuestion.id] === option
                                                        ? 'bg-primary/10 border-primary text-primary shadow-inner'
                                                        : 'bg-card border-border hover:border-primary/50 text-muted-foreground'
                                                }`}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold transition-colors ${
                                                    answers[currentQuestion.id] === option
                                                        ? 'bg-primary border-primary text-white'
                                                        : 'border-border group-hover:border-primary/50 group-hover:text-primary'
                                                }`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className="text-lg font-medium flex-1">{option}</span>
                                                {answers[currentQuestion.id] === option && <CheckCircle2 className="w-5 h-5" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t p-6 bg-muted/20">
                            <Button 
                                variant="outline" 
                                onClick={prevQuestion} 
                                disabled={currentQuestionIndex === 0}
                                className="h-11 px-6 font-bold"
                            >
                                <ChevronRight className="w-5 h-5 ml-2" />
                                السابق
                            </Button>

                            {currentQuestionIndex === questions.length - 1 ? (
                                <Button 
                                    onClick={handleSubmit} 
                                    className="h-11 px-8 font-bold text-white bg-green-600 hover:bg-green-700"
                                >
                                    إنهاء وتسليم الاختبار
                                </Button>
                            ) : (
                                <Button 
                                    onClick={nextQuestion} 
                                    className="h-11 px-8 font-bold text-white"
                                    disabled={!answers[currentQuestion.id]}
                                >
                                    التالي
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Summary */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
                {questions.map((q, idx) => (
                    <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold transition-all ${
                            currentQuestionIndex === idx
                                ? 'bg-primary border-primary text-white'
                                : answers[q.id]
                                ? 'bg-primary/10 border-primary/30 text-primary'
                                : 'bg-card border-border text-muted-foreground'
                        }`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
