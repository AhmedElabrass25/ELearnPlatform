"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Exam } from "@/types";
import { createExamInWeek, updateExam, deleteExam } from "@/services/exams.service";
import { useExamModals } from "./useExamModals";

export function useExamsManagement(weekId: string, initialExams: Exam[]) {
    const router = useRouter();
    const [exams, setExams] = useState<Exam[]>(initialExams);
    const modals = useExamModals();

    const handleCreateSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        const toastId = toast.loading("جاري إنشاء الاختبار...");
        try {
            const payload = { 
                title: modals.createFormData.title.trim(), 
                duration: modals.createFormData.duration, 
                availableFrom: modals.createFormData.availableFrom ? new Date(modals.createFormData.availableFrom).toISOString() : undefined,
                availableUntil: modals.createFormData.availableUntil ? new Date(modals.createFormData.availableUntil).toISOString() : undefined,
                isPublished: modals.createFormData.isPublished
            };
            const createdExam = await createExamInWeek(weekId, payload);
            const newExam = createdExam || {
                id: `exam-${Date.now()}`,
                ...payload,
                description: "",
                questions: [],
                createdAt: new Date().toISOString(),
            };
            setExams(prev => [...prev, newExam as Exam]);
            modals.setIsCreateModalOpen(false);
            toast.success("تم إنشاء الاختبار بنجاح", { id: toastId });
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ أثناء إنشاء الاختبار", { id: toastId });
        }
    };

    const handleEditSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        if (!modals.editingExam) return;
        const toastId = toast.loading("جاري التحديث...");
        try {
            const examId = modals.editingExam.id || (modals.editingExam as any)._id;
            const payload = { 
                title: modals.editFormData.title.trim(),
                duration: modals.editFormData.duration,
                availableFrom: modals.editFormData.availableFrom ? new Date(modals.editFormData.availableFrom).toISOString() : undefined,
                availableUntil: modals.editFormData.availableUntil ? new Date(modals.editFormData.availableUntil).toISOString() : undefined,
                isPublished: modals.editFormData.isPublished
            };
            const updated = await updateExam(examId, payload);
            setExams(prev => prev.map(e => {
                if ((e.id || (e as any)._id) === examId) {
                    return { ...e, ...payload };
                }
                return e;
            }));
            modals.setIsEditModalOpen(false);
            modals.setEditingExam(null);
            toast.success("تم تحديث الاختبار بنجاح", { id: toastId });
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ أثناء التحديث", { id: toastId });
        }
    };

    const handleDeleteConfirm = async (evt: React.FormEvent) => {
        evt.preventDefault();
        if (!modals.examToDelete) return;
        const toastId = toast.loading("جاري الحذف...");
        try {
            const examId = modals.examToDelete.id || (modals.examToDelete as any)._id;
            await deleteExam(examId);
            setExams(prev => prev.filter(e => (e.id || (e as any)._id) !== examId));
            modals.setIsDeleteModalOpen(false);
            modals.setExamToDelete(null);
            toast.success("تم حذف الاختبار بنجاح", { id: toastId });
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ أثناء الحذف", { id: toastId });
        }
    };

    return {
        exams,
        ...modals,
        handleAdd: modals.openCreateModal,
        handleEdit: modals.openEditModal,
        handleCreateSubmit,
        handleEditSubmit,
        handleDeleteConfirm
    };
}
