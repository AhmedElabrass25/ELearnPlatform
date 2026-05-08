"use client";
import React, { useState, useEffect } from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Clock, Calendar } from "lucide-react";
import { getAdminExamAttempts } from "@/services/exams.service";
import { AttemptDetailsModal } from "./AttemptDetailsModal";

interface ExamAttemptsModalProps {
    isOpen: boolean;
    onClose: () => void;
    examId: string;
    examTitle: string;
}

export function ExamAttemptsModal({ isOpen, onClose, examId, examTitle }: ExamAttemptsModalProps) {
    const [attempts, setAttempts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAttempt, setSelectedAttempt] = useState<any>(null);

    useEffect(() => {
        if (isOpen && examId) {
            fetchAttempts();
        }
    }, [isOpen, examId]);

    const fetchAttempts = async () => {
        setIsLoading(true);
        try {
            const res = await getAdminExamAttempts(examId);
            setAttempts(res?.data || res || []);
        } catch (error) {
            console.error("Failed to fetch exam attempts", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDuration = (start: string, end: string) => {
        if (!start || !end) return "غير متوفر";
        const diffInSeconds = Math.floor((new Date(end).getTime() - new Date(start).getTime()) / 1000);
        if (isNaN(diffInSeconds) || diffInSeconds < 0) return "-";
        const mins = Math.floor(diffInSeconds / 60);
        const secs = diffInSeconds % 60;
        return `${mins} د ${secs} ث`;
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "غير متوفر";
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <>
            <AdminModal
                isOpen={isOpen}
                onClose={onClose}
                title={`نتائج الطلاب: ${examTitle}`}
            >
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="py-10 text-center animate-pulse text-muted-foreground">جاري تحميل نتائج الطلاب...</div>
                    ) : attempts.length === 0 ? (
                        <div className="py-10 text-center text-muted-foreground bg-muted/20 rounded-xl border-2 border-dashed">
                            لا توجد أي نتائج مسجلة لهذا الاختبار حتى الآن.
                        </div>
                    ) : (
                        <div className="rounded-xl border overflow-hidden">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="text-right font-bold w-[250px]">الطالب</TableHead>
                                        <TableHead className="text-right font-bold">النتيجة</TableHead>
                                        <TableHead className="text-right font-bold">التاريخ</TableHead>
                                        <TableHead className="text-right font-bold">المدة</TableHead>
                                        <TableHead className="text-center font-bold w-[100px]">تفاصيل</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {attempts.map((attempt) => (
                                        <TableRow key={attempt._id || attempt.id}>
                                            <TableCell className="font-medium text-right">
                                                {attempt.user?.name || attempt.student?.name || "طالب غير معروف"}
                                                <div className="text-xs text-muted-foreground mt-0.5">{attempt.user?.email || attempt.student?.email}</div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant={(attempt.score >= ((attempt.totalScore || 10) / 2)) ? "default" : "destructive"}>
                                                    {attempt.score} / {attempt.totalScore || '?'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar size={13} />
                                                    {formatDate(attempt.submittedAt || attempt.createdAt)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center gap-2 text-sm text-primary font-mono">
                                                    <Clock size={13} />
                                                    {formatDuration(attempt.startedAt || attempt.createdAt, attempt.submittedAt || attempt.updatedAt)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Button size="sm" variant="outline" className="gap-2 rounded-xl" onClick={() => setSelectedAttempt(attempt)}>
                                                    <Eye size={14} />
                                                    عرض
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </AdminModal>

            {selectedAttempt && (
                <AttemptDetailsModal
                    isOpen={!!selectedAttempt}
                    onClose={() => setSelectedAttempt(null)}
                    attempt={selectedAttempt}
                />
            )}
        </>
    );
}
