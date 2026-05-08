"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { QuestionResultItem } from "./QuestionResultItem";

interface ExamAttemptDetailsProps {
    attempt: any;
    examTitle: string;
}

export function ExamAttemptDetails({ attempt, examTitle }: ExamAttemptDetailsProps) {
    const [expanded, setExpanded] = useState(false);
    const answers = attempt.answers || [];
    const correctCount = answers.filter((a: any) =>
        a.isCorrect !== undefined ? a.isCorrect : a.question?.correctAnswer === a.selectedOption
    ).length;
    const passed = attempt.score >= ((attempt.totalScore || 10) / 2);

    const formatDate = (d: string) => {
        if (!d) return "";
        return new Date(d).toLocaleDateString("ar-EG", {
            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
        });
    };

    return (
        <div className="rounded-xl border bg-card/50 overflow-hidden transition-all">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-muted/40 transition-colors text-right"
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="font-semibold text-sm truncate">{examTitle}</span>
                    <Badge variant={passed ? "default" : "destructive"} className="shrink-0">
                        {attempt.score}/{attempt.totalScore || "?"}
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden sm:flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(attempt.submittedAt || attempt.createdAt)}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                    <span>{correctCount}/{answers.length} صحيحة</span>
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </button>

            {expanded && (
                <div className="px-4 pb-4 space-y-2 border-t bg-muted/10 pt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    {answers.length === 0 ? (
                        <p className="text-sm text-muted-foreground">لا توجد إجابات مسجلة.</p>
                    ) : (
                        answers.map((answer: any, idx: number) => (
                            <QuestionResultItem key={idx} index={idx} answer={answer} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
