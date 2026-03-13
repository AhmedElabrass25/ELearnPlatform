"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FAQ } from "@/types";

interface FAQFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingItem: FAQ | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function FAQFormModal({
    isOpen,
    onClose,
    editingItem,
    formData,
    setFormData,
    onSubmit,
}: FAQFormModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingItem ? "تعديل سؤال" : "إضافة سؤال جديد"}
            onSubmit={onSubmit}
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>السؤال</Label>
                    <Input value={formData.question} onChange={e => setFormData({ ...formData, question: e.target.value })} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label>الإجابة</Label>
                    <textarea
                        value={formData.answer}
                        onChange={e => setFormData({ ...formData, answer: e.target.value })}
                        required
                        className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm"
                    />
                </div>
            </div>
        </AdminModal>
    );
}

interface FAQDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    question: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function FAQDeleteModal({
    isOpen,
    onClose,
    question,
    onConfirm,
}: FAQDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد الحذف"
            onSubmit={onConfirm}
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف السؤال: {question}
            </div>
        </AdminModal>
    );
}
