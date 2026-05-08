import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getTrackById, getTrackCourses } from "@/services/tracks.service";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PathDetailClient } from "./PathDetailClient";

interface PageProps {
    params: Promise<{
        pathId: string;
    }>;
}

export default async function PathDetailPage({ params }: PageProps) {
    const { pathId } = await params;
    const path = await getTrackById(pathId);
    const courses = await getTrackCourses(pathId) || [];
    if (!path) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
            <AlertTriangle size={48} className="text-destructive" />
            <h2 className="text-2xl font-bold">المسار غير موجود</h2>
            <Button asChild>
                <Link href="/dashboard/paths">العودة للمسارات</Link>
            </Button>
        </div>
    );

    return (
        <PathDetailClient 
            path={path} 
            initialCourses={courses} 
            pathId={pathId} 
        />
    );
}
