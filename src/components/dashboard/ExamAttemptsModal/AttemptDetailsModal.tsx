"use client";
import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface AttemptDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    attempt: any;
}

export function AttemptDetailsModal({ isOpen, onClose, attempt }: AttemptDetailsModalProps) {
    if (!attempt) return null;

    const studentName = attempt.user?.name || attempt.student?.name || "طالب غير محدد";
    const answers = attempt.answers || [];

    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={`تفاصيل المحاولة: ${studentName}`}
        >
            <div className="space-y-6 max-h-[85vh] overflow-y-auto pr-2">
                <div className="flex bg-muted/30 p-4 rounded-xl gap-6 flex-wrap">
                    <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">النتيجة النهائية</p>
                        <p className="text-2xl font-black text-primary">{attempt.score} / {attempt.totalScore || '?'}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold border-b pb-2">إجابات الطالب الواحدة تلو الأخرى</h4>
                    {answers.length === 0 ? (
                        <p className="text-muted-foreground text-sm">لم يتم العثور على أي أسئلة مجابة في هذه المحاولة.</p>
                    ) : (
                        answers.map((answer: any, idx: number) => {
                            const q = answer.question;
                            if (!q) return null;

                            const isCorrect = answer.isCorrect !== undefined ? answer.isCorrect : (q.correctAnswer === answer.selectedOption);
                            
                            return (
                                <Card key={idx} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                                    <CardHeader className="py-3 px-4 bg-muted/10">
                                        <CardTitle className="text-base leading-relaxed">
                                            {idx + 1}. {q.text || q.questionText}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="py-4 px-4 space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-red-50/50 p-3 rounded-lg border border-red-100">
                                                <p className="text-xs text-red-600/70 font-bold mb-1">إجابة الطالب:</p>
                                                <div className="flex items-center gap-2">
                                                    {isCorrect ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-500" />}
                                                    <span className="font-medium text-red-900">
                                                        {q.type === 'true-false' ? (answer.selectedOption === 0 ? 'صح' : 'خطأ') : 
                                                         (q.options ? q.options[answer.selectedOption] : `الخيار ${answer.selectedOption + 1}`)}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-green-50/50 p-3 rounded-lg border border-green-100">
                                                <p className="text-xs text-green-600/70 font-bold mb-1">الإجابة الصحيحة:</p>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 size={16} className="text-green-500" />
                                                    <span className="font-medium text-green-900">
                                                        {q.type === 'true-false' ? (q.correctAnswer === 0 || q.correctAnswer === true ? 'صح' : 'خطأ') : 
                                                         (typeof q.correctAnswer === 'number' && q.options ? q.options[q.correctAnswer] : q.correctAnswer)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>
            </div>
        </AdminModal>
    );
}
