import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "الأسئلة الشائعة | نور الهدى",
    description: "اعثر على إجابات لاستفساراتك الدينية والشرعية في قسم الأسئلة الشائعة. تصفح الأسئلة المطروحة أو شارك بسؤالك.",
    openGraph: {
        title: "الأسئلة الشائعة | نور الهدى",
        description: "اعثر على إجابات لاستفساراتك الدينية والشرعية في قسم الأسئلة الشائعة.",
        images: ["/logo.svg"],
    },
};

export default function QuestionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
