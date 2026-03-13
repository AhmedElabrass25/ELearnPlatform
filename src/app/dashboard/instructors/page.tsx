"use client";

import React, { useState } from "react";
import Image from "next/image";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Instructor {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatar: string;
    achievements?: string[];
}

export default function InstructorsManagementPage() {
    const [instructors, setInstructors] = useState<Instructor[]>([mockData.instructor]); // Using the single instructor wrapped in array for demo

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        title: "",
        bio: "",
        avatar: ""
    });

    const columns = [
        {
            key: "name",
            header: "المعلم",
            render: (item: Instructor) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                        {item.avatar ? (
                            <Image src={item.avatar} alt={item.name} width={40} height={40} className="object-cover w-full h-full" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                                {item.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <span className="font-semibold block">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.title}</span>
                    </div>
                </div>
            )
        },
        {
            key: "achievements",
            header: "الإنجازات",
            render: (item: Instructor) => (
                <div className="flex flex-wrap gap-1">
                    {item.achievements?.slice(0, 2).map((ach: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs bg-muted/50 rounded-xl">
                            {ach}
                        </Badge>
                    ))}
                    {item.achievements && item.achievements.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-muted/50">+ {item.achievements.length - 2}</Badge>
                    )}
                </div>
            )
        }
    ];

    const handleAdd = () => {
        setEditingInstructor(null);
        setFormData({ name: "", title: "", bio: "", avatar: "" });
        setIsModalOpen(true);
    };

    const handleEdit = (instructor: Instructor) => {
        setEditingInstructor(instructor);
        setFormData({
            name: instructor.name,
            title: instructor.title,
            bio: instructor.bio,
            avatar: instructor.avatar || ""
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (instructor: Instructor) => {
        setInstructorToDelete(instructor);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (editingInstructor) {
            setInstructors(instructors.map(u => u.id === editingInstructor.id ? { ...u, ...formData } : u));
        } else {
            const newInstructor = {
                id: `inst${Date.now()}`,
                ...formData,
                achievements: []
            };
            setInstructors([...instructors, newInstructor]);
        }
        setIsModalOpen(false);
    };

    const confirmDelete = (e: React.FormEvent) => {
        if (instructorToDelete) {
            setInstructors(instructors.filter(u => u.id !== instructorToDelete.id));
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable
                title="إدارة المعلمين"
                description="إدارة ملفات المعلمين والمحاضرين."
                data={instructors}
                columns={columns}
                searchKey="name"
                searchPlaceholder="ابحث باسم المعلم..."
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingInstructor ? "تعديل بيانات المعلم" : "إضافة معلم جديد"}
                onSubmit={handleSubmit}
                submitLabel={editingInstructor ? "حفظ التعديلات" : "إضافة معلم"}
            >
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label>اسم المعلم</Label>
                        <Input
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>المسمى الوظيفي</Label>
                        <Input
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>نبذة مختصرة (Bio)</Label>
                        <textarea
                            value={formData.bio}
                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            className="flex min-h-[80px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            rows={3}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>رابط الصورة الشخصية (Avatar URL)</Label>
                        <Input
                            value={formData.avatar}
                            onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                            placeholder="/images/avatar.jpg"
                            className="rounded-xl text-left"
                            dir="ltr"
                        />
                    </div>
                </div>
            </AdminModal>

            <AdminModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="تأكيد الحذف"
                description="هل أنت متأكد من رغبتك في حذف هذا المعلم؟ سيؤثر هذا على الكورسات المرتبطة به."
                onSubmit={confirmDelete}
                submitLabel="حذف المعلم"
                isDestructive={true}
            >
                <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                    سيتم حذف المعلم: {instructorToDelete?.name}
                </div>
            </AdminModal>
        </div>
    );
}
