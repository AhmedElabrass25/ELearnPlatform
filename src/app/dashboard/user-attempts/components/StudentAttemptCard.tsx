"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, Trophy, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface StudentAttemptCardProps {
    attempt: {
        _id: string;
        studentId: {
            fullName: string;
            phone: string;
        };
        score: number;
        totalScore?: number;
        status: string;
        submittedAt?: string;
        startedAt?: string;
    };
}

export function StudentAttemptCard({ attempt }: StudentAttemptCardProps) {
    const { studentId, score, totalScore = 100, status, submittedAt, startedAt } = attempt;
    
    const isCompleted = status === "submitted" || status === "auto_submitted";
    const statusColor = isCompleted ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50";
    
    return (
        <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-4">
                    {/* Student Info */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User size={22} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{studentId?.fullName || "طالب بدون اسم"}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                                <Phone size={14} />
                                <span dir="ltr">{studentId?.phone || "بدون رقم"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Score & Status */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-8">
                        <div className="flex flex-col items-center px-4 py-2 bg-muted/30 rounded-xl">
                            <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                <Trophy size={12} className="text-amber-500" />
                                الدرجة
                            </span>
                            <span className="font-bold text-xl text-primary">
                                {score} <span className="text-sm font-medium text-muted-foreground">/ {totalScore}</span>
                            </span>
                        </div>

                        <div className="flex flex-col min-w-[120px]">
                            <span className="text-xs text-muted-foreground mb-1.5">الحالة</span>
                            <div className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit ${statusColor}`}>
                                {isCompleted ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                {status === "submitted" ? "تم التسليم" : 
                                 status === "auto_submitted" ? "تسليم تلقائي" : 
                                 status === "in_progress" ? "قيد الحل" : status}
                            </div>
                        </div>

                        {(submittedAt || startedAt) && (
                            <div className="flex flex-col text-sm">
                                <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                    <Clock size={12} />
                                    التوقيت
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    {submittedAt ? new Date(submittedAt).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }) : 
                                     startedAt ? `بدأ: ${new Date(startedAt).toLocaleTimeString('ar-EG', { timeStyle: 'short' })}` : "-"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
