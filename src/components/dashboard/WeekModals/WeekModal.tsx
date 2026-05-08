"use client";

import React, { useState } from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Week } from "@/types";

export interface WeekFormData {
    title: string;
    description: string;
    active: string;
}

interface WeekModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingWeek: Week | null;
    formData: WeekFormData;
    setFormData: (data: WeekFormData) => void;
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
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

    const validate = (): boolean => {
        const newErrors: { title?: string; description?: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = "عنوان الأسبوع مطلوب";
        } else if (formData.title.trim().length < 3) {
            newErrors.title = "يجب أن يكون العنوان 3 أحرف على الأقل";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(e);
        }
    };

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    return (
        <AdminModal
            isOpen={isOpen}
            onClose={handleClose}
            title={editingWeek ? "تعديل الأسبوع" : "إضافة أسبوع جديد"}
            description={
                editingWeek
                    ? "يمكنك تعديل جميع بيانات الأسبوع الدراسي"
                    : "أضف أسبوعاً جديداً لتنظيم دروسك وموادك التعليمية"
            }
            onSubmit={handleSubmit}
            submitLabel={editingWeek ? "حفظ التعديلات" : "إضافة الأسبوع"}
        >
            <div className="grid gap-5 py-2">
                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="week-title" className="text-sm font-bold">
                        عنوان الأسبوع <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="week-title"
                        value={formData.title}
                        onChange={e => {
                            setFormData({ ...formData, title: e.target.value });
                            if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
                        }}
                        placeholder="مثال: الأسبوع الأول — مقدمة في البرمجة"
                        className={`rounded-xl h-11 border-border focus:ring-primary shadow-sm ${errors.title ? "border-destructive focus:ring-destructive" : ""}`}
                    />
                    {errors.title && (
                        <p className="text-xs text-destructive font-medium">{errors.title}</p>
                    )}
                </div>


                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="week-description" className="text-sm font-bold">
                        وصف الأسبوع
                    </Label>
                    <textarea
                        id="week-description"
                        value={formData.description || ""}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setFormData({ ...formData, description: e.target.value });
                            if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
                        }}
                        placeholder="أدخل وصفاً لمحتويات هذا الأسبوع..."
                        className={`flex min-h-[110px] w-full rounded-xl border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                            errors.description ? "border-destructive focus-visible:ring-destructive" : "border-input"
                        }`}
                    />
                    {errors.description && (
                        <p className="text-xs text-destructive font-medium">{errors.description}</p>
                    )}
                </div>

                {/* Active */}
                <div className="space-y-2">
                    <Label className="text-sm font-bold">الحالة (Active)</Label>
                    <Select 
                        value={formData.active} 
                        onValueChange={(v) => setFormData({ ...formData, active: v })}
                    >
                        <SelectTrigger className="rounded-xl h-11">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">نشط</SelectItem>
                            <SelectItem value="false">غير نشط</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </AdminModal>
    );
}
