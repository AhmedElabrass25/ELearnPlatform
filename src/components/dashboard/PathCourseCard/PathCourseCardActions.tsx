"use client";

import React from "react";
import Link from "next/link";
import { Settings, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";

interface PathCourseCardActionsProps {
    course: Course;
    onEdit: (course: Course) => void;
    onDelete: (course: Course) => void;
}

export function PathCourseCardActions({ course, onEdit, onDelete }: PathCourseCardActionsProps) {
    return (
        <div className="flex gap-2 pt-3 border-t border-border">
            <Button 
                asChild
                size="sm"
                variant="outline"
                className="flex-1 rounded-xl gap-1.5 text-xs"
            >
                <Link href={`/dashboard/courses/${course._id}`}>
                    <Settings size={13} />
                    إدارة الدروس
                </Link>
            </Button>
            <Button
                size="sm"
                variant="ghost"
                className="rounded-xl px-3 hover:bg-primary/10 hover:text-primary"
                onClick={() => onEdit(course)}
            >
                <Edit size={14} />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                className="rounded-xl px-3 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => onDelete(course)}
            >
                <Trash2 size={14} />
            </Button>
        </div>
    );
}
