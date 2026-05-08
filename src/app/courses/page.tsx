import { getTrackCourses } from "@/services/tracks.service";
import { getAllCourses } from "@/services/courses.service";
import { CourseList } from "@/components/courses/CourseList";
import { Course } from "@/types";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { path } = await searchParams;
    const trackId = typeof path === 'string' ? path : undefined;
    let courses: Course[] = [];
    let hasError=false;
    let title = "تصفح الدورات";
    let subtitle = "اكتشف دورات اللغة العربية المناسبة لمستواك وأهدافك";

    try {
        if (trackId) {
            courses = await getTrackCourses(trackId);
        } else {
            courses = await getAllCourses();
        }
    } catch (err: any) {
        hasError=true;
    }

    return (
        <div className="container py-8 px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
                    <p className="text-muted-foreground text-lg">{subtitle}</p>
                </div>
            </div>
           {hasError?(
            <div className="text-center text-destructive font-bold col-span-full p-12 border-2 border-dashed border-destructive/20 rounded-2xl bg-destructive/5 backdrop-blur-sm">
            فشل في تحميل الدورات التعليمية. يرجى التحقق من الاتصال بالإنترنت.
          </div>
           ):(
            courses?.length>0 ?<CourseList initialCourses={courses} />:
            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
             لا يوجد دورات متاحة حالياً
            </div>
           )}
        </div>
    );
}

