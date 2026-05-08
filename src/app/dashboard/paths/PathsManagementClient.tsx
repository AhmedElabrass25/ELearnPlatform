"use client";
import { PathFormModal } from "@/components/dashboard/PathModals/PathFormModal";
import { PathDeleteModal } from "@/components/dashboard/PathModals/PathDeleteModal";
import { PathsTable } from "./_components/PathsTable";
import { usePathManagement } from "./_hooks/usePathManagement";

interface PathsManagementClientProps {
    initialPaths: any[];
}

export default function PathsManagementClient({ initialPaths }: PathsManagementClientProps) {
    const {
        paths,
        isModalOpen,
        setIsModalOpen,
        editingPath,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        pathToDelete,
        setPathToDelete,
        formData,
        setFormData,
        handleAdd,
        handleEdit,
        handleSubmit,
        handleDeleteConfirm
    } = usePathManagement({ initialPaths });

    return (
        <div className="animate-in fade-in duration-500">
            <PathsTable 
                data={paths} 
                onAdd={handleAdd} 
                onEdit={handleEdit} 
                onDelete={(p) => { 
                    setPathToDelete(p); 
                    setIsDeleteModalOpen(true); 
                }} 
            />
            
            <PathFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                editingPath={editingPath} 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit} 
            />
            
            <PathDeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                pathTitle={pathToDelete?.name || ""} 
                onConfirm={handleDeleteConfirm} 
            />
        </div>
    );
}
