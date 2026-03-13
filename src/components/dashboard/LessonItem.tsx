"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, Unlock, Lock, Edit, Trash2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Lesson } from "@/types";

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
            {/* Order Controls */}
            <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onMove(index, "up")}
                    disabled={index === 0}
                    className="p-0.5 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronUp size={14} />
                </button>
                <button
                    onClick={() => onMove(index, "down")}
                    disabled={index === totalLessons - 1}
                    className="p-0.5 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronDown size={14} />
                </button>
            </div>

            {/* Order Badge */}
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                {lesson.order}
            </div>

            {/* Thumbnail */}
            {lesson.thumbnail && (
                <div className="relative w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <Image
                        src={lesson.thumbnail}
                        alt={lesson.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm truncate">{lesson.title}</p>
                    {lesson.isFree ? (
                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-700 border-green-200 flex-shrink-0">
                            <Unlock size={10} className="mr-1" /> مجاني
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="text-xs bg-muted flex-shrink-0">
                            <Lock size={10} className="mr-1" /> مدفوع
                        </Badge>
                    )}
                </div>
                {lesson.description && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{lesson.description}</p>
                )}
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={11} />{lesson.duration}</span>
                    {lesson.youtubeId && (
                        <span className="text-xs text-muted-foreground font-mono opacity-70">{lesson.youtubeId}</span>
                    )}
                </div>
            </div>

            {/* Actions */}
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
        </motion.div>
    );
}
