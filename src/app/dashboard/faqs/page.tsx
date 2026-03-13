"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export default function FAQsManagementPage() {
    const [faqs, setFaqs] = useState<FAQ[]>(mockData.faqs);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FAQ | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<FAQ | null>(null);

    const [formData, setFormData] = useState({ question: "", answer: "" });

    const columns = [
        { key: "question", header: "السؤال", render: (item: FAQ) => <span className="font-semibold">{item.question}</span> },
        { key: "answer", header: "الإجابة", render: (item: FAQ) => <p className="text-muted-foreground line-clamp-2">{item.answer}</p> }
    ];

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({ question: "", answer: "" });
        setIsModalOpen(true);
    };

    const handleEdit = (item: FAQ) => {
        setEditingItem(item);
        setFormData({ question: item.question, answer: item.answer });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (item: FAQ) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (editingItem) {
            setFaqs(faqs.map(f => f.id === editingItem.id ? { ...f, ...formData } : f));
        } else {
            const newItem = { id: `q${Date.now()}`, ...formData };
            setFaqs([...faqs, newItem]);
        }
        setIsModalOpen(false);
    };

    const confirmDelete = (e: React.FormEvent) => {
        if (itemToDelete) setFaqs(faqs.filter(f => f.id !== itemToDelete.id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable
                title="إدارة الأسئلة الشائعة"
                description="إضافة وتعديل الأسئلة والأجوبة (FAQ)."
                data={faqs}
                columns={columns}
                searchKey="question"
                searchPlaceholder="ابحث في الأسئلة..."
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? "تعديل سؤال" : "إضافة سؤال جديد"}
                onSubmit={handleSubmit}
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>السؤال</Label>
                        <Input value={formData.question} onChange={e => setFormData({ ...formData, question: e.target.value })} required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label>الإجابة</Label>
                        <textarea
                            value={formData.answer}
                            onChange={e => setFormData({ ...formData, answer: e.target.value })}
                            required
                            className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm"
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
                    سيتم حذف السؤال: {itemToDelete?.question}
                </div>
            </AdminModal>
        </div>
    );
}
