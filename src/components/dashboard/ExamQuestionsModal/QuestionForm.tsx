"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, HelpCircle, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Question, QuestionOption } from "@/types";
import { createQuestion, updateQuestion } from "@/services/questions.service";
import { toast } from "sonner";

// Helpers
export const emptyOption = (): QuestionOption => ({ text: "", isCorrect: false });
export const emptyQuestion = () => ({
    questionText: "",
    options: [emptyOption(), emptyOption(), emptyOption(), emptyOption()],
    mark: 5,
});

export interface QuestionFormProps {
    examId: string;
    editingQuestion?: Question | null;
    onSaved: (q: Question) => void;
    onCancel: () => void;
}

export function QuestionForm({ examId, editingQuestion, onSaved, onCancel }: QuestionFormProps) {
    const [questionText, setQuestionText] = useState(editingQuestion?.questionText || "");
    const [mark, setMark] = useState(editingQuestion?.mark ?? 5);
    const [options, setOptions] = useState<QuestionOption[]>(
        editingQuestion?.options?.length
            ? editingQuestion.options
            : [emptyOption(), emptyOption(), emptyOption(), emptyOption()]
    );
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!questionText.trim()) e.questionText = "نص السؤال مطلوب";
        if (options.some(o => !o.text.trim())) e.options = "جميع خيارات الإجابة مطلوبة";
        if (!options.some(o => o.isCorrect)) e.correct = "يجب تحديد إجابة صحيحة واحدة على الأقل";
        if (mark < 1) e.mark = "الدرجة يجب أن تكون 1 على الأقل";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

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

    const handleSave = async () => {
        if (!validate()) return;
        setSaving(true);
        try {
            if (editingQuestion) {
                // Update questionText only
                const qId = editingQuestion.id;
                await updateQuestion(examId, qId, { questionText: questionText.trim() });
                onSaved({ ...editingQuestion, questionText: questionText.trim() });
                toast.success("تم تحديث السؤال بنجاح");
            } else {
                // Create full question
                const payload = {
                    questionText: questionText.trim(),
                    options: options.map(o => ({ text: o.text.trim(), isCorrect: o.isCorrect })),
                    mark,
                };
                const createdQuestion = (await createQuestion(examId, payload)) as any;
                const finalQuestion: Question = (createdQuestion && createdQuestion.id) ? createdQuestion : {
                    id: `q-${Date.now()}`,
                    questionText: payload.questionText,
                    options: payload.options,
                    mark: payload.mark,
                };
                onSaved(finalQuestion);
                toast.success("تم إضافة السؤال بنجاح");
            }
        } catch (err: any) {
            toast.error(err.message || "حدث خطأ أثناء الحفظ");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.02] p-5 space-y-4">
            {/* Question Text */}
            <div className="space-y-1.5">
                <Label className="text-sm font-bold flex items-center gap-2">
                    <HelpCircle size={14} className="text-primary" />
                    نص السؤال <span className="text-destructive">*</span>
                </Label>
                <Input
                    value={questionText}
                    onChange={e => { setQuestionText(e.target.value); if (errors.questionText) setErrors(p => ({ ...p, questionText: "" })); }}
                    placeholder="اكتب نص السؤال هنا..."
                    className={`rounded-xl h-11 ${errors.questionText ? "border-destructive" : ""}`}
                    disabled={saving}
                />
                {errors.questionText && <p className="text-xs text-destructive">{errors.questionText}</p>}
            </div>

            {/* Options — only on create */}
            {!editingQuestion && (
                <div className="space-y-2">
                    <Label className="text-sm font-bold">
                        خيارات الإجابة <span className="text-destructive">*</span>
                        <span className="text-xs text-muted-foreground font-normal mr-2">(انقر ✓ لتحديد الإجابة الصحيحة)</span>
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
                                    title="تعيين كإجابة صحيحة"
                                >
                                    {opt.isCorrect ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                </button>
                                <Input
                                    value={opt.text || ""}
                                    onChange={e => handleOptionText(idx, e.target.value)}
                                    placeholder={`الخيار ${idx + 1}`}
                                    className={`rounded-xl flex-1 h-10 ${opt.isCorrect ? "border-emerald-400 ring-1 ring-emerald-200" : ""} ${errors.options ? "border-destructive" : ""}`}
                                    disabled={saving}
                                />
                            </div>
                        ))}
                    </div>
                    {errors.options && <p className="text-xs text-destructive">{errors.options}</p>}
                    {errors.correct && <p className="text-xs text-destructive">{errors.correct}</p>}
                </div>
            )}

            {/* Mark */}
            {!editingQuestion && (
                <div className="space-y-1.5">
                    <Label className="text-sm font-bold">درجة السؤال</Label>
                    <Input
                        type="number"
                        min={1}
                        value={mark}
                        onChange={e => setMark(Math.max(1, parseInt(e.target.value) || 1))}
                        className="rounded-xl h-10 w-28"
                        disabled={saving}
                    />
                    {errors.mark && <p className="text-xs text-destructive">{errors.mark}</p>}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
                <Button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    size="sm"
                    className="rounded-xl gap-2 font-bold"
                >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {editingQuestion ? "حفظ التعديلات" : "إضافة السؤال"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={saving} className="rounded-xl">
                    إلغاء
                </Button>
            </div>
        </div>
    );
}
