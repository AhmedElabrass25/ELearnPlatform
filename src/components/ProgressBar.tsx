"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
    progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
                <span>نسبة الإنجاز</span>
                <span className="text-primary font-bold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 w-full" />
        </div>
    );
}
