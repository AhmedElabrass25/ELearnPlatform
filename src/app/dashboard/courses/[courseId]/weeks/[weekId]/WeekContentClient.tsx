"use client"
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, FileText, ClipboardCheck } from "lucide-react";
import { Course, Week, Lesson, Material, Exam } from "@/types";
import { useWeekContent } from "./hooks/useWeekContent";
import { WeekBreadcrumbs } from "./components/WeekBreadcrumbs";
import { WeekHeader } from "./components/WeekHeader";
import { LessonsTabContent } from "./components/LessonsTabContent";
import { ExamsTabContent } from "./components/ExamsTabContent";

interface WeekContentClientProps {
    courseId: string;
    course: Course;
    week: Week;
    initialLessons: Lesson[];
    initialExams: Exam[];
    initialMaterials: Material[];
}

export function WeekContentClient({
    courseId,
    course,
    week,
    initialLessons,
    initialExams,
    initialMaterials,
}: WeekContentClientProps) {
    const {
        lessonsHook,
        materialsHook,
        examsHook,
    } = useWeekContent({
        courseId,
        week,
        initialLessons,
        initialExams,
        initialMaterials,
    });


    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <WeekBreadcrumbs 
                courseId={courseId} 
                courseTitle={course.title} 
                weekTitle={week.title} 
            />
            <WeekHeader 
                courseTitle={course.title} 
                weekTitle={week.title} 
                lessonsCount={lessonsHook.lessons.length}
                materialsCount={materialsHook.materials.length}
                examsCount={examsHook.exams.length}
                onAddLesson={lessonsHook.handleAdd}
                onAddMaterial={materialsHook.handleAdd}
                onAddExam={examsHook.handleAdd}
            />
            <Tabs defaultValue="lessons" className="w-full">
                <TabsList className="bg-muted/50 p-1 rounded-2xl h-auto mb-8 border border-border/50">
                    <TabTrigger value="lessons" icon={<Layers size={18} />} label="الدروس" />
                    <TabTrigger value="exams" icon={<ClipboardCheck size={18} />} label="الاختبارات" />
                </TabsList>

                <TabsContent value="lessons" className="mt-0">
                    <LessonsTabContent hook={lessonsHook} />
                </TabsContent>

                <TabsContent value="exams" className="mt-0">
                    <ExamsTabContent hook={examsHook} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function TabTrigger({ value, icon, label }: { value: string; icon: React.ReactNode; label: string }) {
    return (
        <TabsTrigger 
            value={value} 
            className="rounded-xl px-8 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary gap-2 font-bold"
        >
            {icon}
            {label}
        </TabsTrigger>
    );
}
