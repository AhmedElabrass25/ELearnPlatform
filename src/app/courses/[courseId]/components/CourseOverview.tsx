import React from "react";
import { CheckCircle2 } from "lucide-react";
import { ICourse } from "../types";

interface CourseOverviewProps {
    course: ICourse;
}

export function CourseOverview({ course }: CourseOverviewProps) {
    const learningPoints = [
        "تغطية كاملة وشاملة لمنهج الرياضيات المصري",
        "أسلوب شرح مبسط يناسب كافة المستويات",
        "أكثر من 1000 مسألة للتدريب على نمط الامتحان",
        "متابعة دورية من خلال جروبات تليجرام",
        "خطة زمنية واضحة للانتهاء من المنهج",
        "مراجعات ليلة الامتحان وتوقعات مرئية"
    ];

    return (
        <div className="space-y-12 mt-0">
            {/* What you will learn */}
            <div className="space-y-6 text-right">
                <h2 className="text-3xl font-bold">لماذا تشترك في هذا الكورس؟</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {learningPoints.map((item, i) => (
                        <div key={i} className="flex items-start justify-end gap-3 p-4 border rounded-xl bg-card">
                            <span className="text-foreground/80 font-medium">{item}</span>
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-6 text-right">
                <h2 className="text-3xl font-bold">وصف الدورة بالتفصيل</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                    <p>
                        {course.description}
                    </p>
                    <p>
                        هذا الكورس مصمم خصيصاً لطلاب المرحلة الثانوية والمهتمين بالتعمق في قواعد الرياضيات والحلول الذكية للمسائل. 
                        نبدأ معك من الأساسيات وصولاً إلى أدق التفاصيل التي تضمن لك التميز في المادة.
                    </p>
                </div>
            </div>
        </div>
    );
}
