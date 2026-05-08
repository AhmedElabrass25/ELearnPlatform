import { useState } from "react";
import { Lesson } from "@/types";

const emptyLessonForm = { title: "", description: "", duration: "", youtubeId: "", thumbnail: "", isFree: false, order: 1 };

function extractYoutubeId(url: string): string {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : url;
}

export function useCourseLessons(initialLessons: Lesson[]) {
    const [lessons, setLessons] = useState<Lesson[]>([...initialLessons].sort((a: any, b: any) => a.order - b.order));
    
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [isLessonDeleteModalOpen, setIsLessonDeleteModalOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
    const [lessonFormData, setLessonFormData] = useState(emptyLessonForm);

    const handleAddLesson = () => { setEditingLesson(null); setLessonFormData({ ...emptyLessonForm, order: lessons.length + 1 }); setIsLessonModalOpen(true); };
    const handleEditLesson = (lesson: Lesson) => { setEditingLesson(lesson); setLessonFormData({ ...(lesson as any) }); setIsLessonModalOpen(true); };
    const handleLessonSubmit = () => {
        const ytId = extractYoutubeId(lessonFormData.youtubeId);
        const lessonData = { ...lessonFormData, youtubeId: ytId, videoUrl: `https://www.youtube.com/embed/${ytId}`, thumbnail: lessonFormData.thumbnail || `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` };
        if (editingLesson) setLessons(lessons.map((l) => (l.id === editingLesson.id ? { ...l, ...lessonData } as any : l)));
        else setLessons([...lessons, { id: `lesson-${Date.now()}`, ...lessonData } as any].sort((a, b) => a.order - b.order));
        setIsLessonModalOpen(false);
    };
    const confirmDeleteLesson = () => { if (lessonToDelete) setLessons(lessons.filter((l) => l.id !== lessonToDelete.id)); setIsLessonDeleteModalOpen(false); };
    const moveLesson = (index: number, dir: "up" | "down") => {
        const newLessons = [...lessons];
        const target = dir === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= newLessons.length) return;
        [newLessons[index], newLessons[target]] = [newLessons[target], newLessons[index]];
        newLessons.forEach((l, i) => (l.order = i + 1));
        setLessons(newLessons);
    };

    return {
        lessons,
        isLessonModalOpen,
        setIsLessonModalOpen,
        editingLesson,
        setEditingLesson,
        isLessonDeleteModalOpen,
        setIsLessonDeleteModalOpen,
        lessonToDelete,
        setLessonToDelete,
        lessonFormData,
        setLessonFormData,
        handleAddLesson,
        handleEditLesson,
        handleLessonSubmit,
        confirmDeleteLesson,
        moveLesson
    };
}
