import { ChevronLeft } from "lucide-react";

import Link from "next/link";
import BlogHealineCard from "./BlogHealineCard";
import TrendingHeadlines from "./TrendingHeadlines";
import SectionHeader from "./ui/SectionHeader";
import BlurFade from "./magicui/blur-fade";

export default async function LatestNews({ posts }) {
  return (
    <section className="Latest-section relative w-full h-fit  grid grid-cols-1 lg:grid-cols-3 mx-auto sm:px-16 px-2 mt-2 mb-4">
      <div className="w-full col-span-2 flex flex-col items-start justify-center gap-8 ">
        <SectionHeader title="آخر الأخبار">
          <Link
            className="hover:underline hover:text-green-600 transition duration-300"
            href="/news/all-news"
          >
            <span className="absolute left-0 top-0 translate-x-2 md:translate-x-10 translate-y-1/2 flex items-center justify-center gap-2">
              إطلع على كل الأخبار
              <ChevronLeft className="w-6 h-6" />
            </span>
          </Link>
        </SectionHeader>

        <div className="w-full space-y-8 lg:space-y-10 h-full">
          {posts.slice(0, 5).map((post, index) => {
            return (
              <BlogHealineCard
                key={index}
                post={post}
                className={"md:h-[200px]"}
              />
            );
          })}
        </div>
      </div>
        <TrendingHeadlines />
    </section>
  );
}
