"use client";

import imageUrlBuilder from "@sanity/image-url";

import { arefRuqaa } from "@/app/(client)/fonts";
import { tagThings } from "@/constants";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowLeft, Circle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BlurFade from "./magicui/blur-fade";
import ReadingTime from "./ReadingTime";
import Tag from "./Tag";

export default function Hero({ featuredPosts, projectId, dataset }) {
  const urlFor = (source) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const [selected, setSelected] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const threshold = 50; // Minimum swipe distance

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e, index) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe(index);
  };

  const handleSwipe = (index) => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    if (Math.abs(swipeDistance) > threshold) {
      if (swipeDistance > 0) {
        // Swipe right
        checkRadio(index + 1);
      } else {
        // Swipe left
        checkRadio(index - 1);
      }
    }
  };

  const checkRadio = (index) => {
    if (index >= 0 && index < featuredPosts.length) {
      setSelected(index);
    }
  };

  // useEffect(() => {
  //   const autoPlay = () => {
  //     if (selected === featuredPosts.length - 1) {
  //       prevSelected.current = selected;
  //       setSelected(0);
  //     } else {
  //       prevSelected.current = selected;
  //       setSelected(selected + 1);
  //     }
  //   };
  //   const interval = setInterval(autoPlay, 5500);
  //   return () => clearInterval(interval);
  // }, [featuredPosts.length, selected]);

  function anim(variants, index) {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  }

  const prevSelected = useRef();

  return (
    <div
      className="carousel-container relative w-full h-[85vh] xl:h-[120vh] bg-black overflow-hidden shadow-2xl -mt-[80px] "
      dir="rtl"
    >
      <div className="tabs relative w-full h-full ">
        {featuredPosts.map((post, index) => (
          <input
            key={post._id}
            id={post._id}
            type="radio"
            name="slider"
            checked={selected === index}
            onChange={() => {
              prevSelected.current = selected;
              setSelected(index);
            }}
          />
        ))}
        <div
          className="buttons absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[120px] xl:h-[140px] xl:mt-16 flex items-center justify-center bg-[hsl(0,_0%,_8%)] z-50"
          dir="rtl"
        >
          {featuredPosts.map((post, index) => {
            return (
              <label
                key={post._id}
                htmlFor={post._id}
                className="overflow-hidden h-full xl:gap-2 xl:p-4"
              >
                {selected === index && (
                  <div className="progress-bar absolute top-0 left-0 w-full h-[7px] bg-green-500 animate-progressBar"></div>
                )}
                {selected > index && (
                  <div className="progress-bar absolute top-0 left-0 w-full h-[7px] bg-green-500 "></div>
                )}
                <div className="relative w-1/4 flex justify-center items-center">
                  <span className="button-text absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-extralight text-white opacity-90 text-5xl">
                    0{index + 1}
                  </span>
                </div>
                <div className="hidden xl:flex">
                  <span className="button-text font-semibold text-white text-lg line-clamp-2 ">
                    {post.name}
                  </span>
                </div>
                {index < featuredPosts.length - 1 && (
                  <div className="flex items-center justify-center">
                    <div className="w-[2px] h-[65%] bg-white/15 absolute top-[50%] left-0 -translate-y-1/2 z-10" />
                  </div>
                )}
              </label>
            );
          })}
        </div>
        <div
          key={selected}
          className="content relative w-[100vw] h-[calc(85vh-120px)] xl:h-full flex transition-all overflow-hidden"
        >
          {featuredPosts.map((post, index) => {
            const postTags = post.tags.filter( (tag) => tag !== "selection" && tag !== "news" && tag !== "essay");
            const articleImageUrl = post.mainImage
              ? urlFor(post.mainImage)?.width(2560).height(1440).url()
              : null;
            return (
              <div
                key={post.id}
                className={clsx(
                  `box absolute top-0 left-0 right-0 bottom-0 h-full select-none xl:p-10 bg-cover bg-no-repeat bg-center flex items-end justify-start translate-y-[0vh] xl:max-h-[115vh] xl:translate-y-[0vh] transition-all duration-600 ease-in-out`,
                  {
                    "z-10": selected === index,
                    "z-[9]": prevSelected.current === index,
                    "animate-showContentRight":
                      selected === index && selected <= prevSelected.current,
                    "animate-showContentLeft":
                      selected === index && selected > prevSelected.current,
                  }
                )}
                style={{ backgroundImage: `url(${articleImageUrl})` }}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, index)}
              >
                <div className="overlay"></div>
                <div
                  className={clsx(
                    "inner-text fade-in-blur  text-white w-full xl:w-[50%] rounded-lg p-6 flex flex-col justify-items-start items-start text-right xl:mb-[5.3rem] z-10  xl:translate-y-0",
                    {
                      "opacity-100": prevSelected.current === index,
                      "opacity-0": prevSelected.current !== index,
                    }
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {postTags.slice(0, 3).map((tag) =>
                       { if (tag === "featured") {
                         return (
                          tagThings[tag] && (
                            <Tag
                              key={tag}
                              tag={
                                tagThings[tag]
                                  ? tagThings[tag].translation
                                  : tag
                              }
                              icon={tagThings[tag]?.icon}
                              className={clsx(
                                `bg-slate-500/65 border border-white/45 text-white`,
                                tagThings[tag]?.color &&
                                  `tagBg-${tagThings[tag]?.color}`
                              )}
                            />
                          )
                        )
                       } else {
                        return (
                          <Link key={tag} href={`/news/category/${tag}`}>
                            <Tag
                              key={tag}
                              tag={
                                tagThings[tag]
                                  ? tagThings[tag].translation
                                  : tag
                              }
                              icon={tagThings[tag]?.icon}
                              className={clsx(
                                `bg-slate-500/55 border border-white/45 text-white`,
                                tagThings[tag]?.color &&
                                  `tagBg-${tagThings[tag]?.color}`
                              )}
                            />
                          </Link>
                        )
                       } }
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-items-start items-start gap-2 xl:gap-6">
                    <Link
                      href={`/news/article/${post.slug.current}`}
                      className=""
                    >
                      <h1
                        className={clsx(
                          " text-[3rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6rem] leading-[1.3] font-bold capitalize tracking-normal opacity-90 xl:translate-y-[0] ",
                          arefRuqaa.className
                        )}
                      >
                        {post.name}
                      </h1>
                    </Link>
                    <div className="hidden xl:block">
                      <p className=" text-xl line-clamp-2 opacity-80 ">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center justify-center mt-2 xl:mt-0">
                      <Link
                        href={`/news/article/${post.slug.current}`}
                        className="flex gap-3 items-center justify-center group "
                      >
                        <div className="w-[3.5rem] h-[3.5rem] bg-slate-500 bg-opacity-60 opacity-80 rounded-full p-3 group-hover:bg-green-600 group-hover:opacity-100 transition duration-300 ease-in flex items-center justify-center">
                          <ArrowLeft
                            className="transition duration-300 ease-in group-hover:-translate-x-1"
                            size={45}
                            strokeWidth={1.5}
                          />
                        </div>
                        <span className="xl:text-xl text-xl opacity-90 transition duration-300 ease-in group-hover:opacity-100">
                          إقرأ المقال
                        </span>
                      </Link>
                      <Circle
                        size={15}
                        className="text-xl opacity-60"
                        fill="white"
                        strokeWidth={0}
                      />
                      <ReadingTime
                        readingTime={post.readingTime}
                        className="text-lg text-muted"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
