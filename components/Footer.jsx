import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";
import clsx from "clsx";
import { buttonVariants } from "./ui/button";

export default function Footer() {
  return (
    <footer className="flex flex-col text-white-100 border-t border-gray-600 bg-black bg-opacity-95">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image
            src="/logo.svg"
            alt="RiDz logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-base text-gray-100">
            RiDz 2024 <br />
            All Rights Reserved &copy;
          </p>
        </div>
        <div className="flex-1 w-full flex flex-row-reverse  md:items-start md:justify-end flex-wrap max-md:mt-10 gap-20" dir="rtl">
          {footerLinks.map((link, index) => (
            <div key={link.title} className="flex flex-col gap-6 text-base min-w-[170px] text-gray-100" dir="ltr" >
              <h3 className="font-bold">{link.title}</h3>
              {index === 2 && (
                link.links.map((item, index) => (
                    <span
                      key={index}
                      href={item.url}
                      className=" text-gray-200 flex gap-2 items-center justify-start"
                    >
                      {item.title} {item.url}
                    </span>
                  ))
              )}
              {index !== 2 && link.links.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="hover:text-gray-100 group hover:underline text-gray-200 flex gap-2 items-center justify-start"
                >
                  <span className={clsx(item.title === "Youtube" && "group-hover:text-red-500", item.title === "Twitter" && "group-hover:text-blue-500", item.title === "Instagram" && "group-hover:text-[#E4405F]", item.title === "Facebook" && "group-hover:text-[#0866FF]")}>{item.icon && item.icon}</span> {item.title} 
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-900 sm:px-16 px-6 py-10 text-gray-200 bg-black bg-opacity-95">
        <p>@2024 RiDz. All Rights Reserved</p>
        <div className="flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-10">
          <Link href="/" className="text-gray-200">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-200">
            Terms of use
          </Link>
        </div>
      </div>
    </footer>
  );
}
