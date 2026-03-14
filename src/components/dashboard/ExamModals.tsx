"use client";

import React, { useState } from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Question, Exam } from "@/types";
import { Plus, Trash2, CheckCircle2, Circle, HelpCircle, GripVertical } from "lucide-react";

interface ExamModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingExam: Exam | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function ExamModal({
    isOpen,
    onClose,
    editingExam,
    formData,
    setFormData,
    onSubmit,
}: ExamModalProps) {
    const addQuestion = () => {
        const newQuestion: Question = {
            id: `q-${Date.now()}`,
            text: "",
            type: "mcq",
            options: ["", "", "", ""],
            correctAnswer: "",
            score: 5
        };
        setFormData({ ...formData, questions: [...formData.questions, newQuestion] });
    };

    const removeQuestion = (id: string) => {
        setFormData({ ...formData, questions: formData.questions.filter((q: Question) => q.id !== id) });
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setFormData({
            ...formData,
            questions: formData.questions.map((q: Question) => 
                q.id === id ? { ...q, ...updates } : q
            )
        });
    };

    const handleOptionChange = (qId: string, optIdx: number, val: string) => {
        const question = formData.questions.find((q: Question) => q.id === qId);
        if (!question) return;
        const newOptions = [...(question.options || [])];
        newOptions[optIdx] = val;
        updateQuestion(qId, { options: newOptions });
    };

    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingExam ? "تعديل الاختبار" : "إنشاء اختبار جديد"}
            description="أنشئ اختبارات تفاعلية لتقييم فهم الطلاب"
            onSubmit={onSubmit}
            submitLabel={editingExam ? "حفظ الاختبار" : "إنشاء الاختبار"}
        >
            <div className="space-y-6 py-2">
                <div className="grid gap-4 bg-muted/30 p-4 rounded-2xl border border-border">
                    <div className="space-y-2">
                        <Label className="text-sm font-bold">عنوان الاختبار</Label>
                        <Input
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="مثال: اختبار الأسبوع الأول الشامل"
                            className="rounded-xl h-11 bg-background"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-bold">وصف الاختبار</Label>
                        <Input
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="وصف مختصر للأهداف التعليمية للاختبار"
                            className="rounded-xl h-11 bg-background"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-bold flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-primary" />
                            الأسئلة ({formData.questions.length})
                        </h4>
                        <Button type="button" variant="outline" size="sm" onClick={addQuestion} className="rounded-xl gap-2 font-bold border-primary/20 text-primary hover:bg-primary/5">
                            <Plus size={16} />
                            إضافة سؤال
                        </Button>
                    </div>

                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                        {formData.questions.map((q: Question, idx: number) => (
                            <div key={q.id} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4 relative group">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                            {idx + 1}
                                        </div>
                                        <Select 
                                            value={q.type} 
                                            onValueChange={(val) => updateQuestion(q.id, { 
                                                type: val as any, 
                                                options: val === 'true-false' ? undefined : ["", "", "", ""],
                                                correctAnswer: val === 'true-false' ? true : ""
                                            })}
                                        >
                                            <SelectTrigger className="h-9 w-36 rounded-lg text-xs font-bold">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="mcq">اختيار من متعدد</SelectItem>
                                                <SelectItem value="true-false">صح / خطأ</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => removeQuestion(q.id)}
                                        className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">نص السؤال</Label>
                                    <Input
                                        value={q.text}
                                        onChange={e => updateQuestion(q.id, { text: e.target.value })}
                                        placeholder="اكتب السؤال هنا..."
                                        className="rounded-xl border-dashed focus:border-solid"
                                        required
                                    />
                                </div>

                                {q.type === 'true-false' ? (
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">الإجابة الصحيحة</Label>
                                        <div className="flex gap-4">
                                            {[true, false].map((val) => (
                                                <button
                                                    key={String(val)}
                                                    type="button"
                                                    onClick={() => updateQuestion(q.id, { correctAnswer: val })}
                                                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${
                                                        q.correctAnswer === val
                                                            ? 'bg-primary/5 border-primary text-primary'
                                                            : 'border-border text-muted-foreground hover:border-primary/30'
                                                    }`}
                                                >
                                                    {val ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                                    {val ? 'صح' : 'خطأ'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">الخيارات (حدد الإجابة الصحيحة)</Label>
                                        {q.options?.map((opt, optIdx) => (
                                            <div key={optIdx} className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuestion(q.id, { correctAnswer: opt })}
                                                    className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                                        q.correctAnswer === opt && opt !== ""
                                                            ? 'bg-primary border-primary text-white shadow-md'
                                                            : 'border-border hover:border-primary/50 text-muted-foreground'
                                                    }`}
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </button>
                                                <Input
                                                    value={opt}
                                                    onChange={e => handleOptionChange(q.id, optIdx, e.target.value)}
                                                    placeholder={`الخيار ${optIdx + 1}`}
                                                    className={`rounded-xl flex-1 ${q.correctAnswer === opt && opt !== "" ? 'border-primary ring-1 ring-primary/20' : ''}`}
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                                    <Label className="text-xs font-bold text-muted-foreground">درجة السؤال:</Label>
                                    <Input
                                        type="number"
                                        value={q.score}
                                        onChange={e => updateQuestion(q.id, { score: parseInt(e.target.value) || 0 })}
                                        className="h-8 w-20 rounded-lg text-center font-bold"
                                        min="0"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminModal>
    );
}

interface ExamDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    examTitle: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function ExamDeleteModal({
    isOpen,
    onClose,
    examTitle,
    onConfirm,
}: ExamDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تأكيد حذف الاختبار"
            description="سيتم حذف هذا الاختبار نهائياً"
            onSubmit={onConfirm}
            submitLabel="حذف الاختبار"
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف الاختبار: {examTitle}
            </div>
        </AdminModal>
    );
}
