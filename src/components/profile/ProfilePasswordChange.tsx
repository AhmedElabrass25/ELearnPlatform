"use client";

import React, { useState } from "react";
import { Lock, KeyRound, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfilePasswordChange() {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setPasswordError("");
        setPasswordSuccess("");
    };

    const submitPasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.new.length < 6) return setPasswordError("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
        if (passwordForm.new !== passwordForm.confirm) return setPasswordError("كلمتا المرور لا تتطابقان");
        setPasswordSuccess("تم تغيير كلمة المرور بنجاح");
        setPasswordForm({ current: "", new: "", confirm: "" });
    };

    return (
        <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border p-6"><CardTitle className="text-xl flex items-center gap-2"><Lock className="text-primary" /><span>تغيير كلمة المرور</span></CardTitle></CardHeader>
            <CardContent className="p-6">
                <form onSubmit={submitPasswordChange} className="space-y-4 max-w-md">
                    {['current', 'new', 'confirm'].map((field) => (
                        <div key={field} className="space-y-2">
                            <Label>{field === 'current' ? 'كلمة المرور الحالية' : field === 'new' ? 'كلمة المرور الجديدة' : 'تأكيد كلمة المرور الجديدة'}</Label>
                            <div className="relative">
                                <Input type={showPassword ? "text" : "password"} name={field} value={(passwordForm as any)[field]} onChange={handlePasswordChange} className="rounded-xl pr-10" required />
                                <KeyRound size={16} className="absolute right-3 top-3 text-muted-foreground" />
                            </div>
                        </div>
                    ))}
                    {passwordError && <p className="text-destructive text-sm font-medium">{passwordError}</p>}
                    {passwordSuccess && <p className="text-green-600 text-sm font-medium">{passwordSuccess}</p>}
                    <div className="flex items-center justify-between pt-2">
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            <span>{showPassword ? "إخفاء" : "إظهار"}</span>
                        </button>
                        <Button type="submit" className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md">حفظ التغييرات</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
