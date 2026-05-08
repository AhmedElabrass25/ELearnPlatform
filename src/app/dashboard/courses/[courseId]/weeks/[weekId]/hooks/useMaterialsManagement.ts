"use client";

import { useState } from "react";
import { Material, MaterialType } from "@/types";

export const emptyMaterialForm: { title: string; type: MaterialType; content: string } = { title: "", type: "pdf", content: "" };

export function useMaterialsManagement(initialMaterials: Material[]) {
    const [materials, setMaterials] = useState<Material[]>(initialMaterials);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [materialToDelete, setMaterialToDelete] = useState<Material | null>(null);
    const [formData, setFormData] = useState(emptyMaterialForm);

    const handleAdd = () => { 
        setEditingMaterial(null); 
        setFormData(emptyMaterialForm); 
        setIsModalOpen(true); 
    };

    const handleEdit = (m: Material) => { 
        setEditingMaterial(m); 
        setFormData({ title: m.title, type: m.type, content: m.content }); 
        setIsModalOpen(true); 
    };

    const handleSubmit = () => {
        if (editingMaterial) {
            setMaterials(materials.map(m => m.id === editingMaterial.id ? { ...m, ...formData } : m));
        } else {
            setMaterials([...materials, { 
                id: `mat-${Date.now()}`, 
                ...formData, 
                createdAt: new Date().toISOString(), 
                order: materials.length + 1 
            } as Material]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (materialToDelete) {
            setMaterials(materials.filter(m => m.id !== materialToDelete.id));
        }
        setIsDeleteModalOpen(false);
        setMaterialToDelete(null);
    };

    return {
        materials,
        isModalOpen,
        setIsModalOpen,
        editingMaterial,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        materialToDelete,
        setMaterialToDelete,
        formData,
        setFormData,
        handleAdd,
        handleEdit,
        handleSubmit,
        handleDelete
    };
}
