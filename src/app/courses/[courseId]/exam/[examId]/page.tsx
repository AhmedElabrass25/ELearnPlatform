import { notFound } from "next/navigation";
import { mockData } from "@/lib/mockData";
import ExamClient from "./ExamClient";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ExamPageProps {
    params: Promise<{ courseId: string; examId: string }>;
}

export default async function ExamPage({ params }: ExamPageProps) {
    const { courseId, examId } = await params;

    const course = mockData.courses.find(c => c.id === courseId);
    if (!course) {
        notFound();
    }

    // Find exam in weeks
    let exam = null;
    for (const week of course.weeks || []) {
        const found = week.exams.find(e => e.id === examId);
        if (found) {
            exam = found;
            break;
        }
    }

    if (!exam) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="container py-6 px-4">
                {/* Breadcrumbs */}
                <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/dashboard" className="hover:text-primary transition-colors">لوحة التحكم</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/courses/${courseId}`} className="hover:text-primary transition-colors">{course.title}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground font-medium">{exam.title}</span>
                </div>

                <ExamClient exam={exam} courseId={courseId} />
            </div>
        </div>
    );
}
