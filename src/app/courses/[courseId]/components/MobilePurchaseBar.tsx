import React from "react";
import { Button } from "@/components/ui/button";
import { ICourse } from "../types";

interface MobilePurchaseBarProps {
    course: ICourse | null;
}

export function MobilePurchaseBar({ course }: MobilePurchaseBarProps) {
    if (!course) return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t z-50 p-4 md:hidden">
            <div className="container flex items-center justify-between gap-4">
                <Button size="lg" className="flex-1 font-bold h-12">اشترك الآن</Button>
                <div className="text-right">
                    <span className="text-xl font-bold">{course.price} ج.م</span>
                </div>
            </div>
        </div>
    );
}
