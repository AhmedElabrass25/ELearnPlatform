import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMe } from "@/services/auth.service";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfilePasswordChange } from "@/components/profile/ProfilePasswordChange";

export default async function ProfilePage() {
  
    let user = null;
    try {
        user = await getMe();
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
            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-8">
                    <ProfileForm user={user} />
                    <ProfilePasswordChange />
                </div>
                
            </div>
        </div>
    );
}
