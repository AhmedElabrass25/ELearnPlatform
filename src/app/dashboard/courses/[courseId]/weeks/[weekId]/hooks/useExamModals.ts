"use client";

import { useState } from "react";
import { Exam } from "@/types";
import { emptyExamForm, ExamFormData, formatToLocalDatetimeString } from "./examUtils";

export function useExamModals() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingExam, setEditingExam] = useState<Exam | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [examToDelete, setExamToDelete] = useState<Exam | null>(null);
    const [createFormData, setCreateFormData] = useState<ExamFormData>(emptyExamForm);
    const [editFormData, setEditFormData] = useState<ExamFormData>(emptyExamForm);
    const [managingQuestionsExam, setManagingQuestionsExam] = useState<Exam | null>(null);

    const openCreateModal = () => { 
        setCreateFormData(emptyExamForm); 
        setIsCreateModalOpen(true); 
    };

    const openEditModal = (e: Exam) => { 
        setEditingExam(e); 
        setEditFormData({
            title: e.title || "",
            duration: e.duration || 0,
            availableFrom: formatToLocalDatetimeString(e.availableFrom),
            availableUntil: formatToLocalDatetimeString(e.availableUntil),
            isPublished: e.isPublished ?? true
        });
        setIsEditModalOpen(true); 
    };

    return {
        isCreateModalOpen, setIsCreateModalOpen,
        isEditModalOpen, setIsEditModalOpen,
        editingExam, setEditingExam,
        isDeleteModalOpen, setIsDeleteModalOpen,
        examToDelete, setExamToDelete,
        createFormData, setCreateFormData,
        editFormData, setEditFormData,
        managingQuestionsExam, setManagingQuestionsExam,
        openCreateModal, openEditModal
    };
}
