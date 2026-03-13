"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Testimonial } from "@/types";

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    return (
        <section className="py-20 bg-primary/5">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">آراء طلابنا</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        نفخر بتأثيرنا الإيجابي في مسيرة الآلاف من الطلاب لاجتياز اختباراتهم وتطوير لغتهم.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="bg-card border-none shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -z-10" />
                            <CardContent className="p-8">
                                <Quote className="w-10 h-10 text-primary/40 mb-4" />
                                <p className="text-lg mb-6 leading-relaxed relative z-10">&quot;{testimonial.content}&quot;</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="font-bold">{testimonial.name}</span>
                                        <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}`} />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
