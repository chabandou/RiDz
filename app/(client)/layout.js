import { Inter } from "next/font/google";
import { notoKufiArabic } from "@/app/(client)/fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import MobileTabMenu from "@/components/MobileTabMenu";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RiDz",
  description: "دليلك لسوق السيارات بالجزائر",
  icons: {
    icon: "/logo.ico",
  },
  openGraph: {
    title: "RiDz",
    description: "دليلك لسوق السيارات بالجزائر",
  },
  twitter: {
    title: "RiDz",
    description: "دليلك لسوق السيارات بالجزائر",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={clsx(notoKufiArabic.className, "relative")}>
        <Navbar />
        <MobileTabMenu />
        {children}
        <CTA />
        <Footer />
      </body>
    </html>
  );
}
