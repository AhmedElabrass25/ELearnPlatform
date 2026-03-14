"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockData } from "@/lib/mockData";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus, Play, AlertTriangle, Calendar, BookOpen, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseHeader } from "@/components/dashboard/CourseHeader";
import { LessonItem } from "@/components/dashboard/LessonItem";
import { LessonFormModal, LessonDeleteModal } from "@/components/dashboard/LessonModals";
import { WeekItem } from "@/components/dashboard/WeekItem";
import { WeekModal, WeekDeleteModal } from "@/components/dashboard/WeekModals";
import { Lesson, Course, Week } from "@/types";

const emptyLessonForm = { title: "", description: "", duration: "", youtubeId: "", thumbnail: "", isFree: false, order: 1 };
const emptyWeekForm = { title: "" };

function extractYoutubeId(url: string): string {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : url;
}

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    
    // Find course and its data
    const initialCourse = mockData.courses.find((c) => c.id === courseId) as Course;
    const initialWeeks = initialCourse?.weeks || [];
    const rawLessons = (mockData.lessons as Record<string, Lesson[]>)[courseId] || [];
    
    const [course, setCourse] = useState<Course>(initialCourse);
    const [weeks, setWeeks] = useState<Week[]>([...initialWeeks].sort((a, b) => a.order - b.order));
    const [lessons, setLessons] = useState<Lesson[]>([...rawLessons].sort((a, b) => a.order - b.order));
    
    const path = course ? mockData.paths.find((p) => p.id === course.pathId) : null;

    // Lesson Modal State
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [isLessonDeleteModalOpen, setIsLessonDeleteModalOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
    const [lessonFormData, setLessonFormData] = useState(emptyLessonForm);

    // Week Modal State
    const [isWeekModalOpen, setIsWeekModalOpen] = useState(false);
    const [editingWeek, setEditingWeek] = useState<Week | null>(null);
    const [isWeekDeleteModalOpen, setIsWeekDeleteModalOpen] = useState(false);
    const [weekToDelete, setWeekToDelete] = useState<Week | null>(null);
    const [weekFormData, setWeekFormData] = useState(emptyWeekForm);

    if (!course) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
            <AlertTriangle size={48} className="text-destructive" />
            <h2 className="text-2xl font-bold">الكورس غير موجود</h2>
            <Button asChild><Link href="/dashboard/courses">العودة للكورسات</Link></Button>
        </div>
    );

    // Lesson Handlers
    const handleAddLesson = () => { setEditingLesson(null); setLessonFormData({ ...emptyLessonForm, order: lessons.length + 1 }); setIsLessonModalOpen(true); };
    const handleEditLesson = (lesson: Lesson) => { setEditingLesson(lesson); setLessonFormData({ ...lesson }); setIsLessonModalOpen(true); };
    const handleLessonSubmit = () => {
        const ytId = extractYoutubeId(lessonFormData.youtubeId);
        const lessonData = { ...lessonFormData, youtubeId: ytId, videoUrl: `https://www.youtube.com/embed/${ytId}`, thumbnail: lessonFormData.thumbnail || `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` };
        if (editingLesson) setLessons(lessons.map((l) => (l.id === editingLesson.id ? { ...l, ...lessonData } : l)));
        else setLessons([...lessons, { id: `lesson-${Date.now()}`, ...lessonData } as Lesson].sort((a, b) => a.order - b.order));
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

    // Week Handlers
    const handleAddWeek = () => { setEditingWeek(null); setWeekFormData(emptyWeekForm); setIsWeekModalOpen(true); };
    const handleEditWeek = (week: Week) => { setEditingWeek(week); setWeekFormData({ title: week.title }); setIsWeekModalOpen(true); };
    const handleWeekSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingWeek) {
            setWeeks(weeks.map(w => w.id === editingWeek.id ? { ...w, title: weekFormData.title } : w));
        } else {
            const newWeek: Week = {
                id: `week-${Date.now()}`,
                title: weekFormData.title,
                order: weeks.length + 1,
                lessons: [],
                materials: [],
                exams: []
            };
            setWeeks([...weeks, newWeek].sort((a, b) => a.order - b.order));
        }
        setIsWeekModalOpen(false);
    };
    const confirmDeleteWeek = () => { if (weekToDelete) setWeeks(weeks.filter(w => w.id !== weekToDelete.id)); setIsWeekDeleteModalOpen(false); };
    const moveWeek = (index: number, dir: 'up' | 'down') => {
        const newWeeks = [...weeks];
        const target = dir === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= newWeeks.length) return;
        [newWeeks[index], newWeeks[target]] = [newWeeks[target], newWeeks[index]];
        newWeeks.forEach((w, i) => (w.order = i + 1));
        setWeeks(newWeeks);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl h-8" onClick={() => router.back()}><ArrowRight size={14} />رجوع</Button>
                <span>/</span><Link href="/dashboard/courses" className="hover:text-primary transition-colors">الكورسات</Link>
                {path && <><span>/</span><Link href={`/dashboard/paths/${path.id}`} className="hover:text-primary transition-colors">{path.title}</Link></>}
                <span>/</span><span className="text-foreground font-medium truncate max-w-[200px]">{course.title}</span>
            </div>

            <CourseHeader course={course} lessonsCount={lessons.length + weeks.reduce((acc, w) => acc + w.lessons.length, 0)} />

            <Tabs defaultValue={weeks.length > 0 ? "weeks" : "lessons"} className="w-full">
                <TabsList className="bg-muted/50 p-1 rounded-2xl h-auto mb-6">
                    <TabsTrigger value="weeks" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
                        <Layers size={16} />
                        الهيكل الزمبي (أسابيع)
                    </TabsTrigger>
                    <TabsTrigger value="lessons" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
                        <Play size={16} />
                        باقي الدروس (مستقلة)
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="weeks" className="mt-0">
                    <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between p-6 bg-muted/20 border-b border-border">
                            <div>
                                <CardTitle className="text-xl font-bold">هيكل الكورس (الأسابيع)</CardTitle>
                                <CardDescription className="mt-1">قسم الكورس إلى أسابيع لتنظيم المحتوى التعليمي</CardDescription>
                            </div>
                            <Button onClick={handleAddWeek} className="gap-2 rounded-xl bg-primary hover:bg-primary/90 shadow-md">
                                <Plus size={16} />
                                إضافة أسبوع
                            </Button>
                        </CardHeader>
                        <CardContent className="p-6 min-h-[400px]">
                            {weeks.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                                        <Calendar size={40} className="opacity-20" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold">لا يوجد هيكل أسابيع بعد</p>
                                        <p className="text-sm">ابدأ بإضافة أول أسبوع لتنظيم دروسك وموادك التعليمية</p>
                                    </div>
                                    <Button onClick={handleAddWeek} variant="outline" className="mt-2 rounded-xl border-primary/20 text-primary">إضافة أول أسبوع</Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {weeks.map((week, index) => (
                                            <motion.div
                                                key={week.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <WeekItem
                                                    courseId={courseId}
                                                    week={week}
                                                    index={index}
                                                    totalWeeks={weeks.length}
                                                    onMove={moveWeek}
                                                    onEdit={handleEditWeek}
                                                    onDelete={(w) => { setWeekToDelete(w); setIsWeekDeleteModalOpen(true); }}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="lessons" className="mt-0">
                    <Card className="rounded-2xl border-border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border">
                            <div>
                                <CardTitle className="text-xl">الدروس المستقلة</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">{lessons.length} درس • دروس غير مرتبطة بأسبوع معين</p>
                            </div>
                            <Button onClick={handleAddLesson} className="gap-2 rounded-xl bg-primary hover:bg-primary/90 shadow-md">
                                <Plus size={16} />
                                إضافة درس
                            </Button>
                        </CardHeader>
                        <CardContent className="p-6">
                            {lessons.length === 0 ? (
                                <div className="text-center py-16 text-muted-foreground">
                                    <Play size={48} className="mx-auto mb-4 opacity-30" />
                                    <p className="text-lg font-medium">لا توجد دروس مستقلة</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {lessons.map((lesson, index) => (
                                            <LessonItem 
                                                key={lesson.id} 
                                                lesson={lesson} 
                                                index={index} 
                                                totalLessons={lessons.length} 
                                                onMove={moveLesson} 
                                                onEdit={handleEditLesson} 
                                                onDelete={(l) => { setLessonToDelete(l); setIsLessonDeleteModalOpen(true); }} 
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Modals */}
            <LessonFormModal isOpen={isLessonModalOpen} onClose={() => setIsLessonModalOpen(false)} editingLesson={editingLesson} formData={lessonFormData} setFormData={setLessonFormData} onSubmit={handleLessonSubmit} />
            <LessonDeleteModal isOpen={isLessonDeleteModalOpen} onClose={() => setIsLessonDeleteModalOpen(false)} lessonTitle={lessonToDelete?.title || ""} onConfirm={confirmDeleteLesson} />
            
            <WeekModal isOpen={isWeekModalOpen} onClose={() => setIsWeekModalOpen(false)} editingWeek={editingWeek} formData={weekFormData} setFormData={setWeekFormData} onSubmit={handleWeekSubmit} />
            <WeekDeleteModal isOpen={isWeekDeleteModalOpen} onClose={() => setIsWeekDeleteModalOpen(false)} weekTitle={weekToDelete?.title || ""} onConfirm={confirmDeleteWeek} />
        </div>
    );
}
