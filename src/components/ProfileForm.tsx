"use client";

import React, { useState } from "react";
import { User, Phone, MapPin, Calendar, BookOpen, UserCircle, Edit2, Save, X, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileField } from "./ProfileField";
import { ProfileSelectField } from "./ProfileSelectField";

interface ProfileFormProps {
    user: { 
        fullName: string; 
        email: string; 
        phone: string; 
        birthDate?: string; 
        gender?: string; 
        educationalLevel: string; 
        governorate: string; 
    };
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate || "",
        gender: user.gender || "ذكر",
        educationalLevel: user.educationalLevel,
        governorate: user.governorate,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => { setIsEditing(false); console.log("Saving:", formData); };
    const handleCancel = () => { 
        setFormData({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            birthDate: user.birthDate || "",
            gender: user.gender || "ذكر",
            educationalLevel: user.educationalLevel,
            governorate: user.governorate,
        }); 
        setIsEditing(false); 
    };

    const genderOptions = [{ label: "ذكر", value: "ذكر" }, { label: "أنثى", value: "أنثى" }];
    const levelOptions = ["إعدادي", "ثانوية عامة", "أزهري", "جامعي", "خريج", "أخرى"].map(l => ({ label: l, value: l }));
    const govOptions = ["القاهرة", "الإسكندرية", "الجيزة", "القليوبية", "الغربية", "الدقهلية", "أخرى"].map(g => ({ label: g, value: g }));

    return (
        <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border p-6 flex flex-row items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2"><User className="text-primary" /><span>المعلومات الشخصية</span></CardTitle>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="gap-2 rounded-xl"><Edit2 size={16} />تعديل</Button>
                ) : (
                    <div className="flex gap-2">
                        <Button onClick={handleCancel} variant="ghost" size="sm" className="gap-2 rounded-xl text-muted-foreground"><X size={16} />إلغاء</Button>
                        <Button onClick={handleSave} size="sm" className="gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white"><Save size={16} />حفظ</Button>
                    </div>
                )}
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <ProfileField label="الاسم الكامل" name="fullName" value={formData.fullName} isEditing={isEditing} onChange={handleChange} icon={<UserCircle size={16} />} />
                    <ProfileField label="البريد الإلكتروني" name="email" value={formData.email} isEditing={isEditing} onChange={handleChange} icon={<Mail size={16} />} type="email" />
                    <ProfileField label="رابط الهاتف" name="phone" value={formData.phone} isEditing={isEditing} onChange={handleChange} icon={<Phone size={16} />} dir="ltr" />
                    <ProfileField label="تاريخ الميلاد" name="birthDate" value={formData.birthDate} isEditing={isEditing} onChange={handleChange} icon={<Calendar size={16} />} type="date" />
                    <ProfileSelectField label="النوع" name="gender" value={formData.gender} isEditing={isEditing} onValueChange={(v) => setFormData(p => ({ ...p, gender: v }))} icon={<User size={16} />} options={genderOptions} />
                    <ProfileSelectField label="المرحلة الدراسية" name="educationalLevel" value={formData.educationalLevel} isEditing={isEditing} onValueChange={(v) => setFormData(p => ({ ...p, educationalLevel: v }))} icon={<BookOpen size={16} />} options={levelOptions} />
                    <ProfileSelectField label="المحافظة" name="governorate" value={formData.governorate} isEditing={isEditing} onValueChange={(v) => setFormData(p => ({ ...p, governorate: v }))} icon={<MapPin size={16} />} options={govOptions} />
                </div>
            </CardContent>
        </Card>
    );
}
