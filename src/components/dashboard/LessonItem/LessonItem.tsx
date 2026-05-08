"use client";
import { motion } from "framer-motion";
import { Lesson } from "@/types";
import { LessonItemActions } from "./LessonItemActions";

interface LessonItemProps {
    lesson: Lesson;
    index: number;
    totalLessons: number;
    onMove: (index: number, direction: "up" | "down") => void;
    onEdit: (lesson: Lesson) => void;
    onDelete: (lesson: Lesson) => void;
}

export function LessonItem({ lesson, index, totalLessons, onMove, onEdit, onDelete }: LessonItemProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:shadow-sm transition-shadow group"
        > 

            {/* Actions */}
           <LessonItemActions lesson={lesson} onEdit={onEdit} onDelete={onDelete} />  
            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="text-right gap-2">
                    <p className="font-semibold text-sm truncate">{lesson.title}</p>
                </div>
                {lesson.description && (
                    <p className="text-xs text-right text-muted-foreground truncate mt-0.5">{lesson.description}</p>
                )}
            </div>
            {/* Order Badge */}
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                {lesson.order}
            </div>

        </motion.div>
    );
}
