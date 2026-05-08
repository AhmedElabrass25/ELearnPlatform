"use client";

import React from "react";
import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface CourseDistributionChartProps {
    courseDistribution: { level: string; count: number; percentage: number }[];
}

export function CourseDistributionChart({ courseDistribution }: CourseDistributionChartProps) {
    return (
        <Card className="col-span-1 lg:col-span-4 rounded-2xl border-border shadow-sm">
            <CardHeader>
                <CardTitle className="text-xl">توزيع الكورسات والمستوى</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {courseDistribution.map((item, index) => (
                        <div key={item.level} className="flex flex-col space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium flex items-center gap-2">
                                    <Award size={16} className={index === 0 ? "text-green-500" : index === 1 ? "text-yellow-500" : "text-red-500"} />
                                    {item.level}
                                </span>
                                <span className="text-muted-foreground">{item.count} كورس</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percentage}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                                    className={`h-full rounded-full ${index === 0 ? "bg-green-500" : index === 1 ? "bg-yellow-500" : "bg-red-500"}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
