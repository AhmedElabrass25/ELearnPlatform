"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Clock, PlayCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/types";

interface PopularCoursesProps {
    courses: Course[];
}

export function PopularCourses({ courses }: PopularCoursesProps) {
    return (
        <section className="py-20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">الدورات الأعلى تقييماً</h2>
                        <p className="text-muted-foreground">ابدأ رحلتك التعليمية مع أكثر الدورات طلباً</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/courses">كل الدورات</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <Card key={course.id} className="flex flex-col overflow-hidden border-border/50 hover:shadow-lg transition-all group bg-card">
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                <div className="absolute top-3 right-3 z-20 flex gap-2">
                                    <Badge className="bg-primary hover:bg-primary/90 text-white font-medium">{course.level}</Badge>
                                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground">{course.type}</Badge>
                                </div>
                                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    <PlayCircle className="w-16 h-16 text-primary/30" />
                                </div>
                            </div>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">{course.title}</CardTitle>
                                {course.subtitle && <CardDescription>{course.subtitle}</CardDescription>}
                            </CardHeader>
                            <CardContent className="pb-4 flex-1">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{course.topic}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0 border-t border-border/50 mt-auto flex items-center justify-between bg-muted/5 p-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">السعر</span>
                                    <span className="text-lg font-bold text-foreground">
                                        {course.price} {course.currency || 'ج.م'}
                                    </span>
                                </div>
                                <Button asChild>
                                    <Link href={`/courses/${course.id}`}>تفاصيل الكورس</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
