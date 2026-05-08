"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, HelpCircle, Loader2, AlertTriangle, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Question } from "@/types";
import { getExamQuestions } from "@/services/questions.service";
import { toast } from "sonner";
import { QuestionForm } from "./QuestionForm";
import { QuestionEditModal } from "./QuestionEditModal";
import { QuestionDeleteModal } from "./QuestionDeleteModal";
import { QuestionCard } from "./QuestionCard";

interface ExamQuestionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    examId: string;
    examTitle: string;
    initialQuestions: Question[];
}

export function ExamQuestionsModal({
    isOpen,
    onClose,
    examId,
    examTitle,
    initialQuestions,
}: ExamQuestionsModalProps) {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    // Modals for Edit/Delete
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [deletingQuestion, setDeletingQuestion] = useState<Question | null>(null);

    const fetchQuestions = useCallback(async () => {
        if (!isOpen || !examId) return;
        setLoading(true);
        try {
            const data = await getExamQuestions(examId);
            setQuestions(data || []);
        } catch (err: any) {
            toast.error(err.message || "فشل في تحميل الأسئلة");
        } finally {
            setLoading(false);
        }
    }, [isOpen, examId]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // Reset add form when modal closes
    useEffect(() => {
        if (!isOpen) setShowAddForm(false);
    }, [isOpen]);

    const handleAdded = (q: Question) => {
        setQuestions(prev => [...prev, q]);
        setShowAddForm(false);
    };

    const handleUpdated = (q: Question) => {
        const qId = q.id || (q as any)._id;
        setQuestions(prev => prev.map(p => (p.id || (p as any)._id) === qId ? q : p));
    };

    const handleDeleted = (id: string) => {
        setQuestions(prev => prev.filter(p => (p.id || (p as any)._id) !== id));
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0 rounded-3xl overflow-hidden">
                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border bg-muted/20 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl font-black flex items-center gap-2">
                                <HelpCircle className="text-primary" size={20} />
                                إدارة أسئلة الاختبار
                            </DialogTitle>
                            <DialogDescription className="text-sm">
                                <span className="font-semibold text-foreground">{examTitle}</span>
                                {" · "}
                                <span>{questions.length} أسئلة</span>
                            </DialogDescription>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-xl p-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </DialogHeader>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 min-h-0">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                            <Loader2 size={40} className="animate-spin text-primary" />
                            <p className="font-bold">جاري تحميل الأسئلة...</p>
                        </div>
                    ) : (
                        <>
                            {/* Add form */}
                            <AnimatePresence mode="popLayout">
                                {showAddForm && (
                                    <motion.div
                                        key="add-form"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <QuestionForm
                                            examId={examId}
                                            onSaved={handleAdded}
                                            onCancel={() => setShowAddForm(false)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Questions list */}
                            {questions.length === 0 && !showAddForm ? (
                                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                                        <HelpCircle size={32} className="opacity-30" />
                                    </div>
                                    <p className="font-bold text-base">لا توجد أسئلة بعد</p>
                                    <p className="text-sm">انقر على "إضافة سؤال" لبدء إنشاء الاختبار</p>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {questions.map((q, idx) => (
                                        <motion.div
                                            key={q.id || (q as any)._id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <QuestionCard
                                                question={q}
                                                index={idx}
                                                onEdit={(question) => setEditingQuestion(question)}
                                                onDelete={(question) => setDeletingQuestion(question)}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-border bg-muted/10 flex-shrink-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertTriangle size={14} className="text-amber-500" />
                        <span>تعديل النص فقط متاح بعد الإنشاء</span>
                    </div>
                    <Button
                        onClick={() => { setShowAddForm(true); }}
                        disabled={showAddForm}
                        className="rounded-xl gap-2 font-bold shadow-sm"
                        size="sm"
                    >
                        <Plus size={16} />
                        إضافة سؤال
                    </Button>
                </div>
            </DialogContent>

            {/* Sub-modals inside the main modal */}
            <QuestionEditModal
                isOpen={!!editingQuestion}
                onClose={() => setEditingQuestion(null)}
                examId={examId}
                question={editingQuestion}
                onSaved={handleUpdated}
            />

            <QuestionDeleteModal
                isOpen={!!deletingQuestion}
                onClose={() => setDeletingQuestion(null)}
                examId={examId}
                question={deletingQuestion}
                onDeleted={handleDeleted}
            />
        </Dialog>
    );
}
