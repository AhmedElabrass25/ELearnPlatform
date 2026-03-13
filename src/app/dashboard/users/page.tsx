"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { UserFormModal, UserDeleteModal } from "@/components/dashboard/UserModals";

export default function UsersManagementPage() {
    const [users, setUsers] = useState<User[]>(mockData.users as User[]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", educationalLevel: "", governorate: "" });

    const handleAdd = () => { setEditingUser(null); setFormData({ fullName: "", email: "", phone: "", educationalLevel: "", governorate: "" }); setIsModalOpen(true); };
    const handleEdit = (u: User) => {
        setEditingUser(u);
        setFormData({ fullName: u.fullName, email: u.email, phone: u.phone, educationalLevel: u.educationalLevel, governorate: u.governorate });
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        if (editingUser) setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        else setUsers([...users, { id: `u${Date.now()}`, ...formData, enrolledCourses: [] } as User]);
        setIsModalOpen(false);
    };

    const columns = [
        { key: "fullName", header: "الاسم", render: (item: User) => (<div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{item.fullName.charAt(0)}</div><span className="font-medium">{item.fullName}</span></div>) },
        { key: "email", header: "البريد الإلكتروني" },
        { key: "phone", header: "الهاتف", render: (item: User) => (<span dir="ltr">{item.phone}</span>) },
        { key: "educationalLevel", header: "المرحلة الدراسية" },
        { key: "enrolledCourses", header: "الدورات المشتركة", render: (item: User) => (<Badge variant="secondary" className="rounded-xl px-2">{item.enrolledCourses?.length || 0} دورات</Badge>) }
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable title="إدارة المستخدمين" description="إدارة كافة مستخدمي المنصة وإضافة مستخدمين جدد." data={users} columns={columns} searchKey="fullName" searchPlaceholder="ابحث بالاسم..." onAdd={handleAdd} onEdit={handleEdit} onDelete={(u) => { setUserToDelete(u); setIsDeleteModalOpen(true); }} />
            <UserFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingUser={editingUser} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            <UserDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} userFullName={userToDelete?.fullName || ""} onConfirm={() => { if (userToDelete) setUsers(users.filter(u => u.id !== userToDelete.id)); setIsDeleteModalOpen(false); }} />
        </div>
    );
}
