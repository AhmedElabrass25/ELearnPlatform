"use client";

import React, { useState } from "react";
import { Lock, KeyRound, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordAction, logoutAction } from "@/actions/auth.actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { passwordSchema, PasswordValues } from "./schema";

export function ProfilePasswordChange() {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<PasswordValues>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = (data: PasswordValues) => {
        setPasswordError("");
        startTransition(async () => {
            const result = await updatePasswordAction(data);
            if (result.success) {
                await logoutAction();
                router.push("/login");
            } else {
                setPasswordError(result.error || "فشل تغيير كلمة المرور");
            }
        });
    };

    return (
        <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border p-6">
                <CardTitle className="text-xl flex items-center gap-2">
                    <Lock className="text-primary" />
                    <span>تغيير كلمة المرور</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                        <Label>كلمة المرور الحالية</Label>
                        <div className="relative">
                            <Input 
                                type={showPassword ? "text" : "password"} 
                                {...register("currentPassword")}
                                className="rounded-xl pr-10" 
                            />
                            <KeyRound size={16} className="absolute right-3 top-3 text-muted-foreground" />
                        </div>
                        {errors.currentPassword && <p className="text-destructive text-xs pr-2">{errors.currentPassword.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>كلمة المرور الجديدة</Label>
                        <div className="relative">
                            <Input 
                                type={showPassword ? "text" : "password"} 
                                {...register("newPassword")}
                                className="rounded-xl pr-10" 
                            />
                            <KeyRound size={16} className="absolute right-3 top-3 text-muted-foreground" />
                        </div>
                        {errors.newPassword && <p className="text-destructive text-xs pr-2">{errors.newPassword.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>تأكيد كلمة المرور الجديدة</Label>
                        <div className="relative">
                            <Input 
                                type={showPassword ? "text" : "password"} 
                                {...register("passwordConfirm")}
                                className="rounded-xl pr-10" 
                            />
                            <KeyRound size={16} className="absolute right-3 top-3 text-muted-foreground" />
                        </div>
                        {errors.passwordConfirm && <p className="text-destructive text-xs pr-2">{errors.passwordConfirm.message}</p>}
                    </div>

                    {passwordError && <p className="text-destructive text-sm font-medium">{passwordError}</p>}
                    
                    <div className="flex items-center justify-between pt-2">
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            <span>{showPassword ? "إخفاء" : "إظهار"}</span>
                        </button>
                        <Button type="submit" className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md" disabled={isPending}>
                            {isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
