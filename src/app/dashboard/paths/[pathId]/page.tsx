"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockData } from "@/lib/mockData";
import { ArrowRight, BookOpen, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course, Path } from "@/types";
import { PathHeader } from "@/components/dashboard/PathHeader";
import { PathStats } from "@/components/dashboard/PathStats";
import { PathCourseCard } from "@/components/dashboard/PathCourseCard";
import { PathCourseModal } from "@/components/dashboard/PathCourseModal";
import { CourseDeleteModal } from "@/components/dashboard/CourseModals";

export default function PathDetailPage() {
    const params = useParams();
    const router = useRouter();
    const pathId = params.pathId as string;
    const path = mockData.paths.find((p) => p.id === pathId) as any;
    const [courses, setCourses] = useState<Course[]>(mockData.courses.filter((c) => c.pathId === pathId) as Course[]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [formData, setFormData] = useState({ title: "", subtitle: "", price: 0, level: "مبتدئ", type: "أونلاين", topic: "", duration: "" });

    if (!path) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
            <AlertTriangle size={48} className="text-destructive" /><h2 className="text-2xl font-bold">المسار غير موجود</h2>
            <Button asChild><Link href="/dashboard/paths">العودة للمسارات</Link></Button>
        </div>
    );

    const totalLessons = courses.reduce((acc, c) => acc + (c.lessonsCount || 0), 0);
    const totalExams = courses.reduce((acc, c) => acc + (c.examsCount || 0), 0);

    const handleAdd = () => { setEditingCourse(null); setFormData({ title: "", subtitle: "", price: 0, level: "مبتدئ", type: "أونلاين", topic: "", duration: "" }); setIsModalOpen(true); };
    const handleEdit = (c: Course) => { setEditingCourse(c); setFormData({ title: c.title, subtitle: c.subtitle || "", price: c.price, level: c.level, type: c.type, topic: c.topic || "", duration: c.duration }); setIsModalOpen(true); };
    const handleSubmit = () => {
        if (editingCourse) setCourses(courses.map((c) => (c.id === editingCourse.id ? { ...c, ...formData } : c)));
        else setCourses([...courses, { id: `course-${Date.now()}`, pathId, currency: "ج.م", lessonsCount: 0, examsCount: 0, ...formData } as Course]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3"><Button variant="ghost" size="sm" className="gap-2 rounded-xl" onClick={() => router.back()}><ArrowRight size={16} /><span>العودة للمسارات</span></Button></div>
            <PathHeader path={path} />
            <PathStats coursesCount={courses.length} totalLessons={totalLessons} totalExams={totalExams} duration={path.duration} />
            <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border">
                    <div><CardTitle className="text-xl">كورسات المسار</CardTitle><p className="text-sm text-muted-foreground mt-1">{courses.length} كورس في هذا المسار</p></div>
                    <Button onClick={handleAdd} className="gap-2 rounded-xl bg-primary hover:bg-primary/90 shadow-md"><Plus size={16} />إضافة كورس</Button>
                </CardHeader>
                <CardContent className="p-6">
                    {courses.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground"><BookOpen size={48} className="mx-auto mb-4 opacity-30" /><p className="text-lg font-medium">لا توجد كورسات بعد</p></div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{courses.map((course, i) => (<PathCourseCard key={course.id} course={course} index={i} onEdit={handleEdit} onDelete={(c) => { setCourseToDelete(c); setIsDeleteModalOpen(true); }} />))}</div>
                    )}
                </CardContent>
            </Card>
            <PathCourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingCourse={editingCourse} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            <CourseDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} courseTitle={courseToDelete?.title || ""} onConfirm={() => { if (courseToDelete) setCourses(courses.filter((c) => c.id !== courseToDelete.id)); setIsDeleteModalOpen(false); }} />
        </div>
    );
}
