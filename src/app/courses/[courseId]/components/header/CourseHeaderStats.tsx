import { Clock, PlayCircle, CheckCircle2 } from "lucide-react";

interface CourseHeaderStatsProps {
  durationInWeeks?: number;
}

export function CourseHeaderStats({ durationInWeeks }: CourseHeaderStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-primary/10">
      <div className="flex items-center justify-start gap-3 text-foreground/80">
        <span className="font-bold">{durationInWeeks || 8} أسابيع</span>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Clock className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="flex items-center justify-start gap-3 text-foreground/80">
        <span className="font-bold">محاضرات مسجلة</span>
        <div className="p-2 bg-primary/10 rounded-lg">
          <PlayCircle className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
