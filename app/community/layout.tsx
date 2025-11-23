import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "مجتمع نور الهدى | تواصل وشارك",
    description: "انضم إلى مجتمع نور الهدى، شارك الخواطر، الأدعية، وتفاعل مع محتوى ديني هادف في بيئة إيمانية آمنة.",
    openGraph: {
        title: "مجتمع نور الهدى | تواصل وشارك",
        description: "انضم إلى مجتمع نور الهدى، شارك الخواطر، الأدعية، وتفاعل مع محتوى ديني هادف.",
        images: ["/logo.svg"],
    },
};

export default function CommunityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
