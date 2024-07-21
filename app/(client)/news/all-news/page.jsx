import { sanityFetch } from "@/app/sanity/client";


import AllNewsHeadlines from "@/components/AllNewsHeadlines";
import TrendingHeadlines from "@/components/TrendingHeadlines";

const ARTICLE_QUERY = `*[_type == "article" && "news" in tags]{_id, name, description, slug, tags, publishedAt, mainImage, readingTime}|order(date desc)`;

export default async function allNews() {
  const posts = await sanityFetch({ query: ARTICLE_QUERY });
  // console.log(posts[0]);

  return (
    <main className="flex flex-col gap-12 max-w-[1920px] px-6 " dir="rtl">
      <section className="Latest-section relative grid grid-cols-1 lg:grid-cols-3 mx-auto sm:px-16 px-6 mt-2 w-full mb-4">
        <AllNewsHeadlines posts={posts} title="كل الأخبار" />

        <TrendingHeadlines />
      </section>
    </main>
  );
}