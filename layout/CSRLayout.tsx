"use client";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import  { ContextProviderWrapper } from "@/lib/contextapi";
import { SessionProvider } from "next-auth/react";



export default function CSRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <ContextProviderWrapper>
        <SessionProvider>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        </SessionProvider>
        </ContextProviderWrapper>
  );
}
