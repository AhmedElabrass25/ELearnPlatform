"use client";

import React from "react";
import {
    Users,
    Video,
    BookOpen,
    Map,
    TrendingUp,
    Award
} from "lucide-react";
import { mockData } from "@/lib/mockData";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function DashboardHomePage() {
    // Statistics calculations from mockData
    const totalUsers = mockData.users.length;
    const totalCourses = mockData.courses.length;
    const totalPaths = mockData.paths.length;

    // Count total enrollments
    const totalEnrollments = mockData.users.reduce((acc, user) => acc + user.enrolledCourses.length, 0);

    // Count total lessons across all courses
    const totalLessons = Object.values(mockData.lessons).reduce((acc, lessonsArray) => acc + lessonsArray.length, 0);

    // Recent Users
    const recentUsers = [...mockData.users].slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">لوحة المعلومات</h2>
                    <p className="text-muted-foreground mt-1 text-lg">نظرة عامة على أداء المنصة وإحصائيات التعلم.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <StatCard
                    title="إجمالي المستخدمين"
                    value={totalUsers}
                    icon={Users}
                    trend={{ value: 12, label: "منذ الشهر الماضي", isPositive: true }}
                    delay={0.1}
                />
                <StatCard
                    title="إجمالي الكورسات"
                    value={totalCourses}
                    icon={Video}
                    trend={{ value: 2, label: "كورسات جديدة", isPositive: true }}
                    delay={0.2}
                />
                <StatCard
                    title="إجمالي الدروس"
                    value={totalLessons}
                    icon={BookOpen}
                    delay={0.3}
                />
                <StatCard
                    title="إجمالي المسارات"
                    value={totalPaths}
                    icon={Map}
                    delay={0.4}
                />
                <StatCard
                    title="إجمالي الاشتراكات"
                    value={totalEnrollments}
                    icon={TrendingUp}
                    trend={{ value: 18, label: "منذ الأسبوع الماضي", isPositive: true }}
                    delay={0.5}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Simple Course Distribution by Level View */}
                <Card className="col-span-1 lg:col-span-4 rounded-2xl border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">توزيع الكورسات والمستوى</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {['مبتدئ', 'متوسط', 'متقدم'].map((level, index) => {
                                const count = mockData.courses.filter(c => c.level === level).length;
                                const percentage = totalCourses ? (count / totalCourses) * 100 : 0;
                                return (
                                    <div key={level} className="flex flex-col space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium flex items-center gap-2">
                                                <Award size={16} className={index === 0 ? "text-green-500" : index === 1 ? "text-yellow-500" : "text-red-500"} />
                                                {level}
                                            </span>
                                            <span className="text-muted-foreground">{count} كورس</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                                                className={`h-full rounded-full ${index === 0 ? "bg-green-500" : index === 1 ? "bg-yellow-500" : "bg-red-500"}`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity / Users */}
                <Card className="col-span-1 lg:col-span-3 rounded-2xl border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">أحدث المستخدمين</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentUsers.map((user, i) => (
                                <div key={user.id} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                        {user.fullName.charAt(0)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.fullName}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                    <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                        {user.educationalLevel}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
