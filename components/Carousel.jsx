"use client";

import { useEffect } from "react";
import { tagThings } from "@/constants";
import clsx from "clsx";
import Link from "next/link";
import { ArrowLeft, MoveLeft } from "lucide-react";

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

    // setInterval(changeRadio, 3000);
  }, []);

  return (
    <div className="carousel-container shadow-2xl">
      <div className="tabs max-h-full">
        {featuredPosts.map((post, index) => (
          <input key={post.id} id={post.id} type="radio" name="slider" />
        ))}
        <div className="buttons">
          {featuredPosts.map((post) => (
            <label key={post.id} htmlFor={post.id}></label>
          ))}
        </div>
        <div className="content">
          {featuredPosts.map((post) => {
            const postLang = post.properties.Language.select.name;
            const postTags = post.properties.Tags.multi_select.map(
              (tag) => tag.name
            );
            return (
              <div
                key={post.id}
                className={`box ${post.id} bg-cover bg-center flex items-center justify-end`}
                style={{ backgroundImage: `url(${post.cover?.external.url})` }}
              >
                <div className="overlay"></div>
                <div
                  dir={postLang === "Arabic" ? "rtl" : "ltr"}
                  className=" text-white w-[40%] rounded-lg p-6 flex flex-col justify-center items-start gap-6 text-right mb-12 z-10"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {postTags.map((tag) => (
                        tagThings[tag] && console.log(`bg-${tagThings[tag].color}`),
                        <div
                          key={tag}
                          className={clsx(tagThings[tag] ? `tagBg-${tagThings[tag].color}` : "",`bg-slate-500 bg-opacity-65 border border-white border-opacity-45 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2`)}
                        >
                          <span className="{tag}">{tag}</span>
                          
                            {tagThings[tag]?.icon}
                        </div>
                      ))}
                    </div>
                  </div>
                  <h1 className="text-8xl font-bold capitalize tracking-wider opacity-90">
                    {post.properties.Title.title[0].plain_text}
                  </h1>
                  <p className="text-2xl line-clamp-2 opacity-80">
                    {post.properties.Description.rich_text[0].plain_text}
                  </p>
                  <Link
                    href={`/news/${post.properties.slug.rich_text[0].plain_text}`}
                    className="flex gap-3 items-center justify-center group"
                  >
                    <ArrowLeft className="bg-slate-500 bg-opacity-60 opacity-80 rounded-full p-3 group-hover:bg-green-600 group-hover:opacity-100 transition duration-300 ease-in group-hover:-translate-x-1" size={64} strokeWidth={1.5} />
                    <span className="text-2xl opacity-90 group-hover:-translate-x-1 transition duration-300 ease-in group-hover:opacity-100" >إقرأ المقال</span>
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
