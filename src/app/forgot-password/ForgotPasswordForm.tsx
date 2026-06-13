"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPasswordAction } from "@/actions/auth.actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

const schema = z.object({
    email: z.string().email("صيغة البريد الإلكتروني غير صحيحة"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
    const router = useRouter();
    const [submitError, setSubmitError] = useState("");
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { email: "" },
    });

    const onSubmit = (data: FormValues) => {
        setSubmitError("");
        startTransition(async () => {
            const result = await forgotPasswordAction(data);
            if (result.success) {
                // Store email in sessionStorage so the next steps can use it
                sessionStorage.setItem("resetEmail", data.email);
                router.push("/forgot-password/verify-otp");
            } else {
                setSubmitError(result.error || "فشل إرسال رمز التحقق");
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold">
                        البريد الإلكتروني
                    </Label>
                    <div className="relative">
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                        <Input
                            id="email"
                            type="email"
                            dir="ltr"
                            placeholder="example@email.com"
                            disabled={isPending}
                            {...register("email")}
                            className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background pr-10 text-left"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                    )}
                </div>

                <Button
                    className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "جاري الإرسال..." : "إرسال رمز التحقق"}
                </Button>
            </form>

            {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-4">
                    <p className="text-sm text-red-800">{submitError}</p>
                </div>
            )}
        </>
    );
}
