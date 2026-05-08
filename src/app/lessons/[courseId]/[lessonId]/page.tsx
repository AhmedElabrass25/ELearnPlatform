import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCourseById } from "@/services/courses.service";
import { getCourseWeeks, getWeekLessons } from "@/services/weeks.service";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface LessonPageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;
  let course;
  let allLessons: any[] = [];
  try {
    course = await getCourseById(courseId);
    const weeks = await getCourseWeeks(courseId);
    const weeksWithLessons = await Promise.all(
      weeks.map(async (week: any) => {
        const lessons = await getWeekLessons(week._id);
        return lessons || [];
      }),
    );
    console.log(weeksWithLessons)
    allLessons = weeksWithLessons.flat();
  } catch (error) {
    console.error("Error fetching lesson data:", error);
    notFound();
  }

  const lessonIndex = allLessons.findIndex((l) => l._id === lessonId);
  const lesson = allLessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link
          href={`/courses/${courseId}`}
          className="hover:text-primary transition-colors"
        >
          {course.title}
        </Link>
        <ChevronLeft className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium truncate">
          {lesson.title}
        </span>
      </div>
      <div className="flex gap-2 mb-4">
        <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
          الدرس {lessonIndex + 1} من {allLessons.length}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

      {/* Video Player */}
      <div className="mb-8">
        <VideoPlayer
          url={lesson?.fullContentUrl}
          thumbnail={lesson.thumbnail}
          title={lesson.title}
        />
      </div>
      {/* Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">تفاصيل الدرس</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {lesson?.description}
        </p>
      </div>
      {/* Navigation */}
      <div className="flex justify-between items-center border p-4 rounded-xl bg-card">
        {nextLesson ? (
          <Button variant="ghost" className="gap-2" asChild>
            <Link
              href={`/lessons/${courseId}/${nextLesson.id || nextLesson._id}`}
            >
              الدرس التالي
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
        ) : (
          <div />
        )}
        {prevLesson ? (
          <Button variant="ghost" className="gap-2" asChild>
            <Link
              href={`/lessons/${courseId}/${prevLesson.id || prevLesson._id}`}
            >
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
