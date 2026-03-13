"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent) => void;
    submitLabel?: string;
    isDestructive?: boolean;
}

export function AdminModal({
    isOpen,
    onClose,
    title,
    description,
    children,
    onSubmit,
    submitLabel = "حفظ",
    isDestructive = false
}: AdminModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-2xl border-border">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                {onSubmit ? (
                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(e); }}>
                        <div className="p-6 pt-2 max-h-[70vh] overflow-y-auto">
                            {children}
                        </div>
                        <div className="p-6 pt-4 border-t border-border bg-muted/30 flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                variant={isDestructive ? "destructive" : "default"}
                                className="rounded-xl"
                            >
                                {submitLabel}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="p-6 pt-2 max-h-[70vh] overflow-y-auto">
                            {children}
                        </div>
                        <div className="p-6 pt-4 border-t border-border bg-muted/30 flex justify-end gap-3">
                            <Button type="button" onClick={onClose} className="rounded-xl">
                                إغلاق
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
