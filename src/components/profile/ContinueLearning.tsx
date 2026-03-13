"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/mockData";

interface ContinueLearningProps {
    enrolledCourseIds: string[];
    progress: Record<string, number>;
}

export function ContinueLearning({ enrolledCourseIds, progress }: ContinueLearningProps) {
    if (enrolledCourseIds.length === 0) return null;

    return (
        <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b border-border bg-muted/20">
                <CardTitle className="text-lg">استمرار التعلم</CardTitle>
                <CardDescription>أكمل من حيث توقفت</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
                {enrolledCourseIds.slice(0, 2).map((courseId, i) => {
                    const course = mockData.courses.find(c => c.id === courseId);
                    const courseProgress = progress[courseId] || 0;
                    if (!course) return null;
                    return (
                        <div key={course.id} className={`flex items-center gap-3 ${i !== 0 ? 'mt-4 pt-4 border-t border-border' : ''}`}>
                            <div className="w-12 h-12 relative rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                                {course.image && <Image src={course.image} alt={course.title} fill className="object-cover" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm truncate">{course.title}</h4>
                                <div className="mt-2 w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-primary h-full rounded-full" style={{ width: `${courseProgress}%` }}></div>
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
    );
}
