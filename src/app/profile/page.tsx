import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMe } from "@/services/auth.service";
import { getMyAllAttempts } from "@/services/exams.service";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfilePasswordChange } from "@/components/profile/ProfilePasswordChange";
import { ProfileExamResults } from "@/components/profile/ProfileExamResults";

export default async function ProfilePage() {
  
    let user = null;
    let attempts = [];
    
    try {
        const [userData, attemptsData] = await Promise.all([
            getMe(),
            getMyAllAttempts().catch(() => [])
        ]);
        
        user = userData;
        attempts = attemptsData || [];
        
        if (!user) {
            redirect("/login");
        }
    } catch (error) {
        redirect("/login");
    }

    const totalCourses = user.enrolledCourses?.length || 0;
    let totalProgress = 0, completedCount = 0;

    user.enrolledCourses?.forEach((id: string) => {
        const p = user.progress ? (user.progress as any)[id] || 0 : 0;
        totalProgress += p;
        if (p === 100) completedCount++;
    });

    const avgProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;

    return (
        <div className="container py-10 pt-24 min-h-screen">
            <ProfileHeader user={user} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 space-y-8">
                    <ProfileForm user={user} />
                    <ProfilePasswordChange />
                </div>
                <div className="lg:col-span-1">
                    <ProfileExamResults attempts={attempts} />
                </div>
            </div>
        </div>
    );
}
