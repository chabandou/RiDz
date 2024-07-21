import { arefRuqaa } from "@/app/(client)/fonts";
import clsx from "clsx";
import Image from "next/image";

import { sanityFetch } from "@/app/sanity/client";
import AllNewsHeadlines from "@/components/AllNewsHeadlines";
import TrendingHeadlines from "@/components/TrendingHeadlines";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tagThings } from "@/constants";

export default async function Category({ params }) {
  const posts = await sanityFetch({ query: `*[_type == "article" && "${params.tag}" in tags]{_id, name, description, mainImage, slug, tags, publishedAt, readingTime}` });
  const title = tagThings[params.tag].translation;
  const newsPosts = posts.filter((post) =>
    post.tags.some((tag) => tag === "news")
  );
  const essayPosts = posts.filter((post) =>
    post.tags.some((tag) => tag === "essay")
  );


  return (
    <main className="flex flex-col gap-10 max-w-[1920px] h-fit " dir="rtl">
      <div className="w-full md:h-[60vh] lg:h-[70vh] relative ">
        <div className="w-full h-full absolute bg-black bg-opacity-20"></div>
        <Image
          className="w-full h-full object-cover object-center "
          src={tagThings[params.tag].img}
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
        <Tabs
          defaultValue="news"
          className="col-span-2 flex flex-col items-start justify-center gap-4 h-full"
          dir="rtl"
        >
          <TabsList className="w-[90%] mx-auto grid grid-cols-2 h-fit">
            <TabsTrigger
              value="news"
              className="text-xl data-[state=active]:text-white data-[state=active]:bg-primary/85"
            >
              الأخبار
            </TabsTrigger>
            <TabsTrigger
              value="essay"
              className="text-xl data-[state=active]:text-white data-[state=active]:bg-primary/85"
            >
              مقالات
            </TabsTrigger>
          </TabsList>
          <TabsContent value="news" className="w-fit h-full grid grid-cols-1">
            <AllNewsHeadlines posts={newsPosts} title={`كل أخبار ${title}`} />
          </TabsContent>
          <TabsContent value="essay" className="w-full h-full grid grid-cols-1">
            <AllNewsHeadlines
              posts={essayPosts}
              title={`كل المقالات عن ${title}`}
            />
          </TabsContent>
        </Tabs>
          <TrendingHeadlines />
      </section>
    </main>
  );
}
