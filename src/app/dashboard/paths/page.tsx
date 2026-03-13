"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";

interface LearningPath {
    id: string;
    title: string;
    slug: string;
    description: string;
    duration: string;
    coursesCount?: number;
    lessonsCount?: number;
    examsCount?: number;
    image?: string;
}

export default function PathsManagementPage() {
    const [paths, setPaths] = useState<LearningPath[]>(mockData.paths);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPath, setEditingPath] = useState<LearningPath | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pathToDelete, setPathToDelete] = useState<LearningPath | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        duration: ""
    });

    const columns = [
        {
            key: "title",
            header: "المسار",
            render: (item: LearningPath) => (
                <span className="font-semibold text-primary">{item.title}</span>
            )
        },
        { key: "slug", header: "الرابط (Slug)" },
        { key: "duration", header: "المدة الزمنية" },
        { key: "coursesCount", header: "الكورسات" },
        { key: "lessonsCount", header: "الدروس" },
        {
            key: "details",
            header: "التفاصيل",
            render: (item: LearningPath) => (
                <Link
                    href={`/dashboard/paths/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors"
                >
                    <Eye size={14} />
                    <span>عرض</span>
                </Link>
            )
        },
    ];

    const handleAdd = () => {
        setEditingPath(null);
        setFormData({ title: "", slug: "", description: "", duration: "" });
        setIsModalOpen(true);
    };

    const handleEdit = (path: LearningPath) => {
        setEditingPath(path);
        setFormData({
            title: path.title,
            slug: path.slug,
            description: path.description,
            duration: path.duration
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (path: LearningPath) => {
        setPathToDelete(path);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (editingPath) {
            setPaths(paths.map(p => p.id === editingPath.id ? { ...p, ...formData } : p));
        } else {
            const newPath = {
                id: `path${Date.now()}`,
                ...formData,
                coursesCount: 0,
                lessonsCount: 0,
                examsCount: 0,
                image: ""
            };
            setPaths([...paths, newPath]);
        }
        setIsModalOpen(false);
    };

    const confirmDelete = (e: React.FormEvent) => {
        if (pathToDelete) {
            setPaths(paths.filter(p => p.id !== pathToDelete.id));
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable
                title="إدارة المسارات التعليمية"
                description="تجميع الكورسات في مسارات تعليمية وتحديد تسلسلها."
                data={paths}
                columns={columns}
                searchKey="title"
                searchPlaceholder="ابحث باسم المسار..."
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingPath ? "تعديل المسار التعليمي" : "إضافة مسار جديد"}
                onSubmit={handleSubmit}
                submitLabel={editingPath ? "حفظ التعديلات" : "إضافة مسار"}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                        <Label>عنوان المسار</Label>
                        <Input
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>الرابط (Slug)</Label>
                        <Input
                            value={formData.slug}
                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                            required
                            className="rounded-xl text-left"
                            dir="ltr"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>المدة الزمنية (مثال: 48 ساعة)</Label>
                        <Input
                            value={formData.duration}
                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label>الوصف</Label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="flex min-h-[80px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            rows={3}
                        />
                    </div>
                </div>
            </AdminModal>

            <AdminModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="تأكيد الحذف"
                description="هل أنت متأكد من رغبتك في حذف هذا المسار؟ الأ كورسات المرتبطة لن يتم حذفها."
                onSubmit={confirmDelete}
                submitLabel="حذف المسار"
                isDestructive={true}
            >
                <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                    سيتم حذف المسار: {pathToDelete?.title}
                </div>
            </AdminModal>
        </div>
    );
}
