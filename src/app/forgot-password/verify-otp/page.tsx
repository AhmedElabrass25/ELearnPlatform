import Link from "next/link";
import { BookOpen, ShieldCheck } from "lucide-react";
import VerifyOtpForm from "./VerifyOtpForm";

export default function VerifyOtpPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
            {/* Decorative / Branding Sidebar */}
            <div className="hidden lg:flex w-1/2 bg-primary/5 p-12 flex-col justify-between relative overflow-hidden border-l border-border/50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 text-primary mb-12">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-2xl">أكاديمية البرهان</span>
                    </Link>
                    <h1 className="text-4xl font-bold leading-tight mb-6">
                        تحقق من بريدك الإلكتروني
                    </h1>
                    <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-md">
                        أدخل الرمز المكون من 5 أرقام الذي أرسلناه إلى بريدك الإلكتروني.
                    </p>
                    <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-bold mb-1">رمز التحقق صالح لفترة محدودة</p>
                            <p className="text-sm text-muted-foreground">
                                تحقق من صندوق الوارد أو مجلد الرسائل غير المرغوب فيها.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-right space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">التحقق من الرمز</h2>
                        <p className="text-muted-foreground">
                            أدخل رمز التحقق المُرسل إلى بريدك الإلكتروني
                        </p>
                    </div>

                    <VerifyOtpForm />

                    <div className="text-center pt-8 border-t border-border/50">
                        <p className="text-muted-foreground">
                            لم يصلك الرمز؟{" "}
                            <Link href="/forgot-password" className="font-bold text-primary hover:underline">
                                إعادة الإرسال
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
