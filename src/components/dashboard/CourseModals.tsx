"use client";

import React from "react";
import Image from "next/image";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockData } from "@/lib/mockData";
import { Course } from "@/types";

interface CourseFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingCourse: Course | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: () => void;
}

export function CourseFormModal({
    isOpen,
    onClose,
    editingCourse,
    formData,
    setFormData,
    onSubmit,
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
                    <Label>العنوان الفرعي (اختياري)</Label>
                    <Input value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label>المسار التعليمي</Label>
                    <Select value={formData.pathId} onValueChange={(v) => setFormData({ ...formData, pathId: v })}>
                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="اختر المسار" /></SelectTrigger>
                        <SelectContent>
                            {mockData.paths.map((p) => (
                                <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>السعر (ج.م)</Label>
                    <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="rounded-xl text-left font-sans" dir="ltr" />
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
                <div className="space-y-2">
                    <Label>المادة / الموضوع</Label>
                    <Input value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} className="rounded-xl" placeholder="مثال: نحو + إملاء" />
                </div>
                <div className="space-y-2">
                    <Label>المدة</Label>
                    <Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="rounded-xl" placeholder="مثال: 14 ساعة" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>رابط صورة الكورس (URL)</Label>
                    <Input
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="rounded-xl text-left font-sans"
                        dir="ltr"
                        placeholder="https://example.com/image.jpg"
                    />
                    {formData.image && (
                        <div className="mt-2 relative w-full h-36 rounded-xl overflow-hidden border border-border bg-muted">
                            <Image
                                src={formData.image}
                                alt="معاينة الصورة"
                                fill
                                className="object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                        </div>
                    )}
                </div>

                <div className="md:col-span-2 flex items-center gap-3 rounded-xl border border-border p-4 bg-muted/30">
                    <input
                        type="checkbox"
                        id="isPopular"
                        checked={formData.isPopular}
                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                        className="w-4 h-4 rounded accent-primary"
                    />
                    <Label htmlFor="isPopular" className="cursor-pointer">
                        <span>كورس مميز (الأكثر طلباً)</span>
                        <span className="block text-xs text-muted-foreground font-normal">سيُعرض بشارة &quot;الأشهر&quot; في قوائم الكورسات</span>
                    </Label>
                </div>
            </div>
        </AdminModal>
    );
}

interface CourseDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    onConfirm: () => void;
}

export function CourseDeleteModal({ isOpen, onClose, courseTitle, onConfirm }: CourseDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد حذف الكورس"
            onSubmit={onConfirm}
            submitLabel="حذف الكورس"
            isDestructive
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف الكورس: {courseTitle}
            </div>
        </AdminModal>
    );
}
