"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckCircle } from "lucide-react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login delay
        setTimeout(() => {
            setIsLoading(false);
            window.location.href = "/";
        }, 1000);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
            {/* Decorative / Branding Sidebar */}
            <div className="hidden lg:flex w-1/2 bg-primary/5 p-12 flex-col justify-between relative overflow-hidden border-l border-border/50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 text-primary mb-12">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-2xl">أكاديمية محمد</span>
                    </Link>
                    <h1 className="text-4xl font-bold leading-tight mb-6">
                        مرحباً بعودتك إلى منصتك التعليمية المفضلة
                    </h1>
                    <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-md">
                        استكمل رحلة التعلم وتابع درجاتك ودروسك بكل يسر وسهولة.
                    </p>

                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-primary" />
                            <span className="text-lg font-medium">وصول فوري للكورسات المشتركة</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-primary" />
                            <span className="text-lg font-medium">متابعة سجل حضورك وتقدمك الدراسي</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-primary" />
                            <span className="text-lg font-medium">مذكرات الـ PDF والمواد الإثرائية</span>
                        </li>
                    </ul>
                </div>

                <div className="relative z-10 mt-auto pt-12">
                    <div className="p-6 bg-card rounded-2xl shadow-sm border border-border/50 max-w-sm">
                        <p className="italic text-muted-foreground leading-relaxed">
                            &quot;لقد أحببت طريقة عرض الدروس والواجبات المرتبة، ساعدني ذلك كثيراً في تنظيم وقتي.&quot;
                        </p>
                        <div className="mt-4 font-bold text-sm">- أحد طلابنا المتميزين</div>
                    </div>
                </div>
            </div>

            {/* Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-right space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">تسجيل الدخول</h2>
                        <p className="text-muted-foreground">أدخل بياناتك للوصول لحسابك</p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold">البريد الإلكتروني أو رقم الهاتف</Label>
                                <Input id="email" type="text" placeholder="أدخل بريدك أو رقمك" required className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background" />
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="font-bold">كلمة المرور</Label>
                                </div>
                                <Input id="password" type="password" placeholder="••••••••" required className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background text-left" dir="ltr" />
                                <Link href="#" className="text-sm font-medium text-primary hover:underline self-end pt-1">
                                    نسيت كلمة المرور؟
                                </Link>
                            </div>
                        </div>

                        <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" type="submit" disabled={isLoading}>
                            {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
                        </Button>
                    </form>

                    <div className="text-center pt-8 border-t border-border/50">
                        <p className="text-muted-foreground">
                            لا تمتلك حساباً بعد؟{" "}
                            <Link href="/register" className="font-bold text-primary hover:underline">
                                إنشاء حساب جديد
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
