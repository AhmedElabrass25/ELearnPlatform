import React from "react";
import { getAllCourses } from "@/services/courses.service";
import { UserAttemptsClient } from "./UserAttemptsClient";

export default async function UserAttemptsPage() {
    const courses = await getAllCourses().catch(() => []);

    const simpleCourses = (courses || []).map((c: any) => ({
        _id: c._id || c.id,
        id: c.id || c._id,
        title: c.title,
    }));

    return <UserAttemptsClient courses={simpleCourses} />;
}
