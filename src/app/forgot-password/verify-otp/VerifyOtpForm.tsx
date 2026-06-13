"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { verifyResetCodeAction } from "@/actions/auth.actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
    resetCode: z
        .string()
        .min(1, "أدخل رمز التحقق")
        .max(10, "الرمز غير صحيح"),
});

type FormValues = z.infer<typeof schema>;

export default function VerifyOtpForm() {
    const router = useRouter();
    const [submitError, setSubmitError] = useState("");
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { resetCode: "" },
    });

    const onSubmit = (data: FormValues) => {
        setSubmitError("");
        startTransition(async () => {
            const result = await verifyResetCodeAction({ resetCode: data.resetCode });
            if (result.success) {
                router.push("/forgot-password/reset-password");
            } else {
                setSubmitError(result.error || "رمز التحقق غير صحيح أو منتهي الصلاحية");
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="resetCode" className="font-bold">
                        رمز التحقق
                    </Label>
                    <Input
                        id="resetCode"
                        type="text"
                        dir="ltr"
                        placeholder="أدخل الرمز المكون من أرقام"
                        disabled={isPending}
                        {...register("resetCode")}
                        className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background text-center text-2xl tracking-widest font-bold"
                    />
                    {errors.resetCode && (
                        <p className="text-sm text-red-600 mt-1">{errors.resetCode.message}</p>
                    )}
                </div>

                <Button
                    className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "جاري التحقق..." : "تحقق من الرمز"}
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
