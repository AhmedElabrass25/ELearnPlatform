"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateTrack, deleteTrack, createTrack } from "@/services/tracks.service";
import { IPath } from "@/app/paths/type";

interface UsePathManagementProps {
    initialPaths: IPath[];
}

export function usePathManagement({ initialPaths }: UsePathManagementProps) {
    const router = useRouter();
    const [paths, setPaths] = useState<IPath[]>(initialPaths);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPath, setEditingPath] = useState<any | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pathToDelete, setPathToDelete] = useState<any | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({ 
        name: "", 
        description: "", 
        educationLevel: "first_secondary",
        coverImage: null as File | null,
        active:true
    });

    const handleAdd = () => { 
        setEditingPath(null); 
        setFormData({ 
            name: "", 
            description: "", 
            educationLevel: "first_secondary",
            coverImage: null,
            active:true
        }); 
        setIsModalOpen(true); 
    };

    const handleEdit = (p: IPath) => { 
        setEditingPath(p); 
        setFormData({ 
            name: p.name, 
            description: p.description, 
            educationLevel: p.educationLevel,
            coverImage: null ,
            active:true
        }); 
        setIsModalOpen(true); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingPath && !formData.description?.trim()) {
            toast.error("يرجى إدخال وصف للمسار");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading(editingPath ? "جاري تحديث المسار..." : "جاري إضافة المسار...");
        try {
            const data = new FormData();
            
            if (editingPath) {
               data.append("name", formData.name);
                data.append("description", formData.description);
                data.append("educationLevel", formData.educationLevel);
                if (formData.coverImage) {
                    data.append("coverImage", formData.coverImage);
                }

                const trackId = editingPath.id;
                await updateTrack(trackId, data);
                toast.success("تم تحديث المسار بنجاح", { id: toastId });
                
                setPaths(paths.map(p => p.id === trackId ? {...p,name:formData.name , description: formData.description,educationLevel:formData.educationLevel,coverImage:formData.coverImage,active:formData.active } : p));
            } else {
                if (!formData.name.trim()) {
                    toast.error("اسم المسار مطلوب", { id: toastId });
                    setIsSubmitting(false);
                    return;
                }
                if (!formData.description.trim()) {
                    toast.error("وصف المسار مطلوب", { id: toastId });
                    setIsSubmitting(false);
                    return;
                }

                data.append("name", formData.name);
                data.append("description", formData.description);
                data.append("educationLevel", formData.educationLevel);
                if (formData.coverImage) {
                    data.append("coverImage", formData.coverImage);
                }
                
                await createTrack(data);
                toast.success("تم إضافة المسار الجديد بنجاح", { id: toastId });
            }
            
            router.refresh();
            setIsModalOpen(false);
        } catch (error: any) {
            toast.error(error.message || "حدث خطأ أثناء حفظ البيانات", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!pathToDelete) return;
        const trackId = pathToDelete.id;
        const toastId = toast.loading("جاري حذف المسار...");
        
        setIsSubmitting(true);
        try {
            await deleteTrack(trackId);
            toast.success("تم حذف المسار بنجاح", { id: toastId });
            setPaths(paths.filter(p => p.id !== trackId));
            setIsDeleteModalOpen(false);
            router.refresh();
        } catch (error: any) {
            console.error("Delete Track Error:", error);
            toast.error(error.message || "حدث خطأ أثناء الحذف", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        paths,
        isModalOpen,
        setIsModalOpen,
        editingPath,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        pathToDelete,
        setPathToDelete,
        isSubmitting,
        formData,
        setFormData,
        handleAdd,
        handleEdit,
        handleSubmit,
        handleDeleteConfirm
    };
}
