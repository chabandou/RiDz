"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const [selectedLink, setSelectedLink] = useState(pathname);

  function NavLink({ href, title }) {
    const activeCondition = (href, checker) => {
      return href === "/" ? checker === href : checker.indexOf(href) !== -1;
    };
    return (
      <Link
        onMouseEnter={() => setSelectedLink(href)}
        onMouseLeave={() => setSelectedLink(pathname)}
        href={href}
        className={clsx(" group transition-all hover:text-green-500  px-6", {
          "text-primary ": activeCondition(href, pathname),
        })}
      >
        <span className="relative">
          {title}

          {activeCondition(href, selectedLink) ? (
            <motion.div
              className="underline absolute bottom-[-9px] left-0 right-0 h-[3px] bg-primary group-hover:bg-green-500 "
              layoutId="underline"
            />
          ) : null}
        </span>
      </Link>
    );
  }

  return (
    <header
      className={clsx("relative w-full block top-0 left-0 z-50", {
        "text-white": pathname === "/news",
      })}
    >
      <nav className="max-w-[1920px] text-base xl:text-lg mx-auto flex justify-center md:justify-between items-center sm:px-16 px-6 py-5 ">
        <Link href="/" className="flex justify-center items-center z-20">
          <Car
            width={40}
            height={40}
            fill="#16a34a"
            color="#16a34a"
            className={clsx({
              flex: pathname === "/news",
              hidden: pathname !== "/news",
            })}
          />
          <Car
            width={40}
            height={40}
            fill="#15803d"
            color="#15803d"
            className={clsx({
              flex: pathname !== "/news",
              hidden: pathname === "/news",
            })}
          />
          <span
            className={clsx("text-3xl font-extrabold ml-2", {
              "text-green-600 ": pathname === "/news",
              "text-green-700": pathname !== "/news",
            })}
          >
            RiDz
          </span>
        </Link>
        <div className="hidden md:flex items-center justify-center font-semibold z-10">
          <NavLink href="/" title="السيارات" />
          <NavLink href="/news" title="الأخبار" />
          <NavLink href="/about" title="عن موقعنا" />
          <div
            className={clsx(
              "flex border-l-2 border-white/40  transition-all duration-400 ",
              {
                "border-none pl-0 gap-2": pathname !== "/news",
                " pl-2 gap-0": pathname === "/news",
              }
            )}
          >
            <Button variant={pathname === "/news" ? "ghost" : "default"}>
              إنضم
            </Button>
            <Button
              variant={pathname === "/news" ? "ghost" : "outline"}
              className={pathname === "/news" && "text-white"}
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </nav>
      {pathname === "/news" && (
        <div className=" absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent opacity-50 z-0"></div>
      )}
    </header>
  );
}
