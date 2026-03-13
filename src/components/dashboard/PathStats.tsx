"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, BarChart2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PathStatsProps {
    coursesCount: number;
    totalLessons: number;
    totalExams: number;
    duration: string;
}

export function PathStats({ coursesCount, totalLessons, totalExams, duration }: PathStatsProps) {
    const stats = [
        { icon: BookOpen, label: "الكورسات", value: coursesCount },
        { icon: FileText, label: "الدروس", value: totalLessons },
        { icon: BarChart2, label: "الاختبارات", value: totalExams },
        { icon: Clock, label: "المدة", value: duration },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                >
                    <Card className="rounded-2xl border-border shadow-sm text-center">
                        <CardContent className="p-5">
                            <Icon size={24} className="text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold">{value}</p>
                            <p className="text-sm text-muted-foreground">{label}</p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
