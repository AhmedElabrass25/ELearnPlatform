"use client"
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface WeekBreadcrumbsProps {
    courseId: string;
    courseTitle: string;
    weekTitle: string;
}

export function WeekBreadcrumbs({ courseId, courseTitle, weekTitle }: WeekBreadcrumbsProps) {
    const router = useRouter();
    
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl h-8" onClick={() => router.back()}>
                <ArrowRight size={14} />رجوع
            </Button>
            <span>/</span>
            <Link href="/dashboard/courses" className="hover:text-primary transition-colors">الكورسات</Link>
            <span>/</span>
            <Link href={`/dashboard/courses/${courseId}`} className="hover:text-primary transition-colors">{courseTitle}</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{weekTitle}</span>
        </div>
    );
}
