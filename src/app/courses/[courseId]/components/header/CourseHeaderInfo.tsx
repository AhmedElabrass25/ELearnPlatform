import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface CourseHeaderInfoProps {
  trackName?: string;
  updatedAt?: string;
  title: string;
  description?: string;
}

export function CourseHeaderInfo({ trackName, updatedAt, title, description }: CourseHeaderInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-start gap-2 items-center">
        <Badge
          variant="secondary"
          className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20"
        >
          {trackName || "مسار عام"}
        </Badge>
        <span className="text-muted-foreground text-sm flex items-center gap-1">
          تم التحديث في{" "}
          {new Date(updatedAt || Date.now()).toLocaleDateString("ar-EG")}
          <Calendar className="w-4 h-4 ml-1" />
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl ml-auto">
        {description}
      </p>
    </div>
  );
}
