"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Path } from "@/types";

interface PathFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingPath: Path | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function PathFormModal({
    isOpen,
    onClose,
    editingPath,
    formData,
    setFormData,
    onSubmit,
}: PathFormModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingPath ? "تعديل بيانات المسار" : "إضافة مسار جديد"}
            onSubmit={onSubmit}
            submitLabel={editingPath ? "تحديث البيانات" : "إضافة مسار"}
        >
            <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>اسم المسار</Label>
                            <Input
                                value={formData.name || ""}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>المرحلة الدراسية</Label>
                            <select
                                value={formData.educationLevel || "1st_secondary"}
                                onChange={e => setFormData({ ...formData, educationLevel: e.target.value })}
                                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="1st_secondary">الصف الأول الثانوي</option>
                                <option value="2nd_secondary">الصف الثاني الثانوي</option>
                                <option value="3rd_secondary">الصف الثالث الثانوي</option>
                            </select>
                        </div>
                        
                <div className="space-y-2">
                    <Label>الوصف {editingPath && <span className="text-destructive">*</span>}</Label>
                    <textarea
                        value={formData.description || ""}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        required={!!editingPath}
                        className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={4}
                        placeholder="أدخل وصفاً تفصيلياً للمسار..."
                    />
                </div>

                <div className="space-y-2">
                    <Label>صورة الغلاف {editingPath && <span className="text-muted-foreground text-xs">(اختياري لتغيير الصورة)</span>}</Label>
                    <Input
                        type="file"
                        onChange={e => setFormData({ ...formData, coverImage: e.target.files?.[0] })}
                        className="rounded-xl cursor-pointer"
                        accept="image/*"
                    />
                </div>
            </div>
        </AdminModal>
    );
}
