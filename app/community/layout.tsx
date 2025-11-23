import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://muddy-sun-471.linkyhost.com"),
  title: "مجتمع نور الهدى | تواصل وشارك",
  description: "انضم إلى مجتمع نور الهدى، شارك الخواطر، الأدعية، وتفاعل مع محتوى ديني هادف في بيئة إيمانية آمنة.",
  openGraph: {
    title: "مجتمع نور الهدى | تواصل وشارك",
    description: "انضم إلى مجتمع نور الهدى، شارك الخواطر، الأدعية، وتفاعل مع محتوى ديني هادف.",
    url: "https://muddy-sun-471.linkyhost.com/community",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
