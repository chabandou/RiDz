"use client";

import { footerLinks, whatsappIcon } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardCheck, LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SocialMediaShare({ title }) {
  const [isCopied, setIsCopied] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const pathname = usePathname();
  const currentUrl = `https://ridz.vercel.app${pathname}`;

  const shareLinks = {
    Facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=https://ridz.vercel.app${encodeURIComponent(pathname)}&title=${title}`,
    },
    Yourube: {
      url: `https://www.yourube.com/share/article?url=https://ridz.vercel.app${encodeURIComponent(pathname)}`,
    },
    Twitter: {
      url: `https://twitter.com/share?url=https://ridz.vercel.app${pathname}&text=${title}`,
    },
    Instagram: {
      url: `https://www.instagram.com/share/url?url=https://ridz.vercel.app${encodeURIComponent(pathname)}&text=Check%20this%20out!`,
    },
    WhatsApp: {
      url: `whatsapp://send?text=https://ridz.vercel.app${pathname}&text=${title}`,
    },
  };

  return (
    <>
      {footerLinks[1].links.map((link, index) => {
        if (shareLinks[link.title] && link.title !== "Instagram") {
          return (
            <Link
              key={index}
              href={shareLinks[link.title]?.url}
              className="text-lg hover:text-green-600 transition-all duration-300"
              passHref
              target="_blank"
            >
              {link.icon}
            </Link>
          );
        }
      })}
      <Link
        href={shareLinks.WhatsApp?.url}
        className="text-lg hover:text-green-600 transition-all duration-300"
        passHref
        target="_blank"
      >
        {whatsappIcon}
      </Link>
      <a
        className="cursor-pointer "
        data-clipboard=""
        data-clipboard-target="#url-for-sharing"
        aria-label=""
        onClick={() =>
          navigator.clipboard.writeText(
            `${title} - ${currentUrl}`,
            setIsCopied(true)
          )
        }
      >
        {isCopied && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isCopied ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  setIsCopied(false);
                  setFirstTime(false);
                }, 5000);
              }}
            >
              <ClipboardCheck stroke="#16a34a" className="w-6 h-6 " />
            </motion.div>
          </AnimatePresence>
        )}
        {!isCopied && (
          <AnimatePresence>
            <motion.div
              initial={firstTime ? { opacity: 1 } : { opacity: 0 }}
              animate={isCopied ? { opacity: 0 } : { opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LinkIcon className="w-6 h-6 hover:text-green-600" />
            </motion.div>
          </AnimatePresence>
        )}
      </a>
    </>
  );
}
