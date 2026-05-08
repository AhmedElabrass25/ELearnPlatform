"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";

interface InstructorDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    instructorName: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function InstructorDeleteModal({
    isOpen,
    onClose,
    instructorName,
    onConfirm,
}: InstructorDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد الحذف"
            description="هل أنت متأكد من رغبتك في حذف هذا المعلم؟ سيؤثر هذا على الكورسات المرتبطة به."
            onSubmit={onConfirm}
            submitLabel="حذف المعلم"
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف المعلم: {instructorName}
            </div>
        </AdminModal>
    );
}
