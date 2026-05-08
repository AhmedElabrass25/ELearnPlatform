"use client";

import React, { useState } from "react";
import { User, MapPin, UserCircle, Edit2, Save, X, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileField } from "../../ProfileField";
import { ProfileSelectField } from "../../ProfileSelectField";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileAction } from "@/actions/auth.actions";
import { profileSchema, ProfileValues, ProfileFormProps } from "./schema";
import { useTransition } from "react";

export function ProfileForm({ user }: ProfileFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, startTransition] = useTransition();
    
    const { control, handleSubmit, reset, formState: { errors } } = useForm<ProfileValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: user.fullName,
            email: user.email,
            governorate: user.governorate || "",
        }
    });

    const onSubmit = async (data: ProfileValues) => {
        startTransition(async () => {
            const result = await updateProfileAction(data);
            if (result.success) {
                setIsEditing(false);
            } else {
                alert(result.error || "فشل تحديث البيانات");
            }
        });
    };

    const handleCancel = () => { 
        reset();
        setIsEditing(false); 
    };

    const govOptions = ["القاهرة", "الإسكندرية", "الجيزة", "القليوبية", "الغربية", "الدقهلية", "أخرى"].map(g => ({ label: g, value: g }));

    return (
        <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border p-6 flex flex-row items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                    <User className="text-primary" />
                    <span>المعلومات الشخصية</span>
                </CardTitle>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="gap-2 rounded-xl">
                        <Edit2 size={16} />
                        تعديل
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button onClick={handleCancel} variant="ghost" size="sm" className="gap-2 rounded-xl text-muted-foreground">
                            <X size={16} />
                            إلغاء
                        </Button>
                        <Button 
                            onClick={handleSubmit(onSubmit)} 
                            size="sm" 
                            className="gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white" 
                            disabled={isPending}
                        >
                            <Save size={16} />
                            {isPending ? "جاري الحفظ..." : "حفظ"}
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-1">
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <ProfileField 
                                    label="الاسم الكامل" 
                                    icon={<UserCircle size={16} />} 
                                    isEditing={isEditing}
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.fullName && <p className="text-destructive text-xs pr-2">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <ProfileField 
                                    label="البريد الإلكتروني" 
                                    icon={<Mail size={16} />} 
                                    type="email"
                                    isEditing={isEditing}
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.email && <p className="text-destructive text-xs pr-2">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Controller
                            name="governorate"
                            control={control}
                            render={({ field }) => (
                                <ProfileSelectField 
                                    label="المحافظة" 
                                    icon={<MapPin size={16} />} 
                                    isEditing={isEditing}
                                    options={govOptions}
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                />
                            )}
                        />
                        {errors.governorate && <p className="text-destructive text-xs pr-2">{errors.governorate.message}</p>}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
