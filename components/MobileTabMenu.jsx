"use client";

import { navigationItems } from "@/constants";
import clsx from "clsx";
import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";


export default function MobileTabMenu() {
    const pathname = usePathname();
    const activeCondition = (item) => {
        return item.url === "/" ? pathname === item.url : pathname.indexOf(item.url) !== -1;
    }

  return (
    <div className="navigation fixed bottom-0 w-[100vw] h-[70px]  flex items-center  justify-center  z-50 bg-[hsla(0,0%,93%,0.7)] backdrop-blur-md md:hidden">
      <ul className="w-[85%] flex items-center justify-between">
        {navigationItems.map((item, index) => {
            return (
            <li key={item.title} className="list group relative w-[70px] h-[70px] list-none z-1">
                <Link href={item.url} className="relative w-full flex flex-col items-center justify-center text-center font-medium text-green-700">
                <span className={clsx("list relative h-[75px] leading-[75px] duration-500 flex items-center  z-10", {
                    "translate-y-[-35px] text-white": activeCondition(item),
                })}>{item.icon}</span>
                <span className={clsx("absolute text-green-700/95 font-medium text-[1em] tracking-wide opacity-0 translate-y-5  duration-500", {
                    "opacity-100 translate-y-[10px]": activeCondition(item),
                })}>{item.title}</span>
                </Link>
                {activeCondition(item) ? <motion.div className="indicator absolute bottom-1/2 left-0 right-0 h-[70px] rounded-full bg-green-700 drop-shadow-md" layoutId="indicator" /> : null}
              </li>
            );
        })}
      </ul>
    </div>
  );
}
