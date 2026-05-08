import Link from "next/link";
import { getCourseById } from "@/services/courses.service";
import { getCourseWeeks, getWeekContent } from "@/services/weeks.service";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Modular Components
import { CourseHeader } from "./components/CourseHeader";
import { CourseCurriculum } from "./components/CourseCurriculum";
import { MobilePurchaseBar } from "./components/MobilePurchaseBar";
import { ICourse, IWeek, IWeekDetailsData } from "./types";

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;

  let course: ICourse | null = null;

  let weeksWithLessons: IWeekDetailsData[] = [];
  try {
    const courseData = await getCourseById(courseId);
    course = courseData;
    const weeks: IWeek[] = await getCourseWeeks(courseId);
    // Fetch content for each week in parallel
    weeksWithLessons = await Promise.all(
      weeks.map(async (week: IWeek) => {
        const weekId = week._id;
        try {
          const content = await getWeekContent(weekId);
          return {
            week: week,
            lessons: content?.lessons || [],
            exams: content?.exams || [],
          };
        } catch (err: any) {
          console.error(
            `Error fetching content for week ${weekId}:`,
            err.message,
          );
          return { week: week, lessons: [], exams: [] };
        }
      }),
    );
  } catch (error: any) {
    console.error("Error fetching course data:", error?.message || error);
    if (!course) {
      return (
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">
            عذراً، تعذر العثور على هذه الدورة
          </h1>
          <Button asChild>
            <Link href="/courses">العودة إلى الدورات</Link>
          </Button>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen pb-20">
      <CourseHeader course={course} />
      {/* Course Content / Details */}
      <section className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1">
          <div className="">
            <Tabs defaultValue="curriculum" className="w-full" dir="rtl">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
                <TabsTrigger
                  value="curriculum"
                  className="text-lg py-6 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent font-bold"
                >
                  محتوى الدورة
                </TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum" className="mt-0">
                <CourseCurriculum
                  weeksWithLessons={weeksWithLessons}
                  courseId={courseId}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      <MobilePurchaseBar course={course} />
    </div>
  );
}
