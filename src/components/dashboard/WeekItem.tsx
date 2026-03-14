"use client";

import React from "react";
import { ChevronDown, ChevronUp, Edit, Trash2, BookOpen, FileText, ClipboardCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Week } from "@/types";
import Link from "next/link";

interface WeekItemProps {
    courseId: string;
    week: Week;
    index: number;
    totalWeeks: number;
    onMove: (index: number, direction: 'up' | 'down') => void;
    onEdit: (week: Week) => void;
    onDelete: (week: Week) => void;
}

export function WeekItem({
    courseId,
    week,
    index,
    totalWeeks,
    onMove,
    onEdit,
    onDelete,
}: WeekItemProps) {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-5 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all bg-card group shadow-sm">
            {/* Order controls */}
            <div className="flex sm:flex-col gap-1 items-center justify-center text-muted-foreground bg-muted/30 rounded-xl p-2 sm:p-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                    disabled={index === 0}
                    onClick={() => onMove(index, 'up')}
                >
                    <ChevronUp size={18} />
                </Button>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                    disabled={index === totalWeeks - 1}
                    onClick={() => onMove(index, 'down')}
                >
                    <ChevronDown size={18} />
                </Button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 py-1">
                <h4 className="font-bold text-xl truncate text-foreground group-hover:text-primary transition-colors">
                    {week.title}
                </h4>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-lg">
                        <BookOpen size={15} className="text-primary" />
                        {week.lessons.length} دروس
                    </span>
                    <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-lg">
                        <FileText size={15} className="text-blue-500" />
                        {week.materials.length} مواد
                    </span>
                    <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-lg">
                        <ClipboardCheck size={15} className="text-amber-500" />
                        {week.exams.length} اختبارات
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-stretch sm:self-center">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(week)}
                    className="rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 h-10 w-10 transition-all border border-transparent hover:border-primary/20"
                    title="تعديل الأسبوع"
                >
                    <Edit size={18} />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(week)}
                    className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-10 w-10 transition-all border border-transparent hover:border-destructive/20"
                    title="حذف الأسبوع"
                >
                    <Trash2 size={18} />
                </Button>
                
                <div className="w-px h-8 bg-border mx-1 hidden sm:block" />
                
                <Button
                    asChild
                    variant="default"
                    className="gap-2 rounded-xl bg-primary hover:bg-primary/90 shadow-md h-10 px-4 group/btn"
                >
                    <Link href={`/dashboard/courses/${courseId}/weeks/${week.id}`}>
                        <span>إدارة المحتوى</span>
                        <ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
