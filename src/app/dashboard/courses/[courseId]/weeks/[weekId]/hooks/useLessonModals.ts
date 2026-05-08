"use client";

import { useState } from "react";
import { Lesson } from "@/types";
import { emptyLessonForm } from "./lessonUtils";

export function useLessonModals() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
    const [formData, setFormData] = useState<any>(emptyLessonForm);

    return {
        isModalOpen, setIsModalOpen,
        editingLesson, setEditingLesson,
        isDeleteModalOpen, setIsDeleteModalOpen,
        lessonToDelete, setLessonToDelete,
        formData, setFormData,
    };
}
