"use client";

import React from "react";
import { Menu, Moon, Sun, Bell } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/mockData";

interface DashboardTopbarProps {
    onToggleSidebar?: () => void;
}

export function DashboardTopbar({ onToggleSidebar }: DashboardTopbarProps) {
    const { theme, setTheme } = useTheme();
    const instructor = mockData.instructor;

    return (
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shadow-sm transition-colors">
            <div className="flex items-center gap-4">
                {/* Mobile menu toggle */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleSidebar}>
                    <Menu size={24} />
                </Button>
            </div>

            <div className="flex items-center gap-3">
                {/* Toggle Theme */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full bg-muted/50 hover:bg-muted"
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">تغيير المظهر</span>
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="rounded-full bg-muted/50 hover:bg-muted relative">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
                </Button>

                {/* Admin Profile */}
                <div className="flex items-center gap-2 pl-2 border-r border-border mr-2">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
                        {instructor.name.charAt(0)}
                    </div>
                    <div className="hidden sm:block text-sm">
                        <p className="font-bold leading-none">{instructor.name}</p>
                        <p className="text-muted-foreground text-xs">مدير المنصة</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
