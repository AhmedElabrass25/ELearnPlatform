"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";

interface UserDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    userFullName: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function UserDeleteModal({
    isOpen,
    onClose,
    userFullName,
    onConfirm,
}: UserDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد الحذف"
            description="هل أنت متأكد من رغبتك في حذف هذا المستخدم؟ لا يمكن التراجع عن هذه الخطوة."
            onSubmit={onConfirm}
            submitLabel="حذف المستخدم"
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف المستخدم: {userFullName}
            </div>
        </AdminModal>
    );
}
