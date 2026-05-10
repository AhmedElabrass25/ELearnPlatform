import { mockData } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  CheckCircle,
  Award,
  Users,
  BookOpen,
  Target,
  Lightbulb,
  Compass,
} from "lucide-react";

export default function AboutPage() {
  const { instructor } = mockData;

  return (
    <div className="container py-12 px-4 md:px-6 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
        <div className="w-full md:w-1/2 aspect-square max-w-sm rounded-[2rem] bg-primary/20 relative overflow-hidden border-4 border-background shadow-xl flex items-center justify-center">
            <Image src="/images/instructor.jpg" alt={instructor.name} fill className="object-cover" loading="eager" />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            أستاذ {instructor.name}
          </h1>
          <p className="text-2xl text-primary font-medium">
            {instructor.title}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {instructor.bio}
          </p>
        </div>
      </div>
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          لماذا أكاديمية البرهان؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {/* make header to that section */}
          <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10" />
            <CardContent className="p-8">
              <Target className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
              <p className="text-muted-foreground leading-relaxed">
                أن نكون المرجع الأول لطلاب الرياضيات في الوطن العربي، من خلال تبسيط 
                مفاهيم الجبر والهندسة والتفاضل والتكامل، وجعل المادة رحلة ممتعة تنمي التفكير المنطقي 
                وتزيل أي رهبة من التعامل مع الأرقام والمعادلات.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10" />
            <CardContent className="p-8">
              <Compass className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">رسالتنا</h3>
              <p className="text-muted-foreground leading-relaxed">
                تقديم محتوى تعليمي متميز في الرياضيات يجمع بين الدقة العلمية والإخراج 
                التقني العصري، مع التركيز على فهم الجوهر والحلول الإبداعية للمسائل 
                بدلاً من الحفظ، مع توفير دعم أكاديمي مستمر للطلاب.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10" />
            <CardContent className="p-8">
              <Lightbulb className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">منهجيتنا</h3>
              <p className="text-muted-foreground leading-relaxed">
                نعتمد على التدرج من التأسيس الصحيح إلى المستويات المتقدمة، وربط الرياضيات 
                بتطبيقاتها العملية، مع توفير تدريبات مكثفة واختبارات دورية تحاكي 
                أنظمة الامتحانات الحديثة لضمان التفوق والدرجة النهائية.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
