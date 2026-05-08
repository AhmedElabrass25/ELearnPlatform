"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";

interface CourseDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    onConfirm: () => void;
}

export function CourseDeleteModal({ isOpen, onClose, courseTitle, onConfirm }: CourseDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد حذف الكورس"
            onSubmit={onConfirm}
            submitLabel="حذف الكورس"
            isDestructive
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف الكورس: {courseTitle}
            </div>
        </AdminModal>
    );
}
