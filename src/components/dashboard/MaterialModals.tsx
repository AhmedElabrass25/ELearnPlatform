"use client";

import React from "react";
import { AdminModal } from "@/components/admin/AdminModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Material } from "@/types";
import { FileText, File, Link as LinkIcon, Paperclip } from "lucide-react";

interface MaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingMaterial: Material | null;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function MaterialModal({
    isOpen,
    onClose,
    editingMaterial,
    formData,
    setFormData,
    onSubmit,
}: MaterialModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingMaterial ? "تعديل المادة التعليمية" : "إضافة مادة تعليمية جديدة"}
            description="يمكنك إضافة ملفات PDF، ملاحظات نصية، أو مرفقات أخرى للأسبوع الدراسي"
            onSubmit={onSubmit}
            submitLabel={editingMaterial ? "حفظ التعديلات" : "إضافة المادة"}
        >
            <div className="grid gap-5 py-2">
                <div className="space-y-2">
                    <Label htmlFor="material-title" className="text-sm font-bold">عنوان المادة</Label>
                    <Input
                        id="material-title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="مثال: ملف قوانين النحو الشامل"
                        className="rounded-xl h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-bold">نوع المادة</Label>
                    <Select 
                        value={formData.type} 
                        onValueChange={(val) => setFormData({ ...formData, type: val })}
                    >
                        <SelectTrigger className="rounded-xl h-11">
                            <SelectValue placeholder="اختر نوع المادة" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="pdf" className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-red-500" />
                                    <span>ملف PDF</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="note">
                                <div className="flex items-center gap-2">
                                    <File className="w-4 h-4 text-blue-500" />
                                    <span>ملاحظة نصية</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="attachment">
                                <div className="flex items-center gap-2">
                                    <Paperclip className="w-4 h-4 text-amber-500" />
                                    <span>مرفق (Excel, Word, etc.)</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="material-content" className="text-sm font-bold">
                        {formData.type === 'note' ? 'المحتوى النصي للملاحظة' : 'رابط الملف أو مساره'}
                    </Label>
                    {formData.type === 'note' ? (
                        <textarea
                            id="material-content"
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
                            rows={4}
                            placeholder="اكتب الملاحظات التعليمية هنا..."
                        />
                    ) : (
                        <div className="relative">
                            <Input
                                id="material-content"
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                required
                                placeholder="/files/document.pdf"
                                className="rounded-xl h-11 pr-10"
                                dir="ltr"
                            />
                            <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                    )}
                </div>
            </div>
        </AdminModal>
    );
}

interface MaterialDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    materialTitle: string;
    onConfirm: (e: React.FormEvent) => void;
}

export function MaterialDeleteModal({
    isOpen,
    onClose,
    materialTitle,
    onConfirm,
}: MaterialDeleteModalProps) {
    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="حذف المادة التعليمية"
            description="هل أنت متأكد من رغبتك في حذف هذه المادة؟"
            onSubmit={onConfirm}
            submitLabel="حذف المادة"
            isDestructive={true}
        >
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20 font-medium">
                سيتم حذف المادة: {materialTitle}
            </div>
        </AdminModal>
    );
}
