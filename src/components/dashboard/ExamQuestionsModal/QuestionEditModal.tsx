"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Question, QuestionOption } from "@/types";
import { updateQuestion } from "@/services/questions.service";
import { toast } from "sonner";
import { AdminModal } from "@/components/admin/AdminModal";
import { emptyOption } from "./QuestionForm";

interface QuestionEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    examId: string;
    question: Question | null;
    onSaved: (q: Question) => void;
}

export function QuestionEditModal({ isOpen, onClose, examId, question, onSaved }: QuestionEditModalProps) {
    const [questionText, setQuestionText] = useState("");
    const [mark, setMark] = useState(5);
    const [options, setOptions] = useState<QuestionOption[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (question) {
            setQuestionText(question.questionText || "");
            setMark(question.mark || 5);
            setOptions(question.options?.length ? question.options : [emptyOption(), emptyOption(), emptyOption(), emptyOption()]);
            setErrors({});
        }
    }, [question, isOpen]);

    const handleOptionText = (idx: number, val: string) => {
        const next = [...options];
        next[idx] = { ...next[idx], text: val };
        setOptions(next);
        if (errors.options) setErrors(p => ({ ...p, options: "" }));
    };

    const toggleCorrect = (idx: number) => {
        const next = options.map((o, i) => ({ ...o, isCorrect: i === idx }));
        setOptions(next);
        if (errors.correct) setErrors(p => ({ ...p, correct: "" }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question) return;
        
        const eErrors: Record<string, string> = {};
        if (!questionText.trim()) eErrors.questionText = "نص السؤال مطلوب";
        if (options.some(o => !o.text.trim())) eErrors.options = "جميع خيارات الإجابة مطلوبة";
        if (!options.some(o => o.isCorrect)) eErrors.correct = "يجب تحديد إجابة صحيحة واحدة على الأقل";
        if (mark < 1) eErrors.mark = "الدرجة يجب أن تكون 1 على الأقل";
        setErrors(eErrors);
        
        if (Object.keys(eErrors).length > 0) return;

        setSaving(true);
        try {
            const qId = question.id || (question as any)._id; // Added fallback just like Exam
            const payload = {
                questionText: questionText.trim(),
                options: options.map(o => ({ text: o.text.trim(), isCorrect: o.isCorrect })),
                mark
            };
            await updateQuestion(examId, qId as string, payload);
            onSaved({ ...question, ...payload } as Question);
            toast.success("تم تحديث السؤال بنجاح");
            onClose();
        } catch (err: any) {
            toast.error(err.message || "فشل في تحديث السؤال");
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="تحديث تفاصيل السؤال"
            description="قم بتعديل نص السؤال، الخيارات، أو الدرجة عبر هذا النموذج."
            onSubmit={handleSave}
            submitLabel="حفظ التعديلات"
            isLoading={saving}
        >
            <div className="space-y-4 py-2">
                <div className="space-y-2">
                    <Label htmlFor="edit-q-text" className="text-sm font-bold flex items-center gap-2">
                        <HelpCircle size={15} className="text-primary" />
                        نص السؤال <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="edit-q-text"
                        value={questionText}
                        onChange={e => { setQuestionText(e.target.value); if (errors.questionText) setErrors(p => ({ ...p, questionText: "" })); }}
                        placeholder="اكتب نص السؤال الجديد..."
                        className={`rounded-xl h-12 ${errors.questionText ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {errors.questionText && <p className="text-xs text-destructive font-medium">{errors.questionText}</p>}
                </div>
                
                <div className="space-y-2">
                    <Label className="text-sm font-bold flex items-center gap-2">
                        خيارات الإجابة <span className="text-destructive">*</span>
                        <span className="text-xs text-muted-foreground font-normal ml-auto">(انقر ✓ لتحديد الإجابة الصحيحة)</span>
                    </Label>
                    <div className="space-y-2">
                        {options.map((opt, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <button
                                    type="button"
                                    onClick={() => toggleCorrect(idx)}
                                    className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                        opt.isCorrect
                                            ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                                            : "border-border text-muted-foreground hover:border-emerald-400"
                                    }`}
                                >
                                    {opt.isCorrect ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                </button>
                                <Input
                                    value={opt.text || ""}
                                    onChange={e => handleOptionText(idx, e.target.value)}
                                    placeholder={`الخيار ${idx + 1}`}
                                    className={`rounded-xl h-10 ${opt.isCorrect ? "border-emerald-400 ring-1 ring-emerald-200" : ""} ${errors.options ? "border-destructive" : ""}`}
                                />
                            </div>
                        ))}
                    </div>
                    {errors.options && <p className="text-xs text-destructive">{errors.options}</p>}
                    {errors.correct && <p className="text-xs text-destructive">{errors.correct}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-bold">الدرجة</Label>
                    <Input
                        type="number"
                        min={1}
                        value={mark}
                        onChange={e => setMark(Math.max(1, parseInt(e.target.value) || 1))}
                        className={`rounded-xl h-10 w-28 ${errors.mark ? "border-destructive" : ""}`}
                    />
                    {errors.mark && <p className="text-xs text-destructive">{errors.mark}</p>}
                </div>
            </div>
        </AdminModal>
    );
}
