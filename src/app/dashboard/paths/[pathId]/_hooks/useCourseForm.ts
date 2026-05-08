"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCourseInTrack, updateCourse } from "@/services/courses.service";
import { Course } from "@/types";

interface UseCourseFormProps {
    pathId: string;
    editingCourse: Course | null;
    onSuccess: (course?: any) => void;
}

export function useCourseForm({ pathId, editingCourse, onSuccess }: UseCourseFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ 
        title: "", 
        description: "", 
        price: "0", 
        durationInWeeks: "6", 
        isPublished: "true",
        coverImage: null as File | null
    });

    const resetForm = (course?: Course) => {
        if (course) {
            setFormData({
                title: course.title,
                description: (course as any).description || "",
                price: String(course.price || 0),
                durationInWeeks: String((course as any).durationInWeeks || 6),
                isPublished: String((course as any).isPublished ?? true),
                coverImage: null
            });
        } else {
            setFormData({
                title: "",
                description: "",
                price: "0",
                durationInWeeks: "6",
                isPublished: "true",
                coverImage: null
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title?.trim()) return toast.error("يرجى إدخال عنوان الكورس");
        if (!formData.description?.trim()) return toast.error("يرجى إدخال وصف الكورس");
        
        const price = Number(formData.price);
        const duration = Number(formData.durationInWeeks);
        
        if (isNaN(price) || price < 0) return toast.error("يرجى إدخال سعر صحيح");
        if (isNaN(duration) || duration <= 0) return toast.error("يرجى إدخال مدة صحيحة بالأسابيع");

        setIsSubmitting(true);
        const toastId = toast.loading(editingCourse ? "جاري تحديث الكورس..." : "جاري إضافة الكورس الجديد...");
        
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("durationInWeeks", formData.durationInWeeks);
            data.append("isPublished", formData.isPublished);
            
            if (formData.coverImage) {
                data.append("coverImage", formData.coverImage);
            }

            if (editingCourse) {
                const courseId = editingCourse.id || (editingCourse as any)._id;
                await updateCourse(courseId, data);
                toast.success("تم تحديث الكورس بنجاح", { id: toastId });
                onSuccess({ ...editingCourse, ...formData, price, durationInWeeks: duration });
            } else {
                const createdCourse = await createCourseInTrack(pathId, data);
                toast.success("تم إضافة الكورس بنجاح", { id: toastId });
                onSuccess(createdCourse);
            }
            
            router.refresh();
        } catch (error: any) {
            console.error("Course Submit Error:", error);
            toast.error(error.message || "حدث خطأ أثناء حفظ البيانات", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        setFormData,
        isSubmitting,
        handleSubmit,
        resetForm
    };
}
