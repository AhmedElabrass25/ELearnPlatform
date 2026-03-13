import { mockData } from "@/lib/mockData";
import { HeroSection } from "@/components/home/HeroSection";
import { LearningPaths } from "@/components/home/LearningPaths";
import { PopularCourses } from "@/components/home/PopularCourses";
import { TestimonialsSection } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { Course, Path, Testimonial, FAQ } from "@/types";

export default function Home() {
    const popularCourses = (mockData.courses.filter(c => c.isPopular) || mockData.courses.slice(0, 3)) as Course[];
    const paths = mockData.paths as Path[];
    const testimonials = (mockData.testimonials || []) as Testimonial[];
    const faqs = (mockData.faqs || []) as FAQ[];

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <HeroSection site={mockData.site} instructor={mockData.instructor} />
            <LearningPaths paths={paths} />
            <PopularCourses courses={popularCourses} />
            <TestimonialsSection testimonials={testimonials} />
            <FAQSection faqs={faqs} />
        </div>
    );
}
