"use client";

import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

interface ActionButtonsProps {
  courseId: string;
}

export function ActionButtons({ courseId }: ActionButtonsProps) {
  return (
    <CardFooter className="flex gap-4 justify-center pb-8 border-t pt-8">
      <Button className="h-12 px-8 font-bold text-white bg-primary hover:bg-primary/90 transition-colors" asChild>
        <Link href={`/courses/${courseId}`}>
          العودة للدورة
          <Home className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </CardFooter>
  );
}
