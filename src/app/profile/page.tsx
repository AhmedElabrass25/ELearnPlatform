"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    BookOpen,
    Trophy,
    TrendingUp,
    Lock,
    KeyRound,
    Eye,
    EyeOff
} from "lucide-react";
import { mockData } from "@/lib/mockData";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
    const user = mockData.users[0]; // u1: Ahmad Mohamed Ali

    // Prepare stats
    const totalCourses = user.enrolledCourses.length;

    // Calculate average progress
    let totalProgress = 0;
    let completedCount = 0;

    user.enrolledCourses.forEach(courseId => {
        const progress = user.progress[courseId as keyof typeof user.progress] || 0;
        totalProgress += progress;
        if (progress === 100) completedCount++;
    });

    const avgProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;

    // Password Change State
    const [showPassword, setShowPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        current: "",
        new: "",
        confirm: ""
    });
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setPasswordError("");
        setPasswordSuccess("");
    };

    const submitPasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.new.length < 6) {
            setPasswordError("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
            return;
        }
        if (passwordForm.new !== passwordForm.confirm) {
            setPasswordError("كلمتا المرور لا تتطابقان");
            return;
        }
        // Simulate API call
        setPasswordSuccess("تم تغيير كلمة المرور بنجاح");
        setPasswordForm({ current: "", new: "", confirm: "" });
    };

    return (
        <div className="container py-10 pt-24 min-h-screen">
            <ProfileHeader user={user} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content - Left Side (RTL -> Right side visually) */}
                <div className="lg:col-span-2 space-y-8">
                    <ProfileForm user={user} />

                    {/* Change Password Section */}
                    <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border p-6">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Lock className="text-primary" />
                                <span>تغيير كلمة المرور</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={submitPasswordChange} className="space-y-4 max-w-md">
                                <div className="space-y-2 relative">
                                    <Label>كلمة المرور الحالية</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            name="current"
                                            value={passwordForm.current}
                                            onChange={handlePasswordChange}
                                            className="rounded-xl pr-10"
                                            required
                                        />
                                        <KeyRound size={16} className="absolute right-3 top-3 text-muted-foreground" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>كلمة المرور الجديدة</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            name="new"
                                            value={passwordForm.new}
                                            onChange={handlePasswordChange}
                                            className="rounded-xl pr-10"
                                            required
                                        />
                                        <KeyRound size={16} className="absolute right-3 top-3 text-muted-foreground" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>تأكيد كلمة المرور الجديدة</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            name="confirm"
                                            value={passwordForm.confirm}
                                            onChange={handlePasswordChange}
                                            className="rounded-xl pr-10"
                                            required
                                        />
                                        <KeyRound size={16} className="absolute right-3 top-3 text-muted-foreground" />
                                    </div>
                                </div>

                                {passwordError && <p className="text-destructive text-sm font-medium">{passwordError}</p>}
                                {passwordSuccess && <p className="text-green-600 text-sm font-medium">{passwordSuccess}</p>}

                                <div className="flex items-center justify-between pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        <span>{showPassword ? "إخفاء" : "إظهار"} كلمات المرور</span>
                                    </button>
                                    <Button type="submit" className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md">
                                        حفظ التغييرات
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Stats */}
                <div className="space-y-6">
                    {/* Stats Summary */}
                    <Card className="border-border shadow-sm rounded-2xl bg-gradient-to-br from-card to-card/50 overflow-hidden">
                        <CardHeader className="bg-primary/5 border-b border-primary/10 p-6">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="text-primary" />
                                <span>ملخص النشاط</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">

                            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500/10 p-2.5 rounded-lg text-blue-600 dark:text-blue-400">
                                        <BookOpen size={20} />
                                    </div>
                                    <span className="font-medium text-foreground">الدورات المشتركة</span>
                                </div>
                                <span className="text-2xl font-bold">{totalCourses}</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                                        <TrendingUp size={20} />
                                    </div>
                                    <span className="font-medium text-foreground">متوسط التقدم</span>
                                </div>
                                <span className="text-2xl font-bold">{avgProgress}%</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-500/10 p-2.5 rounded-lg text-green-600 dark:text-green-400">
                                        <Trophy size={20} />
                                    </div>
                                    <span className="font-medium text-foreground">الدورات المكتملة</span>
                                </div>
                                <span className="text-2xl font-bold">{completedCount}</span>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Continue Learning Widget */}
                    {totalCourses > 0 && (
                        <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
                            <CardHeader className="p-5 border-b border-border bg-muted/20">
                                <CardTitle className="text-lg">استمرار التعلم</CardTitle>
                                <CardDescription>أكمل من حيث توقفت</CardDescription>
                            </CardHeader>
                            <CardContent className="p-5">
                                {user.enrolledCourses.slice(0, 2).map((courseId, i) => {
                                    const course = mockData.courses.find(c => c.id === courseId);
                                    const progress = user.progress[courseId as keyof typeof user.progress] || 0;
                                    if (!course) return null;
                                    return (
                                        <div key={course.id} className={`flex items-center gap-3 ${i !== 0 ? 'mt-4 pt-4 border-t border-border' : ''}`}>
                                            <div className="w-12 h-12 relative rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                                                {course.image && (
                                                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm truncate">{course.title}</h4>
                                                <div className="mt-2 w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                                    <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <Button className="w-full mt-5 rounded-xl bg-muted text-foreground hover:bg-muted/80" variant="secondary" asChild>
                                    <a href="/my-courses">عرض كل الكورسات</a>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                </div>
            </div>
        </div>
    );
}
