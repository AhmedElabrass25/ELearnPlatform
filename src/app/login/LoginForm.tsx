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
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

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
        console.log(result);
        if (result.success) {
            setSubmitSuccess("تم تسجيل الدخول بنجاح! جاري إعادة التوجيه...");
            reset();
            router.push("/");
            router.refresh(); 
        } else {
            setSubmitError(result?.error || "فشل تسجيل الدخول");
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
            disabled={isPending}
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
            <div className="relative">
              <Input
                id="password"
                disabled={isPending}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background text-left pr-10"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
            <Link
              href="/forgot-password"
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
