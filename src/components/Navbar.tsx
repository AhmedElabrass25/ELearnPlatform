"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "المسارات", href: "/paths" },
    { name: "الكورسات", href: "/courses" },
    { name: "من نحن", href: "/about" },
];

export function Navbar() {
    const { setTheme, theme } = useTheme();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-primary">
                    <BookOpen className="h-6 w-6" />
                    <span className="font-bold text-lg hidden sm:inline-block">أكاديمية محمد</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="mx-6 hidden md:flex items-center gap-4 lg:gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="mr-auto flex items-center gap-2 sm:gap-4">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="flex-shrink-0"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">تغيير المظهر</span>
                    </Button>

                    {/* Login Button (Desktop) */}
                    <div className="hidden sm:flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/login">دخول</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register">حساب جديد</Link>
                        </Button>
                    </div>

                    {/* Mobile Navigation Sheet */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden flex-shrink-0">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">القائمة</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[85vw] sm:w-[400px] border-l-0 shadow-2xl p-6">
                            <div className="flex flex-col h-full mt-6">
                                <SheetTitle className="text-right sr-only">القائمة الرئيسية</SheetTitle>
                                <Link href="/" className="flex items-center gap-2 text-primary mb-8" onClick={() => setIsOpen(false)}>
                                    <BookOpen className="h-6 w-6" />
                                    <span className="font-bold text-lg">أكاديمية محمد</span>
                                </Link>
                                <nav className="flex flex-col space-y-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-lg font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="mt-auto flex flex-col gap-4 pb-8">
                                    <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                                        <Link href="/login">تسجيل الدخول</Link>
                                    </Button>
                                    <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                                        <Link href="/register">إنشاء حساب جديد</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
