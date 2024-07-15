import { ChevronLeft, Flame } from "lucide-react";

import BlogHealineCard from "./BlogHealineCard";
import Image from "next/image";
import { timeAgo } from "@/lib/utils";
import { connectToMongoDB } from "@/app/lib/mongodb";
import Page from "@/models/pageVisits";
import { fetchBySlug } from "@/app/lib/notion";
import Link from "next/link";
import { arefRuqaa } from "@/app/fonts";
import clsx from "clsx";
import { buttonVariants } from "./ui/button";
import SectionHeader from "./ui/SectionHeader";

async function getTrendingPostsInfo() {
  await connectToMongoDB(`getTrendingPosts`);
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  try {
    const trendingPosts = await Page.aggregate([
      { $unwind: "$timestamps" },
      { $match: { timestamps: { $gte: oneWeekAgo } } },
      { $group: { _id: "$slug", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    return trendingPosts;
  } catch (error) {
    console.log(error);
  }
}

export default async function LatestNews({ posts }) {
  const trendingPostsInfo = await getTrendingPostsInfo();
  async function getFinalTrendingPosts(array) {
    const trendingPosts = [];
    for (let i = 0; i < array.length; i++) {
      const post = await fetchBySlug(array[i]._id);
      trendingPosts.push(post);
    }
    return trendingPosts;
  }

  const trendingPosts = await getFinalTrendingPosts(trendingPostsInfo);

  return (
    <section className="Latest-section relative grid grid-cols-1 lg:grid-cols-3 mx-auto sm:px-16 px-2 mt-2 w-full mb-4">
      <div className="col-span-2 flex flex-col items-start justify-center gap-8 w-full">
        <SectionHeader title="آخر الأخبار">
          <Link
            className="hover:underline hover:text-green-600 transition duration-300"
            href="/news/all-news"
          >
            <span className="absolute left-0 top-0 translate-x-10 translate-y-1/2 flex items-center justify-center gap-2">
              إطلع على كل الأخبار
              <ChevronLeft className="w-6 h-6" />
            </span>
          </Link>
        </SectionHeader>

        <div className="w-full space-y-10 h-[166vh]">
          {posts.slice(0, 5).map((post, index) => {
            return <BlogHealineCard key={index} post={post} />;
          })}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-start flex-col gap-8 h-fit bg-green-400 bg-opacity-10 backdrop-blur-sm border-opacity-45 text-green-700 rounded-lg p-6 border-green-700 border-spacing-7 inset-4">
        <div className="w-full flex items-start justify-center gap-2">
          <span className="text-3xl text-black text-opacity-70 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
            الأكثر تفاعلاً
          </span>
          <Image
            src="/fire.svg"
            width={32}
            height={32}
            alt="fire"
            className=" "
          />
        </div>
        <div className="w-full h-full grid grid-cols-1 justify-start gap-5">
          {trendingPosts.map((post, index) => (
            <div
              key={index}
              className={clsx(
                "flex items-start justify-start gap-2 pb-4 h-[6.5rem]",
                {
                  "border-b-2 border-black border-opacity-20":
                    index !== trendingPosts.length - 1,
                }
              )}
            >
              <div className="w-1/6 flex items-start justify-start">
                <span className="trending-number text-5xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] ">
                  #{index + 1}
                </span>
              </div>
              <div className="w-5/6 h-full flex flex-col items-start justify-between gap-3 ">
                <Link
                  href={`/news/${post.properties.Slug.rich_text[0].plain_text}`}
                >
                  <span className="text-xl text-green-700 hover:text-opacity-80 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                    {post.properties.Title.title[0].plain_text}
                  </span>
                </Link>
                <span className="text-sm text-muted-foreground">
                  {timeAgo(new Date(post.properties.Date.created_time))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
