"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Testimonial } from "@/types";

interface TestimonialFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingItem: Testimonial | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function TestimonialFormModal({
    isOpen,
    onClose,
    editingItem,
    formData,
    setFormData,
    onSubmit,
}: TestimonialFormModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingItem ? "تعديل تقييم" : "إضافة تقييم جديد"}
            onSubmit={onSubmit}
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>الاسم</Label>
                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label>الوصف (مثال: طالب ثانوي، خريج)</Label>
                    <Input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label>التقييم (1-5)</Label>
                    <Input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label>محتوى الرأي</Label>
                    <textarea
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        required
                        className="flex min-h-[100px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm"
                    />
                </div>
            </div>
        </AdminModal>
    );
}

interface TestimonialDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function TestimonialDeleteModal({
    isOpen,
    onClose,
    itemName,
    onConfirm,
}: TestimonialDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد الحذف"
            onSubmit={onConfirm}
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف التقييم الخاص بـ: {itemName}
            </div>
        </AdminModal>
    );
}
