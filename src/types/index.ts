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
    _id?: string;
    weekId?: string;
    title: string;
    description: string;
    duration: string;
    youtubeId: string;
    thumbnail: string;
    videoUrl?: string;
    type?: string;
    contentUrl?: string;
    fullContentUrl?: string;
    order: number;
    isFree: boolean;
    isPublished?: boolean;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface QuestionOption {
    _id?: string;
    id?: string;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    _id?: string;
    id: string;
    questionText: string;
    options: QuestionOption[];
    mark: number;
    // legacy compat
    text?: string;
    score?: number;
    type?: string;
    correctAnswer?: string | boolean;
}

export interface Exam {
    id: string;
    _id?: string;
    weekId?: string;
    courseId?: string;
    title: string;
    description: string;
    duration?: number;       // minutes
    totalMarks?: number;     // total marks for the exam
    availableFrom?: string;
    availableUntil?: string;
    isPublished?: boolean;
    questions: Question[];
    createdAt: string;
}

export interface Week {
  _id: string;
  title: string;
  description: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Course {
    id: string;
    _id?: string;
    title: string;
    description?: string ;
    price: number;
    durationInWeeks?: number;
    pathId?: string;
    track?: {
        _id: string;
        name: string;
        title?: string;
        coverImageUrl?:string;
        id?: string;
    };
    coverImage?:string
    isPublished?: boolean;
    active?: boolean;
    weeks?: Week[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Path {
    id: string;
    _id?: string;
    name: string;
    slug: string;
    description: string;
    coursesCount?: number;
    lessonsCount: number;
    examsCount?: number;
    duration: string;
    image?: string;
    coverImage:string
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
    educationLevel: string;
    governorate: string;
    enrolledCourses?: string[];
    progress?: Record<string, number>;
    role?: string;
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
export interface IWeekContent{
    week:Week,
    lessons:Lesson[],
    exams:Exam[]
}