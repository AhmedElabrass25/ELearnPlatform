"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, Settings, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";

const levelColors: Record<string, string> = {
    "مبتدئ": "bg-green-500/10 text-green-700 border-green-200",
    "متوسط": "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    "متقدم": "bg-red-500/10 text-red-700 border-red-200",
};

interface PathCourseCardProps {
    course: Course;
    index: number;
    onEdit: (course: Course) => void;
    onDelete: (course: Course) => void;
}

export function PathCourseCard({ course, index, onEdit, onDelete }: PathCourseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-border rounded-2xl p-5 bg-card hover:shadow-md transition-shadow group"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>
                    {course.subtitle && (
                        <p className="text-xs text-muted-foreground mt-0.5">{course.subtitle}</p>
                    )}
                </div>
                {course.isPopular && (
                    <Badge className="text-xs bg-primary/10 text-primary border-primary/20 mr-2">
                        الأكثر طلباً
                    </Badge>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full border font-medium ${levelColors[course.level] || "bg-muted"}`}>
                    {course.level}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {course.type}
                </span>
                {course.topic && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {course.topic}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {course.duration}
                </span>
                {course.lessonsCount !== undefined && (
                    <span className="flex items-center gap-1">
                        <BookOpen size={13} />
                        {course.lessonsCount} درس
                    </span>
                )}
                <span className="text-green-600 font-semibold font-sans mr-auto">
                    {course.price} {course.currency || "ج.م"}
                </span>
            </div>

            <div className="flex gap-2 pt-3 border-t border-border">
                <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="flex-1 rounded-xl gap-1.5 text-xs"
                >
                    <Link href={`/dashboard/courses/${course.id}`}>
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
        </motion.div>
    );
}
