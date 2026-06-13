import React from "react";
import { getAllCourses } from "@/services/courses.service";
import { getAllExams } from "@/services/exams.service";
import { UserAttemptsClient } from "./UserAttemptsClient";

export default async function UserAttemptsPage() {
    const [courses, exams] = await Promise.all([
        getAllCourses().catch(() => []),
        getAllExams().catch(() => []),
    ]);

    const simpleCourses = (courses || []).map((c: any) => ({
        _id: c._id || c.id,
        title: c.title,
    }));

    const simpleExams = (exams || []).map((e: any) => ({
        _id: e._id || e.id,
        title: e.title,
        courseId: e.courseId || e.course?._id || e.course?.id,
    }));

    return <UserAttemptsClient courses={simpleCourses} exams={simpleExams} />;
}
