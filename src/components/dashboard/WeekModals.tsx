"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Week } from "@/types";

interface WeekModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingWeek: Week | null;
    formData: { title: string };
    setFormData: (data: { title: string }) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function WeekModal({
    isOpen,
    onClose,
    editingWeek,
    formData,
    setFormData,
    onSubmit,
}: WeekModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingWeek ? "تعديل الأسبوع" : "إضافة أسبوع جديد"}
            description={editingWeek ? "تعديل عنوان الأسبوع الدراسي" : "أضف أسبوعاً جديداً لتنظيم دروسك وموادك التعليمية"}
            onSubmit={onSubmit}
            submitLabel={editingWeek ? "حفظ التعديلات" : "إضافة الأسبوع"}
        >
            <div className="grid gap-4 py-2">
                <div className="space-y-3">
                    <Label htmlFor="week-title" className="text-sm font-bold">عنوان الأسبوع</Label>
                    <Input
                        id="week-title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="مثال: الأسبوع الأول: مقدمة في لغة الجسد"
                        className="rounded-xl h-11 border-border focus:ring-primary shadow-sm"
                    />
                </div>
            </div>
        </AdminModal>
    );
}

interface WeekDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    weekTitle: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function WeekDeleteModal({
    isOpen,
    onClose,
    weekTitle,
    onConfirm,
}: WeekDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد حذف الأسبوع"
            description="هل أنت متأكد من رغبتك في حذف هذا الأسبوع؟"
            onSubmit={onConfirm}
            submitLabel="حذف الأسبوع"
            isDestructive={true}
        >
            <div className="space-y-4 py-2">
                <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                    <p className="font-bold mb-1">تنبيه:</p>
                    سيتم حذف الأسبوع: <span className="underline">{weekTitle}</span> وجميع المحتويات الموجودة بداخله (دروس، مواد، اختبارات).
                </div>
                <p className="text-sm text-muted-foreground text-center">
                    هذا الإجراء لا يمكن التراجع عنه.
                </p>
            </div>
        </AdminModal>
    );
}
