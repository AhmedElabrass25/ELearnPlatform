"use client";

import { useState } from "react";
import { Course } from "@/types";

export function useCourseModals() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

    const openAddModal = () => {
        setEditingCourse(null);
        setIsModalOpen(true);
    };

    const openEditModal = (course: Course) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const openDeleteModal = (course: Course) => {
        setCourseToDelete(course);
        setIsDeleteModalOpen(true);
    };

    return {
        isModalOpen,
        setIsModalOpen,
        editingCourse,
        setEditingCourse,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        courseToDelete,
        setCourseToDelete,
        openAddModal,
        openEditModal,
        openDeleteModal
    };
}
