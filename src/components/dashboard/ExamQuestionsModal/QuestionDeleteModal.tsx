"use client";

import React, { useState } from "react";
import { Question } from "@/types";
import { deleteQuestion } from "@/services/questions.service";
import { toast } from "sonner";
import { AdminModal } from "@/components/admin/AdminModal";

interface QuestionDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    examId: string;
    question: Question | null;
    onDeleted: (id: string) => void;
}

export function QuestionDeleteModal({ isOpen, onClose, examId, question, onDeleted }: QuestionDeleteModalProps) {
    const [deleting, setDeleting] = useState(false);

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question) return;
        setDeleting(true);
        try {
            const qId = (question as any)._id || question.id;
            await deleteQuestion(examId, qId as string);
            onDeleted(qId as string);
            toast.success("تم حذف السؤال بنجاح");
            onClose();
        } catch (err: any) {
            toast.error(err.message || "فشل في حذف السؤال");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد حذف السؤال"
            description="هل أنت متأكد من رغبتك في حذف هذا السؤال؟"
            onSubmit={handleConfirm}
            submitLabel="حذف السؤال"
            isDestructive={true}
            isLoading={deleting}
        >
            <div className="space-y-4 py-2">
                <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 text-sm">
                    <p className="font-black mb-1">تنبيه:</p>
                    سيتم حذف السؤال: <span className="italic font-bold">"{question?.questionText}"</span> نهائياً من الاختبار.
                </div>
            </div>
        </AdminModal>
    );
}
