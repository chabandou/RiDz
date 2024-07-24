"use client";
import { arefRuqaa } from "@/app/(client)/fonts";
import clsx from "clsx";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import imageUrlBuilder from "@sanity/image-url";

import { useEffect, useRef, useState } from "react";
import { tagThings } from "@/constants";
import { ArrowLeft, Circle, MoveLeft } from "lucide-react";
import ReadingTime from "./ReadingTime";

export default function NewHero({ featuredPosts, projectId, dataset }) {
  const urlFor = (source) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
  return (
    <section>
      <div className="carousel2 relative w-[100vw] h-[100vh] overflow-hidden -mt-[80px]">
        <div className="list2 ">
          {featuredPosts.map((post, index) => {
            const postTags = post.tags.map((tag) => tag);
            const articleImageUrl = post.mainImage
              ? urlFor(post.mainImage)?.width(2560).height(1440).url()
              : null;
            return (
              <div
                key={index}
                className="item2 absolute top-0 left-0 bottom-0 right-0 z-10"
              >
                <Image
                  src={articleImageUrl || "/car_3tww.png"}
                  width={1920}
                  height={1080}
                  alt="car"
                  className="w-[100%] h-[100%] object-cover z-0"
                />
                <div className="content2 absolute top-[20%]  w-[1440px] max-w-[80%] left-[50%] -translate-x-[45%] pl-[30%] box-border text-white">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {postTags.slice(0, 4).map(
                        (tag) =>
                          tagThings[tag] && (
                            <div
                              key={tag}
                              className={clsx(
                                tagThings[tag]
                                  ? `tagBg-${tagThings[tag].color}`
                                  : "",
                                `bg-slate-500 bg-opacity-65 border border-white border-opacity-45 text-white text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2`
                              )}
                            >
                              <span>
                                {tagThings[tag]
                                  ? tagThings[tag].translation
                                  : tag}
                              </span>

                              {tagThings[tag]?.icon}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                  <h1
                    className={clsx(
                      arefRuqaa.className,
                      "text-[7em] leading-[1.2em] font-bold"
                    )}
                  >
                    {post.name}
                  </h1>
                  <p className=" text-[1.5em] font-normal mb-3">
                    {post.description}
                  </p>
                  <div className="">
                    <Link
                      href={`/news/article/${post.slug.current}`}
                      className={cn(
                        buttonVariants("outline"),
                        "group rounded-full  bg-transparent border-2 border-primary hover:text-primary hover:bg-transparent"
                      )}
                    >
                      {" "}
                      إقرأ المقال{" "}
                      <ArrowUpLeft
                        size={25}
                        strokeWidth={1.5}
                        className="group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out"
                      />
                    </Link>
                  </div>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
        <div className="thumbnail2 absolute bottom-[50px] right-[40%] w-max z-50 flex gap-5">
          {featuredPosts.map((post, i) => {
            const articleImageUrl = post.mainImage
              ? urlFor(post.mainImage)?.width(2560).height(1440).url()
              : null;
            return (
              <div
                key={i}
                className="item2 w-[200px] h-[220px] relative flex-shrink-0"
              >
                <Image
                  src={articleImageUrl || ""}
                  width={1280}
                  height={720}
                  alt="car"
                  className="w-[100%] h-[100%] object-cover rounded-lg"
                />
                <div className="content2 absolute bottom-[10px] right-[10px] left-[10px] text-white">
                  <h1 className="text-[1.2em] font-bold"> {post.name} </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
