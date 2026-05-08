import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BookOpen, Map, Award, Video } from "lucide-react";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || cookieStore.get("jwt")?.value;

    if (token) {
        redirect("/");
    }
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row-reverse">
            {/* Decorative / Branding Sidebar (Reversed for RTL so it sits on the left visually) */}
            <div className="hidden lg:flex w-1/3 bg-primary/5 p-12 flex-col justify-center relative overflow-hidden border-r border-border/50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

                <div className="relative z-10 space-y-8">
                    <BookOpen className="w-16 h-16 text-primary mb-4" />
                    <h1 className="text-3xl font-bold leading-tight">
                        ابدأ رحلتك التعليمية الممتعة اليوم!
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        انضم إلى منصة أكاديمية محمد لتطوير مهاراتك في اللغة العربية وتأمين أعلى الدرجات في الامتحانات بأفضل وسائل التقنية الحديثة.
                    </p>

                    <div className="space-y-6 pt-8">
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Video className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">فيديوهات عالية الجودة</h4>
                                <p className="text-sm text-muted-foreground">شروحات واضحة ومبسطة بالصوت والصورة.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Award className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">اختبارات دورية</h4>
                                <p className="text-sm text-muted-foreground">قيم مستواك باستمرار بعد كل درس وكل وحدة.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Map className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">مسارات تعليمية منظمة</h4>
                                <p className="text-sm text-muted-foreground">خطط دراسية محكمة تناسب مستواك ومرحلتك.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Registration Form */}
            <div className="w-full lg:w-2/3 flex items-center justify-center p-6 sm:p-12 lg:p-20">
                <div className="w-full max-w-2xl">
                    <div className="mb-10 text-center lg:text-right">
                        <h2 className="text-3xl font-bold tracking-tight mb-2">إنشاء حساب جديد</h2>
                        <p className="text-muted-foreground">يرجى ملء البيانات بدقة لضمان تواصلنا معك وتحديد المسار المناسب لك.</p>
                    </div>

                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
