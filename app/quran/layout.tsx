import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://nour-alhud.vercel.app/"),
    title: "القرآن الكريم | نور الهدى",
    description: "اقرأ واستمع إلى القرآن الكريم كاملاً. تصفح السور والآيات بسهولة ويسر مع تفسير ميسر.",
    openGraph: {
        title: "القرآن الكريم | نور الهدى",
        description: "اقرأ واستمع إلى القرآن الكريم كاملاً. تصفح السور والآيات بسهولة ويسر.",
        url: "https://nour-alhud.vercel.app/",
    },
};

export default function QuranLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
