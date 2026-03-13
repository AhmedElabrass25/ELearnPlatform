"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { Star } from "lucide-react";
import { Testimonial } from "@/types";
import { TestimonialFormModal, TestimonialDeleteModal } from "@/components/dashboard/TestimonialModals";

export default function TestimonialsManagementPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(mockData.testimonials as Testimonial[]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState({ name: "", role: "", content: "", rating: 5 });

    const handleAdd = () => { setEditingItem(null); setFormData({ name: "", role: "", content: "", rating: 5 }); setIsModalOpen(true); };
    const handleEdit = (t: Testimonial) => { setEditingItem(t); setFormData({ name: t.name, role: t.role, content: t.content, rating: t.rating }); setIsModalOpen(true); };
    const handleSubmit = () => {
        if (editingItem) setTestimonials(testimonials.map(t => t.id === editingItem.id ? { ...t, ...formData } : t));
        else setTestimonials([...testimonials, { id: `t${Date.now()}`, ...formData } as Testimonial]);
        setIsModalOpen(false);
    };

    const columns = [
        { key: "name", header: "الاسم", render: (item: Testimonial) => <span className="font-semibold">{item.name}</span> },
        { key: "role", header: "الوصف / الدور" },
        { key: "rating", header: "التقييم", render: (item: Testimonial) => (<div className="flex gap-1 text-yellow-500">{[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < item.rating ? "fill-current" : "text-muted"} />))}</div>) },
        { key: "content", header: "النص", render: (item: Testimonial) => <p className="text-muted-foreground line-clamp-1">{item.content}</p> }
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable title="إدارة الآراء والمراجعات" description="التحكم في التقييمات المعروضة على الصفحة الرئيسية." data={testimonials} columns={columns} searchKey="name" searchPlaceholder="ابحث باسم الطالب..." onAdd={handleAdd} onEdit={handleEdit} onDelete={(t) => { setItemToDelete(t); setIsDeleteModalOpen(true); }} />
            <TestimonialFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingItem={editingItem} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            <TestimonialDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} itemName={itemToDelete?.name || ""} onConfirm={() => { if (itemToDelete) setTestimonials(testimonials.filter(t => t.id !== itemToDelete.id)); setIsDeleteModalOpen(false); }} />
        </div>
    );
}
