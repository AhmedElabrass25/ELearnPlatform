
import { Sparkles } from "lucide-react";
import { Path } from "@/types";
import { Badge } from "../ui/badge";
import { PathCard } from "../path/PathCard";

interface LearningPathsProps {
    paths: Path[];
    hasError?: boolean;
}


export function LearningPaths({ paths, hasError }: LearningPathsProps) {
    return (
        <section className="py-24 bg-muted/50 relative overflow-hidden">
             {/* Decorative background elements */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48" />
             
            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <Badge variant="outline" className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary border-primary/20 bg-primary/5">
                        <Sparkles className="w-3 h-3 ml-2" />
                        طريقك للتميز
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">المسارات التعليمية</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        اختر المسار الذي يناسب مستواك وأهدافك، وانطلق في رحلة تعلم ممتعة ومنظمة
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hasError ? (
                        <div className="text-center text-destructive font-bold col-span-full p-12 border-2 border-dashed border-destructive/20 rounded-2xl bg-destructive/5 backdrop-blur-sm">
                            فشل في تحميل المسارات التعليمية. يرجى التحقق من الاتصال بالإنترنت.
                        </div>
                    ) : paths?.length > 0 ? (
                        paths.map((path) => (
                          <PathCard path={path} key={path._id}/>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground col-span-full py-20">لا توجد مسارات تعليمية حالياً</div>
                    )}
                </div>
            </div>
        </section>
    );
}
