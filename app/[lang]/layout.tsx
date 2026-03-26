import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/home/Navbar";
import { getDictionary } from "@/get-dictionary";
import Footer from "@/components/home/Footer";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "KiddyCare | Modern Daycare",
  description: "Advanced, safe, and fun educational environment for your children.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // <-- Next.js 15+ expects params as a Promise
}) {
  // Await the params before using them
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${fredoka.variable} font-sans antialiased bg-white`}>
        <Navbar dict={dict} lang={lang} />
        {children}
        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  );
}