import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        label: string;
        isPositive?: boolean;
    };
    delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
        >
            <Card className="border-border shadow-sm rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-md transition-shadow relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mt-10 -mr-10 transition-transform group-hover:scale-150"></div>
                <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">
                            {title}
                        </h3>
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Icon size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold mt-2">{value}</div>

                    {trend && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <span className={`font-medium ${trend.isPositive !== false ? 'text-green-500' : 'text-destructive'}`}>
                                {trend.isPositive !== false ? '+' : '-'}{trend.value}%
                            </span>
                            <span>{trend.label}</span>
                        </p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
