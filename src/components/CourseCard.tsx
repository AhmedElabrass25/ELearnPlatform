"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, FileText, MonitorPlay, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";

interface CourseCardProps {
    course: {
        id: string;
        title: string;
        subtitle?: string;
        image?: string;
        level: string;
        type: string;
        duration?: string;
        lessonsCount?: number;
        examsCount?: number;
    };
    progress?: number;
}

export function CourseCard({ course, progress = 0 }: CourseCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Card className="overflow-hidden flex flex-col h-full bg-card/50 backdrop-blur-sm border-border shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {course.image ? (
                        <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                            <BookOpen size={48} className="opacity-50" />
                        </div>
                    )}

                    <div className="absolute top-3 right-3 flex gap-2">
                        <Badge variant="default" className="bg-primary/90 hover:bg-primary backdrop-blur-sm shadow-sm rounded-full px-3 py-1">
                            {course.level}
                        </Badge>
                        <Badge variant="secondary" className="bg-background/90 hover:bg-background/100 backdrop-blur-sm shadow-sm text-foreground rounded-full px-3 py-1 flex items-center gap-1">
                            {course.type === "أونلاين" || course.type === "online" ? (
                                <MonitorPlay size={14} />
                            ) : (
                                <MapPin size={14} />
                            )}
                            <span>{course.type}</span>
                        </Badge>
                    </div>
                </div>

                <CardHeader className="p-5 pb-0">
                    <h3 className="font-bold text-lg line-clamp-2 leading-tight">
                        {course.title}
                    </h3>
                    {course.subtitle && (
                        <p className="text-muted-foreground text-sm mt-1">{course.subtitle}</p>
                    )}
                </CardHeader>

                <CardContent className="p-5 flex-1 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {course.duration && (
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-primary/70" />
                                <span>{course.duration}</span>
                            </div>
                        )}
                        {course.lessonsCount !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <BookOpen size={16} className="text-primary/70" />
                                <span>{course.lessonsCount} درس</span>
                            </div>
                        )}
                        {course.examsCount !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <FileText size={16} className="text-primary/70" />
                                <span>{course.examsCount} اختبار</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-2">
                        <ProgressBar progress={progress} />
                    </div>
                </CardContent>

                <CardFooter className="p-5 pt-0">
                    <Link href={`/course/${course.id}`} className="w-full">
                        <Button className="w-full rounded-xl bg-gradient-to-l from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white shadow-md transition-all duration-300">
                            استمرار التعلم
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
