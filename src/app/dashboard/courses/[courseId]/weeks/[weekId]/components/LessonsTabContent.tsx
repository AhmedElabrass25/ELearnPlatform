import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LessonItem } from "@/components/dashboard/LessonItem/LessonItem";
import { LessonFormModal } from "@/components/dashboard/LessonModals/LessonFormModal";
import { LessonDeleteModal } from "@/components/dashboard/LessonModals/LessonDeleteModal";
import { useLessonsManagement } from "../hooks/useLessonsManagement";

interface LessonsTabContentProps {
    hook: ReturnType<typeof useLessonsManagement>;
}

export function LessonsTabContent({ hook }: LessonsTabContentProps) {
    const {
        lessons,
        isModalOpen,
        setIsModalOpen,
        editingLesson,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        lessonToDelete,
        setLessonToDelete,
        formData,
        setFormData,
        handleAdd,
        handleEdit,
        handleSubmit,
        handleDelete,
        moveLesson
    } = hook;

    return (
        <>
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
                            <Button onClick={handleAdd} className="mt-4 rounded-xl gap-2 font-bold group">
                                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                                إضافة أول درس
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {lessons.map((lesson, index) => (
                                    <motion.div
                                        key={lesson._id || lesson.id}
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
                                            onEdit={handleEdit} 
                                            onDelete={(l) => { setLessonToDelete(l); setIsDeleteModalOpen(true); }} 
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </CardContent>
            </Card>

            <LessonFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                editingLesson={editingLesson} 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit} 
            />
            
            <LessonDeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                lessonTitle={lessonToDelete?.title || ""} 
                onConfirm={handleDelete} 
            />
        </>
    );
}
