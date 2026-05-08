"use client";
import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Course } from "@/types";
import { PathCourseModalInputs } from "./PathCourseModalInputs";

interface PathCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingCourse: Course | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: any) => void;
}

export function PathCourseModal({ isOpen, onClose, editingCourse, formData, setFormData, onSubmit }: PathCourseModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingCourse ? "تعديل الكورس" : "إضافة كورس جديد للمسار"}
            onSubmit={onSubmit}
            submitLabel={editingCourse ? "حفظ التعديلات" : "إضافة الكورس"}
        >
            <PathCourseModalInputs formData={formData} setFormData={setFormData} editingCourse={editingCourse} />
        </AdminModal>
    );
}
