import { sanityFetch } from "@/app/sanity/client";


import AllNewsHeadlines from "@/components/AllNewsHeadlines";
import TrendingHeadlines from "@/components/TrendingHeadlines";


export default async function AllNews({searchParams}) {
  const currentPage = Number(searchParams.page) || 1;

  const ARTICLE_QUERY = `*[_type == "article" && "news" in tags][${(currentPage - 1) * 10}...${currentPage * 10}]{_id, name, description, slug, tags, publishedAt, mainImage, readingTime}|order(publishedAt desc)`;
  const posts = await sanityFetch({ query: ARTICLE_QUERY });
  const countQuery = `*[_type == "article" && "news" in tags]{_id, name, description, mainImage, slug, tags, publishedAt, readingTime}`;
  const numberOfPosts = await sanityFetch({ query: `count(${countQuery})` });

  // console.log(posts[0]);

  return (
    <main className="h-full flex flex-col gap-12 max-w-[1920px] px-6 " dir="rtl">
      <section className="relative w-full h-full grid grid-cols-1 lg:grid-cols-3 mx-auto sm:px-16 pb-8 mt-2 w-mb-4 ">
        <AllNewsHeadlines posts={posts} title="كل الأخبار" numberOfPosts={numberOfPosts} />

        <TrendingHeadlines />
      </section>
    </main>
  );
}