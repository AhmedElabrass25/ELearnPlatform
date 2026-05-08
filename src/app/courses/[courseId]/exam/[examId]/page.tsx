import { notFound } from "next/navigation";
import ExamClient from "./ExamClient";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getExamsByCourse, getMyExamAttempt } from "@/services/exams.service";

interface ExamPageProps {
    params: Promise<{ courseId: string; examId: string }>;
}

export default async function ExamPage({ params }: ExamPageProps) {
    const { courseId, examId } = await params;

    // Fetch exams by course to extract exam metadata (title, duration)
    let exams = [];
    try {
        const res = await getExamsByCourse(courseId);
        exams = res;
    } catch (error) {
        console.error("Failed to fetch exams", error);
        notFound();
    }

    const exam = exams.find((e: any) => e.id === examId || e._id === examId);
if (!exam) {
      return notFound();
    }
    // Check if the user already has an active or submitted attempt
    let attempt = null;
    try {
        const attemptRes = await getMyExamAttempt(examId);
        console.log(attemptRes)
        attempt =attemptRes;
    } catch (error) {
        // Usually returns 404 if no attempt exists yet
        console.log("No previous attempt found for exam", examId);

    }

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="container py-6 px-4">
                {/* Breadcrumbs */}
                <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/dashboard" className="hover:text-primary transition-colors">لوحة التحكم</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/courses/${courseId}`} className="hover:text-primary transition-colors">محتوى الدورة</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground font-medium">{exam.title}</span>
                </div>

                <ExamClient exam={exam} courseId={courseId} initialAttempt={attempt} />
            </div>
        </div>
    );
}
