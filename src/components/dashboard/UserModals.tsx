"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types";

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingUser: User | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function UserFormModal({
    isOpen,
    onClose,
    editingUser,
    formData,
    setFormData,
    onSubmit,
}: UserFormModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingUser ? "تعديل مستخدم" : "إضافة مستخدم جديد"}
            onSubmit={onSubmit}
            submitLabel={editingUser ? "حفظ التعديلات" : "إضافة مستخدم"}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>الاسم الكامل</Label>
                    <Input
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label>البريد الإلكتروني</Label>
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label>الهاتف</Label>
                    <Input
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="rounded-xl text-left"
                        dir="ltr"
                    />
                </div>
                <div className="space-y-2">
                    <Label>المرحلة الدراسية</Label>
                    <Input
                        value={formData.educationalLevel}
                        onChange={e => setFormData({ ...formData, educationalLevel: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>المحافظة</Label>
                    <Input
                        value={formData.governorate}
                        onChange={e => setFormData({ ...formData, governorate: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
            </div>
        </AdminModal>
    );
}

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
