import React from "react";
import { BookOpen, GraduationCap, LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getMe } from "@/services/auth.service";
import { getAllCourses } from "@/services/courses.service";
import { CourseCard } from "@/components/CourseCard";

export const metadata = {
    title: "كورساتي | أكاديمية البرهان",
};

export default async function MyCoursesPage() {
    let user: any = null;
    let enrolledCourses: any[] = [];

    try {
        user = await getMe();
        const allCourses = await getAllCourses();

        // Filter courses the user is enrolled in, if API returns enrolledCourses
        const enrolledIds: string[] = user?.enrolledCourses || [];
        if (enrolledIds.length > 0 && allCourses?.length > 0) {
            enrolledCourses = allCourses.filter(
                (c: any) => enrolledIds.includes(c._id) || enrolledIds.includes(c.id)
            );
        }
    } catch (error) {
        // silently handle — user may not be logged in
    }

    const firstName = user?.fullName?.split(" ")[0] || "طالب";
    const progress = user?.progress || {};

    return (
        <div className="container py-10 pt-24 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                        <BookOpen className="text-primary" size={36} />
                        <span>كورساتي</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        مرحباً بك {firstName}، تابع تقدمك في الدورات المشتركة بها.
                    </p>
                </div>

                <div className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-xl flex items-center gap-2 font-medium">
                    <GraduationCap size={20} />
                    <span>{enrolledCourses.length} دورات مشتركة</span>
                </div>
            </div>

            <Separator className="mb-8" />

            {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {enrolledCourses.map((course: any) => (
                        <CourseCard
                            key={course?._id || course?.id}
                            course={course}
                            progress={progress?.[course?.id] || progress?.[course?._id] || 0}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-16 text-center bg-card rounded-2xl border border-border shadow-sm">
                    <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                        <LayoutDashboard size={48} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">لا توجد دورات مشتركة</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        يبدو أنك لم تشترك في أي دورة بعد. تصفح مساراتنا التعليمية وابدأ رحلة التعلم الآن.
                    </p>
                    <a href="/paths" className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">
                        تصفح المسارات
                    </a>
                </div>
            )}
        </div>
    );
}
