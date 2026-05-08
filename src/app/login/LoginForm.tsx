"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ILoginInput } from "./types";
import Link from "next/link";
import { loginAction } from "@/actions/auth.actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILoginInput) => {
    setSubmitError("");
    setSubmitSuccess("");
    
    startTransition(async () => {
        const result:any = await loginAction(data);
        if (result.success) {
            setSubmitSuccess("تم تسجيل الدخول بنجاح! جاري إعادة التوجيه...");
            reset();
            router.push("/");
            router.refresh(); 
        } else {
            setSubmitError(result?.message || "فشل تسجيل الدخول");
        }
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold">
              البريد الإلكتروني أو رقم الهاتف
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="أدخل بريدك أو رقمك"
              {...register("email")}
              className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2 flex flex-col">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-bold">
                كلمة المرور
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background text-left"
              dir="ltr"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
            <Link
              href="#"
              className="text-sm font-medium text-primary hover:underline self-end pt-1"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
        </div>

        <Button
          className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "جاري الدخول..." : "تسجيل الدخول"}
        </Button>
          </form>
             {submitSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">{submitSuccess}</p>
          </div>
        )}

        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{submitError}</p>
          </div>
        )}
    </>
  );
};

export default LoginForm;
