"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/types";

interface FAQSectionProps {
    faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
    return (
        <section className="py-20 bg-background">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">الأسئلة الشائعة</h2>
                    <p className="text-muted-foreground text-lg">كل ما تريد معرفته عن منصتنا والدورات المتاحة</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border bg-card mb-4 rounded-xl px-2 shadow-sm">
                            <AccordionTrigger className="hover:no-underline font-bold text-lg py-4 text-right">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
