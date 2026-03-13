"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Clock, FileText, BadgeDollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Course } from "@/types";

interface CourseHeaderProps {
    course: Course;
    lessonsCount: number;
}

const levelColors: Record<string, string> = {
    "مبتدئ": "bg-green-500/10 text-green-700 border-green-200",
    "متوسط": "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    "متقدم": "bg-red-500/10 text-red-700 border-red-200",
};

export function CourseHeader({ course, lessonsCount }: CourseHeaderProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-3xl overflow-hidden border-border shadow-md">
                <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-72 h-48 md:h-auto bg-muted flex-shrink-0">
                        {course.image ? (
                            <Image src={course.image} alt={course.title} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                                <BookOpen size={48} className="opacity-40" />
                            </div>
                        )}
                        {course.isPopular && (
                            <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                الأكثر طلباً
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <CardContent className="p-6 flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${levelColors[course.level] || "bg-muted"}`}>
                                {course.level}
                            </span>
                            <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border font-medium">
                                {course.type}
                            </span>
                            {course.topic && (
                                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                                    {course.topic}
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl font-bold mb-1">{course.title}</h1>
                        {course.subtitle && <p className="text-muted-foreground mb-4">{course.subtitle}</p>}

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> المدة</span>
                                <span className="font-semibold text-sm">{course.duration}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><BookOpen size={12} /> الدروس</span>
                                <span className="font-semibold text-sm">{lessonsCount}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><FileText size={12} /> الاختبارات</span>
                                <span className="font-semibold text-sm">{course.examsCount ?? 0}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><BadgeDollarSign size={12} /> السعر</span>
                                <span className="font-semibold text-sm text-green-600 font-sans">{course.price} {course.currency || "ج.م"}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </motion.div>
    );
}
