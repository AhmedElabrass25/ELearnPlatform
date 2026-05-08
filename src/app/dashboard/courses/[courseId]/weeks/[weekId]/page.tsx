import React from "react";
import { getCourseById } from "@/services/courses.service";
import { getWeekContent } from "@/services/weeks.service";
import { WeekContentClient } from "./WeekContentClient";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cookies } from "next/headers";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string; weekId: string }> | { courseId: string; weekId: string } }) {
    const resolvedParams = await Promise.resolve(params);
    return {
        title: `محتوى الأسبوع | Edu QR`,
        description: "إدارة محتوى الأسبوع من دروس واختبارات",
    };
}

export default async function WeekDetailPage({ params }: { params: Promise<{ courseId: string; weekId: string }> | { courseId: string; weekId: string } }) {
    // Correct Promise unraveling for Next.js 15+ routing
    const resolvedParams = await Promise.resolve(params);
    const { courseId, weekId } = resolvedParams;

    let course = null;
    let weekData = null;
    let lessons = [];
    let exams = [];
    let materials = [];

    try {
        course = await getCourseById(courseId);
        if (course) {
            const data = await getWeekContent(weekId);
            console.log(data)
            if (data) {
                weekData = data.week;
                lessons = data.lessons || [];
                exams = data.exams || [];
                materials = data.materials || [];
            }
        }
    } catch (error) {
        console.error("Error fetching week content:", error);
    }

    if (!course || !weekData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
                <AlertTriangle size={48} className="text-destructive" />
                <h2 className="text-2xl font-bold">الأسبوع غير موجود</h2>
                <Button asChild>
                    <Link href={`/dashboard/courses/${courseId}`}>العودة للكورس</Link>
                </Button>
            </div>
        );
    }

    return (
        <WeekContentClient 
            courseId={courseId} 
            course={course} 
            week={weekData} 
            initialLessons={lessons} 
            initialExams={exams} 
            initialMaterials={materials} 
        />
    );
}
