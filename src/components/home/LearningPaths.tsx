"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, PlayCircle, Clock, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Path } from "@/types";

interface LearningPathsProps {
    paths: Path[];
}

export function LearningPaths({ paths }: LearningPathsProps) {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">المسارات التعليمية</h2>
                        <p className="text-muted-foreground">اختر المسار الذي يناسب مستواك وأهدافك</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paths.map((path) => (
                        <Card key={path.id} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-colors bg-card">
                            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                    <BookOpen className="w-16 h-16 text-primary/40" />
                                </div>
                                <div className="absolute bottom-4 right-4 z-20">
                                    <h3 className="text-lg font-bold text-white">{path.title}</h3>
                                </div>
                            </div>
                            <CardContent className="p-5">
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {path.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <PlayCircle className="w-4 h-4" />
                                        <span>{path.lessonsCount} درس</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{path.duration}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-5 pt-0">
                                <Button variant="ghost" className="w-full justify-between hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                                    <Link href={`/courses?path=${path.id}`}>
                                        عرض المقررات
                                        <ArrowLeft className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
