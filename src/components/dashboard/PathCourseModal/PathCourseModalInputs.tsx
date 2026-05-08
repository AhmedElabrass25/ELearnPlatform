"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Course } from "@/types";

export function PathCourseModalInputs({ formData, setFormData, editingCourse }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
                <Label>عنوان الكورس</Label>
                <Input value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="rounded-xl" />
            </div>
            <div className="space-y-2 md:col-span-2">
                <Label>وصف الكورس</Label>
                <textarea value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="أضف وصفاً شاملاً للكورس..." />
            </div>
            <div className="space-y-2">
                <Label>السعر (ج.م)</Label>
                <Input type="number" value={formData.price || ""} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="rounded-xl text-left font-sans" dir="ltr" />
            </div>
            <div className="space-y-2">
                <Label>المدة (بالأسابيع)</Label>
                <Input type="number" value={formData.durationInWeeks || ""} onChange={(e) => setFormData({ ...formData, durationInWeeks: e.target.value })} className="rounded-xl text-left font-sans" dir="ltr" />
            </div>
            <div className="space-y-2">
                <Label>حالة النشر</Label>
                <Select value={formData.isPublished} onValueChange={(v) => setFormData({ ...formData, isPublished: v })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true">منشور</SelectItem>
                        <SelectItem value="false">مسودة (مخفي)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
                <Label>صورة الغلاف {editingCourse && "(اختياري لتغيير الصورة)"}</Label>
                <Input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, coverImage: e.target.files?.[0] || null })} className="rounded-xl cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-lg file:px-3 file:py-1 file:mr-4 file:hover:bg-primary/20" />
            </div>
        </div>
    );
}
