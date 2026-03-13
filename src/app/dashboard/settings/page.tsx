"use client";

import React, { useState } from "react";
import { Save, Image as ImageIcon } from "lucide-react";
import { mockData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [settings, setSettings] = useState({
        name: mockData.site.name,
        tagline: mockData.site.tagline,
        description: mockData.site.description,
        logo: mockData.site.logo,
        darkModeEnabled: mockData.settings.darkModeEnabled,
        animationsEnabled: mockData.settings.animationsEnabled
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccess(false);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">إعدادات المنصة</h2>
                <p className="text-muted-foreground mt-1">إدارة المعلومات الأساسية وإعدادات العرض للمنصة التعليمية.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <Card className="rounded-2xl border-border shadow-sm">
                        <CardHeader>
                            <CardTitle>المعلومات الأساسية</CardTitle>
                            <CardDescription>هذه المعلومات ستظهر في جميع صفحات الموقع ومحركات البحث.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            {/* Logo Area */}
                            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center p-4 bg-muted/20 rounded-xl border border-border">
                                <div className="w-20 h-20 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                                    {settings.logo ? (
                                        <div className="text-primary font-bold text-xl">{settings.name.charAt(0)}</div> // Fallback visualization
                                    ) : (
                                        <ImageIcon className="text-muted-foreground opacity-50" size={32} />
                                    )}
                                </div>
                                <div className="flex-1 space-y-2 w-full">
                                    <Label>رابط الشعار (Logo URL)</Label>
                                    <Input
                                        value={settings.logo}
                                        onChange={e => setSettings({ ...settings, logo: e.target.value })}
                                        className="rounded-xl text-left"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label>اسم المنصة</Label>
                                    <Input
                                        value={settings.name}
                                        onChange={e => setSettings({ ...settings, name: e.target.value })}
                                        required
                                        className="rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label>الشعار اللفظي (Tagline)</Label>
                                    <Input
                                        value={settings.tagline}
                                        onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                                        required
                                        className="rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label>وصف المنصة (SEO Description)</Label>
                                    <textarea
                                        value={settings.description}
                                        onChange={e => setSettings({ ...settings, description: e.target.value })}
                                        required
                                        className="flex min-h-[100px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-border shadow-sm">
                        <CardHeader>
                            <CardTitle>تفضيلات العرض</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                                <div className="space-y-0.5">
                                    <Label className="text-base">تفعيل الوضع الليلي</Label>
                                    <p className="text-sm text-muted-foreground">السماح للمستخدمين بالتبديل بين الوضع المضيء والليلي.</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.darkModeEnabled}
                                    onChange={e => setSettings({ ...settings, darkModeEnabled: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                                <div className="space-y-0.5">
                                    <Label className="text-base">تفعيل الحركات (Animations)</Label>
                                    <p className="text-sm text-muted-foreground">تفعيل حركات Framer Motion وعناصر الواجهة.</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.animationsEnabled}
                                    onChange={e => setSettings({ ...settings, animationsEnabled: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-4 pt-4">
                        <Button type="submit" disabled={isSaving} className="rounded-xl flex items-center gap-2 px-8">
                            <Save size={18} />
                            <span>{isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
                        </Button>
                        {success && <span className="text-green-600 font-medium">تم حفظ الإعدادات بنجاح!</span>}
                    </div>
                </div>
            </form>
        </div>
    );
}
