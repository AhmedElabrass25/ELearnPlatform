"use client";

import React, { useState } from "react";
import Image from "next/image";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { Instructor } from "@/types";
import { InstructorFormModal, InstructorDeleteModal } from "@/components/dashboard/InstructorModals";

export default function InstructorsManagementPage() {
    const [instructors, setInstructors] = useState<Instructor[]>([mockData.instructor] as Instructor[]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null);
    const [formData, setFormData] = useState({ name: "", title: "", bio: "", avatar: "" });

    const handleAdd = () => { setEditingInstructor(null); setFormData({ name: "", title: "", bio: "", avatar: "" }); setIsModalOpen(true); };
    const handleEdit = (ins: Instructor) => { setEditingInstructor(ins); setFormData({ name: ins.name, title: ins.title, bio: ins.bio, avatar: ins.avatar || "" }); setIsModalOpen(true); };
    const handleSubmit = () => {
        if (editingInstructor) setInstructors(instructors.map(i => i.id === editingInstructor.id ? { ...i, ...formData } : i));
        else setInstructors([...instructors, { id: `inst${Date.now()}`, ...formData, achievements: [] } as Instructor]);
        setIsModalOpen(false);
    };

    const columns = [
        { key: "name", header: "المعلم", render: (item: Instructor) => (<div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-muted overflow-hidden">{item.avatar ? <Image src={item.avatar} alt={item.name} width={40} height={40} className="object-cover w-full h-full" /> : <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">{item.name.charAt(0)}</div>}</div><div><span className="font-semibold block">{item.name}</span><span className="text-xs text-muted-foreground">{item.title}</span></div></div>) },
        { key: "achievements", header: "الإنجازات", render: (item: Instructor) => (<div className="flex flex-wrap gap-1">{item.achievements?.slice(0, 2).map((ach, i) => (<Badge key={i} variant="outline" className="text-xs bg-muted/50 rounded-xl">{ach}</Badge>))}{item.achievements && item.achievements.length > 2 && <Badge variant="outline" className="text-xs bg-muted/50">+ {item.achievements.length - 2}</Badge>}</div>) }
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable title="إدارة المعلمين" description="إدارة ملفات المعلمين والمحاضرين." data={instructors} columns={columns} searchKey="name" searchPlaceholder="ابحث باسم المعلم..." onAdd={handleAdd} onEdit={handleEdit} onDelete={(i) => { setInstructorToDelete(i); setIsDeleteModalOpen(true); }} />
            <InstructorFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingInstructor={editingInstructor} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            <InstructorDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} instructorName={instructorToDelete?.name || ""} onConfirm={() => { if (instructorToDelete) setInstructors(instructors.filter(i => i.id !== instructorToDelete.id)); setIsDeleteModalOpen(false); }} />
        </div>
    );
}
