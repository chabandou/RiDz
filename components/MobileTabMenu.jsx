"use client";

import { navigationItems } from "@/constants";
import clsx from "clsx";
import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function MobileTabMenu() {
  const pathname = usePathname();
  const activeCondition = (item) => {
    return item.url === "/"
      ? pathname === item.url
      : pathname.indexOf(item.url) !== -1;
  };

  const startingLeftPosition =
    pathname === "/" ? 29 : pathname.indexOf("/news") !== -1 ? 117 : 29;
  const [position, setPosition] = useState({
    left: startingLeftPosition,
    opacity: 0,
  });

  return (
    <div className="navigation fixed bottom-0 w-[100vw] h-[70px]  flex items-center  justify-center  z-50 bg-[hsla(0,0%,93%,0.7)] backdrop-blur-md md:hidden">
      <ul className="w-[85%] flex items-center justify-between">
        {navigationItems.map((item, index) => {
          return (
            <Tab
              key={index}
              item={item}
              setPosition={setPosition}
              activeCondition={activeCondition}
              position={position}
            />
          );
        })}

        <Indicator position={position} activeCondition={activeCondition} />
      </ul>
    </div>
  );
}

function Indicator({ position, activeCondition }) {
  return (
    <motion.div
      animate={activeCondition ? position : null}
      className="absolute z-0 bottom-1/2 w-[70px] opacity-0 h-[70px] rounded-full bg-green-700 drop-shadow-md"
    />
  );
}

function Tab({ item, setPosition, activeCondition, position }) {
  const ref = useRef(null);

  const isActive = activeCondition(item);
  return (
    <li
      ref={ref}
      onClick={() => setPosition({ left: ref.current.offsetLeft, opacity: 1 })}
      key={item.title}
      className="list group relative w-[70px] h-[70px] list-none z-10"
    >
      <Link
        href={item.url}
        className="relative w-full flex flex-col items-center justify-center text-center font-medium text-green-700"
      >
        <span
          className={clsx(
            "list relative h-[75px] leading-[75px] duration-500 flex items-center  z-10",
            {
              "translate-y-[-35px] text-white": position.left === ref.current?.offsetLeft,
            }
          )}
        >
          {item.icon}
        </span>
        <span
          className={clsx(
            "absolute text-green-700/95 font-medium text-[1em] tracking-wide opacity-0 translate-y-5  duration-500",
            {
              "opacity-100 translate-y-[10px]": position.left === ref.current?.offsetLeft,
            }
          )}
        >
          {item.title}
        </span>
      </Link>
    </li>
  );
}
