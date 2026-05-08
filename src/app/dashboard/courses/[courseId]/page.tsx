// import React from "react";
// import { getCourseById } from "@/services/courses.service";
// import { getCourseWeeks, getWeekLessons } from "@/services/weeks.service";
// import { CourseDetailClient } from "./CourseDetailClient";
// import { cookies } from "next/headers";
// import { getExamsByWeek } from "@/services/exams.service";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ courseId: string }> | { courseId: string };
// }) {
//   const resolvedParams = await Promise.resolve(params);
//   const { courseId } = resolvedParams;

//   return {
//     title: `إدارة الكورس ${courseId} | Edu QR`,
//     description: "إدارة تفاصيل الكورس ومحتواه",
//   };
// }

// export default async function CourseDetailPage({
//   params,
// }: {
//   params: Promise<{ courseId: string }> | { courseId: string };
// }) {
//   // Await params if it's a Promise (Next.js 15+ routing pattern), otherwise use directly
//   const resolvedParams = await Promise.resolve(params);
//   const { courseId } = resolvedParams;

//   // Fetch course server-side with error handling for invalid IDs
//   let course = null;
//   let weeks = null;
//   let allWeekInfo = null;
//   let allExams = null;
//   let hasError = false;
//   try {
//     course = await getCourseById(courseId);
//     console.log(course);
//     if (course) {
//       weeks = await getCourseWeeks(courseId);
//       console.log(course);
//       course.weeks = weeks;
//     }
//     // get all lessons and all exams in week
//     if (weeks) {
//       allWeekInfo = await Promise.all(
//         weeks.map(async (week: any) => {
//           const weekId = week._id;
//           const lessons = await getWeekLessons(weekId);
//           const exams = await getExamsByWeek(weekId);
//           return {
//             weekId,
//             lessons,
//             exams,
//           };
//         }),
//       );
//     }
//   } catch (error) {
//     hasError = true;
//   }

//   let numOfLessons = allWeekInfo?.reduce(
//     (acc, week) => acc + week.lessons.length,
//     0,
//   );
//   let numOfExams = allWeekInfo?.reduce((acc, week) => acc + week.exams.length, 0);

//   return (
//     <CourseDetailClient
//       hasError={hasError}
//       initialCourse={course}
//       courseId={courseId}
//       numOfLessons={numOfLessons}
//       numOfExams={numOfExams}
//     />
//   );
// }
import { getCourseById } from "@/services/courses.service";
import { getCourseWeeks, getWeekLessons } from "@/services/weeks.service";
import { CourseDetailClient } from "./CourseDetailClient";
import { getExamsByWeek } from "@/services/exams.service";
import { Exam, Lesson, Week } from "@/types";
type WeekContent = {
   weekId: string;
  lessons: Lesson[];
  exams: Exam[];
}
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }> | { courseId: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { courseId } = resolvedParams;

  let course = null;
  let weeks: Week[] = [];
  let allWeekInfo: WeekContent[] = [];
  let hasError = false;

  // Fetch Course 
  try {
    course = await getCourseById(courseId);
  } catch (error) {
    console.error("Course Error:", error);
    hasError = true;
  }

  // Fetch Weeks 
  if (course) {
    try {
      weeks = await getCourseWeeks(courseId);
      course.weeks = weeks;
    } catch (error) {
      console.error("Weeks Error:", error);
      weeks = [];
    }
  }

  // Fetch Lessons & Exams 
  if (weeks.length > 0) {
    allWeekInfo = await Promise.all(
      weeks.map(async (week: any) => {
        try {
          const weekId = week._id;
          const [lessons, exams] = await Promise.all([
            getWeekLessons(weekId).catch(() => []),
            getExamsByWeek(weekId).catch(() => []),
          ]);
          return {
            weekId,
            lessons: lessons || [],
            exams: exams || [],
          };
        } catch (error) {
          console.error("Week Item Error:", week._id, error);
          return {
            weekId: week._id,
            lessons: [],
            exams: [],
          };
        }
      })
    );
  }
  // Calculations
  const numOfLessons = allWeekInfo.reduce(
    (acc, week) => acc + (week.lessons?.length || 0),
    0
  );
  const numOfExams = allWeekInfo.reduce(
    (acc, week) => acc + (week.exams?.length || 0),
    0
  );
  return (
    <CourseDetailClient
      hasError={hasError}
      initialCourse={course}
      courseId={courseId}
      numOfLessons={numOfLessons}
      numOfExams={numOfExams}
    />
  );
}