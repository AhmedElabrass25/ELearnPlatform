"use client"
import { BookOpen, ClipboardCheck } from "lucide-react";
import {IWeekContent, Lesson, Week } from "@/types";
import { WeekItemActions } from "./WeekItemActions";
import { getWeekContent } from "@/services/weeks.service";
import { useEffect, useState } from "react";

interface WeekItemProps {
    courseId: string;
    week: Week;
    index: number;
    totalWeeks: number;
    onEdit: (week: Week) => void;
    onDelete: (week: Week) => void;
}
export function WeekItem({
    courseId,
    week,
    index,
    totalWeeks,
    onDelete,
    onEdit,
}: WeekItemProps) {
  const [weekContent, setweekContent] = useState<IWeekContent>({week:week,lessons:[],exams:[]});
  useEffect(() => {
    const fetchWeekData = async () => {
      if (!week._id) return;
      const weekContent = await getWeekContent(week._id);
      setweekContent(weekContent || { week, lessons: [], exams: [] });
    };

    fetchWeekData();
  }, [week._id]);
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-5 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all bg-card group shadow-sm">
            {/* Order controls */}
            <div className="flex sm:flex-col gap-1 items-center justify-center text-muted-foreground bg-muted/30 rounded-xl p-2 sm:p-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                </div>
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0 py-1">
                <h4 className="font-bold text-xl truncate text-foreground group-hover:text-primary transition-colors">
                    {week.title}
                </h4>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-lg">
                        <BookOpen size={15} className="text-primary" />
                        { weekContent?.lessons?.length} دروس
                    </span>
                    <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-lg">
                        <ClipboardCheck size={15} className="text-amber-500" />
                        { weekContent?.exams?.length} اختبارات
                    </span>
                </div>
            </div>

            {/* Actions */}
            <WeekItemActions courseId={courseId} week={week} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
}
