"use client";

import React from "react";
import { motion } from "framer-motion";

interface PathHeaderProps {
    path: {
        slug: string;
        title: string;
        description: string;
    };
}

export function PathHeader({ path }: PathHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/80 to-primary p-8 text-white shadow-xl"
        >
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
                <p className="text-white/70 text-sm mb-2 font-mono">{path.slug}</p>
                <h1 className="text-3xl font-bold mb-3">{path.title}</h1>
                <p className="text-white/80 max-w-2xl leading-relaxed">{path.description}</p>
            </div>
        </motion.div>
    );
}
