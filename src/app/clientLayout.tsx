// ClientLayout.tsx
"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import ToasterContext from "./api/contex/ToasetContex";
import PreLoader from "@/components/Common/PreLoader";

import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";

interface ClientLayoutProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

export default function ClientLayout({
  children,
  messages,
  locale,
}: ClientLayoutProps) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <ToasterContext />
          {loading ? (
            <PreLoader />
          ) : (
            <>
              {/* <Header /> */}
              {children}
              {/* <Footer /> */}
              <ScrollToTop />
            </>
          )}
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
