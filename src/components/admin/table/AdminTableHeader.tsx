"use client";

import React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminTableHeaderProps {
    title: string;
    description?: string;
    searchKey?: string;
    searchPlaceholder?: string;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onAdd?: () => void;
}

export function AdminTableHeader({
    title,
    description,
    searchKey,
    searchPlaceholder,
    searchTerm,
    onSearchChange,
    onAdd,
}: AdminTableHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-5 rounded-2xl border border-border shadow-sm">
            <div>
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
                {description && <p className="text-muted-foreground text-sm mt-0.5">{description}</p>}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                {searchKey && (
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pr-9 rounded-xl w-full"
                        />
                    </div>
                )}
                {onAdd && (
                    <Button onClick={onAdd} className="rounded-xl flex items-center gap-2 flex-shrink-0">
                        <Plus size={16} />
                        <span>إضافة</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
