"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface AdminDesktopTableProps<T> {
    data: T[];
    columns: any[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    hasActions: boolean;
}

export function AdminDesktopTable<T extends { id: string | number }>({
    data,
    columns,
    onEdit,
    onDelete,
    hasActions,
}: AdminDesktopTableProps<T>) {
    return (
        <div className="hidden md:block bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow className="hover:bg-transparent border-border">
                            {columns.map((col, i) => (
                                <TableHead
                                    key={i}
                                    className="text-right font-semibold text-foreground whitespace-nowrap py-3.5 first:pr-6"
                                >
                                    {col.header}
                                </TableHead>
                            ))}
                            {hasActions && (
                                <TableHead className="font-semibold text-foreground w-[110px] text-center py-3.5">
                                    الإجراءات
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="hover:bg-muted/30 transition-colors border-border"
                                >
                                    {columns.map((col, i) => (
                                        <TableCell key={i} className="py-3.5 first:pr-6">
                                            <div className="max-w-[230px] truncate">
                                                {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "-")}
                                            </div>
                                        </TableCell>
                                    ))}
                                    {hasActions && (
                                        <TableCell className="py-3.5">
                                            <div className="flex items-center justify-center gap-1.5">
                                                {onEdit && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => onEdit(item)}
                                                        className="h-8 w-8 rounded-lg text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                                                    >
                                                        <Edit size={15} />
                                                    </Button>
                                                )}
                                                {onDelete && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => onDelete(item)}
                                                        className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 size={15} />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (hasActions ? 1 : 0)}
                                    className="h-28 text-center text-muted-foreground"
                                >
                                    لا توجد بيانات متاحة.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
