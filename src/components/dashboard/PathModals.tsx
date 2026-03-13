"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Path } from "@/types";

interface PathFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingPath: Path | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function PathFormModal({
    isOpen,
    onClose,
    editingPath,
    formData,
    setFormData,
    onSubmit,
}: PathFormModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingPath ? "تعديل المسار التعليمي" : "إضافة مسار جديد"}
            onSubmit={onSubmit}
            submitLabel={editingPath ? "حفظ التعديلات" : "إضافة مسار"}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                    <Label>عنوان المسار</Label>
                    <Input
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label>الرابط (Slug)</Label>
                    <Input
                        value={formData.slug}
                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                        required
                        className="rounded-xl text-left"
                        dir="ltr"
                    />
                </div>
                <div className="space-y-2">
                    <Label>المدة الزمنية (مثال: 48 ساعة)</Label>
                    <Input
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>الوصف</Label>
                    <textarea
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="flex min-h-[80px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={3}
                    />
                </div>
            </div>
        </AdminModal>
    );
}

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
