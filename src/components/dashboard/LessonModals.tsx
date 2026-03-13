"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
                <div className="space-y-2 md:col-span-2">
                    <Label>عنوان الدرس</Label>
                    <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>وصف الدرس</Label>
                    <Input
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label>المدة (مثال: 45 دقيقة)</Label>
                    <Input
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label>الترتيب</Label>
                    <Input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                        className="rounded-xl text-left font-sans"
                        dir="ltr"
                        min={1}
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>YouTube Video ID أو رابط الفيديو</Label>
                    <Input
                        value={formData.youtubeId}
                        onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                        className="rounded-xl text-left font-sans"
                        dir="ltr"
                        placeholder="مثال: 5qap5aO7vU0 أو رابط يوتيوب كامل"
                    />
                    <p className="text-xs text-muted-foreground">
                        يمكنك لصق رابط يوتيوب كامل أو معرّف الفيديو مباشرةً. الصورة المصغرة ستُولَّد تلقائياً.
                    </p>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>رابط الصورة المصغرة (اختياري)</Label>
                    <Input
                        value={formData.thumbnail}
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        className="rounded-xl text-left font-sans"
                        dir="ltr"
                        placeholder="سيُعبأ تلقائياً من YouTube إذا تُرك فارغاً"
                    />
                </div>
                <div className="md:col-span-2 flex items-center gap-3 rounded-xl border border-border p-4 bg-muted/30">
                    <input
                        type="checkbox"
                        id="isFree"
                        checked={formData.isFree}
                        onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                        className="w-4 h-4 rounded accent-primary"
                    />
                    <Label htmlFor="isFree" className="cursor-pointer flex flex-col gap-0.5">
                        <span>درس مجاني</span>
                        <span className="text-xs text-muted-foreground font-normal">
                            إذا كان محدداً، سيكون الدرس متاحاً بالمجان للجميع
                        </span>
                    </Label>
                </div>
            </div>
        </AdminModal>
    );
}

interface LessonDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonTitle: string;
    onConfirm: () => void;
}

export function LessonDeleteModal({ isOpen, onClose, lessonTitle, onConfirm }: LessonDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد حذف الدرس"
            onSubmit={onConfirm}
            submitLabel="حذف الدرس"
            isDestructive
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف الدرس: {lessonTitle}
            </div>
        </AdminModal>
    );
}
