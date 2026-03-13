"use client";

import React, { useState } from "react";
import { AdminTableHeader } from "./table/AdminTableHeader";
import { AdminMobileCardView } from "./table/AdminMobileCardView";
import { AdminDesktopTable } from "./table/AdminDesktopTable";
import { AdminPagination } from "./table/AdminPagination";

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
        return typeof value === "string" ? value.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const hasActions = !!(onEdit || onDelete);

    const handleSearchChange = (value: string) => { setSearchTerm(value); setCurrentPage(1); };

    return (
        <div className="space-y-4">
            <AdminTableHeader title={title} description={description} searchKey={searchKey} searchPlaceholder={searchPlaceholder} searchTerm={searchTerm} onSearchChange={handleSearchChange} onAdd={onAdd} />
            <AdminMobileCardView data={paginatedData} columns={columns} onEdit={onEdit} onDelete={onDelete} hasActions={hasActions} />
            <AdminDesktopTable data={paginatedData} columns={columns} onEdit={onEdit} onDelete={onDelete} hasActions={hasActions} />
            <AdminPagination currentPage={currentPage} totalPages={totalPages} startIndex={startIndex} itemsPerPage={itemsPerPage} totalItems={filteredData.length} onPageChange={setCurrentPage} />
        </div>
    );
}
