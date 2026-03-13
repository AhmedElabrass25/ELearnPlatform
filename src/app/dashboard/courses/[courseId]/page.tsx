"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockData } from "@/lib/mockData";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Play, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseHeader } from "@/components/dashboard/CourseHeader";
import { LessonItem } from "@/components/dashboard/LessonItem";
import { LessonFormModal, LessonDeleteModal } from "@/components/dashboard/LessonModals";
import { Lesson, Course } from "@/types";

const emptyForm = { title: "", description: "", duration: "", youtubeId: "", thumbnail: "", isFree: false, order: 1 };

function extractYoutubeId(url: string): string {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : url;
}

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const course = mockData.courses.find((c) => c.id === courseId) as Course;
    const path = course ? mockData.paths.find((p) => p.id === course.pathId) : null;
    const rawLessons = (mockData.lessons as Record<string, Lesson[]>)[courseId] || [];
    const [lessons, setLessons] = useState<Lesson[]>([...rawLessons].sort((a, b) => a.order - b.order));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
    const [formData, setFormData] = useState(emptyForm);

    if (!course) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
            <AlertTriangle size={48} className="text-destructive" />
            <h2 className="text-2xl font-bold">الكورس غير موجود</h2>
            <Button asChild><Link href="/dashboard/courses">العودة للكورسات</Link></Button>
        </div>
    );

    const handleAdd = () => { setEditingLesson(null); setFormData({ ...emptyForm, order: lessons.length + 1 }); setIsModalOpen(true); };
    const handleEdit = (lesson: Lesson) => { setEditingLesson(lesson); setFormData({ ...lesson }); setIsModalOpen(true); };
    const handleSubmit = () => {
        const ytId = extractYoutubeId(formData.youtubeId);
        const lessonData = { ...formData, youtubeId: ytId, videoUrl: `https://www.youtube.com/embed/${ytId}`, thumbnail: formData.thumbnail || `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` };
        if (editingLesson) setLessons(lessons.map((l) => (l.id === editingLesson.id ? { ...l, ...lessonData } : l)));
        else setLessons([...lessons, { id: `lesson-${Date.now()}`, ...lessonData } as Lesson].sort((a, b) => a.order - b.order));
        setIsModalOpen(false);
    };

    const confirmDelete = () => { if (lessonToDelete) setLessons(lessons.filter((l) => l.id !== lessonToDelete.id)); setIsDeleteModalOpen(false); };
    const moveLesson = (index: number, dir: "up" | "down") => {
        const newLessons = [...lessons];
        const target = dir === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= newLessons.length) return;
        [newLessons[index], newLessons[target]] = [newLessons[target], newLessons[index]];
        newLessons.forEach((l, i) => (l.order = i + 1));
        setLessons(newLessons);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl h-8" onClick={() => router.back()}><ArrowRight size={14} />رجوع</Button>
                <span>/</span><Link href="/dashboard/courses" className="hover:text-primary transition-colors">الكورسات</Link>
                {path && <><span>/</span><Link href={`/dashboard/paths/${path.id}`} className="hover:text-primary transition-colors">{path.title}</Link></>}
                <span>/</span><span className="text-foreground font-medium truncate max-w-[200px]">{course.title}</span>
            </div>

            <CourseHeader course={course} lessonsCount={lessons.length} />

            <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border">
                    <div>
                        <CardTitle className="text-xl">دروس الكورس</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{lessons.length} درس • اسحب للترتيب أو استخدم أزرار التحريك</p>
                    </div>
                    <Button onClick={handleAdd} className="gap-2 rounded-xl bg-primary hover:bg-primary/90 shadow-md"><Plus size={16} />إضافة درس</Button>
                </CardHeader>
                <CardContent className="p-6">
                    {lessons.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground"><Play size={48} className="mx-auto mb-4 opacity-30" /><p className="text-lg font-medium">لا توجد دروس بعد</p></div>
                    ) : (
                        <div className="space-y-3"><AnimatePresence>{lessons.map((lesson, index) => (
                            <LessonItem key={lesson.id} lesson={lesson} index={index} totalLessons={lessons.length} onMove={moveLesson} onEdit={handleEdit} onDelete={(l) => { setLessonToDelete(l); setIsDeleteModalOpen(true); }} />
                        ))}</AnimatePresence></div>
                    )}
                </CardContent>
            </Card>

            <LessonFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingLesson={editingLesson} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            <LessonDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} lessonTitle={lessonToDelete?.title || ""} onConfirm={confirmDelete} />
        </div>
    );
}
