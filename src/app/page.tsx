import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FloatingOrbit } from "@/components/FloatingOrbit";
import { mockData } from "@/lib/mockData";
import { ArrowLeft, BookOpen, Clock, PlayCircle, Star, Quote } from "lucide-react";

export default function Home() {
  const popularCourses = mockData.courses.filter(course => course.isPopular) || mockData.courses.slice(0, 3);
  const paths = mockData.paths;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 lg:py-32">
        <FloatingOrbit />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-right space-y-8">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                {mockData.site.tagline}
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                تعلم اللغة العربية <br />
                <span className="text-primary mt-2 inline-block">بسهولة وإتقان</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {mockData.site.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="h-12 px-8 text-base font-bold shadow-lg shadow-primary/20" asChild>
                  <Link href="/courses">تصفح الدورات</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold bg-background/50 backdrop-blur-sm" asChild>
                  <Link href="/about">عن الأستاذ محمد</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 w-full pt-8 border-t border-border/50">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-3xl font-bold text-primary">15K+</span>
                  <span className="text-sm text-muted-foreground mt-1">طالب ناجح</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-3xl font-bold text-primary">500+</span>
                  <span className="text-sm text-muted-foreground mt-1">درس مسجل</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-3xl font-bold text-primary">8</span>
                  <span className="text-sm text-muted-foreground mt-1">سنوات خبرة</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-3xl font-bold text-primary">4</span>
                  <span className="text-sm text-muted-foreground mt-1">مسارات</span>
                </div>
              </div>
            </div>

            {/* Teacher Image Area */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] rounded-full sm:rounded-[40px] overflow-hidden border-8 border-background/50 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={mockData.instructor.avatar}
                  alt={mockData.instructor.name}
                  fill
                  className="object-cover"
                  loading="eager"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-10 right-0 sm:-right-4 bg-background p-4 rounded-xl shadow-xl border border-border/30 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">أفضل معلم</p>
                  <p className="text-xs text-muted-foreground">لتبسيط النحو</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">المسارات التعليمية</h2>
              <p className="text-muted-foreground">اختر المسار الذي يناسب مستواك وأهدافك</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paths.map((path) => (
              <Card key={path.id} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-colors bg-card">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  {/* Decorative placeholder image since we don't have real assets */}
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/40" />
                  </div>
                  <div className="absolute bottom-4 right-4 z-20">
                    <h3 className="text-lg font-bold text-white">{path.title}</h3>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {path.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <PlayCircle className="w-4 h-4" />
                      <span>{path.lessonsCount} درس</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{path.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button variant="ghost" className="w-full justify-between hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                    <Link href={`/courses?path=${path.id}`}>
                      عرض المقررات
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">الدورات الأعلى تقييماً</h2>
              <p className="text-muted-foreground">ابدأ رحلتك التعليمية مع أكثر الدورات طلباً</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/courses">كل الدورات</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <Card key={course.id} className="flex flex-col overflow-hidden border-border/50 hover:shadow-lg transition-all group bg-card">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute top-3 right-3 z-20 flex gap-2">
                    <Badge className="bg-primary hover:bg-primary/90 text-white font-medium">{course.level}</Badge>
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground">{course.type}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <PlayCircle className="w-16 h-16 text-primary/30" />
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">{course.title}</CardTitle>
                  {course.subtitle && <CardDescription>{course.subtitle}</CardDescription>}
                </CardHeader>
                <CardContent className="pb-4 flex-1">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.topic}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t border-border/50 mt-auto flex items-center justify-between bg-muted/5 p-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">السعر</span>
                    <span className="text-lg font-bold text-foreground">
                      {course.price} {course.currency || 'ج.م'}
                    </span>
                  </div>
                  <Button asChild>
                    <Link href={`/courses/${course.id}`}>تفاصيل الكورس</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">آراء طلابنا</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نفخر بتأثيرنا الإيجابي في مسيرة الآلاف من الطلاب لاجتياز اختباراتهم وتطوير لغتهم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockData.testimonials?.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card border-none shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -z-10" />
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-primary/40 mb-4" />
                  <p className="text-lg mb-6 leading-relaxed relative z-10">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="font-bold">{testimonial.name}</span>
                      <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}`} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">الأسئلة الشائعة</h2>
            <p className="text-muted-foreground text-lg">كل ما تريد معرفته عن منصتنا والدورات المتاحة</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {mockData.faqs?.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border bg-card mb-4 rounded-xl px-2 shadow-sm">
                <AccordionTrigger className="hover:no-underline font-bold text-lg py-4 text-right">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
