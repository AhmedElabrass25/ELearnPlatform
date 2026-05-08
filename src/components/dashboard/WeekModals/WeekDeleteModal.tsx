"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";

interface WeekDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    weekTitle: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function WeekDeleteModal({
    isOpen,
    onClose,
    weekTitle,
    onConfirm,
}: WeekDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد حذف الأسبوع"
            description="هل أنت متأكد من رغبتك في حذف هذا الأسبوع؟"
            onSubmit={onConfirm}
            submitLabel="حذف الأسبوع"
            isDestructive={true}
        >
            <div className="space-y-4 py-2">
                <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                    <p className="font-bold mb-1">تنبيه:</p>
                    سيتم حذف الأسبوع: <span className="underline">{weekTitle}</span> وجميع المحتويات الموجودة بداخله (دروس، مواد، اختبارات).
                </div>
                <p className="text-sm text-muted-foreground text-center">
                    هذا الإجراء لا يمكن التراجع عنه.
                </p>
            </div>
        </AdminModal>
    );
}
