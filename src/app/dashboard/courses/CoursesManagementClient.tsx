"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { CourseFormModal } from "@/components/dashboard/CourseModals/CourseFormModal";
import { CourseDeleteModal } from "@/components/dashboard/CourseModals/CourseDeleteModal";
import { Course, Path } from "@/types";
import { useCoursesManagement } from "./hooks/useCoursesManagement";
import { getCourseTableColumns } from "./components/CourseTableColumns";

interface CoursesManagementClientProps {
    initialCourses: Course[];
    tracks: Path[];
}

export function CoursesManagementClient({ initialCourses, tracks }: CoursesManagementClientProps) {
    const {
        courses,
        isModalOpen,
        setIsModalOpen,
        editingCourse,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        courseToDelete,
        setCourseToDelete,
        formData,
        setFormData,
        handleEdit,
        handleSubmit,
        handleDelete
    } = useCoursesManagement({ initialCourses });

    const columns = getCourseTableColumns();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <AdminTable 
                title="إدارة الكورسات" 
                description={`يتم عرض ${courses.length} كورس بناءً على الفلاتر.`} 
                data={courses.map(c => ({ ...c, id: (c.id || "").toString() }))} 
                columns={columns} 
                onEdit={handleEdit} 
                onDelete={(item) => { 
                    setCourseToDelete(item as Course); 
                    setIsDeleteModalOpen(true); 
                }} 
                itemsPerPage={6}
            />

            <CourseFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                editingCourse={editingCourse} 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit} 
                tracks={tracks}
            />

            <CourseDeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                courseTitle={courseToDelete?.title || ""} 
                onConfirm={handleDelete} 
            />
        </div>
    );
}
