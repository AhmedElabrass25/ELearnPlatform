"use client";

import { useState } from "react";
import Link from "next/link";
import { mockData } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Clock, Filter, PlayCircle, Search } from "lucide-react";

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    };

    const filteredCourses = mockData.courses.filter(course => {
        const matchesSearch = course.title.includes(searchQuery) || (course.topic || "").includes(searchQuery);
        const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
        const matchesTopic = selectedTopics.length === 0 || (course.topic ? selectedTopics.includes(course.topic) : false);
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(course.type);

        return matchesSearch && matchesLevel && matchesTopic && matchesType;
    });

    return (
        <div className="container py-8 px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">تصفح الدورات</h1>
                    <p className="text-muted-foreground text-lg">اكتشف دورات اللغة العربية المناسبة لمستواك وأهدافك</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="ابحث عن دورة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-4 pr-10 h-12 text-base rounded-full bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:border-primary"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold">التصفية</h2>
                        {(selectedLevels.length > 0 || selectedTopics.length > 0 || selectedTypes.length > 0) && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => { setSelectedLevels([]); setSelectedTopics([]); setSelectedTypes([]); }}
                                className="mr-auto text-xs h-8 text-destructive px-2"
                            >
                                مسح الكل
                            </Button>
                        )}
                    </div>

                    <Accordion type="multiple" defaultValue={["levels", "topics", "types"]} className="w-full space-y-4">
                        <AccordionItem value="levels" className="border px-4 rounded-lg bg-card shadow-sm">
                            <AccordionTrigger className="hover:no-underline py-3 font-bold">المستوى</AccordionTrigger>
                            <AccordionContent className="pt-1 pb-4 flex flex-wrap gap-2">
                                {mockData.categories.levels.map(level => (
                                    <Badge
                                        key={level}
                                        variant={selectedLevels.includes(level) ? "default" : "outline"}
                                        className="cursor-pointer px-3 py-1.5 hover:bg-primary/90 hover:text-white transition-colors"
                                        onClick={() => toggleFilter(setSelectedLevels, level)}
                                    >
                                        {level}
                                    </Badge>
                                ))}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="topics" className="border px-4 rounded-lg bg-card shadow-sm">
                            <AccordionTrigger className="hover:no-underline py-3 font-bold">الموضوع</AccordionTrigger>
                            <AccordionContent className="pt-1 pb-4 flex flex-wrap gap-2">
                                {mockData.categories.topics.map(topic => (
                                    <Badge
                                        key={topic}
                                        variant={selectedTopics.includes(topic) ? "default" : "outline"}
                                        className="cursor-pointer px-3 py-1.5 hover:bg-primary/90 hover:text-white transition-colors"
                                        onClick={() => toggleFilter(setSelectedTopics, topic)}
                                    >
                                        {topic}
                                    </Badge>
                                ))}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="types" className="border px-4 rounded-lg bg-card shadow-sm">
                            <AccordionTrigger className="hover:no-underline py-3 font-bold">نوع الكورس</AccordionTrigger>
                            <AccordionContent className="pt-1 pb-4 flex flex-wrap gap-2">
                                {mockData.categories.types.map(type => (
                                    <Badge
                                        key={type}
                                        variant={selectedTypes.includes(type) ? "default" : "outline"}
                                        className="cursor-pointer px-3 py-1.5 hover:bg-primary/90 hover:text-white transition-colors"
                                        onClick={() => toggleFilter(setSelectedTypes, type)}
                                    >
                                        {type}
                                    </Badge>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Course Grid */}
                <div className="lg:col-span-3">
                    <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
                        <span>تم العثور على <strong className="text-foreground">{filteredCourses.length}</strong> دورة</span>
                    </div>

                    {filteredCourses.length === 0 ? (
                        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                            <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-bold">لا يوجد دورات مطابقة للبحث</h3>
                            <p className="text-muted-foreground mt-2">جرب تغيير عوامل التصفية أو التخفيف من شروط البحث</p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => { setSearchQuery(""); setSelectedLevels([]); setSelectedTopics([]); setSelectedTypes([]); }}
                            >
                                مسح التصفية والبحث
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredCourses.map((course) => (
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
                                                <span>{course.topic || "عام"}</span>
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
                                            <Link href={`/courses/${course.id}`}>التفاصيل</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
