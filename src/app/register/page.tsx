"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Map, Award, Video } from "lucide-react";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock register delay
        setTimeout(() => {
            setIsLoading(false);
            window.location.href = "/";
        }, 1000);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row-reverse">
            {/* Decorative / Branding Sidebar (Reversed for RTL so it sits on the left visually) */}
            <div className="hidden lg:flex w-1/3 bg-primary/5 p-12 flex-col justify-center relative overflow-hidden border-r border-border/50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

                <div className="relative z-10 space-y-8">
                    <BookOpen className="w-16 h-16 text-primary mb-4" />
                    <h1 className="text-3xl font-bold leading-tight">
                        ابدأ رحلتك التعليمية الممتعة اليوم!
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        انضم إلى منصة أكاديمية محمد لتطوير مهاراتك في اللغة العربية وتأمين أعلى الدرجات في الامتحانات بأفضل وسائل التقنية الحديثة.
                    </p>

                    <div className="space-y-6 pt-8">
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Video className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">فيديوهات عالية الجودة</h4>
                                <p className="text-sm text-muted-foreground">شروحات واضحة ومبسطة بالصوت والصورة.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Award className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">اختبارات دورية</h4>
                                <p className="text-sm text-muted-foreground">قيم مستواك باستمرار بعد كل درس وكل وحدة.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Map className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">مسارات تعليمية منظمة</h4>
                                <p className="text-sm text-muted-foreground">خطط دراسية محكمة تناسب مستواك ومرحلتك.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Registration Form */}
            <div className="w-full lg:w-2/3 flex items-center justify-center p-6 sm:p-12 lg:p-20">
                <div className="w-full max-w-2xl">
                    <div className="mb-10 text-center lg:text-right">
                        <h2 className="text-3xl font-bold tracking-tight mb-2">إنشاء حساب جديد</h2>
                        <p className="text-muted-foreground">يرجى ملء البيانات بدقة لضمان تواصلنا معك وتحديد المسار المناسب لك.</p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border/50 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="font-bold">الاسم الرباعي</Label>
                                    <Input id="fullName" placeholder="مثل: أحمد محمد علي حسن" required className="h-11 bg-muted/30 focus:bg-background" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="font-bold">رقم الهاتف (الواتساب)</Label>
                                    <Input id="phone" type="tel" placeholder="01X XXXX XXXX" required dir="ltr" className="h-11 text-right bg-muted/30 focus:bg-background" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold">البريد الإلكتروني</Label>
                                <Input id="email" type="email" placeholder="student@example.com" required dir="ltr" className="h-11 text-right bg-muted/30 focus:bg-background" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="font-bold">كلمة المرور</Label>
                                    <Input id="password" type="password" required dir="ltr" className="h-11 text-left bg-muted/30 focus:bg-background" placeholder="••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="font-bold">تأكيد كلمة المرور</Label>
                                    <Input id="confirmPassword" type="password" required dir="ltr" className="h-11 text-left bg-muted/30 focus:bg-background" placeholder="••••••••" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-border/50">
                                <div className="space-y-2">
                                    <Label htmlFor="educationalLevel" className="font-bold">المرحلة الدراسية</Label>
                                    <Select required>
                                        <SelectTrigger id="educationalLevel" className="h-11 bg-muted/30" dir="rtl">
                                            <SelectValue placeholder="اختر المرحلة" />
                                        </SelectTrigger>
                                        <SelectContent dir="rtl">
                                            <SelectItem value="primary">ابتدائي</SelectItem>
                                            <SelectItem value="prep">إعدادي</SelectItem>
                                            <SelectItem value="secondary">ثانوي</SelectItem>
                                            <SelectItem value="uni">جامعي</SelectItem>
                                            <SelectItem value="other">أخرى</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="governorate" className="font-bold">المحافظة</Label>
                                    <Select required>
                                        <SelectTrigger id="governorate" className="h-11 bg-muted/30" dir="rtl">
                                            <SelectValue placeholder="المحافظة" />
                                        </SelectTrigger>
                                        <SelectContent dir="rtl">
                                            <SelectItem value="cairo">القاهرة</SelectItem>
                                            <SelectItem value="giza">الجيزة</SelectItem>
                                            <SelectItem value="alex">الإسكندرية</SelectItem>
                                            <SelectItem value="other">أخرى</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender" className="font-bold">النوع</Label>
                                    <Select required>
                                        <SelectTrigger id="gender" className="h-11 bg-muted/30" dir="rtl">
                                            <SelectValue placeholder="النوع" />
                                        </SelectTrigger>
                                        <SelectContent dir="rtl">
                                            <SelectItem value="male">ذكر</SelectItem>
                                            <SelectItem value="female">أنثى</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                            <p className="text-sm text-muted-foreground order-2 md:order-1 text-center md:text-right">
                                لديك حساب بالفعل؟{" "}
                                <Link href="/login" className="font-bold text-primary hover:underline">
                                    تسجيل الدخول
                                </Link>
                            </p>
                            <Button className="w-full md:w-auto min-w-[200px] h-12 text-base font-bold shadow-lg shadow-primary/20 order-1 md:order-2" type="submit" disabled={isLoading}>
                                {isLoading ? "جاري إنشاء الحساب..." : "إنشاء الحساب الآن"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
