"use client";

import React from "react";
import { mockData } from "@/lib/mockData";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { ProfilePasswordChange } from "@/components/profile/ProfilePasswordChange";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ContinueLearning } from "@/components/profile/ContinueLearning";

export default function ProfilePage() {
    const user = mockData.users[0];
    const totalCourses = user.enrolledCourses.length;
    let totalProgress = 0, completedCount = 0;

    user.enrolledCourses.forEach(id => {
        const p = user.progress[id as keyof typeof user.progress] || 0;
        totalProgress += p;
        if (p === 100) completedCount++;
    });

    const avgProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;

    return (
        <div className="container py-10 pt-24 min-h-screen">
            <ProfileHeader user={user} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <ProfileForm user={user} />
                    <ProfilePasswordChange />
                </div>
                <div className="space-y-6">
                    <ProfileStats totalCourses={totalCourses} avgProgress={avgProgress} completedCount={completedCount} />
                    <ContinueLearning enrolledCourseIds={user.enrolledCourses} progress={user.progress as unknown as Record<string, number>} />
                </div>
            </div>
        </div>
    );
}
