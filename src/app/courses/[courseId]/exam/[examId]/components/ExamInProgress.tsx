import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight, ChevronLeft, Timer, Loader2, AlertTriangle } from "lucide-react";
import { Exam, Question } from "@/types";

interface ExamInProgressProps {
    exam: Exam;
    questions: Question[];
    currentQuestionIndex: number;
    answers: Record<string, number>;
    timeLeft: number;
    isLoading: boolean;
    error?: string | null;
    onAnswerSelect: (qId: string, idx: number) => void;
    onPrevQuestion: () => void;
    onNextQuestion: () => void;
    onSubmit: () => void;
    onNavigateQuestion: (idx: number) => void;
}

export function ExamInProgress({
    exam,
    questions,
    currentQuestionIndex,
    answers,
    timeLeft,
    isLoading,
    error,
    onAnswerSelect,
    onPrevQuestion,
    onNextQuestion,
    onSubmit,
    onNavigateQuestion
}: ExamInProgressProps) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            {/* Header with info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
                        {exam.title}
                    </h1>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        سؤال {currentQuestionIndex + 1} من {questions.length}
                    </Badge>
                </div>
                
                <div className={`flex items-center gap-3 px-4 py-2 rounded-full border-2 ${timeLeft < 120 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-card border-border'}`}>
                    <Timer className="w-5 h-5" />
                    <span className="text-xl font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
            </div>

            <Progress value={progress} className="h-2 mb-8" />

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-bold">{error}</p>
                </div>
            )}

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
                                {currentQuestion.text || currentQuestion.questionText}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-3 pt-4">
                                {currentQuestion.type === 'true-false' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {['صح', 'خطأ'].map((label, idx) => {
                                            const qId = (currentQuestion as any)._id || currentQuestion.id;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => onAnswerSelect(qId, idx)}
                                                    className={`p-6 text-xl font-bold rounded-2xl border-2 transition-all flex items-center justify-center gap-4 ${
                                                        answers[qId] === idx
                                                            ? 'bg-primary/10 border-primary text-primary shadow-inner'
                                                            : 'bg-card border-border hover:border-primary/50 text-muted-foreground'
                                                    }`}
                                                >
                                                    {label}
                                                    {answers[qId] === idx && <CheckCircle2 className="w-6 h-6" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {(currentQuestion.options || []).map((option, idx) => {
                                            const qId = (currentQuestion as any)._id || currentQuestion.id;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => onAnswerSelect(qId, idx)}
                                                    className={`w-full p-4 md:p-5 text-right rounded-xl border-2 transition-all flex items-center gap-4 group ${
                                                        answers[qId] === idx
                                                            ? 'bg-primary/10 border-primary text-primary shadow-inner'
                                                            : 'bg-card border-border hover:border-primary/50 text-muted-foreground'
                                                    }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold transition-colors shrink-0 ${
                                                        answers[qId] === idx
                                                            ? 'bg-primary border-primary text-white'
                                                            : 'border-border group-hover:border-primary/50 group-hover:text-primary'
                                                    }`}>
                                                        {String.fromCharCode(65 + idx)}
                                                    </div>
                                                    <span className="text-lg font-medium flex-1">{typeof option === 'string' ? option : option.text}</span>
                                                    {answers[qId] === idx && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t p-6 bg-muted/20">
                            <Button 
                                variant="outline" 
                                onClick={onPrevQuestion} 
                                disabled={currentQuestionIndex === 0 || isLoading}
                                className="h-11 px-6 font-bold"
                            >
                                <ChevronRight className="w-5 h-5 ml-2" />
                                السابق
                            </Button>

                            {currentQuestionIndex === questions.length - 1 ? (
                                <Button 
                                    onClick={onSubmit} 
                                    disabled={isLoading}
                                    className="h-11 px-8 font-bold text-white bg-green-600 hover:bg-green-700"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-4" /> : "إنهاء وتسليم الاختبار"}
                                </Button>
                            ) : (
                                <Button 
                                    onClick={onNextQuestion} 
                                    className="h-11 px-8 font-bold text-white"
                                    disabled={answers[(currentQuestion as any)._id || currentQuestion.id] === undefined || isLoading}
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
                {questions.map((q, idx) => {
                    const qId = (q as any)._id || q.id;
                    return (
                        <button
                            key={qId || idx}
                            onClick={() => onNavigateQuestion(idx)}
                            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold transition-all ${
                                currentQuestionIndex === idx
                                    ? 'bg-primary border-primary text-white'
                                    : answers[qId] !== undefined
                                    ? 'bg-primary/10 border-primary/30 text-primary'
                                    : 'bg-card border-border text-muted-foreground'
                            }`}
                        >
                            {idx + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
