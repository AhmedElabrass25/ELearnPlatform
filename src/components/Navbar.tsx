import Link from "next/link";
import { cookies } from "next/headers";
import { BookOpen } from "lucide-react";
import { getMe } from "@/services/auth.service";
import { NavbarClient } from "./NavbarClient";
import { clearAuthAction } from "@/actions/auth.actions";
import Image from "next/image";

const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "المسارات", href: "/paths" },
    { name: "الكورسات", href: "/courses" },
    { name: "من نحن", href: "/about" },
];

export async function Navbar() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || cookieStore.get("jwt")?.value;
    
    let user = null;
    let isAuthenticated = false;

    if (token) {
        try {
            user = await getMe();
            isAuthenticated = !!user;
        } catch (error: any) {
            if (error.status === 401) {
                await clearAuthAction();
            }
        }
    }

    const userRole = cookieStore.get("userRole")?.value || user?.role;
    
    const currentNavLinks = [...navLinks];
    if (userRole === "admin") {
        currentNavLinks.push({ name: "لوحة التحكم", href: "/dashboard" });
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-primary">
                    <Image src="/images/burhanlogo.jpg" width={30} height={30} alt="logo"/>
                    <span className="font-bold text-lg hidden sm:inline-block">أكاديمية البرهان</span>
                </Link>

                {/* Main Client Components (Nav + Theme + Auth) */}
                <NavbarClient 
                    navLinks={currentNavLinks} 
                    isAuthenticated={isAuthenticated} 
                    user={user} 
                />
            </div>
        </header>
    );
}