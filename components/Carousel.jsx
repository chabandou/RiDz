"use client";

import { useEffect, useRef, useState } from "react";
import { tagThings } from "@/constants";
import clsx from "clsx";
import Link from "next/link";
import { ArrowLeft, MoveLeft } from "lucide-react";
import { arefRuqaa } from "@/app/fonts";

export default function Carousel({ featuredPosts }) {
  useEffect(() => {
    let radios = document.querySelectorAll('input[name="slider"]');
    let currentIndex = 0;

    function changeRadio() {
      // Uncheck all radios
      radios.forEach((radio) => (radio.checked = false));

      // Check the next radio
      radios[currentIndex].checked = true;

      // Move to the next index, wrapping around if necessary
      currentIndex = (currentIndex + 1) % radios.length;
    }

    // Change radio every 2 seconds (2000 milliseconds)

    // setInterval(changeRadio, 3500);
  }, []);

  const [selected, setSelected] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const threshold = 50; // Minimum swipe distance

  const options = [
    { id: "option1", label: "Option 1", value: "0" },
    { id: "option2", label: "Option 2", value: "1" },
    { id: "option3", label: "Option 3", value: "2" },
    { id: "option3", label: "Option 3", value: "3" },
  ];

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
    if (index >= 0 && index < options.length) {
      setSelected(index);
    }
  };

  return (
    <div className="carousel-container shadow-2xl" dir="rtl">
      <div className="tabs max-h-full ">
        {featuredPosts.map((post, index) => (
          <input
            key={post.id}
            id={post.id}
            type="radio"
            name="slider"
            checked={selected === index}
            onChange={() => setSelected(index)}
          />
        ))}
        <div className="buttons" dir="rtl">
          {featuredPosts.map((post, index) => (
            <label key={post.id} htmlFor={post.id}>
              <div className="circle relative lg:flex-[1.3] w-[55px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 160 160"
                  className="w-full "
                >
                  <circle cx="80" cy="80" r="70" strokeLinecap="round" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 160 160"
                  className="w-full absolute top-0 left-0"
                >
                  <circle
                    className="circle-2"
                    cx="80"
                    cy="80"
                    r="70"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold text-white opacity-90 text-xl">
                  {index + 1}
                </span>
              </div>
              <div className="hidden lg:flex lg:flex-[4]">
                <span className=" font-semibold text-white opacity-85 text-lg line-clamp-2 ">
                  {post.properties.Title.title[0].plain_text}
                </span>
              </div>
            </label>
          ))}
        </div>
        <div className="content">
          {featuredPosts.map((post, index) => {
            const postLang = post.properties.Language.select.name;
            const postTags = post.properties.Tags.multi_select.map(
              (tag) => tag.name
            );
            return (
              <div
                key={post.id}
                className={`box ${post.id} bg-cover bg-no-repeat bg-top flex items-end justify-start max-h-[70vh] translate-y-[0vh] lg:max-h-[115vh] lg:translate-y-[0vh]`}
                style={{ backgroundImage: `url(${post.cover?.external.url})` }}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, index)}
              >
                <div className="overlay"></div>
                <div
                  dir={postLang === "Arabic" ? "rtl" : "ltr"}
                  className=" text-white w-full lg:w-[50%] rounded-lg p-6 flex flex-col justify-center items-start gap-2 lg:gap-6 text-right lg:mb-[9.3rem] z-10 translate-y-[19vh] lg:translate-y-0"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {postTags.map(
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
                                {postLang === "Arabic"
                                  ? tagThings[tag]
                                    ? tagThings[tag].translation
                                    : tag
                                  : tag}
                              </span>

                              {tagThings[tag]?.icon}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  <h1
                    className={clsx(
                      " text-[3rem] lg:text-[6rem] font-bold capitalize tracking-normal opacity-90 lg:translate-y-[0] ",
                      arefRuqaa.className
                    )}
                  >
                    {post.properties.Title.title[0].plain_text}
                  </h1>
                  <div className="hidden lg:block">
                    <p className=" text-xl line-clamp-2 opacity-80 ">
                      {post.properties.Description.rich_text[0].plain_text}
                    </p>
                  </div>
                  <Link
                    href={`/news/${post.properties.slug.rich_text[0].plain_text}`}
                    className="flex gap-3 items-center justify-center group m-2 lg:mt-0"
                  >
                    <div className="w-[3.5rem] h-[3.5rem] bg-slate-500 bg-opacity-60 opacity-80 rounded-full p-3 group-hover:bg-green-600 group-hover:opacity-100 transition duration-300 ease-in flex items-center justify-center">
                      <ArrowLeft
                        className="transition duration-300 ease-in group-hover:-translate-x-1"
                        size={45}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="lg:text-2xl text-xl opacity-90 transition duration-300 ease-in group-hover:opacity-100">
                      إقرأ المقال
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
