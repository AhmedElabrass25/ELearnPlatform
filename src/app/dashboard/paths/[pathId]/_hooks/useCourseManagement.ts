"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCourseInTrack, updateCourse, deleteCourse } from "@/services/courses.service";
import { Course } from "@/types";

import { useCourseModals } from "./useCourseModals";
import { useCourseForm } from "./useCourseForm";

interface UseCourseManagementProps {
    pathId: string;
    initialCourses: Course[];
}

export function useCourseManagement({ pathId, initialCourses }: UseCourseManagementProps) {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    
    const {
        isModalOpen, setIsModalOpen,
        editingCourse, setEditingCourse,
        isDeleteModalOpen, setIsDeleteModalOpen,
        courseToDelete, setCourseToDelete,
        openAddModal, openEditModal, openDeleteModal
    } = useCourseModals();

    const {
        formData, setFormData,
        isSubmitting: isSubmittingForm,
        handleSubmit, resetForm
    } = useCourseForm({
        pathId,
        editingCourse,
        onSuccess: (course) => {
            if (course) {
                const id = course.id || course._id;
                const exists = courses.some(c => (c.id || (c as any)._id) === id);
                if (exists) {
                    setCourses(courses.map(c => (c.id || (c as any)._id) === id ? course : c));
                } else {
                    setCourses([...courses, course]);
                }
            }
            setIsModalOpen(false);
        }
    });

    const [isDeleting, setIsDeleting] = useState(false);

    const handleAdd = () => {
        resetForm();
        openAddModal();
    };

    const handleEdit = (c: Course) => {
        resetForm(c);
        openEditModal(c);
    };

    const handleDeleteConfirm = async () => {
        if (!courseToDelete) return;
        const courseId = courseToDelete.id || (courseToDelete as any)._id;
        const toastId = toast.loading("جاري حذف الكورس...");
        
        setIsDeleting(true);
        try {
            await deleteCourse(courseId);
            toast.success("تم حذف الكورس بنجاح", { id: toastId });
            setCourses(courses.filter(c => (c.id || (c as any)._id) !== courseId));
            setIsDeleteModalOpen(false);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ أثناء الحذف", { id: toastId });
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        courses,
        isModalOpen, setIsModalOpen,
        editingCourse,
        isDeleteModalOpen, setIsDeleteModalOpen,
        courseToDelete, setCourseToDelete,
        isSubmitting: isSubmittingForm || isDeleting,
        formData, setFormData,
        handleAdd, handleEdit, handleSubmit,
        handleDeleteConfirm
    };
}
