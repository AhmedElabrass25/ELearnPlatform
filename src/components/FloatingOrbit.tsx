"use client";

import { motion } from "framer-motion";

export function FloatingOrbit() {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-50 dark:opacity-30">
            {/* Dashed circular orbit */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="absolute w-[90%] md:w-[80%] max-w-[1000px] aspect-square border-2 border-dashed border-primary/20 rounded-full"
            />
            {/* Another orbit */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute w-[60%] md:w-[50%] max-w-[600px] aspect-square border border-dashed border-primary/30 rounded-full"
            />

            {/* Floating words/atoms */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 md:left-[20%] bg-primary/10 text-primary font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
            >
                البلاغة
            </motion.div>
            <motion.div
                animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-[15%] md:right-[20%] bg-primary border border-primary/20 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20"
            >
                اللغة العربية
            </motion.div>
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/3 right-1/4 md:right-[30%] text-6xl text-primary font-bold opacity-20"
            >
                ض
            </motion.div>
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-1/3 left-[20%] bg-secondary text-secondary-foreground font-bold px-4 py-2 rounded-lg shadow-md"
            >
                النحو والصرف
            </motion.div>
        </div>
    );
}
