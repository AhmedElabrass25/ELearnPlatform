"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ClipboardList, Loader2, SearchX, Filter } from "lucide-react";
import { getExamAttempts } from "@/services/admin.service";
import { StudentAttemptCard } from "./components/StudentAttemptCard";

interface Course { _id: string; title: string }
interface Exam { _id: string; title: string; courseId: string }

export function UserAttemptsClient({ courses, exams }: { courses: Course[], exams: Exam[] }) {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedExam, setSelectedExam] = useState("");
    const [attempts, setAttempts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Filter exams based on selected course
    const filteredExams = useMemo(() => {
        if (!selectedCourse) return exams;
        return exams.filter(e => e.courseId === selectedCourse);
    }, [exams, selectedCourse]);

    // Fetch attempts when exam changes
    useEffect(() => {
        const fetchAttempts = async () => {
            if (!selectedExam) {
                setAttempts([]);
                return;
            }
            setLoading(true);
            try {
                const res = await getExamAttempts(selectedExam);
                setAttempts(res || []);
            } catch (e) {
                console.error("Failed to fetch attempts", e);
            } finally {
                setLoading(false);
            }
        };
        fetchAttempts();
    }, [selectedExam]);

    // Reset selected exam if it's no longer in filtered list
    useEffect(() => {
        if (selectedExam && !filteredExams.find(e => e._id === selectedExam)) {
            setSelectedExam("");
        }
    }, [filteredExams, selectedExam]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header & Filters */}
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <ClipboardList size={24} className="text-primary" />
                        نتائج الطلاب في الاختبارات
                    </h2>
                    <p className="text-muted-foreground mt-1">اختر الاختبار لعرض نتائج جميع الطلاب</p>
                </div>

                <div className="flex flex-col sm:flex-row items-end gap-4 p-4 bg-muted/20 rounded-2xl border">
                    <div className="w-full sm:w-1/2 space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 px-1">
                            <Filter size={12} /> تصفية حسب الكورس
                        </label>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            <option value="">— جميع الكورسات —</option>
                            {courses.map((c) => (
                                <option key={c._id} value={c._id}>{c.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full sm:w-1/2 space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 px-1">
                            اختر الاختبار
                        </label>
                        <select
                            value={selectedExam}
                            onChange={(e) => setSelectedExam(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            <option value="">— اختر اختبار —</option>
                            {filteredExams.map((e) => (
                                <option key={e._id} value={e._id}>{e.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
                    <Loader2 size={32} className="animate-spin text-primary" />
                    <span>جاري تحميل نتائج الطلاب...</span>
                </div>
            ) : !selectedExam ? (
                <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-2xl border-2 border-dashed">
                    {selectedCourse ? "اختر اختباراً من هذا الكورس لعرض النتائج" : "اختر اختباراً لعرض نتائج الطلاب"}
                </div>
            ) : attempts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground bg-muted/20 rounded-2xl border-2 border-dashed">
                    <SearchX size={40} className="opacity-50" />
                    <span>لا توجد محاولات مسجلة لهذا الاختبار حتى الآن</span>
                </div>
            ) : (
                <div className="grid gap-4">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-sm font-medium text-muted-foreground">
                            عدد الطلاب: <span className="text-foreground font-bold">{attempts.length}</span>
                        </span>
                    </div>
                    <div className="grid gap-3">
                        {attempts.map((attempt) => (
                            <StudentAttemptCard key={attempt._id} attempt={attempt} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
