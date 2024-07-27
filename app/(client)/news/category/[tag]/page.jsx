
import { arefRuqaa } from "@/app/(client)/fonts";
import clsx from "clsx";
import Image from "next/image";

import { sanityFetch } from "@/app/sanity/client";
import CategoryTabs from "@/components/CategoryTabs";
import TrendingHeadlines from "@/components/TrendingHeadlines";
import { tagThings } from "@/constants";

export default async function Category({ params, searchParams }) {
  const title = tagThings[params.tag]?.translation;

  const page = Number(searchParams.page) || 1;
  const type = searchParams.type || "news";
  const QUERY = `*[_type == "article" && "${params.tag}" in tags && "${type}" in tags][${(page - 1) * 5}...${(page * 5)}]{_id, name, description, mainImage, slug, tags, publishedAt, readingTime}`;
  const posts = await sanityFetch({ query: QUERY });
  const countQuery = `*[_type == "article" && "${params.tag}" in tags && "${type}" in tags]{_id, name, description, mainImage, slug, tags, publishedAt, readingTime}`;
  const numberOfPosts = await sanityFetch({ query: `count(${countQuery})` });
 


  return (
    <main className="flex flex-col gap-10 max-w-[1920px] h-fit " dir="rtl">
      <div className="w-full md:h-[60vh] lg:h-[70vh] relative ">
        <div className="w-full h-full absolute bg-black bg-opacity-20"></div>
        <Image
          className="w-full h-full object-cover object-center "
          src={tagThings[params.tag]?.img}
          width={1920}
          height={1080}
          alt="car"
        />
        <h1
          className={clsx(
            " text-7xl lg:text-[11rem] font-bold text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[1px_1px_0px_rgba(0,0,0)]",
            arefRuqaa.className
          )}
        >
          {title}
        </h1>
      </div>
      <section className="Latest-section relative w-full grid grid-cols-1 lg:grid-cols-3 mx-auto sm:px-16 px-6  mb-4">
        <CategoryTabs params={params} posts={posts} numberOfPosts={numberOfPosts} />
          <TrendingHeadlines />
      </section>
    </main>
  );
}
