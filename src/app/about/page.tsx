import { mockData } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Users, BookOpen, Target, Lightbulb, Compass } from "lucide-react";

export default function AboutPage() {
    const { instructor } = mockData;

    return (
        <div className="container py-12 px-4 md:px-6 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
                <div className="w-full md:w-1/2 aspect-square max-w-sm rounded-[2rem] bg-primary/20 relative overflow-hidden border-4 border-background shadow-xl flex items-center justify-center">
                    <img
                        src={instructor.avatar}
                        alt={instructor.name}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">أستاذ {instructor.name}</h1>
                    <p className="text-2xl text-primary font-medium">{instructor.title}</p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {instructor.bio}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-xl">+15,000</p>
                                <p className="text-sm text-muted-foreground">طالب ناجح</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-xl">8 سنوات</p>
                                <p className="text-sm text-muted-foreground">خبرة تدريس</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8 mb-20">
                <h2 className="text-3xl font-bold tracking-tight text-center mb-12">الإنجازات والجوائز</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {instructor.achievements?.map((achievement, idx) => (
                        <Card key={idx} className="bg-muted/30 border-none shadow-none text-center p-6">
                            <CardContent className="pt-6 border-b-2 border-primary/20 hover:border-primary transition-colors h-full flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Award className="w-8 h-8 text-primary" />
                                </div>
                                <p className="font-bold text-lg">{achievement}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10" />
                    <CardContent className="p-8">
                        <Target className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            أن نكون المنصة العربية الأولى المرجعية في تبسيط علوم اللغة العربية من نحو وصرف وبلاغة، وجعلها لغة سهلة الفهم وقريبة من قلوب الجيل الجديد متجاوزين كل التعقيدات التقليدية.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10" />
                    <CardContent className="p-8">
                        <Compass className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-4">رسالتنا</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            تقديم مادة علمية أكاديمية موثوقة بإخراج تقني عصري وأدوات تفاعلية تخدم الطالب في مسيرته الدراسية، مع توفير دعم مستمر وإجابة ميسرة لكل الاستفسارات.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow relative overflow-hidden md:col-span-2 lg:col-span-1">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10" />
                    <CardContent className="p-8">
                        <Lightbulb className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-4">منهجيتنا</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            نعتمد على التدرج في إعطاء المعلومات، البدء من التطبيق العملي لتوضيح القاعدة النظرية، ثم ترسيخها بتدريبات تفاعلية وامتحانات دورية تضمن للطالب إتقاناً حقيقياً.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
