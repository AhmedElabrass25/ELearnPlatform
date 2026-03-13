import { notFound } from "next/navigation";
import Link from "next/link";
import { mockData } from "@/lib/mockData";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ChevronRight, ChevronLeft, Download, FileText } from "lucide-react";

interface LessonPageProps {
    params: Promise<{ courseId: string; lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
    const { courseId, lessonId } = await params;

    const course = mockData.courses.find(c => c.id === courseId);
    const lessons = mockData.lessons[courseId as keyof typeof mockData.lessons];

    if (!course || !lessons) {
        notFound();
    }

    const lessonIndex = lessons.findIndex(l => l.id === lessonId);
    const lesson = lessons[lessonIndex];

    if (!lesson) {
        notFound();
    }

    const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
    const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

    return (
        <div className="container max-w-5xl py-8 px-4 md:px-6">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-muted-foreground mb-6">
                <Link href={`/courses/${courseId}`} className="hover:text-primary transition-colors">
                    {course.title}
                </Link>
                <ChevronLeft className="w-4 h-4 mx-2" />
                <span className="text-foreground font-medium truncate">{lesson.title}</span>
            </div>

            <div className="flex gap-2 mb-4">
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    الدرس {lesson.order} من {lessons.length}
                </span>
                <span className="text-sm font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full">
                    {lesson.duration}
                </span>
            </div>

            <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

            {/* Video Player */}
            <div className="mb-8">
                <VideoPlayer
                    url={lesson.videoUrl || `https://www.youtube.com/watch?v=${lesson.youtubeId}`}
                    thumbnail={lesson.thumbnail}
                    title={lesson.title}
                />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <Button size="lg" className="w-full md:w-auto font-bold gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    تم المشاهدة
                </Button>

                <div className="flex w-full md:w-auto gap-3">
                    <Button variant="outline" size="lg" className="flex-1 md:flex-none gap-2" asChild>
                        <Link href="#">
                            <FileText className="w-4 h-4" />
                            ملاحظات
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1 md:flex-none gap-2" asChild>
                        <Link href="#">
                            <Download className="w-4 h-4" />
                            تحميل PDF
                        </Link>
                    </Button>
                </div>
            </div>

            <Separator className="my-8" />

            {/* Description */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">تفاصيل الدرس</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                    {lesson.description}
                </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center border p-4 rounded-xl bg-card">
                {nextLesson ? (
                    <Button variant="ghost" className="gap-2" asChild>
                        <Link href={`/lessons/${courseId}/${nextLesson.id}`}>
                            الدرس التالي
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                ) : (
                    <div /> // Empty div for spacing
                )}

                {prevLesson ? (
                    <Button variant="ghost" className="gap-2" asChild>
                        <Link href={`/lessons/${courseId}/${prevLesson.id}`}>
                            <ChevronRight className="w-4 h-4" />
                            الدرس السابق
                        </Link>
                    </Button>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
}
