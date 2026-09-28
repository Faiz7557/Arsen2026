import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GiatProvider } from "@/context/giat-context";
import { ToastContainer } from "@/components/ui/toast";
import { JudgeTourFloating } from "@/components/common/judge-tour-floating";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GIAT • Awakening The Sleeping Giant | ASICM036 - Arsen 2026",
  description:
    "Bagaimana GIAT Mengubah Volatilitas Informalitas UMKM Menjadi Kepastian Data. Solusi kredit alternatif berbasis digital footprint kasir QRIS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fbff] dark:bg-[#05142b] text-[#082046] dark:text-[#f0f7ff] selection:bg-amber-400/30 selection:text-[#082046]">
        <GiatProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <JudgeTourFloating />
          <ToastContainer />
        </GiatProvider>
      </body>
    </html>
  );
}
