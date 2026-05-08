"use client";

import React, { useState, useEffect } from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Exam } from "@/types";
import { ClipboardCheck, Clock, Star, CalendarDays, Eye, EyeOff } from "lucide-react";

export interface ExamFormData {
    title: string;
    duration: number;
    availableFrom: string;
    availableUntil: string;
    isPublished: boolean;
}

interface ExamCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: ExamFormData;
    setFormData: (data: ExamFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function ExamCreateModal({
    isOpen,
    onClose,
    formData,
    setFormData,
    onSubmit,
}: ExamCreateModalProps) {
    const [errors, setErrors] = useState<Partial<Record<keyof ExamFormData, string>>>({});

    // Clear errors when modal opens/closes
    useEffect(() => {
        if (!isOpen) setErrors({});
    }, [isOpen]);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof ExamFormData, string>> = {};
        if (!formData.title.trim()) newErrors.title = "عنوان الاختبار مطلوب";
        else if (formData.title.trim().length < 3) newErrors.title = "يجب أن يكون العنوان 3 أحرف على الأقل";
        if (!formData.duration || formData.duration < 1) newErrors.duration = "المدة يجب أن تكون دقيقة على الأقل";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) onSubmit(e);
    };

    const clearError = (field: keyof ExamFormData) =>
        setErrors(prev => ({ ...prev, [field]: undefined }));

    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="إنشاء اختبار جديد"
            description="أنشئ اختباراً تقييمياً للأسبوع الدراسي بتحديد العنوان والمدة والدرجة الكلية"
            onSubmit={handleSubmit}
            submitLabel="إنشاء الاختبار"
        >
            <div className="space-y-5 py-2">
                {/* Title — full width */}
                <div className="space-y-2">
                    <Label htmlFor="exam-title" className="text-sm font-bold flex items-center gap-2">
                        <ClipboardCheck size={15} className="text-primary" />
                        عنوان الاختبار <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="exam-title"
                        value={formData.title}
                        onChange={e => { setFormData({ ...formData, title: e.target.value }); clearError("title"); }}
                        placeholder="مثال: اختبار الأسبوع الأول الشامل"
                        className={`rounded-xl h-11 ${errors.title ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {errors.title && <p className="text-xs text-destructive font-medium">{errors.title}</p>}
                </div>

                {/* Duration + TotalMarks — two columns */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="exam-duration" className="text-sm font-bold flex items-center gap-2">
                            <Clock size={15} className="text-blue-500" />
                            المدة (دقيقة) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="exam-duration"
                            type="number"
                            min={1}
                            value={formData.duration || ""}
                            onChange={e => { setFormData({ ...formData, duration: Math.max(1, parseInt(e.target.value) || 0) }); clearError("duration"); }}
                            placeholder="20"
                            className={`rounded-xl h-11 ${errors.duration ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.duration && <p className="text-xs text-destructive font-medium">{errors.duration}</p>}
                    </div>

                </div>

                {/* Scheduling */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="exam-available-from" className="text-sm font-bold flex items-center gap-2">
                            <CalendarDays size={15} className="text-muted-foreground" />
                            متاح من
                        </Label>
                        <Input
                            id="exam-available-from"
                            type="datetime-local"
                            value={formData.availableFrom}
                            onChange={e => { setFormData({ ...formData, availableFrom: e.target.value }); clearError("availableFrom"); }}
                            className={`rounded-xl h-11 ${errors.availableFrom ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="exam-available-until" className="text-sm font-bold flex items-center gap-2">
                            <CalendarDays size={15} className="text-muted-foreground" />
                            متاح حتى
                        </Label>
                        <Input
                            id="exam-available-until"
                            type="datetime-local"
                            value={formData.availableUntil}
                            onChange={e => { setFormData({ ...formData, availableUntil: e.target.value }); clearError("availableUntil"); }}
                            className={`rounded-xl h-11 ${errors.availableUntil ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                    </div>
                </div>

                {/* Published Checkbox */}
                <div className="flex items-center gap-2 py-2">
                    <input 
                        type="checkbox" 
                        id="exam-is-published" 
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="exam-is-published" className="text-sm font-bold flex items-center gap-2 cursor-pointer">
                        {formData.isPublished ? <Eye size={15} className="text-green-500"/> : <EyeOff size={15} className="text-muted-foreground"/>}
                        {formData.isPublished ? "منشور للطلاب" : "مخفي مؤقتاً"}
                    </Label>
                </div>


                {/* Summary preview */}
                {(formData.title || formData.duration > 0) && (
                    <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        {formData.title && (
                            <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
                                <ClipboardCheck size={14} /> {formData.title}
                            </span>
                        )}
                        {formData.duration > 0 && (
                            <span className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                                <Clock size={14} /> {formData.duration} دقيقة
                            </span>
                        )}
                    </div>
                )}
            </div>
        </AdminModal>
    );
}
