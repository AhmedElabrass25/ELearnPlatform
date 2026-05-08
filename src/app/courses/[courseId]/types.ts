export interface User {
  id: string;
  _id?: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
  enrolledCourses?: string[];
  progress?: Record<string, number>;
  governorate?: string;
  phone?: string;
  parentPhone?: string;
  educationLevel?: string;
  gender?: string;
}
export interface Track {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
}


export interface ICourse {
    id: string;
    _id?: string;
    title: string;
    subtitle?: string;
    description?: string;
    price: number;
    currency?: string;
    level: string;
    type: string;
    topic?: string;
    duration: string;
    durationInWeeks?: number;
    pathId?: string;
    track?: {
        _id: string;
        name: string;
        title?: string;
        id?: string;
    };
    image?: string;
    coverImage?:string
    coverImageUrl?: string;
    lessonsCount?: number;
    examsCount?: number;
    isPublished?: boolean;
    isPopular?: boolean;
    active?: boolean;
    startDate?: string;
    week?: IWeek[];
    createdAt?: string;
    updatedAt?: string;
}

// ============
// Week
export interface IWeek {
  _id: string;
  title: string;
  course: string;
  order: number;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Lesson
export interface ILesson {
  _id: string;
  id: string; // sometimes duplicated from backend
  title: string;
  description: string;
  weekId: string;
  type: "video" | "pdf" | "text"; // ممكن تزود حسب الباك
  contentUrl: string;
  fullContentUrl: string;
  order: number;
  isFree: boolean;
  isPublished: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Exam
export interface IExam {
  _id: string;
  title: string;
  weekId: string;
  courseId: string;
  duration: number;
  totalMarks: number;
  availableFrom: string;
  availableUntil: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Main Data
export interface IWeekDetailsData {
  week: IWeek;
  lessons: ILesson[];
  exams: IExam[];
}
