"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileSelectFieldProps {
    label: string;
    name: string;
    value: string;
    isEditing: boolean;
    onValueChange: (value: string) => void;
    icon: React.ReactNode;
    options: { label: string; value: string }[];
    placeholder?: string;
}

export function ProfileSelectField({
    label,
    value,
    isEditing,
    onValueChange,
    icon,
    options,
    placeholder = "اختر...",
}: ProfileSelectFieldProps) {
    return (
        <div className="space-y-2">
            <Label className="text-muted-foreground flex items-center gap-2 mb-2">
                {icon}
                <span>{label}</span>
            </Label>
            {isEditing ? (
                <Select value={value} onValueChange={onValueChange}>
                    <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ) : (
                <div className="font-semibold text-foreground bg-muted/20 p-3 rounded-xl border border-transparent">
                    {value || "-"}
                </div>
            )}
        </div>
    );
}
