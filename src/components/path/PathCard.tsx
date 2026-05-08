"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Path } from "@/types";
import Image from "next/image";

export function PathCard({ path }: { path: Path }) {
  return (
    <Card
      key={path.id}
      className="pt-0 group overflow-hidden border-border/40 hover:border-primary/40 transition-all duration-500 bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 flex flex-col h-full"
    >
      <div className="aspect-[16/16] w-full bg-muted relative overflow-hidden">
        <Image
          src={`${path.coverImage ? `${process.env.NEXT_PUBLIC_BASE_URL}${path.coverImage}` : `${process.env.NEXT_PUBLIC_BASE_URL}/images/default-path.jpg`}`}
          alt={path.name}
          fill
          className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors text-right">
            {path.name}
          </h3>
          <div className="w-12 h-1 group-hover:w-full bg-primary transition-all duration-500 rounded-full" />
        </div>

        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-white">منهج متكامل</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 flex-grow">
        <p className="text-muted-foreground leading-relaxed text-sm text-right line-clamp-3">
          {path.description ||
            "استكشف هذا المسار التعليمي المتميز المصمم لمساعدتك على التفوق في اللغة العربية بأسلوب حديث ومبسط."}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto">
        <Button
          variant="outline"
          className="w-full h-11 justify-center rounded-xl font-bold transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary border-primary/20 bg-primary/5 text-primary"
          asChild
        >
          <Link
            href={`courses?path=${path._id}`}
            className="flex items-center gap-2"
          >
            تصفح دورات المسار
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
