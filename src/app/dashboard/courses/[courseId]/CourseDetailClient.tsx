"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Play, AlertTriangle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseHeader } from "@/components/dashboard/CourseHeader";
import { Course, Week, Lesson } from "@/types";
import { useCourseWeeks } from "./_hooks/useCourseWeeks";
import { CourseWeeksTab } from "./_components/CourseWeeksTab";

interface CourseDetailClientProps {
    initialCourse: Course | null;
    courseId: string;
    token?: string;
    numOfLessons?: number;
    numOfExams?: number;
    hasError: boolean;
}

export function CourseDetailClient({ initialCourse, courseId, token,hasError, numOfLessons,numOfExams }: CourseDetailClientProps) {
    const router = useRouter();
    const [course] = useState<Course | null>(initialCourse);    
    const weeksHook = useCourseWeeks(courseId, (initialCourse?.weeks || []) as Week[]);
if(hasError) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <AlertTriangle size={48} className="text-destructive" />
        <h2 className="text-2xl font-bold">حدث خطأ في تحميل الكورس</h2>
        <Button asChild><Link href="/dashboard/courses">العودة للكورسات</Link></Button>
    </div>
    )
    if (!course) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
            <AlertTriangle size={48} className="text-destructive" />
            <h2 className="text-2xl font-bold">الكورس غير موجود</h2>
            <Button asChild><Link href="/dashboard/courses">العودة للكورسات</Link></Button>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl h-8" onClick={() => router.back()}><ArrowRight size={14} />رجوع</Button>
                <span>/</span><Link href="/dashboard/courses" className="hover:text-primary transition-colors">الكورسات</Link>
                {course.track && (
                    <>
                        <span>/</span>
                        <Link href={`/dashboard/paths/${course.track._id || course.track.id || ""}`} className="hover:text-primary transition-colors">
                            {course.track.name || course.track.title || "مسار غير معروف"}
                        </Link>
                    </>
                )}
                <span>/</span><span className="text-foreground font-medium truncate max-w-[200px]">{course.title}</span>
            </div>

            <CourseHeader course={course} lessonsCount={numOfLessons} numOfExams={numOfExams}/>

            <div className="pt-4">
                <CourseWeeksTab courseId={courseId} hookContext={weeksHook}   />
            </div>
        </div>
    );
}
