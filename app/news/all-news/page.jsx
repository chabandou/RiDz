import { fetchByTag } from "@/app/lib/notion";
import AllNewsHeadlines from "@/components/AllNewsHeadlines";
import { timeAgo } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default async function allNews() {
  const posts = await fetchByTag("news");

  return (
    <main className="flex flex-col gap-12 max-w-[1920px] px-6 " dir="rtl">
      <section className="Latest-section relative grid grid-cols-1 lg:grid-cols-3 mx-auto sm:px-16 px-6 mt-2 w-full mb-4">
        <AllNewsHeadlines posts={posts} />

        <div className="flex items-start justify-start flex-col gap-8 h-[95vh] bg-gradient-to-b from-[#15803cdc] to-[#059668e0] rounded-lg p-6 text-white border-white border-spacing-7 inset-4">
          <div className="w-full flex items-start justify-center gap-2">
            <span className="text-3xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
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
          <div className="w-full h-full flex flex-col justify-start gap-5">
            {/* {trendingPosts.map((post, index) => (
              <div
                key={index}
                className={clsx(
                  "flex items-start justify-start gap-2 pb-4 h-1/6",
                  {
                    "border-b-2 border-white border-opacity-30":
                      index !== trendingPosts.length - 1,
                  }
                )}
              >
                <div className="w-1/6 flex items-start justify-start">
                  <span className="trending-number text-5xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] ">
                    #{index + 1}
                  </span>
                </div>
                <div className="w-5/6 h-full flex flex-col items-start justify-between gap-3 ">
                  <Link
                    href={`/news/${post.properties.Slug.rich_text[0].plain_text}`}
                  >
                    <span className="text-xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                      {post.properties.Title.title[0].plain_text}
                    </span>
                  </Link>
                  <span className="text-sm text-muted">
                    {timeAgo(new Date(post.properties.Date.created_time))}
                  </span>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </section>
    </main>
  );
}
