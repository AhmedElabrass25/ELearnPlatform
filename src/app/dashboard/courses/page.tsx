import React from "react";
import { getAllCourses } from "@/services/courses.service";
import { getTracks } from "@/services/tracks.service";
import { CoursesManagementClient } from "./CoursesManagementClient";
import { Course, Path } from "@/types";

export default async function CoursesManagementPage() {
    // use try catch to handle errors
    let courses:Course[] =[];
    let tracks:Path[] =[];
    let hasError=false
    try {
        courses = await getAllCourses() || [];
        tracks = await getTracks() || [];
    } catch (error) {
        hasError=true;
    }
    
    return (
        <CoursesManagementClient 
            initialCourses={courses} 
            tracks={tracks} 
        />
    );
}
