import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScoreDisplay } from "./submitted/ScoreDisplay";
import { ActionButtons } from "./submitted/ActionButtons";
import { QuestionsReview } from "./submitted/QuestionsReview";
import { Question } from "@/types";

interface ExamSubmittedProps {
    score: number;
    totalPossibleScore: number;
    courseId: string;
    resultData: any;
    questions: Question[];
}

export function ExamSubmitted({ score, totalPossibleScore, courseId, resultData, questions }: ExamSubmittedProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="max-w-4xl mx-auto space-y-8 py-12 px-4"
        >
            <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden rounded-3xl bg-card">
                <div className="h-3 bg-primary" />
                <ScoreDisplay score={score} totalPossibleScore={totalPossibleScore} />
                <ActionButtons courseId={courseId} />
            </Card>

            <QuestionsReview 
                questions={questions} 
                resultData={resultData} 
            />
        </motion.div>
    );
}
