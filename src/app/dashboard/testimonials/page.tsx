"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
}

export default function TestimonialsManagementPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(mockData.testimonials);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Testimonial | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        content: "",
        rating: 5
    });

    const columns = [
        { key: "name", header: "الاسم", render: (item: Testimonial) => <span className="font-semibold">{item.name}</span> },
        { key: "role", header: "الوصف / الدور" },
        {
            key: "rating",
            header: "التقييم",
            render: (item: Testimonial) => (
                <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < item.rating ? "fill-current" : "text-muted"} />
                    ))}
                </div>
            )
        },
        {
            key: "content",
            header: "النص",
            render: (item: Testimonial) => <p className="text-muted-foreground line-clamp-1">{item.content}</p>
        }
    ];

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({ name: "", role: "", content: "", rating: 5 });
        setIsModalOpen(true);
    };

    const handleEdit = (item: Testimonial) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            role: item.role,
            content: item.content,
            rating: item.rating
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (item: Testimonial) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (editingItem) {
            setTestimonials(testimonials.map(t => t.id === editingItem.id ? { ...t, ...formData } : t));
        } else {
            const newItem = { id: `t${Date.now()}`, ...formData };
            setTestimonials([...testimonials, newItem]);
        }
        setIsModalOpen(false);
    };

    const confirmDelete = (e: React.FormEvent) => {
        if (itemToDelete) setTestimonials(testimonials.filter(t => t.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable
                title="إدارة الآراء والمراجعات"
                description="التحكم في التقييمات المعروضة على الصفحة الرئيسية."
                data={testimonials}
                columns={columns}
                searchKey="name"
                searchPlaceholder="ابحث باسم الطالب..."
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? "تعديل تقييم" : "إضافة تقييم جديد"}
                onSubmit={handleSubmit}
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>الاسم</Label>
                        <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label>الوصف (مثال: طالب ثانوي، خريج)</Label>
                        <Input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label>التقييم (1-5)</Label>
                        <Input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })} required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label>محتوى الرأي</Label>
                        <textarea
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            required
                            className="flex min-h-[100px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm"
                        />
                    </div>
                </div>
            </AdminModal>

            <AdminModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="تأكيد الحذف"
                onSubmit={confirmDelete}
                isDestructive={true}
            >
                <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                    سيتم حذف التقييم الخاص بـ: {itemToDelete?.name}
                </div>
            </AdminModal>
        </div>
    );
}
