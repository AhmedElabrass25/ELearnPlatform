import React from "react";
import { Camera, Mail, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
    user: {
        fullName: string;
        email: string;
    };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    // Generate initials for avatar fallback
    const initials = user.fullName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('');

    return (
        <div className="relative mb-8">
            {/* Cover Image/Gradient */}
            <div className="h-40 w-full rounded-3xl bg-gradient-to-r from-primary/80 via-orange-400 to-yellow-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10"></div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
            </div>

            {/* Avatar and Info */}
            <div className="px-6 sm:px-10 pb-6 flex flex-col sm:flex-row gap-6 sm:items-end -mt-16 sm:-mt-20 relative z-10">
                <div className="relative inline-block self-start sm:self-auto">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-background bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground shadow-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                        {/* If there was an image, we'd put it here. For now, fallback to initials */}
                        {initials}
                    </div>
                    <button className="absolute bottom-2 left-2 p-2.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors border-2 border-background">
                        <Camera size={20} />
                    </button>
                </div>

                <div className="flex-1 space-y-1 pt-2 sm:pt-0 sm:pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h1 className="text-3xl font-bold text-foreground">{user.fullName}</h1>
                        <Badge variant="secondary" className="w-fit flex gap-1 items-center bg-green-500/10 text-green-600 hover:bg-green-500/20 px-3 border-green-200 dark:border-green-900">
                            <ShieldCheck size={14} />
                            <span>حساب مفعل</span>
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground font-medium pt-1">
                        <Mail size={16} />
                        <span>{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
