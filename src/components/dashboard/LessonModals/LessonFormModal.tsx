"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lesson } from "@/types";

interface LessonFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingLesson: Lesson | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: () => void;
}

export function LessonFormModal({
    isOpen,
    onClose,
    editingLesson,
    formData,
    setFormData,
    onSubmit,
}: LessonFormModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingLesson ? "تعديل الدرس" : "إضافة درس جديد"}
            onSubmit={onSubmit}
            submitLabel={editingLesson ? "حفظ التعديلات" : "إضافة الدرس"}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-2 md:col-span-2">
                    <Label>عنوان الدرس <span className="text-destructive">*</span></Label>
                    <Input
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="rounded-xl"
                        placeholder="أدخل عنوان الدرس..."
                    />
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                    <Label>وصف الدرس</Label>
                    <textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="أدخل وصفاً للدرس..."
                        className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                {/* Type */}
                <div className="space-y-2">
                    <Label>نوع الدرس</Label>
                    <select
                        value={formData.type || "video"}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="flex h-10 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="video">فيديو (يوتيوب أو رابط مباشر)</option>
                        <option value="pdf">ملف (PDF)</option>
                        <option value="file">مرفق آخر</option>
                    </select>
                </div>

                {/* Order */}
                <div className="space-y-2">
                    <Label>الترتيب</Label>
                    <Input
                        type="number"
                        value={formData.order || ""}
                        onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                        className="rounded-xl text-left font-sans"
                        dir="ltr"
                        min={1}
                    />
                </div>

                {/* Content URL */}
                <div className="space-y-2 md:col-span-2">
                    <Label>رابط المحتوى (Video / PDF)</Label>
                    <Input
                        value={formData.contentUrl || ""}
                        onChange={(e) => setFormData({ ...formData, contentUrl: e.target.value })}
                        className="rounded-xl text-left font-sans"
                        dir="ltr"
                        placeholder="مثال: https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        ضع رابط الفيديو كاملاً أو رابط ملف الـ PDF.
                    </p>
                </div>

                {/* isFree */}
                <div className="space-y-2">
                    <Label>مجاني؟</Label>
                    <Select
                        value={String(formData.isFree ?? false)}
                        onValueChange={(v) => setFormData({ ...formData, isFree: v })}
                    >
                        <SelectTrigger className="rounded-xl">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">نعم - مجاني</SelectItem>
                            <SelectItem value="false">لا - مدفوع</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* isPublished */}
                <div className="space-y-2">
                    <Label>حالة النشر</Label>
                    <Select
                        value={String(formData.isPublished ?? true)}
                        onValueChange={(v) => setFormData({ ...formData, isPublished: v })}
                    >
                        <SelectTrigger className="rounded-xl">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">منشور</SelectItem>
                            <SelectItem value="false">مسودة (مخفي)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>              
            </div>
        </AdminModal>
    );
}
