import { mockData } from "@/lib/mockData";
import { HeroSection } from "@/components/home/HeroSection";
import { LearningPaths } from "@/components/home/LearningPaths";
import { FAQSection } from "@/components/home/FAQSection";
import { FAQ, Path } from "@/types";
import { getTracks } from "@/services/tracks.service";

export default async function Home() {
    let paths: Path[] = [];
    let hasError = false;
    try {
        paths = await getTracks();
    } catch (error) {
        hasError = true;
    }
    const faqs = (mockData.faqs || []) as FAQ[];

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <HeroSection site={mockData.site} instructor={mockData.instructor} />
            <LearningPaths paths={paths} hasError={hasError} />
            <FAQSection faqs={faqs} />
        </div>
    );
}
