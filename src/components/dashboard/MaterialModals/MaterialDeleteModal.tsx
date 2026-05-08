"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";

interface MaterialDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    materialTitle: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function MaterialDeleteModal({
    isOpen,
    onClose,
    materialTitle,
    onConfirm,
}: MaterialDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="حذف المادة التعليمية"
            description="هل أنت متأكد من رغبتك في حذف هذه المادة؟"
            onSubmit={onConfirm}
            submitLabel="حذف المادة"
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف المادة: {materialTitle}
            </div>
        </AdminModal>
    );
}
