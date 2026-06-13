"use client";

import React from "react";
import { CheckCircle2, XCircle, HelpCircle, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types";

interface QuestionsReviewProps {
    questions: Question[];
    resultData: any;
}

export function QuestionsReview({ questions, resultData }: QuestionsReviewProps) {
    const userAnswers = resultData?.answers || [];

    const getAnswerForQuestion = (qId: string) => {
        return userAnswers.find((a: any) => {
            const answerQId = a.questionId?._id || a.questionId?.id || a.questionId;
            return answerQId === qId;
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                {/* <HelpCircle className="w-6 h-6 text-primary" /> */}
                {/* <h3 className="text-2xl font-black">مراجعة الإجابات</h3> */}
            </div>

            <div className="grid gap-6">
                {questions.map((question, idx) => {
                    const qId = question._id || question.id;
                    const answer = getAnswerForQuestion(qId);
                    const isCorrect = answer?.isCorrect;
                    const selectedIdx = answer?.selectedOption;
                    
                    // The backend might return the correct option index in the answer object
                    // or it might be in the question object if the backend includes it after submission
                    const correctIdx = answer?.correctOption ?? question.correctOption;

                    return (
                        <Card key={qId} className="border-none shadow-md overflow-hidden rounded-2xl bg-card transition-all hover:shadow-lg">
                            <CardHeader className="pb-3 bg-muted/20">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="font-bold text-lg leading-relaxed text-right w-full">{question.questionText}</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {(selectedIdx === -1 || selectedIdx === 999 || selectedIdx === undefined) ? (
                                            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 gap-1 font-bold">
                                                <AlertCircle size={14} />
                                                لم يتم الإجابة
                                            </Badge>
                                        ) : isCorrect ? (
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 gap-1 font-bold">
                                                <CheckCircle2 size={14} />
                                                إجابة صحيحة
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 gap-1 font-bold">
                                                <XCircle size={14} />
                                                إجابة خاطئة
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-5 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {question.options.map((option, optIdx) => {
                                        const isSelected = selectedIdx === optIdx;
                                        const isActuallyCorrect = correctIdx === optIdx;
                                        
                                        let stateClass = "border-border bg-muted/10 opacity-70";
                                        if (isSelected && isCorrect) stateClass = "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500";
                                        else if (isSelected && !isCorrect) stateClass = "border-red-500 bg-red-500/10 ring-1 ring-red-500";
                                        else if (isActuallyCorrect) stateClass = "border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/30";

                                        return (
                                            <div 
                                                key={optIdx}
                                                className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${stateClass}`}
                                            >
                                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border-2 ${
                                                    isSelected ? (isCorrect ? "bg-emerald-500 border-emerald-500 text-white" : "bg-red-500 border-red-500 text-white") 
                                                    : (isActuallyCorrect ? "bg-emerald-100 border-emerald-500 text-emerald-600" : "bg-white border-border")
                                                }`}>
                                                    {isSelected ? (isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />) : (isActuallyCorrect ? <CheckCircle2 size={14} /> : <span className="text-[10px]">{optIdx + 1}</span>)}
                                                </div>
                                                <span className={`text-sm font-medium ${isSelected || isActuallyCorrect ? "text-foreground" : "text-muted-foreground"}`}>
                                                    {option.text}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
