import { connectToMongoDB } from "@/app/lib/mongodb";
import { sanityFetch } from "@/app/sanity/client";
import { timeAgo } from "@/lib/utils";

import Page from "@/models/pageVisits";
import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";
import BlurFade from "./magicui/blur-fade";

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

export default async function TrendingHeadlines({ articlePage = false }) {
  const trendingPostsInfo = await getTrendingPostsInfo();

  async function getFinalTrendingPosts(array) {
    const trendingPosts = [];
    for (let i = 0; i < array.length; i++) {
      const post = await sanityFetch({
        query: `*[_type == "article" && slug.current == "${array[i]._id}"]{_id, name, slug, tags, publishedAt}|order(date desc)[0...4]`,
      });
      trendingPosts.push(...post);
    }
    return trendingPosts;
  }

  const trendingPosts = await getFinalTrendingPosts(trendingPostsInfo);

  return (
    <BlurFade
      delay={0.3}
      inView
      className="mt-4 flex items-start justify-start flex-col gap-8 h-fit bg-green-400 bg-opacity-10 backdrop-blur-sm border-opacity-45 text-green-700 rounded-lg p-6 border-green-700 border-spacing-7 inset-4"
    >
      <div className="w-full flex items-start justify-center gap-2">
        <span
          className={clsx(
            articlePage ? "text-2xl" : "text-3xl",
            "text-black text-opacity-70 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
          )}
        >
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
          <BlurFade
            key={index}
            delay={0.3 + index * 0.1}
            className={clsx(
              "flex items-start justify-start gap-4 pb-4 min-h-[6.5rem]",
              {
                "border-b-2 border-white border-opacity-80":
                  index !== trendingPosts.length - 1,
              }
            )}
            inView={true}
          >
            <div className="w-1/6 h-full flex items-center justify-center">
              <span
                className={clsx(
                  articlePage ? "sm:text-4xl" : "sm:text-5xl",
                  "text-4xl trending-number font-bold drop-shadow-[0_1px_0px_rgba(0,0,0,0.5)] "
                )}
              >
                #{index + 1}
              </span>
            </div>
            <div className="w-5/6 h-full flex flex-col items-start justify-between gap-3 ">
              <Link href={`/news/article/${post.slug?.current}`}>
                <span
                  className={clsx(
                    articlePage ? "text-lg" : "text-xl",
                    "text-green-700 hover:text-opacity-80 font-bold drop-shadow-[1px_1px_0px_rgba(0,0,0,0.25)]"
                  )}
                >
                  {post.name}
                </span>
              </Link>
              <span className="text-sm text-muted-foreground">
                {timeAgo(new Date(post.publishedAt))}
              </span>
            </div>
          </BlurFade>
        ))}
      </div>
    </BlurFade>
  );
}
