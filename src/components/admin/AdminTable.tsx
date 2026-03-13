"use client";

import React, { useState } from "react";
import {
    Search,
    ChevronRight,
    ChevronLeft,
    Edit,
    Trash2,
    Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
}

interface AdminTableProps<T> {
    title: string;
    description?: string;
    data: T[];
    columns: Column<T>[];
    searchKey?: Extract<keyof T, string>;
    searchPlaceholder?: string;
    onAdd?: () => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    itemsPerPage?: number;
}

export function AdminTable<T extends { id: string | number }>({
    title,
    description,
    data,
    columns,
    searchKey,
    searchPlaceholder = "بحث...",
    onAdd,
    onEdit,
    onDelete,
    itemsPerPage = 10,
}: AdminTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter((item) => {
        if (!searchTerm || !searchKey) return true;
        const value = item[searchKey];
        if (typeof value === "string") {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const hasActions = onEdit || onDelete;

    return (
        <div className="space-y-4">
            {/* Header */}
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
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
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

            {/* ─── Mobile Cards (small screens) ─── */}
            <div className="md:hidden space-y-3">
                {paginatedData.length === 0 ? (
                    <div className="bg-card rounded-2xl border border-border p-8 text-center text-muted-foreground">
                        لا توجد بيانات متاحة.
                    </div>
                ) : (
                    paginatedData.map((item) => (
                        <div key={item.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                            <div className="p-4 space-y-2.5">
                                {columns.map((col, i) => (
                                    <div key={i} className="flex flex-col gap-0.5">
                                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                            {col.header}
                                        </span>
                                        <span className="text-sm break-words">
                                            {col.render
                                                ? col.render(item)
                                                : String(item[col.key as keyof T] ?? "-")}
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
                    ))
                )}
            </div>

            {/* ─── Desktop Table (md+) ─── */}
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
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        className="hover:bg-muted/30 transition-colors border-border"
                                    >
                                        {columns.map((col, i) => (
                                            <TableCell key={i} className="py-3.5 first:pr-6">
                                                <div className="max-w-[230px] truncate">
                                                    {col.render
                                                        ? col.render(item)
                                                        : String(item[col.key as keyof T] ?? "-")}
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

                {/* Desktop Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
                        <p className="text-sm text-muted-foreground">
                            عرض {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredData.length)} من {filteredData.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="h-8 w-8 p-0 rounded-lg"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-medium w-16 text-center">
                                {currentPage} / {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="h-8 w-8 p-0 rounded-lg"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Pagination */}
            {totalPages > 1 && (
                <div className="md:hidden flex items-center justify-between py-2">
                    <p className="text-xs text-muted-foreground">
                        {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredData.length)} من {filteredData.length}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="h-8 w-8 p-0 rounded-lg"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">{currentPage} / {totalPages}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="h-8 w-8 p-0 rounded-lg"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
