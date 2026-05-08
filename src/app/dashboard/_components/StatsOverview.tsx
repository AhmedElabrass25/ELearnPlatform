"use client";

import React from "react";
import { Users, Video, Map, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface StatsOverviewProps {
    totalUsers: number;
    totalCourses: number;
    totalPaths: number;
    totalEnrollments: number;
}

export function StatsOverview({ totalUsers, totalCourses, totalPaths, totalEnrollments }: StatsOverviewProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <StatCard
                title="إجمالي المستخدمين"
                value={totalUsers}
                icon={Users}
                delay={0.1}
            />
            <StatCard
                title="إجمالي الكورسات"
                value={totalCourses}
                icon={Video}
                delay={0.2}
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
                delay={0.5}
            />
        </div>
    );
}
