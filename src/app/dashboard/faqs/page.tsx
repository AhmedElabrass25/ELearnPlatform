"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { FAQ } from "@/types";
import { FAQFormModal, FAQDeleteModal } from "@/components/dashboard/FAQModals";

export default function FAQsManagementPage() {
    const [faqs, setFaqs] = useState<FAQ[]>(mockData.faqs as FAQ[]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FAQ | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<FAQ | null>(null);
    const [formData, setFormData] = useState({ question: "", answer: "" });

    const handleAdd = () => { setEditingItem(null); setFormData({ question: "", answer: "" }); setIsModalOpen(true); };
    const handleEdit = (f: FAQ) => { setEditingItem(f); setFormData({ question: f.question, answer: f.answer }); setIsModalOpen(true); };
    const handleSubmit = () => {
        if (editingItem) setFaqs(faqs.map(f => f.id === editingItem.id ? { ...f, ...formData } : f));
        else setFaqs([...faqs, { id: `q${Date.now()}`, ...formData } as FAQ]);
        setIsModalOpen(false);
    };

    const columns = [
        { key: "question", header: "السؤال", render: (item: FAQ) => <span className="font-semibold">{item.question}</span> },
        { key: "answer", header: "الإجابة", render: (item: FAQ) => <p className="text-muted-foreground line-clamp-2">{item.answer}</p> }
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable title="إدارة الأسئلة الشائعة" description="إضافة وتعديل الأسئلة والأجوبة (FAQ)." data={faqs} columns={columns} searchKey="question" searchPlaceholder="ابحث في الأسئلة..." onAdd={handleAdd} onEdit={handleEdit} onDelete={(f) => { setItemToDelete(f); setIsDeleteModalOpen(true); }} />
            <FAQFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingItem={editingItem} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            <FAQDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} question={itemToDelete?.question || ""} onConfirm={() => { if (itemToDelete) setFaqs(faqs.filter(f => f.id !== itemToDelete.id)); setIsDeleteModalOpen(false); }} />
        </div>
    );
}
