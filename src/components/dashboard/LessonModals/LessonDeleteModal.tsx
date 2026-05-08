"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";

interface LessonDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonTitle: string;
    onConfirm: () => void;
}

export function LessonDeleteModal({ isOpen, onClose, lessonTitle, onConfirm }: LessonDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد حذف الدرس"
            onSubmit={onConfirm}
            submitLabel="حذف الدرس"
            isDestructive
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف الدرس: {lessonTitle}
            </div>
        </AdminModal>
    );
}
