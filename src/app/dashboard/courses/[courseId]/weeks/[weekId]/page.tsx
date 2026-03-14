"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockData } from "@/lib/mockData";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus, FileText, File, ClipboardCheck, PlayCircle, Layers, Trash2, Edit3, MoveUp, MoveDown, BookOpen, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LessonItem } from "@/components/dashboard/LessonItem";
import { LessonFormModal, LessonDeleteModal } from "@/components/dashboard/LessonModals";
import { MaterialModal, MaterialDeleteModal } from "@/components/dashboard/MaterialModals";
import { ExamModal, ExamDeleteModal } from "@/components/dashboard/ExamModals";
import { Lesson, Course, Week, Material, Exam, Question, MaterialType } from "@/types";

const emptyLessonForm = { title: "", description: "", duration: "", youtubeId: "", thumbnail: "", isFree: false, order: 1 };
const emptyMaterialForm: { title: string; type: MaterialType; content: string } = { title: "", type: "pdf", content: "" };
const emptyExamForm: { title: string; description: string; questions: Question[] } = { title: "", description: "", questions: [] };

function extractYoutubeId(url: string): string {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : url;
}

export default function WeekDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const weekId = params.weekId as string;

    const initialCourse = mockData.courses.find((c) => c.id === courseId) as Course;
    const initialWeek = initialCourse?.weeks?.find(w => w.id === weekId);

    const [course, setCourse] = useState<Course>(initialCourse);
    const [week, setWeek] = useState<Week | undefined>(initialWeek);

    // State for contents
    const [lessons, setLessons] = useState<Lesson[]>(initialWeek?.lessons || []);
    const [materials, setMaterials] = useState<Material[]>(initialWeek?.materials || []);
    const [exams, setExams] = useState<Exam[]>(initialWeek?.exams || []);

    // Lesson Modal State
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [isLessonDeleteModalOpen, setIsLessonDeleteModalOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
    const [lessonFormData, setLessonFormData] = useState(emptyLessonForm);

    // Material Modal State
    const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
    const [isMaterialDeleteModalOpen, setIsMaterialDeleteModalOpen] = useState(false);
    const [materialToDelete, setMaterialToDelete] = useState<Material | null>(null);
    const [materialFormData, setMaterialFormData] = useState(emptyMaterialForm);

    // Exam Modal State
    const [isExamModalOpen, setIsExamModalOpen] = useState(false);
    const [editingExam, setEditingExam] = useState<Exam | null>(null);
    const [isExamDeleteModalOpen, setIsExamDeleteModalOpen] = useState(false);
    const [examToDelete, setExamToDelete] = useState<Exam | null>(null);
    const [examFormData, setExamFormData] = useState(emptyExamForm);

    if (!course || !week) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
            <AlertTriangle size={48} className="text-destructive" />
            <h2 className="text-2xl font-bold">الأسبوع غير موجود</h2>
            <Button asChild><Link href={`/dashboard/courses/${courseId}`}>العودة للكورس</Link></Button>
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
    const moveLesson = (index: number, dir: "up" | "down") => {
        const newLessons = [...lessons];
        const target = dir === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= newLessons.length) return;
        [newLessons[index], newLessons[target]] = [newLessons[target], newLessons[index]];
        newLessons.forEach((l, i) => (l.order = i + 1));
        setLessons(newLessons);
    };

    // Material Handlers
    const handleAddMaterial = () => { setEditingMaterial(null); setMaterialFormData(emptyMaterialForm); setIsMaterialModalOpen(true); };
    const handleEditMaterial = (m: Material) => { setEditingMaterial(m); setMaterialFormData({ title: m.title, type: m.type, content: m.content }); setIsMaterialModalOpen(true); };
    const handleMaterialSubmit = () => {
        if (editingMaterial) setMaterials(materials.map(m => m.id === editingMaterial.id ? { ...m, ...materialFormData } : m));
        else setMaterials([...materials, { id: `mat-${Date.now()}`, ...materialFormData, createdAt: new Date().toISOString(), order: materials.length + 1 } as Material]);
        setIsMaterialModalOpen(false);
    };

    // Exam Handlers
    const handleAddExam = () => { setEditingExam(null); setExamFormData(emptyExamForm); setIsExamModalOpen(true); };
    const handleEditExam = (e: Exam) => { setEditingExam(e); setExamFormData({ title: e.title, description: e.description, questions: e.questions }); setIsExamModalOpen(true); };
    const handleExamSubmit = () => {
        if (editingExam) setExams(exams.map(e => e.id === editingExam.id ? { ...e, ...examFormData } : e));
        else setExams([...exams, { id: `exam-${Date.now()}`, ...examFormData, createdAt: new Date().toISOString() } as Exam]);
        setIsExamModalOpen(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl h-8" onClick={() => router.back()}><ArrowRight size={14} />رجوع</Button>
                <span>/</span><Link href="/dashboard/courses" className="hover:text-primary transition-colors">الكورسات</Link>
                <span>/</span><Link href={`/dashboard/courses/${courseId}`} className="hover:text-primary transition-colors">{course.title}</Link>
                <span>/</span><span className="text-foreground font-medium">{week.title}</span>
            </div>

            {/* Week Header */}
            <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 shadow-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 font-bold">إدارة المحتوى</Badge>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm font-medium text-muted-foreground">{course.title}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{week.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-border/50">
                            <div className="flex items-center gap-2 text-sm font-bold">
                                <PlayCircle className="w-5 h-5 text-primary" />
                                <span>{lessons.length} دروس</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="w-5 h-5 text-blue-500" />
                                <span>{materials.length} مواد</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold">
                                <ClipboardCheck className="w-5 h-5 text-amber-500" />
                                <span>{exams.length} اختبارات</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button className="rounded-xl h-12 px-6 gap-2 bg-primary hover:bg-primary/90 shadow-lg text-white font-bold" onClick={handleAddLesson}>
                            <Plus size={18} />
                            إضافة درس
                        </Button>
                        <Button variant="outline" className="rounded-xl h-12 px-6 gap-2 font-bold border-border hover:bg-muted" onClick={handleAddMaterial}>
                            <Plus size={18} />
                            إضافة مادة
                        </Button>
                        <Button variant="outline" className="rounded-xl h-12 px-6 gap-2 font-bold border-border hover:bg-muted" onClick={handleAddExam}>
                            <Plus size={18} />
                            إنشاء اختبار
                        </Button>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="lessons" className="w-full">
                <TabsList className="bg-muted/50 p-1 rounded-2xl h-auto mb-8 border border-border/50">
                    <TabsTrigger value="lessons" className="rounded-xl px-8 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary gap-2 font-bold">
                        <Layers size={18} />
                        الدروس
                    </TabsTrigger>
                    <TabsTrigger value="materials" className="rounded-xl px-8 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary gap-2 font-bold">
                        <FileText size={18} />
                        المواد التعليمية
                    </TabsTrigger>
                    <TabsTrigger value="exams" className="rounded-xl px-8 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary gap-2 font-bold">
                        <ClipboardCheck size={18} />
                        الاختبارات
                    </TabsTrigger>
                </TabsList>

                {/* Lessons Tab Content */}
                <TabsContent value="lessons" className="mt-0">
                    <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/10">
                            <CardTitle>قائمة الدروس</CardTitle>
                            <CardDescription>اسحب للترتيب أو استخدم أزرار التحريك لتنظيم دروس الأسبوع</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {lessons.length === 0 ? (
                                <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                                    <PlayCircle size={60} className="mx-auto mb-4 opacity-10" />
                                    <p className="text-lg font-bold text-muted-foreground">لا توجد دروس مضافة لهذا الأسبوع</p>
                                    <Button onClick={handleAddLesson} className="mt-4 rounded-xl gap-2 font-bold group">
                                        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                                        إضافة أول درس
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {lessons.map((lesson, index) => (
                                            <motion.div
                                                key={lesson.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                            >
                                                <LessonItem 
                                                    lesson={lesson} 
                                                    index={index} 
                                                    totalLessons={lessons.length} 
                                                    onMove={moveLesson} 
                                                    onEdit={handleEditLesson} 
                                                    onDelete={(l) => { setLessonToDelete(l); setIsLessonDeleteModalOpen(true); }} 
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Materials Tab Content */}
                <TabsContent value="materials" className="mt-0">
                    <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/10">
                            <CardTitle>المواد التعليمية</CardTitle>
                            <CardDescription>أضف ملفات PDF، أوراق عمل، أو ملاحظات نصية للطلاب</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {materials.length === 0 ? (
                                <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                                    <FileText size={60} className="mx-auto mb-4 opacity-10" />
                                    <p className="text-lg font-bold text-muted-foreground">لم يتم رفع أي مواد تعليمية بعد</p>
                                    <Button onClick={handleAddMaterial} variant="outline" className="mt-4 rounded-xl gap-2 border-primary/20 text-primary hover:bg-primary/5 font-bold">
                                        <Plus size={18} />
                                        إضافة مادة تعليمية
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <AnimatePresence>
                                        {materials.map((m) => (
                                            <motion.div
                                                key={m.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="group"
                                            >
                                                <Card className="h-full border-border hover:border-primary/50 transition-all hover:shadow-md rounded-2xl overflow-hidden flex flex-col bg-card">
                                                    <div className={`h-2 ${m.type === 'pdf' ? 'bg-red-500' : m.type === 'note' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                                                    <CardHeader className="p-5 flex-1">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div className={`p-2 rounded-xl bg-muted/50 ${m.type === 'pdf' ? 'text-red-500' : m.type === 'note' ? 'text-blue-500' : 'text-amber-500'}`}>
                                                                {m.type === 'pdf' ? <FileText size={20} /> : m.type === 'note' ? <BookOpen size={20} /> : <File size={20} />}
                                                            </div>
                                                            <Badge variant="secondary" className="uppercase text-[10px] font-black">{m.type}</Badge>
                                                        </div>
                                                        <CardTitle className="text-lg font-bold line-clamp-2 leading-snug group-hover:text-primary transition-colors">{m.title}</CardTitle>
                                                        <CardDescription className="mt-2 text-xs">تاريخ الإضافة: {new Date(m.createdAt).toLocaleDateString('ar-EG')}</CardDescription>
                                                    </CardHeader>
                                                    <CardFooter className="p-4 bg-muted/10 border-t border-border/50 flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" onClick={() => handleEditMaterial(m)} className="rounded-lg h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10">
                                                            <Edit3 size={16} />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => { setMaterialToDelete(m); setIsMaterialDeleteModalOpen(true); }} className="rounded-lg h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Exams Tab Content */}
                <TabsContent value="exams" className="mt-0">
                    <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/10">
                            <CardTitle>اختبارات التقييم</CardTitle>
                            <CardDescription>أنشئ اختبارات قصيرة لقياس مستوى استيعاب الطلاب</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {exams.length === 0 ? (
                                <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                                    <ClipboardCheck size={60} className="mx-auto mb-4 opacity-10" />
                                    <p className="text-lg font-bold text-muted-foreground">لا توجد اختبارات في هذا الأسبوع</p>
                                    <Button onClick={handleAddExam} className="mt-4 rounded-xl gap-2 font-bold shadow-lg" size="lg">
                                        <Plus size={20} />
                                        إنشاء أول اختبار
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {exams.map((e) => (
                                            <motion.div
                                                key={e.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <div className="flex items-center justify-between p-5 rounded-2xl border-2 border-primary/10 bg-primary/5 hover:border-primary/30 transition-all group">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                                                            <ClipboardCheck size={28} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-black text-xl text-primary">{e.title}</h4>
                                                            <div className="flex items-center gap-4 mt-1 text-sm font-medium text-primary/70">
                                                                <span className="flex items-center gap-1"><Layers size={14} /> {e.questions.length} أسئلة</span>
                                                                <span className="flex items-center gap-1"><Clock size={14} /> {e.questions.reduce((acc, q) => acc + q.score, 0)} درجة إجمالية</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" className="rounded-xl h-11 px-4 gap-2 font-bold hover:bg-primary/10 text-primary" onClick={() => handleEditExam(e)}>
                                                            <Edit3 size={18} />
                                                            تعديل الأسئلة
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => { setExamToDelete(e); setIsExamDeleteModalOpen(true); }}>
                                                            <Trash2 size={18} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
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
            <LessonDeleteModal isOpen={isLessonDeleteModalOpen} onClose={() => setIsLessonDeleteModalOpen(false)} lessonTitle={lessonToDelete?.title || ""} onConfirm={() => { if (lessonToDelete) setLessons(lessons.filter(l => l.id !== lessonToDelete.id)); setIsLessonDeleteModalOpen(false); }} />
            
            <MaterialModal isOpen={isMaterialModalOpen} onClose={() => setIsMaterialModalOpen(false)} editingMaterial={editingMaterial} formData={materialFormData} setFormData={setMaterialFormData} onSubmit={handleMaterialSubmit} />
            <MaterialDeleteModal isOpen={isMaterialDeleteModalOpen} onClose={() => setIsMaterialDeleteModalOpen(false)} materialTitle={materialToDelete?.title || ""} onConfirm={() => { if (materialToDelete) setMaterials(materials.filter(m => m.id !== materialToDelete.id)); setIsMaterialDeleteModalOpen(false); }} />

            <ExamModal isOpen={isExamModalOpen} onClose={() => setIsExamModalOpen(false)} editingExam={editingExam} formData={examFormData} setFormData={setExamFormData} onSubmit={handleExamSubmit} />
            <ExamDeleteModal isOpen={isExamDeleteModalOpen} onClose={() => setIsExamDeleteModalOpen(false)} examTitle={examToDelete?.title || ""} onConfirm={() => { if (examToDelete) setExams(exams.filter(e => e.id !== examToDelete.id)); setIsExamDeleteModalOpen(false); }} />
        </div>
    );
}
