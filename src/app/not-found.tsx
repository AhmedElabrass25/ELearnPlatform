"use client";

import Link from "next/link";
import { MoveRight, Home, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 py-12 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <h1 className="relative text-[10rem] font-black leading-none tracking-tighter text-muted-foreground/20">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <HelpCircle size={100} className="text-primary animate-bounce" />
        </div>
      </div>

      <div className="max-w-md space-y-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          أوبس! لم نجد هذه الصفحة
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو أنها لم تعد موجودة. لا تقلق، يمكنك العودة إلى بر الأمان.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Link href="/" className="flex items-center gap-2">
            <Home size={18} />
            <span>العودة للرئيسية</span>
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="rounded-full px-8 transition-all hover:bg-muted/50" onClick={() => window.history.back()}>
          <span className="flex items-center gap-2">
            <MoveRight size={18} />
            <span>رجوع للخلف</span>
          </span>
        </Button>
      </div>

      <div className="mt-20 flex items-center gap-2 text-sm font-medium text-muted-foreground/60">
        <div className="h-1 w-1 rounded-full bg-primary/40" />
        <span>E-Learn Platform - Edu QR</span>
        <div className="h-1 w-1 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
