"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProfileFieldProps {
    label: string;
    name: string;
    value: string;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    type?: string;
    className?: string;
    dir?: "ltr" | "rtl";
}

export function ProfileField({
    label,
    name,
    value,
    isEditing,
    onChange,
    icon,
    type = "text",
    className = "",
    dir,
}: ProfileFieldProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <Label className="text-muted-foreground flex items-center gap-2 mb-2">
                {icon}
                <span>{label}</span>
            </Label>
            {isEditing ? (
                <Input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="rounded-xl"
                    dir={dir}
                />
            ) : (
                <div className="font-semibold text-foreground bg-muted/20 p-3 rounded-xl border border-transparent" dir={dir}>
                    {value || "-"}
                </div>
            )}
        </div>
    );
}
