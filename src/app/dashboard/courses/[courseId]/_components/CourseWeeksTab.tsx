
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WeekItem } from "@/components/dashboard/WeekItem/WeekItem";
import { WeekModal } from "@/components/dashboard/WeekModals/WeekModal";
import { WeekDeleteModal } from "@/components/dashboard/WeekModals/WeekDeleteModal";
import { useCourseWeeks } from "../_hooks/useCourseWeeks";

export function CourseWeeksTab({ courseId, hookContext }: { courseId: string; hookContext: ReturnType<typeof useCourseWeeks>  }) {
    const {
        weeks,
        isWeekModalOpen,
        setIsWeekModalOpen,
        editingWeek,
        isWeekDeleteModalOpen,
        setIsWeekDeleteModalOpen,
        weekToDelete,
        setWeekToDelete,
        weekFormData,
        setWeekFormData,
        handleAddWeek,
        handleEditWeek,
        handleWeekSubmit,
        confirmDeleteWeek,
    } = hookContext;

    return (
        <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-6 bg-muted/20 border-b border-border">
                <div>
                    <CardTitle className="text-xl font-bold">هيكل الكورس (الأسابيع)</CardTitle>
                    <CardDescription className="mt-1">قسم الكورس إلى أسابيع لتنظيم المحتوى التعليمي</CardDescription>
                </div>
                <Button onClick={handleAddWeek} className="gap-2 rounded-xl bg-primary hover:bg-primary/90 shadow-md">
                    <Plus size={16} />
                    إضافة أسبوع
                </Button>
            </CardHeader>
            <CardContent className="p-6 min-h-[400px]">
                {weeks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                            <Calendar size={40} className="opacity-20" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold">لا يوجد هيكل أسابيع بعد</p>
                            <p className="text-sm">ابدأ بإضافة أول أسبوع لتنظيم دروسك وموادك التعليمية</p>
                        </div>
                        <Button onClick={handleAddWeek} variant="outline" className="mt-2 rounded-xl border-primary/20 text-primary">إضافة أول أسبوع</Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {weeks.map((week, index) => (
                                    <motion.div
                                        key={week._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <WeekItem
                                        courseId={courseId}
                                        week={week}
                                        index={index}
                                        totalWeeks={weeks.length}
                                        onEdit={handleEditWeek}
                                        onDelete={(w) => { setWeekToDelete(w); setIsWeekDeleteModalOpen(true); }}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </CardContent>

            <WeekModal isOpen={isWeekModalOpen} onClose={() => setIsWeekModalOpen(false)} editingWeek={editingWeek} formData={weekFormData} setFormData={setWeekFormData} onSubmit={handleWeekSubmit} />
            <WeekDeleteModal isOpen={isWeekDeleteModalOpen} onClose={() => setIsWeekDeleteModalOpen(false)} weekTitle={weekToDelete?.title || ""} onConfirm={confirmDeleteWeek} />
        </Card>
    );
}
