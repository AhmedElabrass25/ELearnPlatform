"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordAction } from "@/actions/auth.actions";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const schema = z
    .object({
        email: z.string().email("البريد الإلكتروني غير صحيح"),
        newPassword: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
        newPasswordConfirm: z.string().min(1, "أدخل تأكيد كلمة المرور"),
    })
    .refine((d) => d.newPassword === d.newPasswordConfirm, {
        message: "كلمتا المرور غير متطابقتين",
        path: ["newPasswordConfirm"],
    });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordForm() {
    const router = useRouter();
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { email: "", newPassword: "", newPasswordConfirm: "" },
    });

    // Pre-fill email from session storage (saved in step 1)
    useEffect(() => {
        const storedEmail = sessionStorage.getItem("resetEmail") || "";
        if (storedEmail) {
            setValue("email", storedEmail);
        }
    }, [setValue]);

    const onSubmit = (data: FormValues) => {
        setSubmitError("");
        setSubmitSuccess("");
        startTransition(async () => {
            const result = await resetPasswordAction({
                email: data.email,
                newPassword: data.newPassword,
                newPasswordConfirm: data.newPasswordConfirm,
            });
            if (result.success) {
                sessionStorage.removeItem("resetEmail");
                setSubmitSuccess("تم إعادة تعيين كلمة المرور بنجاح! جاري تحويلك لتسجيل الدخول...");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setSubmitError(result.error || "فشل إعادة تعيين كلمة المرور");
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email field */}
                <div className="space-y-2">
                    <Label htmlFor="reset-email" className="font-bold">
                        البريد الإلكتروني
                    </Label>
                    <Input
                        id="reset-email"
                        type="email"
                        dir="ltr"
                        placeholder="example@email.com"
                        disabled={isPending}
                        {...register("email")}
                        className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background text-left"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <Label htmlFor="newPassword" className="font-bold">
                        كلمة المرور الجديدة
                    </Label>
                    <div className="relative">
                        <Input
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            dir="ltr"
                            placeholder="••••••••"
                            disabled={isPending}
                            {...register("newPassword")}
                            className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background text-left pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <p className="text-sm text-red-600 mt-1">{errors.newPassword.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label htmlFor="newPasswordConfirm" className="font-bold">
                        تأكيد كلمة المرور
                    </Label>
                    <div className="relative">
                        <Input
                            id="newPasswordConfirm"
                            type={showConfirm ? "text" : "password"}
                            dir="ltr"
                            placeholder="••••••••"
                            disabled={isPending}
                            {...register("newPasswordConfirm")}
                            className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background text-left pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.newPasswordConfirm && (
                        <p className="text-sm text-red-600 mt-1">{errors.newPasswordConfirm.message}</p>
                    )}
                </div>

                <Button
                    className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "جاري الحفظ..." : "تعيين كلمة المرور"}
                </Button>
            </form>

            {submitSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg mt-4">
                    <p className="text-sm text-green-800">{submitSuccess}</p>
                </div>
            )}
            {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-4">
                    <p className="text-sm text-red-800">{submitError}</p>
                </div>
            )}
        </>
    );
}
