import React from "react";
import { Plus, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExamsEmptyStateProps {
    onAdd: () => void;
}

export function ExamsEmptyState({ onAdd }: ExamsEmptyStateProps) {
    return (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
            <ClipboardCheck size={60} className="mx-auto mb-4 opacity-10" />
            <p className="text-lg font-bold text-muted-foreground">لا توجد اختبارات في هذا الأسبوع</p>
            <Button onClick={onAdd} className="mt-4 rounded-xl gap-2 font-bold shadow-lg" size="lg">
                <Plus size={20} />
                إنشاء أول اختبار
            </Button>
        </div>
    );
}
