import { mockData } from "@/lib/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, PlayCircle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PathsPage() {
    const paths = mockData.paths;

    return (
        <div className="container py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">المسارات التعليمية</h1>
                <p className="text-lg text-muted-foreground">
                    اختر المسار المناسب لك من الصفر وحتى الاحتراف مع منهج منظم خطوة بخطوة.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {paths.map((path) => (
                    <Card key={path.id} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-colors bg-card shadow-sm hover:shadow-md">
                        <div className="aspect-[4/3] sm:aspect-video bg-muted relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                <BookOpen className="w-20 h-20 text-primary/30" />
                            </div>
                            <div className="absolute bottom-4 right-4 z-20">
                                <h3 className="text-2xl font-bold text-white mb-1">{path.title}</h3>
                                <span className="text-white/80 text-sm bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
                                    {path.coursesCount} دورات
                                </span>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {path.description}
                            </p>
                            <div className="flex items-center gap-6 text-sm text-foreground/80 border-t pt-4">
                                <div className="flex items-center gap-2">
                                    <PlayCircle className="w-5 h-5 text-primary" />
                                    <span className="font-medium">{path.lessonsCount} درسًا</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span className="font-medium">{path.duration}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                            <Button size="lg" className="w-full gap-2 text-md font-bold" asChild>
                                <Link href={`/courses?path=${path.id}`}>
                                    تصفح دورات المسار
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
