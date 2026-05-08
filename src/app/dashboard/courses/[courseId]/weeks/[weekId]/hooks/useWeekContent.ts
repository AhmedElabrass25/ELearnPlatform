"use client";

import { useLessonsManagement } from "./useLessonsManagement";
import { useMaterialsManagement } from "./useMaterialsManagement";
import { useExamsManagement } from "./useExamsManagement";
import { Course, Week, Lesson, Material, Exam } from "@/types";

interface UseWeekContentProps {
    courseId: string;
    week: Week;
    initialLessons: Lesson[];
    initialExams: Exam[];
    initialMaterials: Material[];
}

export function useWeekContent({
    courseId,
    week,
    initialLessons,
    initialExams,
    initialMaterials
}: UseWeekContentProps) {
    const weekId = week._id as string;
    const lessonsHook = useLessonsManagement(weekId, initialLessons);
    const materialsHook = useMaterialsManagement(initialMaterials);
    const examsHook = useExamsManagement(weekId, initialExams);
    return {
        lessonsHook,
        materialsHook,
        examsHook,
        week,
        courseId
    };
}
