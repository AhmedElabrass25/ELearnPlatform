"use client"
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExamCreateModal } from "@/components/dashboard/ExamModals/ExamCreateModal";
import { ExamEditModal } from "@/components/dashboard/ExamModals/ExamEditModal";
import { ExamDeleteModal } from "@/components/dashboard/ExamModals/ExamDeleteModal";
import { ExamQuestionsModal } from "@/components/dashboard/ExamQuestionsModal/ExamQuestionsModal";
import { ExamAttemptsModal } from "@/components/dashboard/ExamAttemptsModal";
import { useExamsManagement } from "../hooks/useExamsManagement";
import { ExamItem } from "./ExamItem";
import { ExamsEmptyState } from "./ExamsEmptyState";

interface ExamsTabContentProps {
    hook: ReturnType<typeof useExamsManagement>;
}

export function ExamsTabContent({ hook }: ExamsTabContentProps) {
    const [viewingAttemptsExam, setViewingAttemptsExam] = React.useState<any>(null);

    const {
        exams,
        isCreateModalOpen, setIsCreateModalOpen,
        isEditModalOpen, setIsEditModalOpen,
        editingExam,
        editFormData, setEditFormData,
        isDeleteModalOpen, setIsDeleteModalOpen,
        examToDelete, setExamToDelete,
        createFormData, setCreateFormData,
        managingQuestionsExam, setManagingQuestionsExam,
        handleAdd, handleEdit, handleCreateSubmit, handleEditSubmit, handleDeleteConfirm
    } = hook;

    return (
        <>
            <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/10">
                    <CardTitle>اختبارات التقييم</CardTitle>
                    <CardDescription>أنشئ اختبارات قصيرة لقياس مستوى استيعاب الطلاب</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    {exams.length === 0 ? (
                        <ExamsEmptyState onAdd={handleAdd} />
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {exams.map((e) => (
                                    <ExamItem
                                        key={e._id || e.id}
                                        exam={e}
                                        onViewAttempts={setViewingAttemptsExam}
                                        onManageQuestions={setManagingQuestionsExam}
                                        onEdit={handleEdit}
                                        onDelete={(ex) => { setExamToDelete(ex); setIsDeleteModalOpen(true); }}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </CardContent>
            </Card>

            <ExamCreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} formData={createFormData} setFormData={setCreateFormData} onSubmit={handleCreateSubmit} />
            <ExamEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} editingExam={editingExam} formData={editFormData} setFormData={setEditFormData} onSubmit={handleEditSubmit} />
            <ExamDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} examTitle={examToDelete?.title || ""} onConfirm={handleDeleteConfirm} />

            {managingQuestionsExam && (
                <ExamQuestionsModal
                    isOpen={!!managingQuestionsExam}
                    onClose={() => setManagingQuestionsExam(null)}
                    examId={(managingQuestionsExam._id || managingQuestionsExam.id) as string} 
                    examTitle={managingQuestionsExam.title}
                    initialQuestions={managingQuestionsExam.questions || []}
                />
            )}

            {viewingAttemptsExam && (
                <ExamAttemptsModal
                    isOpen={!!viewingAttemptsExam}
                    onClose={() => setViewingAttemptsExam(null)}
                    examId={viewingAttemptsExam._id || viewingAttemptsExam.id}
                    examTitle={viewingAttemptsExam.title}
                />
            )}
        </>
    );
}
