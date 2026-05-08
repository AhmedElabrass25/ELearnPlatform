
import { motion } from "framer-motion";
import { Course } from "@/types";
import { PathCourseCardActions } from "./PathCourseCardActions";


interface PathCourseCardProps {
    course: Course;
    index: number;
    onEdit: (course: Course) => void;
    onDelete: (course: Course) => void;
}

export function PathCourseCard({ course, index, onEdit, onDelete }: PathCourseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-border rounded-2xl p-5 bg-card hover:shadow-md transition-shadow group"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>
                </div>
            </div>


            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="text-green-600 font-semibold font-sans mr-auto">
                    {course.price} {course.currency || "ج.م"}
                </span>
            </div>

            <PathCourseCardActions course={course} onEdit={onEdit} onDelete={onDelete} />
        </motion.div>
    );
}
