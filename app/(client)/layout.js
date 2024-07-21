import { Inter } from "next/font/google";
import { notoKufiArabic } from "@/app/(client)/fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={notoKufiArabic.className}>
        <Navbar />
        {children}
        <CTA />
        <Footer />
      </body>
    </html>
  );
}
