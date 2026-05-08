"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Clock, FileText, BadgeDollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Course } from "@/types";

interface CourseHeaderProps {
    course: Course;
    lessonsCount?: number;
    numOfExams?: number;
}

const levelColors: Record<string, string> = {
    "مبتدئ": "bg-green-500/10 text-green-700 border-green-200",
    "متوسط": "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    "متقدم": "bg-red-500/10 text-red-700 border-red-200",
};

export function CourseHeader({ course, lessonsCount,numOfExams }: CourseHeaderProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-sm overflow-hidden border-border shadow-md py-0">
                <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-72 h-48 md:h-[150px] bg-muted flex-shrink-0">
                        {course?.coverImage ? (
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${course.coverImage}`} alt={course.title} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                                <BookOpen size={48} className="opacity-40" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <CardContent className="px-6 py-4 flex-1">
                        <h1 className="text-2xl font-bold mb-1">{course.title}</h1>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><BookOpen size={12} /> الدروس</span>
                                <span className="font-semibold text-sm">{lessonsCount}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><FileText size={12} /> الاختبارات</span>
                                <span className="font-semibold text-sm">{numOfExams}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><BadgeDollarSign size={12} /> السعر</span>
                                <span className="font-semibold text-sm text-green-600 font-sans">{course.price} {"ج.م"}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </motion.div>
    );
}
