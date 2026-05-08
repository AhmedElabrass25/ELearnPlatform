import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMe } from "@/services/auth.service";
import { DashboardLayoutClient } from "./DashboardLayoutClient";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || cookieStore.get("jwt")?.value;

    if (!token) {
        redirect("/login");
    }

    try {
        // 1. Check the persistent role cookie first (set during login)
        const userRole = cookieStore.get("userRole")?.value;
        
        // 2. Fallback to API check if cookie is missing
        const user = userRole === "admin" ? null : await getMe().catch((e: any) => { console.error("getMe DashboardLayout Fallback Issue:", e); return null; });
        const apiRole = user?.role || (user as any)?.data?.role;
        
        // Final role determination
        const finalRole = userRole || apiRole;

        // RBAC Check: Only admin can access dashboard
        if (finalRole !== "admin") {
            console.log(`Access denied: Required role 'admin', found '${finalRole}'`);
            redirect("/");
        }

        return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
    } catch (error: any) {
        console.error("Dashboard layout auth error:", error);
        redirect("/login");
    }
}
