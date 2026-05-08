"use client";
import Link from "next/link";
import { Eye } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";

interface PathsTableProps {
    data: any[];
    onAdd: () => void;
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
}

export function PathsTable({ data, onAdd, onEdit, onDelete }: PathsTableProps) {
    const columns = [
        { 
            key: "name", 
            header: "المسار", 
            render: (item: any) => (
                <div className="flex items-center gap-3">
                    {item.coverImageUrl && (
                        <img 
                            src={item.coverImageUrl} 
                            alt={item.name} 
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    )}
                    <span className="font-semibold text-primary">{item.name}</span>
                </div>
            ) 
        },
        { 
            key: "educationLevel", 
            header: "المرحلة",
            render: (item: any) => (
                <span className="text-sm text-muted-foreground">
                    {item.educationLevel === "first_secondary" ? "الأول الثانوي" : 
                     item.educationLevel === "second_secondary" ? "الثاني الثانوي" : "الثالث الثانوي"}
                </span>
            )
        },
        { 
            key: "active", 
            header: "الحالة",
            render: (item: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.active ? "text-green-500" : "text-red-500"}`}>
                    {item.active ? "نشط" : "غير نشط"}
                </span>
            )
        },
        { 
            key: "description", 
            header: "الوصف",
            render: (item: any) => (
                <div className="max-w-[300px] truncate text-xs text-muted-foreground">
                    {item.description}
                </div>
            )
        },
        { 
            key: "details", 
            header: "التفاصيل", 
            render: (item: any) => (
                <Link 
                    href={`/dashboard/paths/${item._id}`} 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors"
                >
                    <Eye size={14} />
                    <span>عرض</span>
                </Link>
            ) 
        }
    ];

    return (
        <AdminTable 
            title="إدارة المسارات التعليمية" 
            description="تجميع الكورسات في مسارات تعليمية وتحديد تسلسلها." 
            data={data} 
            columns={columns} 
            searchKey={["name"]}
            searchPlaceholder="ابحث باسم المسار..." 
            onAdd={onAdd} 
            onEdit={onEdit} 
            onDelete={onDelete} 
            itemsPerPage={5}
        />
    );
}
