"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockData } from "@/lib/mockData";
import { AdminTable } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Eye, BookOpen, Clock } from "lucide-react";
import { CourseFilters } from "@/components/dashboard/CourseFilters";
import { CourseFormModal, CourseDeleteModal } from "@/components/dashboard/CourseModals";
import { Course } from "@/types";

const levelColors: Record<string, string> = {
    "مبتدئ": "bg-green-500/10 text-green-700 border-green-200 dark:border-green-900",
    "متوسط": "bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-900",
    "متقدم": "bg-red-500/10 text-red-700 border-red-200 dark:border-red-900",
};

export default function CoursesManagementPage() {
    const [courses, setCourses] = useState<Course[]>(mockData.courses as Course[]);
    const [search, setSearch] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const [filterPath, setFilterPath] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [formData, setFormData] = useState({ title: "", subtitle: "", price: 0, level: "مبتدئ", type: "أونلاين", topic: "", duration: "", pathId: "", image: "", isPopular: false });

    const filteredCourses = useMemo(() => courses.filter((c) => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || (c.subtitle || "").toLowerCase().includes(search.toLowerCase());
        return matchSearch && (filterLevel === "all" || c.level === filterLevel) && (filterPath === "all" || c.pathId === filterPath);
    }), [courses, search, filterLevel, filterPath]);

    const handleAdd = () => { setEditingCourse(null); setFormData({ title: "", subtitle: "", price: 0, level: "مبتدئ", type: "أونلاين", topic: "", duration: "", pathId: "", image: "", isPopular: false }); setIsModalOpen(true); };
    const handleEdit = (c: Course) => { setEditingCourse(c); setFormData({ title: c.title, subtitle: c.subtitle || "", price: c.price, level: c.level, type: c.type, topic: c.topic || "", duration: c.duration, pathId: c.pathId, image: c.image || "", isPopular: c.isPopular || false }); setIsModalOpen(true); };
    const handleSubmit = () => {
        if (editingCourse) setCourses(courses.map((c) => (c.id === editingCourse.id ? { ...c, ...formData } : c)));
        else setCourses([...courses, { id: `course-${Date.now()}`, currency: "ج.م", lessonsCount: 0, examsCount: 0, ...formData }]);
        setIsModalOpen(false);
    };

    const columns = [
        { key: "title", header: "الكورس", render: (item: Course) => (<div className="flex items-center gap-3"><div className="w-12 h-8 rounded-lg bg-muted overflow-hidden flex-shrink-0 relative border border-border">{item.image ? <Image src={item.image} alt={item.title} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary"><BookOpen size={16} /></div>}</div><div><span className="font-semibold block truncate max-w-[180px]">{item.title}</span>{item.subtitle && <span className="text-[10px] text-muted-foreground block truncate max-w-[180px]">{item.subtitle}</span>}</div></div>) },
        { key: "pathId", header: "المسار", render: (item: Course) => (<span className="text-sm">{mockData.paths.find((p) => p.id === item.pathId)?.title || "-"}</span>) },
        { key: "level", header: "المستوى", render: (item: Course) => (<Badge variant="outline" className={`rounded-xl font-medium border-none ${levelColors[item.level]}`}>{item.level}</Badge>) },
        { key: "price", header: "السعر", render: (item: Course) => (<span className="font-sans font-semibold text-green-600">{item.price} {item.currency || "ج.م"}</span>) },
        { key: "actions", header: "إدارة", render: (item: Course) => (<div className="flex items-center gap-2"><Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"><Link href={`/dashboard/courses/${item.id}`}><Settings size={14} /></Link></Button><Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"><Link href={`/dashboard/courses/${item.id}`}><Eye size={14} /></Link></Button></div>) }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CourseFilters search={search} setSearch={setSearch} filterLevel={filterLevel} setFilterLevel={setFilterLevel} filterPath={filterPath} setFilterPath={setFilterPath} hasFilters={!!(search || filterLevel !== "all" || filterPath !== "all")} clearFilters={() => { setSearch(""); setFilterLevel("all"); setFilterPath("all"); }} />
            <AdminTable title="إدارة الكورسات" description={`يتم عرض ${filteredCourses.length} كورس بناءً على الفلاتر.`} data={filteredCourses} columns={columns} onAdd={handleAdd} onEdit={handleEdit} onDelete={(item) => { setCourseToDelete(item); setIsDeleteModalOpen(true); }} />
            <CourseFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingCourse={editingCourse} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            <CourseDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} courseTitle={courseToDelete?.title || ""} onConfirm={() => { if (courseToDelete) setCourses(courses.filter((c) => c.id !== courseToDelete.id)); setIsDeleteModalOpen(false); }} />
        </div>
    );
}
