"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";

interface PathDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    pathTitle: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function PathDeleteModal({
    isOpen,
    onClose,
    pathTitle,
    onConfirm,
}: PathDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد الحذف"
            description="هل أنت متأكد من رغبتك في حذف هذا المسار؟ الأ كورسات المرتبطة لن يتم حذفها."
            onSubmit={onConfirm}
            submitLabel="حذف المسار"
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف المسار: {pathTitle}
            </div>
        </AdminModal>
    );
}
