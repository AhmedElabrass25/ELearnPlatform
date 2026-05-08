"use client";
import React, { useState, useCallback } from "react";
import { ClipboardList, Loader2, SearchX } from "lucide-react";
import { getExamsByCourse } from "@/services/exams.service";
import { getAdminExamAttempts } from "@/services/exams.service";
import { UserAttemptCard } from "./components/UserAttemptCard";

interface Course { _id?: string; id?: string; title: string }
interface GroupedUser {
    name: string; email?: string;
    attempts: { attempt: any; examTitle: string }[];
}

export function UserAttemptsClient({ courses }: { courses: Course[] }) {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [grouped, setGrouped] = useState<GroupedUser[]>([]);
    const [loading, setLoading] = useState(false);

    const handleCourseChange = useCallback(async (courseId: string) => {
        setSelectedCourse(courseId);
        if (!courseId) { setGrouped([]); return; }
        setLoading(true);
        try {
            const exams: any[] = (await getExamsByCourse(courseId)) || [];
            const allAttempts: { attempt: any; examTitle: string }[] = [];
            await Promise.all(
                exams.map(async (exam) => {
                    const res = await getAdminExamAttempts(exam._id || exam.id);
                    const items: any[] = res?.data || res || [];
                    items.forEach((a) => allAttempts.push({ attempt: a, examTitle: exam.title }));
                })
            );
            // Group by user
            const map = new Map<string, GroupedUser>();
            allAttempts.forEach(({ attempt, examTitle }) => {
                const uid = attempt.user?._id || attempt.student?._id || attempt.user?.id || "unknown";
                if (!map.has(uid)) {
                    map.set(uid, {
                        name: attempt.user?.name || attempt.student?.name || "طالب غير معروف",
                        email: attempt.user?.email || attempt.student?.email,
                        attempts: [],
                    });
                }
                map.get(uid)!.attempts.push({ attempt, examTitle });
            });
            setGrouped(Array.from(map.values()));
        } catch (e) { console.error("Failed to fetch attempts", e); }
        finally { setLoading(false); }
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <ClipboardList size={24} className="text-primary" />
                        نتائج الاختبارات
                    </h2>
                    <p className="text-muted-foreground mt-1">عرض نتائج ومحاولات الطلاب في الاختبارات</p>
                </div>
                <select
                    value={selectedCourse}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[220px]"
                >
                    <option value="">— اختر كورس —</option>
                    {courses.map((c) => (
                        <option key={c._id || c.id} value={c._id || c.id}>{c.title}</option>
                    ))}
                </select>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
                    <Loader2 size={32} className="animate-spin text-primary" />
                    <span>جاري تحميل النتائج...</span>
                </div>
            ) : !selectedCourse ? (
                <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-2xl border-2 border-dashed">
                    اختر كورس لعرض نتائج الطلاب
                </div>
            ) : grouped.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground bg-muted/20 rounded-2xl border-2 border-dashed">
                    <SearchX size={40} className="opacity-50" />
                    <span>لا توجد نتائج مسجلة لهذا الكورس</span>
                </div>
            ) : (
                <div className="grid gap-5">
                    {grouped.map((user, idx) => (
                        <UserAttemptCard key={idx} userName={user.name} userEmail={user.email} attempts={user.attempts} />
                    ))}
                </div>
            )}
        </div>
    );
}
