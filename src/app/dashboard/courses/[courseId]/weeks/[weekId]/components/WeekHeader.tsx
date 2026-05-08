import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, PlayCircle, FileText, ClipboardCheck } from "lucide-react";

interface WeekHeaderProps {
    courseTitle: string;
    weekTitle: string;
    lessonsCount: number;
    materialsCount: number;
    examsCount: number;
    onAddLesson: () => void;
    onAddMaterial: () => void;
    onAddExam: () => void;
}

export function WeekHeader({
    courseTitle,
    weekTitle,
    lessonsCount,
    materialsCount,
    examsCount,
    onAddLesson,
    onAddMaterial,
    onAddExam
}: WeekHeaderProps) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 font-bold">إدارة المحتوى</Badge>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm font-medium text-muted-foreground">{courseTitle}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">{weekTitle}</h1>
                    <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm font-bold">
                            <PlayCircle className="w-5 h-5 text-primary" />
                            <span>{lessonsCount} دروس</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold">
                            <ClipboardCheck className="w-5 h-5 text-amber-500" />
                            <span>{examsCount} اختبارات</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button className="rounded-xl h-12 px-6 gap-2 bg-primary hover:bg-primary/90 shadow-lg text-white font-bold" onClick={onAddLesson}>
                        <Plus size={18} />
                        إضافة درس
                    </Button>
                    <Button variant="outline" className="rounded-xl h-12 px-6 gap-2 font-bold border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20" onClick={onAddExam}>
                        <Plus size={18} />
                        إنشاء اختبار
                    </Button>
                </div>
            </div>
        </div>
    );
}
