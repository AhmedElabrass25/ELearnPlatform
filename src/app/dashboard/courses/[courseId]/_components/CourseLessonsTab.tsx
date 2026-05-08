"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonItem } from "@/components/dashboard/LessonItem/LessonItem";
import { LessonFormModal } from "@/components/dashboard/LessonModals/LessonFormModal";
import { LessonDeleteModal } from "@/components/dashboard/LessonModals/LessonDeleteModal";
import { useCourseLessons } from "../_hooks/useCourseLessons";

export function CourseLessonsTab({ hookContext }: { hookContext: ReturnType<typeof useCourseLessons> }) {
    const {
        lessons,
        isLessonModalOpen,
        setIsLessonModalOpen,
        editingLesson,
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
    } = hookContext;

    return (
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

            <LessonFormModal isOpen={isLessonModalOpen} onClose={() => setIsLessonModalOpen(false)} editingLesson={editingLesson} formData={lessonFormData} setFormData={setLessonFormData} onSubmit={handleLessonSubmit} />
            <LessonDeleteModal isOpen={isLessonDeleteModalOpen} onClose={() => setIsLessonDeleteModalOpen(false)} lessonTitle={lessonToDelete?.title || ""} onConfirm={confirmDeleteLesson} />
        </Card>
    );
}
