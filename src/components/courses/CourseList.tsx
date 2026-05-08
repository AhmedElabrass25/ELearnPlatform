"use client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, PlayCircle,  } from "lucide-react";
import { Course } from "@/types";

interface CourseListProps {
    initialCourses: Course[];
}

export function CourseList({ initialCourses }: CourseListProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Course Grid */}
            <div className="lg:col-span-3">
                <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
                    <span>تم العثور على <strong className="text-foreground">{initialCourses?.length}</strong> دورة</span>
                </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {initialCourses?.map((course) => (
                            <Card key={course.id || course._id} className="pt-0 flex flex-col overflow-hidden border-border/50 hover:shadow-lg transition-all group bg-card">
                                <div className="aspect-video bg-muted relative overflow-hidden">
                                    <div className="absolute top-3 right-3 z-20 flex gap-2">
                                        {course.level && <Badge className="bg-primary hover:bg-primary/90 text-white font-medium">{course.level}</Badge>}
                                        {course.type && <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground">{course.type}</Badge>}
                                    </div>
                                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                        <PlayCircle className="w-16 h-16 text-primary/30" />
                                    </div>
                                    {/* Real Image if available */}
                                    {(course.coverImage || course.coverImageUrl) && (
                                        <img 
                                            src={`${course.coverImage ? `${process.env.NEXT_PUBLIC_BASE_URL}${course.coverImage}` : `${process.env.NEXT_PUBLIC_BASE_URL}/images/default-path.jpg`}`}
                                            alt={course.title} 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    )}
                                </div>
                                <CardHeader className="pb-3 text-right">
                                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">{course.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-4 flex-1">
                                    <div className="flex items-center justify-start gap-4 text-sm text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4 ml-1" />
                                            <span>{course?.track?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4 ml-1" />
                                            <span>{course?.durationInWeeks ? `${course?.durationInWeeks} أسابيع` : "غير محدد"}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 border-t border-border/50 mt-auto flex items-center justify-between bg-muted/5 p-4 flex-row-reverse">
                                    <div className="flex flex-col text-right">
                                        <span className="text-xs text-muted-foreground font-bold">السعر</span>
                                        <span className="text-lg font-bold text-foreground">
                                            {course.price} {course.currency || 'ج.م'}
                                        </span>
                                    </div>
                                    <Button asChild className="font-bold">
                                        <Link href={`/courses/${course.id || course._id}`}>التفاصيل</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
            </div>
        </div>
    );
}
