import Link from "next/link";
import { BookOpen, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted/50 border-t py-12 px-4 md:px-6">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="md:col-span-1 space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-primary">
                        <BookOpen className="h-8 w-8" />
                        <span className="font-bold text-xl">أكاديمية محمد</span>
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        منصة تعليمية رائدة تهدف إلى تيسير لغة القرآن وتوصيل مبادئ النحو والصرف والبلاغة بأكثر الطرق ابتكاراً وسهولة تحت إشراف أستاذ محمد.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <Link href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                            <Youtube className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-4">روابط هامة</h4>
                    <ul className="space-y-3">
                        <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">الرئيسية</Link></li>
                        <li><Link href="/paths" className="text-muted-foreground hover:text-primary transition-colors">المسارات التعليمية</Link></li>
                        <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">تصفح الكورسات</Link></li>
                        <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">عن المدرب</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-4">الدعم والمساعدة</h4>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">تواصل معنا</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">شروط الاستخدام</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
                    <ul className="space-y-3 text-muted-foreground text-sm">
                        <li>البريد الإلكتروني: <span className="font-medium text-foreground">support@mohamedacademy.com</span></li>
                        <li>رقم الواتساب: <span className="font-medium text-foreground" dir="ltr">+20 100 123 4567</span></li>
                        <li>ساعات العمل: <span className="font-medium text-foreground">10:00 ص - 10:00 م (بتوقيت القاهرة)</span></li>
                    </ul>
                </div>
            </div>

            <div className="container text-center text-sm text-muted-foreground pt-8 border-t">
                <p>&copy; {new Date().getFullYear()} أكاديمية محمد للغة العربية. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
}
