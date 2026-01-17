import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ef4444",
};

export const metadata: Metadata = {
  title: {
    default: "Tersedak Care - Panduan Penanganan Tersedak pada Anak",
    template: "%s | Tersedak Care",
  },
  description:
    "Aplikasi edukasi kesehatan untuk membantu orang tua mempelajari cara menangani anak tersedak dengan benar, cepat, dan aman. Berbasis evidence-based practice.",
  keywords: [
    "tersedak",
    "choking",
    "pertolongan pertama",
    "first aid",
    "anak tersedak",
    "bayi tersedak",
    "kesehatan anak",
    "edukasi kesehatan",
    "Heimlich maneuver",
    "CPR anak",
  ],
  authors: [{ name: "Tersedak Care Team" }],
  openGraph: {
    title: "Tersedak Care - Panduan Penanganan Tersedak pada Anak",
    description:
      "Aplikasi edukasi kesehatan untuk membantu orang tua mempelajari cara menangani anak tersedak dengan benar, cepat, dan aman.",
    type: "website",
    locale: "id_ID",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
