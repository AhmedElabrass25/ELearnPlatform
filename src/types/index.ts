export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;
    youtubeId: string;
    thumbnail: string;
    order: number;
    isFree: boolean;
}

export interface Course {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    currency?: string;
    level: string;
    type: string;
    topic?: string;
    duration: string;
    pathId: string;
    image?: string;
    lessonsCount?: number;
    examsCount?: number;
    isPopular?: boolean;
    startDate?: string;
}

export interface Path {
    id: string;
    title: string;
    slug: string;
    description: string;
    coursesCount?: number;
    lessonsCount: number;
    examsCount?: number;
    duration: string;
    image?: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    educationalLevel: string;
    governorate: string;
    enrolledCourses?: string[];
    birthDate?: string;
    gender?: string;
}

export interface Instructor {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatar: string;
    achievements?: string[];
}
