import { Flame } from "lucide-react";

import BlogHealineCard from "./BlogHealineCard";
import Image from "next/image";
import { timeAgo } from "@/lib/utils";

export default function LatestNews({ posts, topPosts }) {


  return (
    <section className="Latest-section relative grid grid-cols-1 lg:grid-cols-3 mx-auto sm:px-16 px-6 mt-2 w-full mb-4">
      <div className="col-span-2 flex flex-col items-start justify-center gap-8">
        <div className="flex relative items-center justify-start w-full border-r-8 border-primary pr-3">
          <h2 className="text-3xl font-bold text-right leading-[2.5rem]">
            آخر الاخبار
          </h2>
        </div>
        <div className="w-full space-y-10 h-[166vh]">
          {posts.map((post, index) => {
            return (
             <BlogHealineCard key={index} post={post} />
            );
          })}
        </div>
      </div>
      <div className="flex items-start justify-start flex-col gap-8 h-[90vh] bg-green-500 bg-opacity-90 rounded-lg p-6 text-white">
        <div className="w-full flex items-start justify-center gap-2">
          <span className="text-3xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">الأكثر تفاعلاً</span>
          <Image src="/fire.svg" width={32} height={32} alt="fire" className=" " />
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          {topPosts.map((post, index) => (
            <div key={index} className="flex items-start justify-start gap-2 h-1/6">
              <div className="w-1/6 flex items-start justify-start">
                <span className="text-4xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] ">#{index + 1}</span>
              </div>
              <div className="w-5/6 h-full flex flex-col items-start justify-start gap-3 ">
                <span className="text-xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">{post.properties.Title.title[0].plain_text}</span>
                <span className="text-sm text-muted">{timeAgo(new Date(post.properties.Date.created_time))}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
