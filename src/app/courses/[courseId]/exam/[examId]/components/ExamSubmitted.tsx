import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScoreDisplay } from "./submitted/ScoreDisplay";
import { ActionButtons } from "./submitted/ActionButtons";

interface ExamSubmittedProps {
    score: number;
    totalPossibleScore: number;
    courseId: string;
}

export function ExamSubmitted({ score, totalPossibleScore, courseId }: ExamSubmittedProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="max-w-2xl mx-auto space-y-8 py-12 px-4 shadow-xl"
        >
            <Card className="border-2 border-primary/20 shadow-xl overflow-hidden rounded-3xl">
                <div className="h-2 bg-primary" />
                <ScoreDisplay score={score} totalPossibleScore={totalPossibleScore} />
                <ActionButtons courseId={courseId} />
            </Card>
        </motion.div>
    );
}
