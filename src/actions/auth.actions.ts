"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { login, register, logout, updateMe, updatePassword, forgotPassword, verifyResetCode, resetPassword } from "@/services/auth.service";
import { ILoginForm } from "@/app/login/types";
import { IRegisterForm } from "@/app/register/types";

// Types for Action states
export type ActionResponse<T = any> = {
    success: boolean;
    data?: T;
    error?: string;
};

/**
 * Server Action: Login
 */
export async function loginAction(data: ILoginForm): Promise<ActionResponse> {
    try {
        const response = await login(data);
        const token = response.token || response.data?.token;
        const userData = response.data?.user || response.data || response.user;
        if (!token) {
            return { success: false, error: "فشل الحصول على رمز الدخول" };
        }
        const role = response.role || userData?.role || "student";
        const cookieStore = await cookies();
                cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        cookieStore.set("userRole", role, {
            httpOnly: false, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        revalidatePath("/", "layout");
        return { success: true, data: userData };
    } catch (err: any) {
        console.error("Login action error:", err);
        return { success: false, error: err.message || "حدث خطأ أثناء تسجيل الدخول" };
    }
}

/**
 * Server Action: Register
 */
export async function registerAction(data: IRegisterForm): Promise<ActionResponse> {
    try {
        const response = await register(data);
        console.log(response);
        const token = response.token || response.data?.token;
        if (!token) {
            return { success: false, error: "فشل الحصول على رمز الدخول بعد التسجيل" };
        }
        const role = response.role || response.data?.role || "student";
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
        cookieStore.set("userRole", role, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
        revalidatePath("/", "layout");
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message || "حدث خطأ أثناء إنشاء الحساب" };
    }
}

/**
 * Server Action: Logout
 */
export async function logoutAction(): Promise<ActionResponse> {
    try {
        await logout().catch(() => {}); 
        return await clearAuthAction();
    } catch (err: any) {
        return { success: false, error: "فشل تسجيل الخروج" };
    }
}

/**
 * Server Action: Clear local auth state
 */
export async function clearAuthAction(): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");
        cookieStore.delete("jwt");
        cookieStore.delete("userRole");
        revalidatePath("/", "layout");
        return { success: true };
    } catch (err: any) {
        return { success: false, error: "فشل مسح بيانات الدخول" };
    }
}

/**
 * Server Action: Update Profile
 */
export async function updateProfileAction(data: { fullName: string; email: string; governorate: string }): Promise<ActionResponse> {
    try {
        const response = await updateMe(data);
        revalidatePath("/profile");
        return { success: true, data: response.data };
    } catch (err: any) {
        return { success: false, error: err.message || "فشل تحديث البيانات" };
    }
}

/**
 * Server Action: Update Password
 */
export async function updatePasswordAction(data: { currentPassword: string; newPassword: string; passwordConfirm: string }): Promise<ActionResponse> {
    try {
        await updatePassword(data);
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message || "فشل تغيير كلمة المرور" };
    }
}

/**
 * Server Action: Forgot Password – sends OTP to email
 */
export async function forgotPasswordAction(data: { email: string }): Promise<ActionResponse> {
    try {
        const response = await forgotPassword(data);
        return { success: true, data: response };
    } catch (err: any) {
        return { success: false, error: err.message || "فشل إرسال رمز التحقق" };
    }
}

/**
 * Server Action: Verify OTP reset code
 */
export async function verifyResetCodeAction(data: { resetCode: string }): Promise<ActionResponse> {
    try {
        const response = await verifyResetCode(data);
        return { success: true, data: response };
    } catch (err: any) {
        return { success: false, error: err.message || "رمز التحقق غير صحيح أو منتهي" };
    }
}

/**
 * Server Action: Reset Password
 */
export async function resetPasswordAction(data: { email: string; newPassword: string; newPasswordConfirm: string }): Promise<ActionResponse> {
    try {
        const response = await resetPassword(data);
        return { success: true, data: response };
    } catch (err: any) {
        return { success: false, error: err.message || "فشل إعادة تعيين كلمة المرور" };
    }
}
