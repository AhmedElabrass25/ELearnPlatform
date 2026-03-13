import React from "react";
import { BookOpen, GraduationCap, LayoutDashboard, Code, PlayCircle } from "lucide-react";
import { mockData } from "@/lib/mockData";
import { CourseCard } from "@/components/CourseCard";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "كورساتي | " + mockData.site.name,
};

export default function MyCoursesPage() {
    // Get the logged in user from mockData.users
    const user = mockData.users[0]; // Ahmad Mohamed Ali

    // Read enrolledCourses array & Match course IDs with mockData.courses
    const enrolledCourses = user.enrolledCourses.map((courseId) => {
        return mockData.courses.find((c) => c.id === courseId);
    }).filter((c): c is any => !!c); // Filter out any undefined courses

    return (
        <div className="container py-10 pt-24 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                        <BookOpen className="text-primary" size={36} />
                        <span>كورساتي</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        مرحباً بك {user.fullName.split(' ')[0]}، تابع تقدمك في الدورات المشتركة بها.
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
                    {enrolledCourses.map((course) => (
                        <CourseCard
                            key={course?.id}
                            course={course}
                            progress={user.progress[course?.id as keyof typeof user.progress] || 0}
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
