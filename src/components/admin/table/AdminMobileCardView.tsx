"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminMobileCardViewProps<T> {
    data: T[];
    columns: any[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    hasActions: boolean;
}

export function AdminMobileCardView<T extends { id: string | number }>({
    data,
    columns,
    onEdit,
    onDelete,
    hasActions,
}: AdminMobileCardViewProps<T>) {
    if (data.length === 0) {
        return (
            <div className="bg-card rounded-2xl border border-border p-8 text-center text-muted-foreground md:hidden">
                لا توجد بيانات متاحة.
            </div>
        );
    }

    return (
        <div className="md:hidden space-y-3">
            {data.map((item) => (
                <div key={item.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4 space-y-2.5">
                        {columns.map((col, i) => (
                            <div key={i} className="flex flex-col gap-0.5">
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                    {col.header}
                                </span>
                                <span className="text-sm break-words">
                                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "-")}
                                </span>
                            </div>
                        ))}
                    </div>
                    {hasActions && (
                        <div className="px-4 py-3 bg-muted/30 border-t border-border flex gap-2 justify-end">
                            {onEdit && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(item)}
                                    className="rounded-xl gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                >
                                    <Edit size={14} />
                                    تعديل
                                </Button>
                            )}
                            {onDelete && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onDelete(item)}
                                    className="rounded-xl gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                                >
                                    <Trash2 size={14} />
                                    حذف
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
