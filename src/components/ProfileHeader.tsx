import React from "react";
import { Camera, Check, Mail, ShieldCheck } from "lucide-react";
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
            {/* Avatar and Info */}
            <div className="px-6 sm:px-10 pb-6 flex flex-col justify-center items-center gap-6 -mt-16 sm:-mt-20 relative z-10">
                <div className="relative inline-block self-start sm:self-auto">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-background bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground shadow-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                        {initials}
                    </div>
                    <button className="absolute bottom-2 left-2 p-2.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors border-2 border-background">
                        <Camera size={20} />
                    </button>
                </div>

                <div className="min-w-[100px] flex-1  space-y-1">
                    <div className="flex items-center justify-center gap-2 sm:gap-4">
                        <h1 className="text-3xl font-bold text-foreground">{user.fullName}</h1>
                        <Badge variant="secondary" className="w-fit flex gap-1 items-center bg-green-500/10 text-green-600 hover:bg-green-500/20 px-3 border-green-200 dark:border-green-900">
                            <Check size={50} />
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
