"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 py-12 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-4 rounded-xl bg-destructive/10 blur-2xl animate-pulse" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-destructive/10 text-destructive shadow-inner">
          <AlertTriangle size={48} strokeWidth={2.5} />
        </div>
      </div>

      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          عذراً، حدث خطأ غير متوقع
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          واجهنا مشكلة تقنية أثناء محاولة معالجة طلبك. لقد تم تسجيل الخطأ وسنعمل على إصلاحه في أقرب وقت.
        </p>
        
        {/* Error Code/Digest if available */}
        {error.digest && (
          <p className="inline-block rounded-md bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={() => reset()}
          size="lg"
          className="rounded-full px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          <span>حاول مرة أخرى</span>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full px-8 transition-all hover:bg-muted/50"
          asChild
        >
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            <span>العودة للرئيسية</span>
          </a>
        </Button>
      </div>

      <div className="mt-20 flex flex-col items-center gap-4">
         <p className="text-sm text-muted-foreground/60">
           إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني.
         </p>
         <div className="h-px w-24 bg-border" />
      </div>
    </div>
  );
}
