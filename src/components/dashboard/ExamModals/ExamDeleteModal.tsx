"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";

interface ExamDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    examTitle: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function ExamDeleteModal({
    isOpen,
    onClose,
    examTitle,
    onConfirm,
}: ExamDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد حذف الاختبار"
            description="هل أنت متأكد من رغبتك في حذف هذا الاختبار؟"
            onSubmit={onConfirm}
            submitLabel="حذف الاختبار"
            isDestructive={true}
        >
            <div className="space-y-4 py-2">
                <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                    <p className="font-bold mb-1">تنبيه:</p>
                    سيتم حذف الاختبار: <span className="underline">{examTitle}</span> وجميع أسئلته نهائياً.
                </div>
                <p className="text-sm text-muted-foreground text-center">هذا الإجراء لا يمكن التراجع عنه.</p>
            </div>
        </AdminModal>
    );
}
