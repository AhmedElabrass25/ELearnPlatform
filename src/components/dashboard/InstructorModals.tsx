"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instructor } from "@/types";

interface InstructorFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingInstructor: Instructor | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function InstructorFormModal({
    isOpen,
    onClose,
    editingInstructor,
    formData,
    setFormData,
    onSubmit,
}: InstructorFormModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingInstructor ? "تعديل بيانات المعلم" : "إضافة معلم جديد"}
            onSubmit={onSubmit}
            submitLabel={editingInstructor ? "حفظ التعديلات" : "إضافة معلم"}
        >
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label>اسم المعلم</Label>
                    <Input
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label>المسمى الوظيفي</Label>
                    <Input
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label>نبذة مختصرة (Bio)</Label>
                    <textarea
                        value={formData.bio}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        className="flex min-h-[80px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={3}
                    />
                </div>
                <div className="space-y-2">
                    <Label>رابط الصورة الشخصية (Avatar URL)</Label>
                    <Input
                        value={formData.avatar}
                        onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                        placeholder="/images/avatar.jpg"
                        className="rounded-xl text-left"
                        dir="ltr"
                    />
                </div>
            </div>
        </AdminModal>
    );
}

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
