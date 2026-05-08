"use client";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/types";

interface LessonItemActionsProps {
    lesson: Lesson;
    onEdit: (lesson: Lesson) => void;
    onDelete: (lesson: Lesson) => void;
}

export function LessonItemActions({ lesson, onEdit, onDelete }: LessonItemActionsProps) {
    return (
        <div className="flex gap-1 flex-shrink-0">
            <Button
                size="sm"
                variant="ghost"
                className="rounded-xl px-3 hover:bg-primary/10 hover:text-primary"
                onClick={() => onEdit(lesson)}
            >
                <Edit size={14} />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                className="rounded-xl px-3 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => onDelete(lesson)}
            >
                <Trash2 size={14} />
            </Button>
        </div>
    );
}
