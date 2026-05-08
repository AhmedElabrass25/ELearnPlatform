"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Trophy, FileText } from "lucide-react";
import { ExamAttemptDetails } from "./ExamAttemptDetails";

interface UserAttemptCardProps {
    userName: string;
    userEmail?: string;
    attempts: { attempt: any; examTitle: string }[];
}

export function UserAttemptCard({ userName, userEmail, attempts }: UserAttemptCardProps) {
    const totalScore = attempts.reduce((s, a) => s + (a.attempt.score || 0), 0);
    const totalPossible = attempts.reduce((s, a) => s + (a.attempt.totalScore || 0), 0);
    const percentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

    return (
        <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-3 bg-gradient-to-l from-primary/5 to-transparent">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User size={18} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-base truncate">{userName}</h3>
                            {userEmail && (
                                <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm shrink-0">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <FileText size={14} />
                            <span>{attempts.length} اختبار</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Trophy size={14} className="text-amber-500" />
                            <span className="font-bold text-primary">{percentage}%</span>
                            <span className="text-xs text-muted-foreground">
                                ({totalScore}/{totalPossible})
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
                {attempts.map(({ attempt, examTitle }, idx) => (
                    <ExamAttemptDetails
                        key={attempt._id || attempt.id || idx}
                        attempt={attempt}
                        examTitle={examTitle}
                    />
                ))}
            </CardContent>
        </Card>
    );
}
