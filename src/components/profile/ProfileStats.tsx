"use client";

import React from "react";
import { BookOpen, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileStatsProps {
    totalCourses: number;
    avgProgress: number;
    completedCount: number;
}

export function ProfileStats({ totalCourses, avgProgress, completedCount }: ProfileStatsProps) {
    const stats = [
        { icon: BookOpen, label: "الدورات المشتركة", value: totalCourses, color: "text-blue-600 bg-blue-500/10" },
        { icon: TrendingUp, label: "متوسط التقدم", value: `${avgProgress}%`, color: "text-primary bg-primary/10" },
        { icon: Trophy, label: "الدورات المكتملة", value: completedCount, color: "text-green-600 bg-green-500/10" },
    ];

    return (
        <Card className="border-border shadow-sm rounded-2xl bg-gradient-to-br from-card to-card/50 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-6"><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="text-primary" /><span>ملخص النشاط</span></CardTitle></CardHeader>
            <CardContent className="p-6 space-y-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                        <div className="flex items-center gap-3">
                            <div className={`${stat.color} p-2.5 rounded-lg`}><stat.icon size={20} /></div>
                            <span className="font-medium text-foreground">{stat.label}</span>
                        </div>
                        <span className="text-2xl font-bold">{stat.value}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
