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
