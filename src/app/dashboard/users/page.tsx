"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface User {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    educationalLevel: string;
    governorate: string;
    enrolledCourses?: string[];
}

export default function UsersManagementPage() {
    const [users, setUsers] = useState<User[]>(mockData.users);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // Delete confirm state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        educationalLevel: "",
        governorate: ""
    });

    const columns = [
        {
            key: "fullName",
            header: "الاسم",
            render: (item: User) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {item.fullName.charAt(0)}
                    </div>
                    <span className="font-medium">{item.fullName}</span>
                </div>
            )
        },
        { key: "email", header: "البريد الإلكتروني" },
        { key: "phone", header: "الهاتف", render: (item: User) => <span dir="ltr">{item.phone}</span> },
        { key: "educationalLevel", header: "المرحلة الدراسية" },
        {
            key: "enrolledCourses",
            header: "الدورات المشتركة",
            render: (item: User) => (
                <Badge variant="secondary" className="rounded-xl px-2">
                    {item.enrolledCourses?.length || 0} دورات
                </Badge>
            )
        }
    ];

    const handleAdd = () => {
        setEditingUser(null);
        setFormData({ fullName: "", email: "", phone: "", educationalLevel: "", governorate: "" });
        setIsModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            educationalLevel: user.educationalLevel,
            governorate: user.governorate
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (editingUser) {
            // Update
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        } else {
            // Add
            const newUser = {
                id: `u${Date.now()}`,
                ...formData,
                password: "hashed123",
                birthDate: "2000-01-01",
                gender: "ذكر",
                enrolledCourses: [],
                progress: {}
            };
            setUsers([...users, newUser]);
        }
        setIsModalOpen(false);
    };

    const confirmDelete = (e: React.FormEvent) => {
        if (userToDelete) {
            setUsers(users.filter(u => u.id !== userToDelete.id));
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="animate-in fade-in duration-500">
            <AdminTable
                title="إدارة المستخدمين"
                description="إدارة كافة مستخدمي المنصة وإضافة مستخدمين جدد."
                data={users}
                columns={columns}
                searchKey="fullName"
                searchPlaceholder="ابحث بالاسم..."
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? "تعديل مستخدم" : "إضافة مستخدم جديد"}
                onSubmit={handleSubmit}
                submitLabel={editingUser ? "حفظ التعديلات" : "إضافة مستخدم"}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>الاسم الكامل</Label>
                        <Input
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            required
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>البريد الإلكتروني</Label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>الهاتف</Label>
                        <Input
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="rounded-xl text-left"
                            dir="ltr"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>المرحلة الدراسية</Label>
                        <Input
                            value={formData.educationalLevel}
                            onChange={e => setFormData({ ...formData, educationalLevel: e.target.value })}
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label>المحافظة</Label>
                        <Input
                            value={formData.governorate}
                            onChange={e => setFormData({ ...formData, governorate: e.target.value })}
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </AdminModal>

            <AdminModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="تأكيد الحذف"
                description="هل أنت متأكد من رغبتك في حذف هذا المستخدم؟ لا يمكن التراجع عن هذه الخطوة."
                onSubmit={confirmDelete}
                submitLabel="حذف المستخدم"
                isDestructive={true}
            >
                <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                    سيتم حذف المستخدم: {userToDelete?.fullName}
                </div>
            </AdminModal>
        </div>
    );
}
