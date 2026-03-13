"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockData } from "@/lib/mockData";

interface CourseFiltersProps {
    search: string;
    setSearch: (v: string) => void;
    filterLevel: string;
    setFilterLevel: (v: string) => void;
    filterPath: string;
    setFilterPath: (v: string) => void;
    hasFilters: boolean;
    clearFilters: () => void;
}

export function CourseFilters({
    search,
    setSearch,
    filterLevel,
    setFilterLevel,
    filterPath,
    setFilterPath,
    hasFilters,
    clearFilters,
}: CourseFiltersProps) {
    return (
        <div className="bg-card rounded-2xl border border-border p-4 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="ابحث باسم الكورس..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-xl pr-9"
                    />
                </div>
                <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                    <Select value={filterLevel} onValueChange={setFilterLevel}>
                        <SelectTrigger className="rounded-xl w-full sm:w-36 h-10">
                            <Filter size={14} className="ml-1 opacity-60" />
                            <SelectValue placeholder="المستوى" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">كل المستويات</SelectItem>
                            <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                            <SelectItem value="متوسط">متوسط</SelectItem>
                            <SelectItem value="متقدم">متقدم</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterPath} onValueChange={setFilterPath}>
                        <SelectTrigger className="rounded-xl w-full sm:w-44 h-10">
                            <Filter size={14} className="ml-1 opacity-60" />
                            <SelectValue placeholder="المسار" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">كل المسارات</SelectItem>
                            {mockData.paths.map((p) => (
                                <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {hasFilters && (
                        <Button variant="ghost" size="icon" onClick={clearFilters} className="rounded-xl h-10 w-10 text-muted-foreground hover:text-destructive">
                            <X size={18} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
