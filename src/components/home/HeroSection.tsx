"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingOrbit } from "@/components/FloatingOrbit";
import { Star } from "lucide-react";

interface HeroSectionProps {
    site: { tagline: string; description: string; };
    instructor: { name: string; avatar: string; };
}

export function HeroSection({ site, instructor }: HeroSectionProps) {
    return (
        <section className="relative overflow-hidden bg-background py-24 lg:py-32">
            <FloatingOrbit />
            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-right space-y-8">
                        <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            {site.tagline}
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                            تعلم اللغة العربية <br />
                            <span className="text-primary mt-2 inline-block">بسهولة وإتقان</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                            {site.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button size="lg" className="h-12 px-8 text-base font-bold shadow-lg shadow-primary/20" asChild>
                                <Link href="/courses">تصفح الدورات</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold bg-background/50 backdrop-blur-sm" asChild>
                                <Link href="/about">عن الأستاذ محمد</Link>
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 w-full pt-8 border-t border-border/50">
                            <StatItem value="15K+" label="طالب ناجح" />
                            <StatItem value="500+" label="درس مسجل" />
                            <StatItem value="8" label="سنوات خبرة" />
                            <StatItem value="4" label="مسارات" />
                        </div>
                    </div>
                    <div className="relative mx-auto w-full max-w-md lg:max-w-full flex items-center justify-center mt-8 lg:mt-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] rounded-full sm:rounded-[40px] overflow-hidden border-8 border-background/50 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" loading="eager" />
                        </div>
                        <div className="absolute bottom-10 right-0 sm:-right-4 bg-background p-4 rounded-xl shadow-xl border border-border/30 flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"><Star className="w-5 h-5 text-primary fill-primary" /></div>
                            <div><p className="font-bold text-sm">أفضل معلم</p><p className="text-xs text-muted-foreground">لتبسيط النحو</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center lg:items-start">
            <span className="text-3xl font-bold text-primary">{value}</span>
            <span className="text-sm text-muted-foreground mt-1">{label}</span>
        </div>
    );
}
