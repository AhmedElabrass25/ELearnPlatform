"use client";
import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuestionResultItemProps {
    index: number;
    answer: any;
}

export function QuestionResultItem({ index, answer }: QuestionResultItemProps) {
    const q = answer.question;
    if (!q) return null;

    const isCorrect =
        answer.isCorrect !== undefined
            ? answer.isCorrect
            : q.correctAnswer === answer.selectedOption;

    const getOptionLabel = (option: number, question: any) => {
        if (question.type === "true-false") return option === 0 ? "صح" : "خطأ";
        return question.options?.[option] ?? `الخيار ${option + 1}`;
    };

    const getCorrectLabel = (question: any) => {
        if (question.type === "true-false")
            return question.correctAnswer === 0 || question.correctAnswer === true ? "صح" : "خطأ";
        if (typeof question.correctAnswer === "number" && question.options)
            return question.options[question.correctAnswer];
        return question.correctAnswer;
    };

    return (
        <div className={`flex flex-col gap-2 p-3 rounded-xl border-r-4 bg-muted/20 ${isCorrect ? "border-r-green-500" : "border-r-red-500"}`}>
            <p className="text-sm font-semibold">
                {index + 1}. {q.text || q.questionText}
            </p>
            <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                    {isCorrect
                        ? <CheckCircle2 size={14} className="text-green-500" />
                        : <XCircle size={14} className="text-red-500" />}
                    <span className="text-muted-foreground">إجابة الطالب:</span>
                    <span className="font-medium">{getOptionLabel(answer.selectedOption, q)}</span>
                </div>
                {!isCorrect && (
                    <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span className="text-muted-foreground">الصحيحة:</span>
                        <span className="font-medium text-green-700">{getCorrectLabel(q)}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
