import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";

interface CourseHeaderPricingProps {
  price: number;
}

export function CourseHeaderPricing({ price }: CourseHeaderPricingProps) {
  return (
    <div className="space-y-8">
      {/* Purchase Details */}
      <div className="flex flex-wrap items-center justify-start gap-8 bg-card p-8 rounded-3xl border border-border/50 shadow-xl">
        <div className="text-right">
          <div className="flex items-center gap-3 justify-start mb-2">
            <span className="text-4xl font-black text-foreground ">
              {price}{" "}
              <span className="text-xl font-bold">ج.م</span>
            </span>
          </div>
          <p className="text-muted-foreground">عرض لفترة محدودة جداً</p>
        </div>

        <div className="h-16 w-px bg-border hidden md:block" />

        <div className="flex-1">
          <h4 className="font-bold mb-3 text-right">يتضمن الكورس:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-right">
            <li className="flex items-center justify-start gap-2 text-foreground/70">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>فيديوهات HD</span>
            </li>
            <li className="flex items-center justify-start gap-2 text-foreground/70">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>ملفات PDF</span>
            </li>
            <li className="flex items-center justify-start gap-2 text-foreground/70">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>اختبارات دورية</span>
            </li>
            <li className="flex items-center justify-start gap-2 text-foreground/70">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>وصول مدى الحياة</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-start gap-4 pt-4">
        <Button
          size="lg"
          className="h-14 px-12 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          اشتراك الآن في الدورة
        </Button>
      </div>
    </div>
  );
}
