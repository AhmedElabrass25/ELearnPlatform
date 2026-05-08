"use client";

import React from "react";
import { Trash2, Edit3, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types";

interface QuestionCardProps {
    question: Question;
    index: number;
    onEdit: (q: Question) => void;
    onDelete: (q: Question) => void;
}

export function QuestionCard({ question, index, onEdit, onDelete }: QuestionCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3 group hover:border-primary/30 hover:shadow-sm transition-all">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">
                        {index + 1}
                    </div>
                    <p className="font-semibold text-sm leading-relaxed">{question.questionText}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <Badge variant="outline" className="text-xs font-bold border-amber-300 text-amber-600 bg-amber-50 dark:bg-amber-950/20">
                        {question.mark} درجة
                    </Badge>
                    <Button
                        variant="ghost" size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => onEdit(question)}
                        title="تعديل نص السؤال"
                    >
                        <Edit3 size={14} />
                    </Button>
                    <Button
                        variant="ghost" size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => onDelete(question)}
                        title="حذف السؤال"
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            </div>

            {/* Options grid */}
            {question.options?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-11">
                    {question.options.map((opt, i) => (
                        <div
                            key={opt._id || opt.id || i}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-colors ${
                                opt.isCorrect
                                    ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold dark:bg-emerald-950/30 dark:border-emerald-700 dark:text-emerald-400"
                                    : "bg-muted/40 border-border text-muted-foreground"
                            }`}
                        >
                            {opt.isCorrect
                                ? <CheckCircle2 size={14} className="flex-shrink-0 text-emerald-500" />
                                : <Circle size={14} className="flex-shrink-0" />
                            }
                            <span className="truncate">{opt.text}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
