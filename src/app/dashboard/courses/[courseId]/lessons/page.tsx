"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Plus, PlayCircle } from "lucide-react";
import { mockData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/types";
import { CourseBuilderItem } from "@/components/dashboard/CourseBuilderItem";
import { CourseBuilderModal, CourseBuilderDeleteModal } from "@/components/dashboard/CourseBuilderModals";

export default function CourseBuilderPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const course = mockData.courses.find(c => c.id === courseId);
    const [lessons, setLessons] = useState((mockData.lessons as any)[courseId] || [] as Lesson[]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
    const [formData, setFormData] = useState({ title: "", description: "", duration: "", youtubeId: "", isFree: false });

    if (!course) return <div className="flex flex-col items-center justify-center min-h-[60vh]"><h2 className="text-2xl font-bold mb-2">الكورس غير موجود</h2><Button onClick={() => router.push('/dashboard/courses')}>العودة</Button></div>;

    const handleAdd = () => { setEditingLesson(null); setFormData({ title: "", description: "", duration: "", youtubeId: "", isFree: false }); setIsModalOpen(true); };
    const handleEdit = (l: Lesson) => { setEditingLesson(l); setFormData({ title: l.title, description: l.description || "", duration: l.duration, youtubeId: l.youtubeId || "", isFree: l.isFree || false }); setIsModalOpen(true); };
    const handleSubmit = () => {
        const data = { ...formData, videoUrl: `https://www.youtube.com/embed/${formData.youtubeId}`, thumbnail: `https://img.youtube.com/vi/${formData.youtubeId}/maxresdefault.jpg` };
        if (editingLesson) setLessons(lessons.map(l => l.id === editingLesson.id ? { ...l, ...data } : l));
        else setLessons([...lessons, { id: `lesson${Date.now()}`, ...data, order: lessons.length + 1 } as Lesson]);
        setIsModalOpen(false);
    };

    const moveLesson = (index: number, dir: 'up' | 'down') => {
        if ((dir === 'up' && index === 0) || (dir === 'down' && index === lessons.length - 1)) return;
        const newLessons = [...lessons];
        const target = dir === 'up' ? index - 1 : index + 1;
        [newLessons[index], newLessons[target]] = [newLessons[target], newLessons[index]];
        setLessons(newLessons.map((l, i) => ({ ...l, order: i + 1 })));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/courses')} className="rounded-xl flex-shrink-0"><ArrowRight size={20} /></Button>
                    <div><h1 className="text-2xl font-bold tracking-tight">منشئ الكورس</h1><p className="text-muted-foreground flex items-center gap-2 mt-1"><span className="font-semibold text-foreground">{course.title}</span><span className="text-muted-foreground/50">•</span><span>{lessons.length} دروس</span></p></div>
                </div>
                <Button onClick={handleAdd} className="rounded-xl flex items-center gap-2 w-full sm:w-auto"><Plus size={16} /><span>إضافة درس جديد</span></Button>
            </div>
            <div className="bg-card rounded-2xl border border-border shadow-sm p-4 sm:p-6 space-y-4">
                {lessons.length > 0 ? lessons.sort((a: any, b: any) => a.order - b.order).map((l: any, i: number) => (
                    <CourseBuilderItem key={l.id} lesson={l} index={i} totalLessons={lessons.length} onMove={moveLesson} onEdit={handleEdit} onDelete={(lesson) => { setLessonToDelete(lesson); setIsDeleteModalOpen(true); }} />
                )) : <div className="text-center py-12 text-muted-foreground"><PlayCircle size={48} className="mx-auto mb-4 opacity-20" /><p className="text-lg font-medium">لا توجد دروس بعد</p></div>}
            </div>
            <CourseBuilderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingLesson={editingLesson} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            <CourseBuilderDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} lessonTitle={lessonToDelete?.title || ""} onConfirm={() => { if (lessonToDelete) setLessons(lessons.filter(l => l.id !== lessonToDelete.id)); setIsDeleteModalOpen(false); }} />
        </div>
    );
}
