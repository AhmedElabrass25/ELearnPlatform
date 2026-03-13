"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Course } from "@/types";

interface PathCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingCourse: Course | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: () => void;
}

export function PathCourseModal({
    isOpen,
    onClose,
    editingCourse,
    formData,
    setFormData,
    onSubmit,
}: PathCourseModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingCourse ? "تعديل الكورس" : "إضافة كورس جديد للمسار"}
            onSubmit={onSubmit}
            submitLabel={editingCourse ? "حفظ التعديلات" : "إضافة الكورس"}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                    <Label>عنوان الكورس</Label>
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="rounded-xl" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>العنوان الفرعي (اختياري)</Label>
                    <Input value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label>السعر (ج.م)</Label>
                    <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="rounded-xl text-left font-sans" dir="ltr" />
                </div>
                <div className="space-y-2">
                    <Label>المدة</Label>
                    <Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="rounded-xl" placeholder="مثال: 14 ساعة" />
                </div>
                <div className="space-y-2">
                    <Label>المستوى</Label>
                    <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v })}>
                        <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                            <SelectItem value="متوسط">متوسط</SelectItem>
                            <SelectItem value="متقدم">متقدم</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>النوع</Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                        <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="أونلاين">أونلاين</SelectItem>
                            <SelectItem value="سنتر">سنتر</SelectItem>
                            <SelectItem value="الترم كامل">الترم كامل</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>الموضوع / المادة</Label>
                    <Input value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} className="rounded-xl" placeholder="مثال: نحو + إملاء" />
                </div>
            </div>
        </AdminModal>
    );
}
