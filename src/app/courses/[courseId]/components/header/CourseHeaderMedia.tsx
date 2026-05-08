import { PlayCircle, Layout } from "lucide-react";

interface CourseHeaderMediaProps {
  coverImage?: string;
  title: string;
}

export function CourseHeaderMedia({ coverImage, title }: CourseHeaderMediaProps) {
  return (
    <div className="w-full md:w-[450px] order-1 md:order-2">
      <div className="relative aspect-video md:aspect-[4/5] bg-muted overflow-hidden shadow-2xl rounded-3xl group">
        {coverImage ? (
          <img
            src={`${coverImage ? `${process.env.NEXT_PUBLIC_BASE_URL}${coverImage}` : `${process.env.NEXT_PUBLIC_BASE_URL}/images/default-path.jpg`}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
            <Layout className="w-20 h-20 text-primary/30" />
          </div>
        )
        }
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircle className="w-16 h-16 text-white" />
        </div>
      </div>
    </div>
  );
}
