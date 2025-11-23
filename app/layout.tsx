import type { Metadata } from "next";
import { Rubik, Rakkas } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Header";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const rakkas = Rakkas({
  variable: "--font-rakkas",
  subsets: ["arabic"],
  weight: "400",
});
export const metadata: Metadata = {
  title: "نور الهدى | رفيقك في رحلة الإيمان",
  description: "منصة نور الهدى هي وجهتك الروحانية المتكاملة، حيث تجمع بين تلاوة القرآن الكريم، الأذكار اليومية، ومجتمع إسلامي متفاعل. نسعى لتعزيز صلتك بالله وتوفير بيئة هادئة تعينك على الطاعة والتفقه في الدين",
  keywords: ["قرآن كريم", "أذكار", "إسلام", "نور الهدى", "تفسير", "أدعية", "مجتمع إسلامي", "أسئلة دينية"],
  authors: [{ name: "فريق نور الهدى" }],
  openGraph: {
    title: "نور الهدى | رفيقك في رحلة الإيمان",
    description: "اكتشف السكينة مع منصة نور الهدى. قرآن، أذكار، ومجتمع إسلامي يجمعنا على الطاعة.",
    siteName: "نور الهدى",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "شعار نور الهدى",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${rubik.variable} ${rakkas.variable}`}>
      <body className={`antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
