"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState, useTransition } from "react";
import Link from "next/link";
import { logoutAction } from "@/actions/auth.actions";

interface NavLink {
    name: string;
    href: string;
}

interface NavbarClientProps {
    navLinks: NavLink[];
    isAuthenticated: boolean;
    user: any;
}

export function NavbarClient({ navLinks, isAuthenticated, user }: NavbarClientProps) {
    const pathname = usePathname();
    const { setTheme, theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLogout = () => {
        startTransition(async () => {
            const res = await logoutAction();
            if (res.success) {
                setIsOpen(false);
                router.refresh(); // Important to refresh server components
            }
        });
    };

    return (
        <div className="flex items-center gap-2 sm:gap-4 ml-auto md:ml-0">
            {/* Desktop Navigation */}
            <nav className="mx-6 hidden md:flex items-center gap-4 lg:gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                            pathname === link.href ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* Theme Toggle */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Auth Actions (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" asChild className="hidden sm:flex gap-2">
                            <Link href="/profile">
                                <User className="h-4 w-4" />
                                <span>الملف الشخصي</span>
                            </Link>
                        </Button>
                        {/* <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full">
                            <User className="h-4 w-4" />
                            <span className="text-xs font-medium">
                                {user?.name || user?.fullName || user?.data?.fullName || user?.data?.name || "مستخدم"}
                            </span>
                        </div> */}
                        <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={handleLogout} 
                            disabled={isPending}
                        >
                            <LogOut className="h-4 w-4 ml-2" />
                            {isPending ? "جاري الخروج..." : "خروج"}
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button variant="ghost" asChild>
                            <Link href="/login">دخول</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register">ابدأ الآن</Link>
                        </Button>
                    </>
                )}
            </div>

            {/* Mobile Menu (Sheet) */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="flex flex-col gap-6">
                    <SheetTitle className="text-right">القائمة</SheetTitle>
                    <nav className="flex flex-col gap-4 mt-4">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href} 
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-semibold ${pathname === link.href ? "text-primary" : ""}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    
                    <div className="mt-auto pb-10 flex flex-col gap-4">
                        {isAuthenticated ? (
                            <>
                                <Button className="w-full" variant="outline" asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/profile">الملف الشخصي</Link>
                                </Button>
                                <Button className="w-full" variant="destructive" onClick={handleLogout} disabled={isPending}>
                                    {isPending ? "جاري الخروج..." : "تسجيل الخروج"}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button className="w-full" variant="outline" asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/login">تسجيل الدخول</Link>
                                </Button>
                                <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/register">إنشاء حساب</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
