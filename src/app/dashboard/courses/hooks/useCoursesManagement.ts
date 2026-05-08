"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Course } from "@/types";
import { createCourseInTrack, updateCourse, deleteCourse } from "@/services/courses.service";
import { CourseFormData, initialCourseFormData } from "../types/course.types";

interface UseCoursesManagementProps {
    initialCourses: Course[];
}

export function useCoursesManagement({ initialCourses }: UseCoursesManagementProps) {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [search, setSearch] = useState("");
    const [filterPath, setFilterPath] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState<CourseFormData>(initialCourseFormData);

    const filteredCourses = useMemo(() => courses.filter((c) => {
        const matchSearch = (c.title || "").toLowerCase().includes(search.toLowerCase());
        const matchPath = filterPath === "all" || c.track?.id === filterPath || (c as any).trackId === filterPath;
        return matchSearch && matchPath;
    }), [courses, search, filterPath]);

    const handleAdd = () => { 
        setEditingCourse(null); 
        setFormData(initialCourseFormData); 
        setIsModalOpen(true); 
    };

    const handleEdit = (c: Course) => { 
        setEditingCourse(c); 
        setFormData({ 
            title: c.title, 
            description: c.description , 
            price: String(c.price), 
            durationInWeeks: String((c as any).durationInWeeks || "6"), 
            isPublished: (c as any).isPublished ?? true,
            active: (c as any).active ?? true,
            coverImage: null ,
        }); 
        setIsModalOpen(true); 
    };

    const handleSubmit = async () => {
        if (!formData.title?.trim()) return toast.error("يرجى إدخال عنوان الكورس");
        if (!formData.pathId) return toast.error("يرجى اختيار المسار");

        setIsSubmitting(true);
        const toastId = toast.loading(editingCourse ? "جاري تحديث الكورس..." : "جاري إضافة الكورس الجديد...");

        try {
            const courseData = new FormData();
            
            courseData.append("title", formData.title);
            courseData.append("description", formData.description || "");
            courseData.append("price", formData.price.toString());
            courseData.append("durationInWeeks", formData.durationInWeeks.toString());
            courseData.append("isPublished", formData.isPublished ? "true" : "false");
            courseData.append("active", formData.active ? "true" : "false");
            
            if (formData.coverImage) {
                courseData.append("coverImage", formData.coverImage);
            }

            if (editingCourse) {
                const courseId = editingCourse.id || (editingCourse as any)._id;
                const updatedCourse = await updateCourse(courseId, courseData);
                
                toast.success("تم تحديث الكورس بنجاح", { id: toastId });
                
                // Update local state
                const updated = updatedCourse || { ...editingCourse, ...formData, price: Number(formData.price) };
                setCourses(prev => prev.map(c => (c.id === courseId || (c as any)._id === courseId) ? updated : c));
            } else {
                const newCourse = await createCourseInTrack(formData.pathId, courseData);
                toast.success("تم إضافة الكورس بنجاح", { id: toastId });
                
                if (newCourse) {
                    setCourses(prev => [...prev, newCourse as Course]);
                }
            }

            setIsModalOpen(false);
            router.refresh();
        } catch (error: any) {
            console.error("Course Submit Error:", error);
            toast.error(error.message || "حدث خطأ أثناء حفظ البيانات", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!courseToDelete) return;
        
        const courseId = courseToDelete.id || (courseToDelete as any)._id;
        const toastId = toast.loading("جاري حذف الكورس...");

        try {
            await deleteCourse(courseId);
            toast.success("تم حذف الكورس بنجاح", { id: toastId });
            setCourses(courses.filter(c => (c.id || (c as any)._id) !== courseId));
            setIsDeleteModalOpen(false);
            setCourseToDelete(null);
            router.refresh();
        } catch (error: any) {
            console.error("Error deleting course:", error);
            toast.error(error.message || "فشل في حذف الكورس", { id: toastId });
        }
    };

    return {
        courses: filteredCourses,
        allCourses: courses,
        search,
        setSearch,
        filterPath,
        setFilterPath,
        isModalOpen,
        setIsModalOpen,
        editingCourse,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        courseToDelete,
        setCourseToDelete,
        isSubmitting,
        formData,
        setFormData,
        handleAdd,
        handleEdit,
        handleSubmit,
        handleDelete
    };
}
