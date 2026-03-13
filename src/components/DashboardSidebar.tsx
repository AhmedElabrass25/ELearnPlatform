"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    Map,
    BookOpen,
    MessageSquare,
    HelpCircle,
    Settings,
    LogOut,
    X,
} from "lucide-react";

const allLinks = [
    { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "المستخدمين", icon: Users },
    { href: "/dashboard/instructors", label: "المعلمين", icon: GraduationCap },
    { href: "/dashboard/paths", label: "المسارات", icon: Map },
    { href: "/dashboard/courses", label: "الكورسات", icon: BookOpen },
    { href: "/dashboard/testimonials", label: "الآراء", icon: MessageSquare },
    { href: "/dashboard/faqs", label: "الأسئلة الشائعة", icon: HelpCircle },
    { href: "/dashboard/settings", label: "الإعدادات", icon: Settings },
];

// ─── Sidebar inner content (extracted to top-level to satisfy react-hooks rules) ───
function SidebarInner({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
    return (
        <aside className="w-64 bg-card border-l border-border flex flex-col h-full shadow-sm">
            <div className="p-5 border-b border-border flex items-center justify-between">
                <h2 className="font-bold text-lg text-primary flex items-center gap-2">
                    <GraduationCap size={24} />
                    <span>لوحة الإدارة</span>
                </h2>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {allLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive =
                        pathname === link.href ||
                        (link.href !== "/dashboard" && pathname.startsWith(link.href));
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all group ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            <Icon
                                size={19}
                                className={`transition-transform group-hover:scale-105 ${isActive ? "text-primary" : ""}`}
                            />
                            <span>{link.label}</span>
                            {isActive && (
                                <div className="mr-auto w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="p-3 border-t border-border">
                <Link
                    href="/"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-destructive hover:bg-destructive/10 transition-colors font-medium"
                >
                    <LogOut size={19} />
                    <span>العودة للمنصة</span>
                </Link>
            </div>
        </aside>
    );
}

// ─── Public component ───
interface DashboardSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function DashboardSidebar({ isOpen = false, onClose }: DashboardSidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop — always visible md+ */}
            <div className="hidden md:block h-full flex-shrink-0">
                <SidebarInner pathname={pathname} onClose={onClose} />
            </div>

            {/* Mobile drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    {/* Drawer slides from the right (RTL layout) */}
                    <div className="relative mr-auto animate-in slide-in-from-right duration-300">
                        <SidebarInner pathname={pathname} onClose={onClose} />
                    </div>
                </div>
            )}
        </>
    );
}
