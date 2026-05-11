import React from "react";
import { Layout } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { IWeekDetailsData } from "../types";
import { WeekSection } from "./WeekSection";

interface CourseCurriculumProps {
    weeksWithLessons: IWeekDetailsData[];
    courseId: string;
}

export function CourseCurriculum({ weeksWithLessons, courseId }: CourseCurriculumProps) {
    return (
        <div className="space-y-6 text-right">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold">منهج الدورة الدراسي</h2>
                <div className="text-sm text-muted-foreground">
                    {weeksWithLessons.length} أسابيع تعليمة
                </div>
            </div>

            {weeksWithLessons.length > 0 ? (
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {weeksWithLessons.map((week, idx) => (
                        <WeekSection 
                            key={week.week._id || idx} 
                            week={week} 
                            idx={idx} 
                            courseId={courseId} 
                        />
                    ))}
                </Accordion>
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-muted/20">
                    <Layout className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold">المنهج الدراسي قيد التجهيز</h3>
                    <p className="text-muted-foreground mt-2">سيتم عرض قائمة الدروس والأسابيع هنا فور توفرها</p>
                </div>
            )}
        </div>
    );
}
