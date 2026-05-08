"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Course } from "@/types";

interface CourseFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingCourse: Course | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: () => void;
    tracks?: any[];
}

export function CourseFormModal({
    isOpen,
    onClose,
    editingCourse,
    formData,
    setFormData,
    onSubmit,
    tracks = [],
}: CourseFormModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingCourse ? "تعديل الكورس" : "إضافة كورس جديد"}
            onSubmit={onSubmit}
            submitLabel={editingCourse ? "حفظ التعديلات" : "إضافة الكورس"}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                    <Label>عنوان الكورس</Label>
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="rounded-xl" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                    <Label>العنوان الفرعي أو الوصف (اختياري)</Label>
                    <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="rounded-xl" />
                </div>

                <div className="space-y-2">
                    <Label>المسار التعليمي</Label>
                    <Select value={formData.pathId} onValueChange={(v) => setFormData({ ...formData, pathId: v })}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="اختر المسار" /></SelectTrigger>
                        <SelectContent>
                            {tracks.map((p) => (
                                <SelectItem key={p._id || p.id} value={p._id || p.id}>{p.name || p.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>السعر (ج.م)</Label>
                    <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="rounded-xl text-left font-sans" dir="ltr" />
                </div>


                <div className="space-y-2">
                    <Label>المدة (أسابيع)</Label>
                    <Input value={formData.durationInWeeks} onChange={(e) => setFormData({ ...formData, durationInWeeks: e.target.value })} className="rounded-xl" placeholder="مثال: 8" />
                </div>

                <div className="space-y-2">
                    <Label>صورة الغلاف</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, coverImage: e.target.files?.[0] || null })} className="rounded-xl" />
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border p-4 bg-muted/30">
                    <input
                        type="checkbox"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-4 h-4 rounded accent-primary"
                    />
                    <Label htmlFor="isPublished" className="cursor-pointer">
                        <span>نشر الكورس</span>
                        <span className="block text-xs text-muted-foreground font-normal">يظهر للطلاب.</span>
                    </Label>
                </div>
            </div>
        </AdminModal>
    );
}
