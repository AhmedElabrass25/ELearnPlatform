import { getAllUsers } from "@/services/admin.service";
import UsersManagementClient from "./UsersManagementClient";

export default async function UsersManagementPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ page?: string; limit?: string }> 
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 5;

    // Fetch users from API with pagination
    const response = await (getAllUsers(page, limit) as Promise<any>).catch(() => ({ 
        data: [], 
        pagination: { currentPage: 1, numberOfPages: 1 }, 
        nemberOfAllUsers: 0 
    }));

    return (
        <UsersManagementClient 
            initialUsers={response.data || []} 
            pagination={response.pagination}
            totalItems={response.nemberOfAllUsers || 0}
        />
    );
}
