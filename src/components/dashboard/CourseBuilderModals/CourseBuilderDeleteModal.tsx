"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";

interface CourseBuilderDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonTitle: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function CourseBuilderDeleteModal({
    isOpen,
    onClose,
    lessonTitle,
    onConfirm,
}: CourseBuilderDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد الحذف"
            description="هل أنت متأكد من رغبتك في حذف هذا الدرس؟"
            onSubmit={onConfirm}
            submitLabel="حذف الدرس"
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف الدرس: {lessonTitle}
            </div>
        </AdminModal>
    );
}
