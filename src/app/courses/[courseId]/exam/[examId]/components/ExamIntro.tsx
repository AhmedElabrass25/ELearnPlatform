import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, AlertCircle, Loader2, Calendar } from "lucide-react";

interface ExamIntroProps {
    exam: any;
    isLoading: boolean;
    error?: string | null;
    onStartExam: () => void;
}

export function ExamIntro({ exam, isLoading, error, onStartExam }: ExamIntroProps) {
    const now = new Date();
    const startDate = exam.availableFrom ? new Date(exam.availableFrom) : null;
    const endDate = exam.availableUntil ? new Date(exam.availableUntil) : null;

    const hasStarted = startDate ? now >= startDate : true;
    const hasEnded = endDate ? now > endDate : false;

    const formatDateTime = (date: Date) => {
        return date.toLocaleString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8 py-12 px-4">
            <Card className="border-2 border-primary/20 shadow-xl overflow-hidden text-center rounded-3xl">
                <CardHeader className="bg-primary/5 pb-8 pt-10">
                    <CardTitle className="text-3xl font-bold">{exam.title || exam.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">استعد لبدء الاختبار</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-8 pt-10 pb-6">
                    {/* Status Message */}
                    {!hasStarted && startDate && (
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col items-center gap-2">
                            <Calendar className="w-6 h-6 text-amber-500" />
                            <p className="text-amber-800 font-bold text-sm">
                                لم يبدأ الاختبار بعد. سيكون متاحاً في:
                            </p>
                            <p className="text-amber-700 font-medium ltr">{formatDateTime(startDate)}</p>
                        </div>
                    )}

                    {hasEnded && endDate && (
                        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex flex-col items-center gap-2">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                            <p className="text-red-800 font-bold text-sm">
                                انتهى وقت إتاحة هذا الاختبار في:
                            </p>
                            <p className="text-red-700 font-medium ltr">{formatDateTime(endDate)}</p>
                        </div>
                    )}

                    <div className="flex justify-center flex-wrap gap-6 text-muted-foreground">
                        <div className="flex flex-col items-center bg-muted/30 p-6 rounded-2xl min-w-[140px] border border-border/50">
                            <Timer className="w-10 h-10 mb-3 text-primary" />
                            <span className="font-bold text-xl">{exam.duration} دقيقة</span>
                            <span className="text-sm">المدة المحددة</span>
                        </div>
                        <div className="flex flex-col items-center bg-muted/30 p-6 rounded-2xl min-w-[140px] border border-border/50">
                            <AlertCircle className="w-10 h-10 mb-3 text-amber-500" />
                            <span className="font-bold text-xl">فرصة واحدة</span>
                            <span className="text-sm">لا يمكن الإيقاف</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col items-center gap-4 pb-10">
                    {error && (
                        <div className="w-full max-w-sm p-4 bg-red-50 text-red-700/90 rounded-xl border border-red-200 flex items-center justify-center gap-3">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p className="font-bold text-sm text-right">{error}</p>
                        </div>
                    )}
                    
                    <Button 
                        className={`h-14 px-12 text-lg font-bold text-white rounded-xl shadow-lg transition-all ${
                            !hasStarted || hasEnded ? 'bg-muted text-muted-foreground' : 'bg-primary hover:bg-primary/90 hover:scale-105'
                        }`} 
                        onClick={onStartExam} 
                        disabled={isLoading || !hasStarted || hasEnded}
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : !hasStarted ? (
                            "الاختبار غير متاح حالياً"
                        ) : hasEnded ? (
                            "انتهى وقت الاختبار"
                        ) : (
                            "بدء الاختبار الآن"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
