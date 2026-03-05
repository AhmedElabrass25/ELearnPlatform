import { notFound } from "next/navigation";
import Link from "next/link";
import { mockData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, CheckCircle, Clock, PlayCircle, Star, Calendar } from "lucide-react";

interface CoursePageProps {
    params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
    const { courseId } = await params;

    const course = mockData.courses.find(c => c.id === courseId);
    if (!course) {
        notFound();
    }

    const lessons = mockData.lessons[courseId as keyof typeof mockData.lessons] || [];

    return (
        <div className="container py-8 px-4 md:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="flex-1 space-y-6">
                    <div className="flex gap-2">
                        <Badge className="bg-primary hover:bg-primary/90 text-white font-medium">{course.level}</Badge>
                        <Badge variant="secondary" className="bg-muted text-foreground">{course.type}</Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{course.title}</h1>
                    {course.subtitle && (
                        <p className="text-xl text-muted-foreground">{course.subtitle}</p>
                    )}

                    <div className="flex flex-wrap gap-6 items-center text-sm font-medium text-muted-foreground pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <span>{course.topic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-primary" />
                            <span>{course.lessonsCount} دروس</span>
                        </div>
                        {course.startDate && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span>يبدأ في {course.startDate}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 pt-6">
                        <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-bold text-white">
                            اشترك الآن بـ {course.price} {course.currency || 'ج.م'}
                        </Button>
                        {lessons.length > 0 && (
                            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-bold" asChild>
                                <Link href={`/lessons/${course.id}/${lessons[0].id}`}>
                                    ابدأ التعلم
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Thumbnail Placeholder */}
                <div className="w-full md:w-1/3 aspect-video md:aspect-[4/3] bg-muted relative rounded-2xl overflow-hidden border border-border shadow-lg">
                    <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                        <BookOpen className="w-24 h-24 text-primary/20" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 z-20 flex gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </div>
                </div>
            </div>

            <Separator className="my-8" />

            {/* Tabs */}
            <Tabs defaultValue="lessons" className="w-full">
                <TabsList className="mb-8 w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger value="lessons" className="text-lg py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent">
                        محتوى الدورة
                    </TabsTrigger>
                    <TabsTrigger value="instructor" className="text-lg py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent">
                        المدرب
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="text-lg py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent">
                        التقييمات
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="lessons" className="mt-0">
                    <div className="border rounded-xl bg-card overflow-hidden shadow-sm flex flex-col">
                        <div className="bg-muted/50 p-4 font-bold border-b">
                            الدروس ({lessons.length})
                        </div>

                        <ScrollArea className="h-[500px]">
                            <div className="flex flex-col divide-y">
                                {lessons.map((lesson, idx) => (
                                    <Link
                                        key={lesson.id}
                                        href={`/lessons/${course.id}/${lesson.id}`}
                                        className="p-4 hover:bg-muted/30 transition-colors flex items-center gap-4 group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{lesson.title}</h4>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{lesson.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            {lesson.isFree && <Badge variant="outline" className="border-green-500 text-green-500 hidden sm:inline-flex">مجاني</Badge>}
                                            <span>{lesson.duration}</span>
                                            <PlayCircle className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </TabsContent>

                <TabsContent value="instructor" className="mt-0 pt-4">
                    <div className="flex gap-6 items-start">
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-3xl font-bold text-primary">{mockData.instructor.name}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-1">أستاذ {mockData.instructor.name}</h3>
                            <p className="text-primary font-medium mb-4">{mockData.instructor.title}</p>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {mockData.instructor.bio}
                            </p>
                            <h4 className="font-bold mb-2">الإنجازات:</h4>
                            <ul className="space-y-2">
                                {mockData.instructor.achievements.map((achievement, i) => (
                                    <li key={i} className="flex gap-2 items-center text-muted-foreground">
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-0 pt-4 text-center py-12 text-muted-foreground border rounded-xl border-dashed">
                    لا توجد تقييمات حتى الآن. كن أول من يقيّم هذه الدورة!
                </TabsContent>
            </Tabs>
        </div>
    );
}
