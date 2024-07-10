"use client";

import { useState } from "react";
import BlogHealineCard from "./BlogHealineCard";
import { Button } from "./ui/button";
import clsx from "clsx";

export default function AllNewsHeadlines({ posts }) {
  const [offset, setOffset] = useState(0);
  return (
    <div className="col-span-2 flex flex-col items-start justify-center gap-8">
      <div className="flex  items-center justify-start w-full border-r-8 border-primary pr-3">
        <h2 className="text-3xl font-bold text-right leading-[2.5rem]">
          كل الأخبار
        </h2>
      </div>
      <div className="w-full space-y-10 max-h-[332vh] min-h-[85vh]">
        {posts?.slice(offset, offset + 10).map((post, index) => {
          return <BlogHealineCard key={index} post={post} className={"h-[8.3%] min-h-[200px]"}  />;
        })}
      </div>
      <div className="w-full flex items-center justify-center gap-3 mt-12 mb-7">
        <Button
          className="rounded-lg"
          onClick={() => {
            if (offset > 0) setOffset(offset - 10);
          }}
        >
          الصفحة السابقة
        </Button>
        {Array.from({ length: Math.ceil(posts.length / 10) }, (_, i) => (
          <Button
            key={i}
            className={clsx("rounded-lg ", {
              "bg-white text-green-700 border-2 border-green-700 hover:text-white": offset === i * 10,
            })}
            onClick={() => setOffset(i * 10)}
          >
            {i + 1}
          </Button>
        ))}
        <Button className="rounded-lg" onClick={() => setOffset(offset + 10)}>
          الصفحة التالية 
        </Button>
      </div>
    </div>
  );
}
