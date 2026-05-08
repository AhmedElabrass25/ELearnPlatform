import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, AlertCircle, Loader2 } from "lucide-react";

interface ExamIntroProps {
    exam: any;
    isLoading: boolean;
    error?: string | null;
    onStartExam: () => void;
}

export function ExamIntro({ exam, isLoading, error, onStartExam }: ExamIntroProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8 py-12">
            <Card className="border-2 border-primary/20 shadow-xl overflow-hidden text-center">
                <CardHeader className="bg-primary/5 pb-8 pt-10">
                    <CardTitle className="text-3xl font-bold">{exam.title || exam.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">استعد لبدء الاختبار</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-10 pb-6">
                    <div className="flex justify-center flex-wrap gap-8 text-muted-foreground">
                        <div className="flex flex-col items-center bg-muted/30 p-6 rounded-2xl min-w-[140px]">
                            <Timer className="w-10 h-10 mb-3 text-primary" />
                            <span className="font-bold text-xl">{exam.duration || 15} دقيقة</span>
                            <span className="text-sm">المدة المحددة</span>
                        </div>
                        <div className="flex flex-col items-center bg-muted/30 p-6 rounded-2xl min-w-[140px]">
                            <AlertCircle className="w-10 h-10 mb-3 text-amber-500" />
                            <span className="font-bold text-xl">فرصة واحدة</span>
                            <span className="text-sm">لا يمكنك إغلاق أو إيقاف الوقت</span>
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
                    <Button className="h-14 px-12 text-lg font-bold text-white rounded-xl bg-primary hover:bg-primary/90" onClick={onStartExam} disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "بدء الاختبار الآن"}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
