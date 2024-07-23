"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Car } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full block top-0 left-0 z-10 ">
      <nav className="max-w-[1920px] mx-auto flex justify-between items-center sm:px-16 px-6 py-5">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="RiDz logo"
            width={145}
            height={45}
            className="object-contain hidden"
          />
          <Car width={40} height={40} fill="green" color="green" />
          <span className="text-3xl font-extrabold ml-2 text-green-700">
            RiDz
          </span>
        </Link>
        <div className="hidden md:flex gap-8 items-center justify-center font-semibold">
          <Link href="/"> السيارات </Link>
          <Link
            className={clsx(
              "transition-all hover:text-primary",
              pathname === "/news" && "text-primary underline decoration-4 underline-offset-[12px] decoration-primary"
            )}
            href="/news"
          >
            {" "}
            الأخبار{" "}
          </Link>
          <Link href="/about"> عن موقعنا </Link>
          <div className="flex gap-2">
            <Button variant="default" className="rounded-full">
              {" "}
              إنضم{" "}
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-2 border-primary text-primary hover:text-primary"
            >
              {" "}
              تسجيل الدخول{" "}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
