"use client";

import { useState } from "react";
import BlogHealineCard from "./BlogHealineCard";
import { Button } from "./ui/button";
import clsx from "clsx";
import BlurFade from "./magicui/blur-fade";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";

export default function AllNewsHeadlines({ posts, title, numberOfPosts }) {
  const [offset, setOffset] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const numberOfPages = Math.ceil(numberOfPosts / 10);
  const { replace } = useRouter();

  function handleClick(url) {
    replace(`${url}`);
  }

  const allPages = generatePagination();

  return (
    <div className="col-span-2 h-fit flex flex-col items-start justify-center gap-8">
      <div className="flex items-center justify-start w-full border-r-8 border-primary pr-3">
        <h2 className="text-3xl font-bold text-right leading-[2.5rem]">
          {title}
        </h2>
      </div>
      <div className="w-full space-y-6 md:space-y-10 h-full">
        {posts.map((post, index) => {
          return (
            <BlogHealineCard
              key={index}
              post={post}
              index={index}
              className={"md:h-[200px]"}
            />
          );
        })}
      </div>
      <div className="w-full flex items-center justify-center gap-3 mt-12 mb-7">
        <Button
          className="rounded-lg"
          
          onClick={() => handleClick(createPageURL(currentPage - 1))}
          isDisabled={currentPage <= 1}
        >
          الصفحة السابقة
        </Button>
        {Array.from({ length: numberOfPages }, (_, i) => (
          <Button
            key={i}
            className={clsx("rounded-lg ", {
              "bg-white text-green-700 border-2 border-green-700 hover:text-white":
                currentPage === i + 1,
            })}
            onClick={() => handleClick(createPageURL(i + 1))}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          className="rounded-lg"
          onClick={() => handleClick(createPageURL(currentPage + 1))}
          isDisabled={currentPage >= numberOfPages}
        >
          الصفحة التالية
        </Button>
      </div>
    </div>
  );
}
