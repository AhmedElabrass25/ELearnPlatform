"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/types";

interface CourseBuilderItemActionsProps {
    lesson: Lesson;
    onEdit: (lesson: Lesson) => void;
    onDelete: (lesson: Lesson) => void;
}

export function CourseBuilderItemActions({ lesson, onEdit, onDelete }: CourseBuilderItemActionsProps) {
    return (
        <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(lesson)}
                className="flex-1 sm:flex-none gap-2 rounded-lg"
            >
                <Edit size={14} />
                <span>تعديل</span>
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(lesson)}
                className="flex-1 sm:flex-none gap-2 rounded-lg text-destructive hover:bg-destructive/10 border-destructive/20"
            >
                <Trash2 size={14} />
                <span>حذف</span>
            </Button>
        </div>
    );
}
