"use client";

import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  totalPossibleScore: number;
}

export function ScoreDisplay({ score, totalPossibleScore }: ScoreDisplayProps) {
  return (
    <>
      <CardHeader className="text-center pb-2">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">اكتمل الاختبار!</CardTitle>
        <CardDescription className="text-lg">
          تم تسجيل إجاباتك وعرض النتيجة بشكل نهائي.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="bg-muted/50 p-8 rounded-3xl max-w-xs mx-auto">
          <p className="text-sm text-muted-foreground mb-2 font-medium">النتيجة النهائية</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-black text-primary">{score}</span>
            <span className="text-4xl font-bold text-muted-foreground opacity-60">
              / {totalPossibleScore > 0 ? totalPossibleScore : "---"}
            </span>
          </div>
        </div>
      </CardContent>
    </>
  );
}
