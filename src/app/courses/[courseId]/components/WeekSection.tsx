"use client";

import React from "react";
import Link from "next/link";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  PlayCircle,
  ClipboardCheck,
  Unlock,
  Lock,
  FileDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { IWeekDetailsData } from "../types";

interface WeekSectionProps {
  week: IWeekDetailsData;
  idx: number;
  courseId: string;
  token?: string;
}


export function WeekSection({ week, idx, courseId, token }: WeekSectionProps) {
  const router = useRouter();

  const handleProtectedClick = (e: React.MouseEvent, href: string) => {
    if (!token) {
      e.preventDefault();
      router.push("/login");
    }
  };
  function formatDateTime(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}`,
    };
  }
  return (
    <AccordionItem
      value={`week-${idx}`}
      className="border rounded-2xl bg-card px-4 shadow-sm overflow-hidden"
    >
      <AccordionTrigger className="hover:no-underline py-5">
        <div className="flex items-center gap-4 text-right justify-start w-full">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
            {idx + 1}
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold">{week.week.title}</h3>
            <p className="text-sm text-muted-foreground">
              {week?.lessons?.length || 0} دروس • {week?.exams?.length || 0}{" "}
              إمتحانات
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-6 pt-2">
        <div className="space-y-3 border-t pt-5">
          {/* Lessons */}
          {week.lessons?.map((lesson, lIdx) => {
            const isPdf = lesson.type === "pdf";
            const pdfUrl = lesson.fullContentUrl || lesson.contentUrl;
            const lessonHref = `/lessons/${courseId}/${lesson.id || lesson._id}`;

            if (isPdf) {
              return (
                <a
                  key={lesson._id}
                  href={pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleProtectedClick(e, pdfUrl)}
                  className="p-4 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-xl transition-colors flex items-center gap-4 group border border-transparent hover:border-amber-200 dark:hover:border-amber-800 cursor-pointer block"
                >
                  <FileDown className="w-5 h-5 text-amber-500 opacity-80 group-hover:opacity-100" />
                  <div className="flex-1 text-right">
                    <h4 className="font-bold group-hover:text-amber-600 transition-colors">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">PDF • تحميل الملف</p>
                  </div>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded-lg">
                    تحميل
                  </span>
                </a>
              );
            }

            return (
              <Link
                key={lesson._id}
                href={lessonHref}
                onClick={(e) => handleProtectedClick(e, lessonHref)}
                className="p-4 hover:bg-muted/50 rounded-xl transition-colors flex items-center gap-4 group border border-transparent hover:border-border cursor-pointer block"
              >
                <PlayCircle className="w-5 h-5 text-primary opacity-60 group-hover:opacity-100" />
                <div className="flex-1 text-right">
                  <h4 className="font-bold group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h4>
                </div>
                {lesson.isFree === true ? (
                  <Unlock className="w-4 h-4 text-green-500" />
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground/30" />
                )}
              </Link>
            );
          })}

          {week.exams?.map((exam, eIdx) => {
            const examHref = `/courses/${courseId}/exam/${exam._id}`;
            return (
              <Link
                href={examHref}
                key={exam._id || eIdx}
                onClick={(e) => handleProtectedClick(e, examHref)}
                className="p-4 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors flex items-center gap-4 border border-primary/10 group cursor-pointer block"
              >
                <ClipboardCheck className="w-5 h-5 text-primary" />

                <div className="flex-1 text-right">
                  <h4 className="font-bold text-primary">{exam.title}</h4>
                  {/* <p className="text-xs text-primary/70">
                    {getAllQuestionsCount(exam._id)} سؤال
                  </p> */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-primary/80 bg-muted/50 px-3 py-2 rounded-lg">
                    {/* Duration */}
                    <div className="flex items-center gap-1">
                      <span>⏱</span>
                      <span>{exam.duration} دقيقة</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span>
                        {formatDateTime(exam.availableFrom).date} (
                        {formatDateTime(exam.availableFrom).time}) -{" "}
                        {formatDateTime(exam.availableUntil).date} (
                        {formatDateTime(exam.availableUntil).time})
                      </span>
                    </div>

                    {/* Marks */}
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span>{exam.totalMarks} درجة</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-primary text-white text-[10px] group-hover:scale-105 transition-transform">
                  فتح الاختبار
                </Badge>
              </Link>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
