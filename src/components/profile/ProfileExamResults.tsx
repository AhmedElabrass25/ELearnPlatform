"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock, CheckCircle2, AlertCircle, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ExamAttempt {
    _id: string;
    examId: {
        _id: string;
        title: string;
        questionsCount?: number;
        totalMarks?: number;
    } | string;
    score: number;
    totalScore?: number;
    status: string;
    submittedAt?: string;
    createdAt?: string;
}

interface ProfileExamResultsProps {
    attempts: ExamAttempt[];
}

export function ProfileExamResults({ attempts }: ProfileExamResultsProps) {
    if (!attempts || attempts.length === 0) {
        return (
            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                    <Trophy size={40} className="mb-4 opacity-20" />
                    <p>لم تقم بتأدية أي اختبارات بعد</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Trophy size={20} className="text-primary" />
                    نتائج الاختبارات
                </h3>
                <span className="text-sm text-muted-foreground">
                    إجمالي الاختبارات: {attempts.length}
                </span>
            </div>

            <div className="grid gap-3">
                {attempts.map((attempt) => {
                    const exam = typeof attempt.examId === 'string' ? { title: "اختبار", _id: attempt.examId } : attempt.examId;
                    const isCompleted = attempt.status === "submitted" || attempt.status === "auto_submitted";
                    const statusColor = isCompleted ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50";

                    return (
                        <Card key={attempt._id} className="overflow-hidden hover:shadow-md transition-all duration-300 border-s-4 border-s-primary">
                            <CardContent className="p-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                            <FileText size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base">{exam.title}</h4>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {attempt.submittedAt || attempt.createdAt 
                                                        ? new Date(attempt.submittedAt || attempt.createdAt!).toLocaleDateString('ar-EG', { dateStyle: 'long' }) 
                                                        : "-"}
                                                </span>
                                                {exam.questionsCount && (
                                                    <span className="flex items-center gap-1">
                                                        <FileText size={12} />
                                                        {exam.questionsCount} سؤال
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">الدرجة</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-bold text-primary">{attempt.score}</span>
                                                <span className="text-xs text-muted-foreground">/ {attempt.totalScore || 100}</span>
                                            </div>
                                        </div>

                                        <div className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${statusColor}`}>
                                            {isCompleted ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                            {attempt.status === "submitted" ? "تم التسليم" : 
                                             attempt.status === "auto_submitted" ? "تلقائي" : "قيد الحل"}
                                        </div>
                                        
                                        <ChevronRight size={16} className="text-muted-foreground/30 hidden sm:block" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
