"use client";

import React from "react";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Week } from "@/types";
import Link from "next/link";

interface WeekItemActionsProps {
    courseId: string;
    week: Week;
    onEdit: (week: Week) => void;
    onDelete: (week: Week) => void;
}

export function WeekItemActions({ courseId, week, onEdit, onDelete }: WeekItemActionsProps) {
    return (
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
                <Link href={`/dashboard/courses/${courseId}/weeks/${week._id || week.id}`}>
                    <span>إدارة المحتوى</span>
                    <ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                </Link>
            </Button>
        </div>
    );
}
