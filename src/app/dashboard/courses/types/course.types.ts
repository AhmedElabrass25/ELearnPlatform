import { Course } from "@/types";

export interface CourseFormData {
    title: string;
    description: string;
    price: string;
    type: string;
    topic: string;
    durationInWeeks: string;
    pathId: string;
    image: string;
    isPublished: boolean;
    active: boolean;
    coverImage: File | null;
}

export const initialCourseFormData: CourseFormData = {
    title: "",
    description: "",
    price: "0",
    type: "أونلاين",
    topic: "",
    durationInWeeks: "6",
    pathId: "",
    image: "",
    isPublished: true,
    active: true,
    coverImage: null
};
