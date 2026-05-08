"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lesson } from "@/types";
import { addLessonToWeek, updateLessonInWeek, deleteLessonInWeek } from "@/services/weeks.service";
import { useLessonModals } from "./useLessonModals";
import { emptyLessonForm } from "./lessonUtils";

export function useLessonsManagement(weekId: string, initialLessons: Lesson[]) {
    const router = useRouter();
    const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
    const modals = useLessonModals();

    const handleAdd = () => { 
        modals.setEditingLesson(null); 
        modals.setFormData({ ...emptyLessonForm, order: lessons.length + 1 }); 
        modals.setIsModalOpen(true); 
    };

    const handleEdit = (lesson: Lesson) => { 
        modals.setEditingLesson(lesson); 
        modals.setFormData({
            title: lesson.title || "",
            description: (lesson as any).description || "",
            type: lesson.type || "video",
            contentUrl: lesson.contentUrl || lesson.youtubeId || "",
            order: lesson.order || 1,
            isFree: String(lesson.isFree ?? false),
            isPublished: String((lesson as any).isPublished ?? true),
            pdfFile: null
        }); 
        modals.setIsModalOpen(true); 
    };

    const handleSubmit = async () => {
        const toastId = toast.loading(modals.editingLesson ? "جاري التحديث..." : "جاري إضافة الدرس...");
        try {
            const lessonData = new FormData();
            lessonData.append("title", modals.formData.title);
            lessonData.append("description", modals.formData.description || "");
            lessonData.append("type", modals.formData.type || "video");
            lessonData.append("contentUrl", modals.formData.contentUrl || "");
            lessonData.append("order", String(modals.formData.order || lessons.length + 1));
            lessonData.append("isFree", String(modals.formData.isFree === "true"));
            lessonData.append("isPublished", String(modals.formData.isPublished === "true"));
            
            if (modals.formData.pdfFile) {
                lessonData.append("pdfFile", modals.formData.pdfFile);
            }

            if (modals.editingLesson) {
                const lessonId = modals.editingLesson.id || (modals.editingLesson as any)._id;
                await updateLessonInWeek(weekId, lessonId as string, lessonData);
                setLessons(lessons.map((l) => ((l.id || (l as any)._id) === lessonId ? { ...l, ...modals.formData } : l)));
                toast.success("تم التحديث بنجاح", { id: toastId });
            } else {
                const createdLesson = await addLessonToWeek(weekId, lessonData);
                const finalLesson = createdLesson || {
                    id: `lesson-${Date.now()}`,
                    ...modals.formData,
                };
                setLessons([...lessons, finalLesson as Lesson].sort((a, b) => a.order - b.order));
                toast.success("تم إضافة الدرس", { id: toastId });
            }
            modals.setIsModalOpen(false);
            router.refresh();
        } catch (error: any) {
             toast.error(error.message || "حدث خطأ غير متوقع", { id: toastId });
        }
    };

    const handleDelete = async () => {
        if (!modals.lessonToDelete) return;
        const toastId = toast.loading("جاري الحذف...");
        try {
            const lessonId = modals.lessonToDelete.id || (modals.lessonToDelete as any)._id;
            await deleteLessonInWeek(weekId, lessonId as string);
            setLessons(lessons.filter(l => (l.id || (l as any)._id) !== lessonId));
            modals.setIsDeleteModalOpen(false);
            modals.setLessonToDelete(null);
            toast.success("تم الحذف بنجاح", { id: toastId });
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ غير متوقع", { id: toastId });
        }
    };

    const moveLesson = (index: number, dir: "up" | "down") => {
        const newLessons = [...lessons];
        const target = dir === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= newLessons.length) return;
        [newLessons[index], newLessons[target]] = [newLessons[target], newLessons[index]];
        newLessons.forEach((l, i) => (l.order = i + 1));
        setLessons(newLessons);
    };

    return {
        lessons,
        ...modals,
        handleAdd,
        handleEdit,
        handleSubmit,
        handleDelete,
        moveLesson
    };
}
