"use client";

import { useEffect } from "react";

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
    <div className="carousel-container rounded-lg shadow-2xl">
      <div className="tabs max-h-full">
        {featuredPosts.map((post, index) => (
          <input
            key={post.id}
            id={post.id}
            type="radio"
            name="slider"
          />
        ))}
        <div className="buttons">
          {featuredPosts.map((post) => (
            <label key={post.id} htmlFor={post.id}></label>
          ))}
        </div>
        <div className="content">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className={`box ${post.id} bg-cover bg-center flex items-end justify-end`}
              style={{ backgroundImage: `url(${post.cover?.external.url})` }}
            >
              <div className="bg-gray-800 bg-opacity-30 text-white w-full rounded-lg p-6  flex flex-col gap-4 text-right mb-12">
                <h1 className="text-5xl font-bold shadow-md">{post.properties.Title.title[0].plain_text}</h1>
                <p className="text-2xl">{post.properties.Description.rich_text[0].plain_text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
