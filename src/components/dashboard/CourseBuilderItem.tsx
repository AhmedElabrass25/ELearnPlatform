"use client";

import React from "react";
import Image from "next/image";
import { PlayCircle, Clock, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lesson } from "@/types";

interface CourseBuilderItemProps {
    lesson: Lesson;
    index: number;
    totalLessons: number;
    onMove: (index: number, direction: 'up' | 'down') => void;
    onEdit: (lesson: Lesson) => void;
    onDelete: (lesson: Lesson) => void;
}

export function CourseBuilderItem({
    lesson,
    index,
    totalLessons,
    onMove,
    onEdit,
    onDelete,
}: CourseBuilderItemProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-background group">
            {/* Order controls */}
            <div className="flex sm:flex-col gap-1 items-center self-center sm:self-auto text-muted-foreground">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    disabled={index === 0}
                    onClick={() => onMove(index, 'up')}
                >
                    ▲
                </Button>
                <span className="text-xs font-bold w-6 text-center">{lesson.order}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    disabled={index === totalLessons - 1}
                    onClick={() => onMove(index, 'down')}
                >
                    ▼
                </Button>
            </div>

            {/* Thumbnail */}
            <div className="relative w-full sm:w-32 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                {lesson.thumbnail ? (
                    <Image src={lesson.thumbnail} alt={lesson.title} fill className="object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                        <PlayCircle size={24} />
                    </div>
                )}
                {lesson.isFree && (
                    <div className="absolute top-1 right-1">
                        <Badge className="bg-green-500 hover:bg-green-600 text-[10px] px-1.5 py-0 h-4">مجاني</Badge>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base truncate">{lesson.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{lesson.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={14} /> {lesson.duration}</span>
                    {lesson.youtubeId && <span className="flex items-center gap-1 text-red-500"><PlayCircle size={14} /> YouTube</span>}
                </div>
            </div>

            {/* Actions */}
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
        </div>
    );
}
