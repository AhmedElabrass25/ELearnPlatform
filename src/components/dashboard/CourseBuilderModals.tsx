"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lesson } from "@/types";

interface CourseBuilderModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingLesson: Lesson | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function CourseBuilderModal({
    isOpen,
    onClose,
    editingLesson,
    formData,
    setFormData,
    onSubmit,
}: CourseBuilderModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingLesson ? "تعديل الدرس" : "إضافة درس جديد"}
            onSubmit={onSubmit}
            submitLabel={editingLesson ? "حفظ التعديلات" : "إضافة الدرس"}
        >
            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label>عنوان الدرس</Label>
                    <Input
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="rounded-xl"
                    />
                </div>

                <div className="space-y-2">
                    <Label>رابط فيديو يوتيوب (أو المعرف ID فقط)</Label>
                    <div className="flex gap-2">
                        <Input
                            value={formData.youtubeId}
                            onChange={e => {
                                let val = e.target.value;
                                if (val.includes('v=')) {
                                    val = val.split('v=')[1].split('&')[0];
                                } else if (val.includes('youtu.be/')) {
                                    val = val.split('youtu.be/')[1].split('?')[0];
                                }
                                setFormData({ ...formData, youtubeId: val });
                            }}
                            required
                            className="rounded-xl text-left"
                            dir="ltr"
                            placeholder="مثال: dQw4w9WgXcQ"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>مدة الدرس</Label>
                    <Input
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="مثال: 45 دقيقة"
                        className="rounded-xl"
                    />
                </div>

                <div className="space-y-2">
                    <Label>الوصف</Label>
                    <textarea
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="flex min-h-[80px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={3}
                    />
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        id="isFree"
                        checked={formData.isFree}
                        onChange={e => setFormData({ ...formData, isFree: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="isFree" className="cursor-pointer">جعل هذا الدرس مجانياً (للمعاينة)</Label>
                </div>
            </div>
        </AdminModal>
    );
}

interface CourseBuilderDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonTitle: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function CourseBuilderDeleteModal({
    isOpen,
    onClose,
    lessonTitle,
    onConfirm,
}: CourseBuilderDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد الحذف"
            description="هل أنت متأكد من رغبتك في حذف هذا الدرس؟"
            onSubmit={onConfirm}
            submitLabel="حذف الدرس"
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف الدرس: {lessonTitle}
            </div>
        </AdminModal>
    );
}
