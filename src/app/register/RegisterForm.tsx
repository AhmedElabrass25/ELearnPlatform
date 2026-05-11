"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { registerAction } from "@/actions/auth.actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema } from "./schema";
import { RegisterInput } from "./types";

const RegisterForm = () => {
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      parentPhone: "",
      email: "",
      password: "",
      passwordConfirm: "",
      educationLevel: "",
      governorate: "",
      gender: "",
    },
  });

  const onSubmit = (data: RegisterInput) => {
    setSubmitError("");
    setSubmitSuccess("");
    startTransition(async () => {
        const result = await registerAction(data);
  console.log("action response",result);
        if (result.success) {
            setSubmitSuccess("تم إنشاء الحساب بنجاح! جاري إعادة التوجيه...");
            reset();
            router.push("/");
            router.refresh();
        } else {
          
            setSubmitError(result.error || "حدث خطأ أثناء إنشاء الحساب");
        }
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border/50 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="font-bold">
                الاسم الرباعي
              </Label>
              <Input
              disabled={isPending}
                id="fullName"
                placeholder="مثل: أحمد محمد علي حسن"
                {...register("fullName")}
                className="h-11 bg-muted/30 focus:bg-background"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-bold">
              رقم الهاتف (الواتساب)
            </Label>
            <Input
              id="phone"
              type="tel"
              disabled={isPending}
              placeholder="01X XXXX XXXX"
              {...register("phone")}
              dir="ltr"
              className="h-11 text-right bg-muted/30 focus:bg-background"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
                  </div>
                   <div className="space-y-2">
            <Label htmlFor="parentPhone" className="font-bold">
              رقم هاتف الوالد (للتواصل في حالة عدم الرد)
            </Label>
            <Input
              id="phone"
              type="tel"
              disabled={isPending}
              placeholder="01X XXXX XXXX"
              {...register("parentPhone")}
              dir="ltr"
              className="h-11 text-right bg-muted/30 focus:bg-background"
            />
            {errors.parentPhone && (
              <p className="text-sm text-destructive">{errors.parentPhone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-bold">
            البريد الإلكتروني
          </Label>
          <Input
            id="email"
            type="email"
            disabled={isPending}
            placeholder="student@example.com"
            {...register("email")}
            dir="ltr"
            className="h-11 text-right bg-muted/30 focus:bg-background"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold">
              كلمة المرور
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                dir="ltr"
                disabled={isPending}
                className="h-11 text-left bg-muted/30 focus:bg-background pr-10"
                placeholder="••••••••"
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
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="font-bold">
              تأكيد كلمة المرور
            </Label>
            <div className="relative">
              <Input
                id="passwordConfirm"
                disabled={isPending}
                type={showConfirmPassword ? "text" : "password"}
                {...register("passwordConfirm")}
                dir="ltr"
                className="h-11 text-left bg-muted/30 focus:bg-background pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="text-sm text-destructive">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-border/50">
          <div className="space-y-2">
            <Label htmlFor="educationalLevel" className="font-bold">
              المرحلة الدراسية
            </Label>
            <Controller
              name="educationLevel"
              control={control}
              render={({ field }) => (
                <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-11 bg-muted/30" dir="rtl">
                    <SelectValue placeholder="اختر المرحلة" />
                      </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectItem value="first_secondary">اولي ثانوي</SelectItem>
                    <SelectItem value="second_secondary">ثاني ثانوي</SelectItem>
                    <SelectItem value="third_secondary">ثالث ثانوي</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.educationLevel && (
              <p className="text-sm text-destructive">
                {errors.educationLevel.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="governorate" className="font-bold">
              المحافظة
            </Label>
           <Controller
              name="governorate"
              control={control}
              render={({ field }) => (
                <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-11 bg-muted/30" dir="rtl">
                    <SelectValue placeholder="اختر المحافظة" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectItem value="cairo">القاهرة</SelectItem>
                    <SelectItem value="giza">الجيزة</SelectItem>
                    <SelectItem value="alex">الاسكندرية</SelectItem>
                  </SelectContent>
                </Select>   
                          )}
            />
            {errors.governorate && (
              <p className="text-sm text-destructive">
                {errors.governorate.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender" className="font-bold">
              النوع
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-sm text-muted-foreground order-2 md:order-1 text-center md:text-right">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:underline"
            >
              تسجيل الدخول
            </Link>
          </p>
          <Button
            className="w-full md:w-auto min-w-[200px] h-12 text-base font-bold shadow-lg shadow-primary/20 order-1 md:order-2"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "جاري إنشاء الحساب..." : "إنشاء الحساب الآن"}
          </Button>
        </div>

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
      </form>
    </>
  );
};

export default RegisterForm;
