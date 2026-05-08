import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Clock, Layers, HelpCircle, Edit3, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExamItemProps {
    exam: any;
    onViewAttempts: (exam: any) => void;
    onManageQuestions: (exam: any) => void;
    onEdit: (exam: any) => void;
    onDelete: (exam: any) => void;
}

export function ExamItem({ exam, onViewAttempts, onManageQuestions, onEdit, onDelete }: ExamItemProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-center justify-between p-5 rounded-2xl border-2 border-primary/10 bg-primary/5 hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                        <ClipboardCheck size={28} />
                    </div>
                    <div>
                        <h4 className="font-black text-xl text-amber-600 dark:text-amber-400">{exam.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm font-medium text-muted-foreground">
                            {exam.duration != null && <span className="flex items-center gap-1"><Clock size={14} className="text-blue-500" /> {exam.duration} دقيقة</span>}
                            {exam.totalMarks != null && <span className="flex items-center gap-1"><Layers size={14} className="text-amber-500" /> {exam.totalMarks} درجة كلية</span>}
                            {exam.questions?.length > 0 && <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{exam.questions.length} أسئلة</span>}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Button
                        variant="ghost"
                        className="rounded-xl h-10 px-3 gap-1.5 font-bold hover:bg-green-500/10 text-green-600 text-sm"
                        onClick={() => onViewAttempts(exam)}
                    >
                        <Users size={15} />
                        النتائج
                    </Button>
                    <Button
                        variant="ghost"
                        className="rounded-xl h-10 px-3 gap-1.5 font-bold hover:bg-primary/10 text-primary text-sm"
                        onClick={() => onManageQuestions(exam)}
                    >
                        <HelpCircle size={15} />
                        أسئلة
                    </Button>
                    <Button variant="ghost" className="rounded-xl h-10 px-3 gap-1.5 font-bold hover:bg-amber-500/10 text-amber-600 text-sm" onClick={() => onEdit(exam)}>
                        <Edit3 size={15} />
                        تعديل
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete(exam)}>
                        <Trash2 size={18} />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
