"use client";

import React, { useState, useEffect } from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Exam } from "@/types";
import { ClipboardCheck, Clock, Star, CalendarDays, Eye, EyeOff } from "lucide-react";
import { ExamFormData } from "./ExamCreateModal";

interface ExamEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingExam: Exam | null;
    formData: ExamFormData;
    setFormData: (data: ExamFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function ExamEditModal({
    isOpen,
    onClose,
    editingExam,
    formData,
    setFormData,
    onSubmit,
}: ExamEditModalProps) {
    const [error, setError] = useState("");

    useEffect(() => { if (!isOpen) setError(""); }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) { setError("عنوان الاختبار مطلوب"); return; }
        if (formData.title.trim().length < 3) { setError("يجب أن يكون العنوان 3 أحرف على الأقل"); return; }
        onSubmit(e);
    };

    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تعديل عنوان الاختبار"
            description="يمكنك تعديل عنوان الاختبار فقط"
            onSubmit={handleSubmit}
            submitLabel="حفظ التعديلات"
        >
            <div className="space-y-4 py-2">
                <div className="space-y-2">
                    <Label htmlFor="exam-edit-title" className="text-sm font-bold flex items-center gap-2">
                        <ClipboardCheck size={15} className="text-primary" />
                        عنوان الاختبار <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="exam-edit-title"
                        value={formData.title}
                        onChange={e => { setFormData({ ...formData, title: e.target.value }); if (error) setError(""); }}
                        placeholder="مثال: اختبار الأسبوع الأول المُحدَّث"
                        className={`rounded-xl h-11 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {error && <p className="text-xs text-destructive font-medium">{error}</p>}
                </div>
                
                {/* Duration */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="exam-edit-duration" className="text-sm font-bold flex items-center gap-2">
                            <Clock size={15} className="text-blue-500" />المدة (دقيقة)
                        </Label>
                        <Input
                            id="exam-edit-duration" type="number" min={1} value={formData.duration || ""}
                            onChange={e => setFormData({ ...formData, duration: Math.max(1, parseInt(e.target.value) || 0) })}
                            className="rounded-xl h-11"
                        />
                    </div>
                </div>

                {/* Scheduling */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-bold flex items-center gap-2"><CalendarDays size={15}/>متاح من</Label>
                        <Input type="datetime-local" value={formData.availableFrom} onChange={e => setFormData({ ...formData, availableFrom: e.target.value })} className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-bold flex items-center gap-2"><CalendarDays size={15}/>متاح حتى</Label>
                        <Input type="datetime-local" value={formData.availableUntil} onChange={e => setFormData({ ...formData, availableUntil: e.target.value })} className="rounded-xl h-11" />
                    </div>
                </div>

                {/* Published */}
                <div className="flex items-center gap-2 py-2">
                    <input type="checkbox" id="exam-edit-published" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4 rounded text-primary" />
                    <Label htmlFor="exam-edit-published" className="cursor-pointer text-sm font-bold flex items-center gap-2">
                        {formData.isPublished ? <Eye size={15} className="text-green-500"/> : <EyeOff size={15} className="text-muted-foreground"/>}
                        {formData.isPublished ? "منشور للطلاب" : "مخفي مؤقتاً"}
                    </Label>
                </div>
                {editingExam && (
                    <div className="flex flex-wrap gap-3 p-3 rounded-xl bg-muted/40 border border-border text-sm text-muted-foreground">
                        {editingExam.duration != null && (
                            <span className="flex items-center gap-1.5"><Clock size={13} />{editingExam.duration} دقيقة</span>
                        )}
                        {editingExam.totalMarks != null && (
                            <span className="flex items-center gap-1.5"><Star size={13} />{editingExam.totalMarks} درجة</span>
                        )}
                    </div>
                )}
            </div>
        </AdminModal>
    );
}
