"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentUsersListProps {
    recentUsers: any[];
}

export function RecentUsersList({ recentUsers }: RecentUsersListProps) {
    return (
        <Card className="col-span-1 lg:col-span-3 rounded-2xl border-border shadow-sm">
            <CardHeader>
                <CardTitle className="text-xl">أحدث المستخدمين</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {recentUsers.map((user) => (
                        <div key={user._id || user.id} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                {(user.fullName || user.name || "U").charAt(0)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{user.fullName || user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                            <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                {user.educationalLevel || user.educationLevel || "طالب"}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
