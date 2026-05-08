import { useState } from "react";
import { Week } from "@/types";
import { toast } from "sonner";
import { addWeekToCourse, updateWeek, deleteWeek } from "@/services/weeks.service";

const emptyWeekForm = { title: "", description: "", active: "true" };

export function useCourseWeeks(courseId: string, initialWeeks: Week[]) {
    const normalizeWeeks = (weeksArr: any[]) => weeksArr.map(w => ({
        ...w,
        lessons: w.lessons || [],
        materials: w.materials || [],
        exams: w.exams || []
    }));

    const [weeks, setWeeks] = useState<Week[]>(normalizeWeeks(initialWeeks).sort((a: any, b: any) => a.order - b.order));
    
    // Week Modal State
    const [isWeekModalOpen, setIsWeekModalOpen] = useState(false);
    const [editingWeek, setEditingWeek] = useState<Week | null>(null);
    const [isWeekDeleteModalOpen, setIsWeekDeleteModalOpen] = useState(false);
    const [weekToDelete, setWeekToDelete] = useState<Week | null>(null);
    const [weekFormData, setWeekFormData] = useState<{ title: string; description: string;active: string }>(emptyWeekForm);

    const handleAddWeek = () => { setEditingWeek(null); setWeekFormData({ ...emptyWeekForm}); setIsWeekModalOpen(true); };
    const handleEditWeek = (week: Week) => { setEditingWeek(week); setWeekFormData({ title: week.title, description: week.description || "", active: String((week as any).active ?? true) }); setIsWeekModalOpen(true); };
    
    const handleWeekSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading(editingWeek ? "جاري تحديث الأسبوع..." : "جاري إضافة الأسبوع...");
        
        try {
            if (editingWeek) {
                // Update specific week
                const weekId = editingWeek._id;
                const updateData = {
                    title: weekFormData.title,
                    description: weekFormData.description,
                    active: weekFormData.active === "true"
                };
                await updateWeek(weekId, updateData);
                toast.success("تم تحديث الأسبوع بنجاح", { id: toastId });
                setWeeks(weeks.map(w => (w._id) === weekId ? { ...w, ...updateData } : w));
            } else {
                // Add new week
                const reqData = { 
                    title: weekFormData.title.trim(), 
                    description: weekFormData.description.trim(), 
                };
                const createdWeekData = await addWeekToCourse(courseId, reqData);
                toast.success("تم إضافة الأسبوع بنجاح", { id: toastId });
                
                if (createdWeekData) {
                    const normalizedNewWeek = normalizeWeeks([createdWeekData])[0];
                    setWeeks([...weeks, normalizedNewWeek].sort((a, b) => a.order - b.order));
                } else {
                    // Fallback optimistic
                    const newWeek: Week = {
                        _id: `week-${Date.now()}`,
                        ...reqData,
                    };
                    setWeeks([...weeks, newWeek]);
                }
            }
            setIsWeekModalOpen(false);
        } catch (error: any) {
            console.error("Week submission error:", error);
            toast.error(error.message || "حدث خطأ أثناء حفظ البيانات", { id: toastId });
        }
    };
    // Delete Week
    const confirmDeleteWeek = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!weekToDelete) return;
        
        const weekId = weekToDelete._id;
        const toastId = toast.loading("جاري حذف الأسبوع...");
        
        try {
            await deleteWeek(weekId);
            toast.success("تم حذف الأسبوع بنجاح", { id: toastId });
            setWeeks(weeks.filter(w => w._id !== weekId));
            setIsWeekDeleteModalOpen(false);
            setWeekToDelete(null);
        } catch (error: any) {
             console.error("Week deletion error:", error);
             toast.error(error.message || "حدث خطأ أثناء حذف الأسبوع", { id: toastId });
        }
    };

    return {
        weeks,
        isWeekModalOpen,
        setIsWeekModalOpen,
        editingWeek,
        setEditingWeek,
        isWeekDeleteModalOpen,
        setIsWeekDeleteModalOpen,
        weekToDelete,
        setWeekToDelete,
        weekFormData,
        setWeekFormData,
        handleAddWeek,
        handleEditWeek,
        handleWeekSubmit,
        confirmDeleteWeek,
    };
}
