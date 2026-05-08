"use client";
import { ArrowRight, BookOpen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCourseManagement } from "./_hooks/useCourseManagement";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course, Path } from "@/types";
import { PathHeader } from "@/components/dashboard/PathHeader";
import { PathCourseCard } from "@/components/dashboard/PathCourseCard/PathCourseCard";
import { PathCourseModal } from "@/components/dashboard/PathCourseModal/PathCourseModal";
import { CourseDeleteModal } from "@/components/dashboard/CourseModals/CourseDeleteModal";

interface PathDetailClientProps {
    path: Path;
    initialCourses: Course[];
    pathId: string;
}

export function PathDetailClient({ path, initialCourses, pathId }: PathDetailClientProps) {
    const router = useRouter();
    const {
        courses,
        isModalOpen,
        setIsModalOpen,
        editingCourse,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        courseToDelete,
        setCourseToDelete,
        formData,
        setFormData,
        handleAdd,
        handleEdit,
        handleSubmit,
        handleDeleteConfirm
    } = useCourseManagement({ pathId, initialCourses });

    const safeCourses = Array.isArray(courses) ? courses : [];
    const totalLessons = safeCourses.reduce((acc: number, c: Course) => acc + (c.lessonsCount || 0), 0);
    const totalExams = safeCourses.reduce((acc: number, c: Course) => acc + (c.examsCount || 0), 0);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 rounded-xl" 
                    onClick={() => router.back()}
                >
                    <ArrowRight size={16} />
                    <span>العودة للمسارات</span>
                </Button>
            </div>

            <PathHeader path={path} />
            <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border">
                    <div>
                        <CardTitle className="text-xl">كورسات المسار</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            {safeCourses.length} كورس في هذا المسار
                        </p>
                    </div>
                    <Button 
                        onClick={handleAdd} 
                        className="gap-2 rounded-xl bg-primary hover:bg-primary/90 shadow-md"
                    >
                        <Plus size={16} />
                        إضافة كورس
                    </Button>
                </CardHeader>
                <CardContent className="p-6">
                    {safeCourses.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">
                            <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-medium">لا توجد كورسات بعد</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {safeCourses.map((course, i) => (
                                <PathCourseCard 
                                    key={course.id || (course as any)._id} 
                                    course={course} 
                                    index={i} 
                                    onEdit={handleEdit} 
                                    onDelete={(c) => { setCourseToDelete(c); setIsDeleteModalOpen(true); }} 
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <PathCourseModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                editingCourse={editingCourse} 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={(e: any) => handleSubmit(e)} 
            />

            <CourseDeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                courseTitle={courseToDelete?.title || ""} 
                onConfirm={handleDeleteConfirm} 
            />
        </div>
    );
}
