import { StatsOverview } from "./_components/StatsOverview";
import { CourseDistributionChart } from "./_components/CourseDistributionChart";
import { RecentUsersList } from "./_components/RecentUsersList";

interface DashboardHomeClientProps {
    totalUsers: number;
    totalCourses: number;
    totalPaths: number;
    totalEnrollments: number;
    recentUsers: any[];
}

export function DashboardHomeClient({ 
    totalUsers, 
    recentUsers, 
    totalCourses, 
    totalPaths, 
    totalEnrollments,  
}: DashboardHomeClientProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">لوحة المعلومات</h2>
                    <p className="text-muted-foreground mt-1 text-lg">نظرة عامة على أداء المنصة وإحصائيات التعلم.</p>
                </div>
            </div>

            <StatsOverview 
                totalUsers={totalUsers} 
                totalCourses={totalCourses} 
                totalPaths={totalPaths} 
                totalEnrollments={totalEnrollments} 
            />

            <div className="grid gap-6 grid-cols-1">
                <RecentUsersList recentUsers={recentUsers} />
            </div>
        </div>
    );
}
