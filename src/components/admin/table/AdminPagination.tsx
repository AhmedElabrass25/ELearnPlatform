"use client";

import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminPaginationProps {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

export function AdminPagination({
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    totalItems,
    onPageChange,
}: AdminPaginationProps) {
    if (totalPages <= 1) return null;

    const desktopRange = `عرض ${startIndex + 1}–${Math.min(startIndex + itemsPerPage, totalItems)} من ${totalItems}`;
    const mobileRange = `${startIndex + 1}–${Math.min(startIndex + itemsPerPage, totalItems)} من ${totalItems}`;

    return (
        <>
            {/* Desktop Pagination */}
            <div className="hidden md:flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
                <p className="text-sm text-muted-foreground">{desktopRange}</p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0 rounded-lg"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Mobile Pagination */}
            <div className="md:hidden flex items-center justify-between py-2">
                <p className="text-xs text-muted-foreground">{mobileRange}</p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="h-8 w-8 p-0 rounded-lg"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{currentPage} / {totalPages}</span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0 rounded-lg"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    );
}
