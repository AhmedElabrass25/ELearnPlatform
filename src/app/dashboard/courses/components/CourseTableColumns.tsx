import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings, Eye, BookOpen } from "lucide-react";
import { Course } from "@/types";

export const getCourseTableColumns = () => [
    { 
        key: "title", 
        header: "الكورس", 
        render: (item: Course) => (
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <BookOpen size={20} />
                </div>
                <div>
                    <span className="font-semibold block truncate max-w-[200px]">{item.title}</span>
                </div>
            </div>
        ) 
    },
    { 
        key: "track", 
        header: "المسار", 
        render: (item: Course) => (
            <span className="text-sm">
                {item?.track?.name ||"-"}
            </span>
        ) 
    },
    { 
        key: "price", 
        header: "السعر", 
        render: (item: Course) => (
            <span className="font-sans font-semibold text-green-600">
                {item.price} { "ج.م"}
            </span>
        ) 
    },
    { 
        key: "actions", 
        header: "إدارة", 
        render: (item: Course) => (
            <div className="flex items-center gap-2">
                <Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                    <Link href={`/dashboard/courses/${item.id}`}>
                        <Settings size={14} />
                    </Link>
                </Button>
                <Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                    <Link href={`/dashboard/courses/${item.id}`}>
                        <Eye size={14} />
                    </Link>
                </Button>
            </div>
        ) 
    }
];
