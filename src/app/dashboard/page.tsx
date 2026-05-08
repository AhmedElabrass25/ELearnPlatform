import React from "react";
import { cookies } from "next/headers";
import { getAllUsers } from "@/services/admin.service";
import { getAllCourses } from "@/services/courses.service";
import { getTracks } from "@/services/tracks.service";
import { DashboardHomeClient } from "./DashboardHomeClient";

export default async function DashboardHomePage() {

  // Fetch all data in parallel
  const [users, courses, tracks] = await Promise.all([
    getAllUsers().catch(() => ({ data: [], nemberOfAllUsers: 0 })),
    getAllCourses().catch(() => []),
    getTracks().catch(() => []),
  ]);
  const allUsers = users?.data;

  // Statistics calculations
  const totalUsers = users?.nemberOfAllUsers || 0;
  const totalCourses = courses?.length || 0;
  const totalPaths = tracks?.length || 0;

  // totalEnrollments
  const totalEnrollments =
    courses?.reduce(
      (acc: number, course: any) => acc + (course.enrollmentsCount || 0),
      0,
    ) || 0;
  // Recent Users
  const recentUsers = [...(allUsers || [])].slice(0, 5);

  const levels = ["مبتدئ", "متوسط", "متقدم"];
  const courseDistribution = levels.map((level) => {
    const count = courses?.filter((c: any) => c.level === level).length || 0;
    const percentage = totalCourses ? (count / totalCourses) * 100 : 0;
    return { level, count, percentage };
  });

  return (
    <DashboardHomeClient
      totalEnrollments={totalEnrollments}
      totalUsers={totalUsers}
      totalCourses={totalCourses}
      totalPaths={totalPaths}
      recentUsers={recentUsers}
    />
  );
}
