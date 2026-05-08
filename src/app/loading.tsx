import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full py-12">
      <div className="relative flex flex-col items-center gap-4">
        {/* Outer Glow */}
        <div className="absolute -inset-8 rounded-full bg-primary/10 blur-2xl animate-pulse" />
        
        {/* Modern Spinner */}
        <div className="relative">
          <Loader2 className="h-10 w-10 animate-spin text-primary" strokeWidth={2.5} />
          <div className="absolute inset-0 h-10 w-10 rounded-full border-4 border-primary/10" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-bold tracking-tight text-foreground/80 animate-pulse">
            جاري التحميل...
          </span>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
            Edu QR Platform
          </p>
        </div>
      </div>

    </div>
  );
}
