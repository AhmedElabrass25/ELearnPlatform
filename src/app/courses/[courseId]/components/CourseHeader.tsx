import { Course } from "@/types";
import { CourseHeaderMedia } from "./header/CourseHeaderMedia";
import { CourseHeaderInfo } from "./header/CourseHeaderInfo";
import { CourseHeaderStats } from "./header/CourseHeaderStats";
import { CourseHeaderPricing } from "./header/CourseHeaderPricing";

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <section className="relative pt-10 pb-20 overflow-hidden bg-primary/5 border-b">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Side: Media */}
          <CourseHeaderMedia coverImage={course.coverImage} title={course.title} />

          {/* Right Side: Content */}
          <div className="flex-1 space-y-8 text-right order-2 md:order-1">
            <CourseHeaderInfo 
              trackName={course.track?.name} 
              updatedAt={course.updatedAt} 
              title={course.title} 
              description={course.description} 
            />
            
            <CourseHeaderStats durationInWeeks={course.durationInWeeks} />
            
            <CourseHeaderPricing price={course.price} />
          </div>
        </div>
      </div>
    </section>
  );
}
