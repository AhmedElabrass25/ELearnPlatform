export type MaterialType = 'pdf' | 'note' | 'attachment';

export interface Material {
    id: string;
    title: string;
    type: MaterialType;
    content: string; // URL for PDF/Attachment, Markdown/Text for Note
    createdAt: string;
    order: number;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;
    youtubeId: string;
    thumbnail: string;
    videoUrl?: string;
    order: number;
    isFree: boolean;
}

export type QuestionType = 'mcq' | 'true-false' | 'single-select';

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: string[]; // Required for mcq and single-select
    correctAnswer: string | boolean;
    score: number;
}

export interface Exam {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    createdAt: string;
}

export interface Week {
    id: string;
    title: string;
    order: number;
    lessons: Lesson[];
    materials: Material[];
    exams: Exam[];
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
    weeks?: Week[];
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

export interface Settings {
    darkModeEnabled: boolean;
    animationsEnabled: boolean;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    password?: string;
    educationalLevel: string;
    governorate: string;
    enrolledCourses?: string[];
    progress?: Record<string, number>;
    birthDate?: string;
    gender?: string;
    examResults?: StudentExamResult[];
}

export interface StudentExamResult {
    userId: string;
    examId: string;
    courseId: string;
    score: number;
    totalPossibleScore: number;
    submittedAt: string;
}

export interface Instructor {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatar: string;
    achievements?: string[];
}
