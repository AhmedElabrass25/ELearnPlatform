import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "أكاديمية البرهان للرياضيات",
  description: "تعلم الرياضيات بطريقة سهلة وممتعة مع أفضل منهج متكامل في الجبر والهندسة والتفاضل والتكامل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col relative">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster richColors closeButton position="top-right" dir="rtl" />
        </ThemeProvider>
      </body>
    </html>
  );
}
