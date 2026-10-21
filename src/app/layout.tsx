import type { Metadata } from "next";
import { Source_Sans_3, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import { ANALYTICS_ENABLED, GA_ID } from "@/lib/gtag";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sankalp Naik",
  description: "Sankalp Naik — Carnegie Mellon University. Research in heterogeneous memory, hardware–software co-design, and compiler-guided optimization for machine learning.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {ANALYTICS_ENABLED && (
          <>
            <Script id="ga-init" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false
                });
              `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}
