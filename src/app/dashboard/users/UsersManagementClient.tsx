"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { AdminPagination } from "@/components/admin/table/AdminPagination";

interface UsersManagementClientProps {
    initialUsers: User[];
    pagination: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
    };
    totalItems: number;
}

export default function UsersManagementClient({ 
    initialUsers, 
    pagination, 
    totalItems 
}: UsersManagementClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // for pagination
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const columns = [
        { 
            key: "fullName", 
            header: "الاسم", 
            render: (item: User) => (
                <div className="flex items-center gap-3">
                    <span className="font-medium">{item.fullName}</span>
                </div>
            ) 
        },
        { 
            key: "phone", 
            header: "الهاتف", 
            render: (item: User) => (<span dir="ltr">{item.phone}</span>) 
        },
        { key: "educationLevel", header: "المرحلة الدراسية" },
        { 
            key: "active", 
            header: "الحالة",
            render: (item: any) => (
                <Badge variant={item.active ? "success" : "destructive" as any} className="rounded-xl px-2">
                    {item.active ? "نشط" : "غير نشط"}
                </Badge>
            )
        }
    ];

    return (
        <div className="animate-in fade-in duration-500 space-y-4">
            <AdminTable 
                title="إدارة المستخدمين" 
                description="إدارة كافة مستخدمي المنصة وإضافة مستخدمين جدد." 
                data={initialUsers} 
                columns={columns} 
                searchKey={["fullName", "educationLevel", "phone"]}
                searchPlaceholder="ابحث بالاسم والمرحلة الدراسية والتليفون" 
            />

            <AdminPagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.numberOfPages}
                totalItems={totalItems}
                itemsPerPage={pagination.limit}
                startIndex={(pagination.currentPage - 1) * pagination.limit}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
