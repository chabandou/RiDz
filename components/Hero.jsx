"use client";

import imageUrlBuilder from "@sanity/image-url";

import { useCallback, useEffect, useRef, useState } from "react";
import { tagThings } from "@/constants";
import clsx from "clsx";
import Link from "next/link";
import { ArrowLeft, Circle, MoveLeft } from "lucide-react";
import { arefRuqaa } from "@/app/(client)/fonts";
import ReadingTime from "./ReadingTime";
import { motion } from "framer-motion";
import { set } from "mongoose";

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

  useEffect(() => {
    const autoPlay = () => {
      if (selected === featuredPosts.length - 1) {
        prevSelected.current = selected;
        setSelected(0);
      } else {
        prevSelected.current = selected;
        setSelected(selected + 1);
      }
    };
    const interval = setInterval(autoPlay, 5000);
    return () => clearInterval(interval);
  }, [featuredPosts.length, selected]);

  function anim(variants, index) {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  }

  const prevSelected = useRef();
  console.log(prevSelected.current);

  return (
    <div className="carousel-container shadow-2xl" dir="rtl">
      <div className="tabs max-h-full ">
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
        <div className="buttons h-[120px] lg:h-[140px]  " dir="rtl">
          {featuredPosts.map((post, index) => {
            const progressAnim = {
              initial: {
                x: 380,
              },
              enter: {
                x: selected === index && 0,
                transition: {
                  duration: 5,
                  ease: "linear",
                },
              },
            };
            return (
              <label
                key={post._id}
                htmlFor={post._id}
                className="overflow-hidden h-full lg:gap-2 lg:p-4"
              >
                {selected === index && (
                  <motion.div
                    {...anim(progressAnim, index)}
                    className="progress-bar absolute top-0 left-0 w-full h-[7px] bg-green-500 "
                  ></motion.div>
                )}
                {selected > index && (
                  <div className="progress-bar absolute top-0 left-0 w-full h-[7px] bg-green-500 "></div>
                )}
                <div className="relative w-1/4 flex justify-center items-center">
                  <span className="button-text absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-extralight text-white opacity-90 text-5xl">
                    0{index + 1}
                  </span>
                </div>
                <div className="hidden lg:flex">
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
          className="content relative w-[100vw] h-[100vh] overflow-hidden"
        >
          {featuredPosts.map((post, index) => {
            const postTags = post.tags.map((tag) => tag);
            const articleImageUrl = post.mainImage
              ? urlFor(post.mainImage)?.width(2560).height(1440).url()
              : null;
            return (
              <div
                key={post.id}
                className={clsx(`box ${post.id}  bg-cover bg-no-repeat bg-center flex items-end justify-start max-h-[70vh] translate-y-[0vh] lg:max-h-[115vh] lg:translate-y-[0vh]`, { 
                  "z-10": selected === index,
                  "z-[9]": prevSelected.current === index,
                  "animate-showContentRight": selected === index && (selected <= prevSelected.current),
                  "animate-showContentLeft": selected === index && (selected > prevSelected.current) ,
                })}
                style={{ backgroundImage: `url(${articleImageUrl})` }}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, index)}
              >
                <div className="overlay"></div>
                <div className="inner-text text-white w-full lg:w-[50%] rounded-lg p-6 flex flex-col justify-center items-start gap-2 lg:gap-6 text-right lg:mb-[9.3rem] z-10 translate-y-[19vh] lg:translate-y-0">
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
                              <span className="{tag}">
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
                  <Link
                    href={`/news/article/${post.slug.current}`}
                    className=""
                  >
                    <h1
                      className={clsx(
                        " text-[3rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6rem] font-bold capitalize tracking-normal opacity-90 lg:translate-y-[0] ",
                        arefRuqaa.className
                      )}
                    >
                      {post.name}
                    </h1>
                  </Link>
                  <div className="hidden lg:block">
                    <p className=" text-xl line-clamp-2 opacity-80 ">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center justify-center m-2 lg:mt-0">
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
                      <span className="lg:text-xl text-xl opacity-90 transition duration-300 ease-in group-hover:opacity-100">
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
