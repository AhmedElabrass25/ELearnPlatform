"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { Eye } from "lucide-react";
import { Path } from "@/types";
import { PathFormModal, PathDeleteModal } from "@/components/dashboard/PathModals";

export default function PathsManagementPage() {
    const [paths, setPaths] = useState<Path[]>(mockData.paths as Path[]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPath, setEditingPath] = useState<Path | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pathToDelete, setPathToDelete] = useState<Path | null>(null);
    const [formData, setFormData] = useState({ title: "", slug: "", description: "", duration: "" });

    const handleAdd = () => { setEditingPath(null); setFormData({ title: "", slug: "", description: "", duration: "" }); setIsModalOpen(true); };
    const handleEdit = (p: Path) => { setEditingPath(p); setFormData({ title: p.title, slug: p.slug, description: p.description, duration: p.duration }); setIsModalOpen(true); };
    const handleSubmit = () => {
        if (editingPath) setPaths(paths.map(p => p.id === editingPath.id ? { ...p, ...formData } : p));
        else setPaths([...paths, { id: `path${Date.now()}`, ...formData, lessonsCount: 0 } as Path]);
        setIsModalOpen(false);
    };

    const columns = [
        { key: "title", header: "المسار", render: (item: Path) => (<span className="font-semibold text-primary">{item.title}</span>) },
        { key: "slug", header: "الرابط (Slug)" },
        { key: "duration", header: "المدة الزمنية" },
        { key: "coursesCount", header: "الكورسات" },
        { key: "lessonsCount", header: "الدروس" },
        { key: "details", header: "التفاصيل", render: (item: Path) => (<Link href={`/dashboard/paths/${item.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors"><Eye size={14} /><span>عرض</span></Link>) }
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable title="إدارة المسارات التعليمية" description="تجميع الكورسات في مسارات تعليمية وتحديد تسلسلها." data={paths} columns={columns} searchKey="title" searchPlaceholder="ابحث باسم المسار..." onAdd={handleAdd} onEdit={handleEdit} onDelete={(p) => { setPathToDelete(p); setIsDeleteModalOpen(true); }} />
            <PathFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingPath={editingPath} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            <PathDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} pathTitle={pathToDelete?.title || ""} onConfirm={() => { if (pathToDelete) setPaths(paths.filter(p => p.id !== pathToDelete.id)); setIsDeleteModalOpen(false); }} />
        </div>
    );
}
