import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://muddy-sun-471.linkyhost.com"),
    title: "الأسئلة الشائعة | نور الهدى",
    description: "اعثر على إجابات لاستفساراتك الدينية والشرعية في قسم الأسئلة الشائعة. تصفح الأسئلة المطروحة أو شارك بسؤالك.",
    openGraph: {
        title: "الأسئلة الشائعة | نور الهدى",
        description: "اعثر على إجابات لاستفساراتك الدينية والشرعية في قسم الأسئلة الشائعة.",
        url: "https://muddy-sun-471.linkyhost.com/questions",
    },
};

export default function QuestionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
