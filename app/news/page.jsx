import { fetchPages, getTopPages } from "../lib/notion";

import Selection from "@/components/Selection";
import Hero from "@/components/Hero";
import LatestNews from "../../components/LatestNews";

export default async function News({}) {
  const posts = await fetchPages();
  const featuredPosts = posts.results.filter((post) =>
    post.properties.Tags.multi_select.some((tag) => tag.name === "featured")
  );
  const selectionPosts = posts.results.filter((post) =>
    post.properties.Tags.multi_select.some((tag) => tag.name === "selection")
  );

  const NewsPosts = posts.results.filter((post) =>
    post.properties.Tags.multi_select.some((tag) => tag.name === "news")
  );





  const OPTIONS = { loop: false, direction: "rtl", slidesToScroll: 1 };
  const SLIDE_COUNT = 6;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  //   console.log(featuredPosts);
  return (
    <main className="flex flex-col gap-12 max-w-[1920px] " dir="rtl">
      {/* <Hero featuredPosts={featuredPosts} /> */}
      <Selection selectionPosts={selectionPosts} />
      <LatestNews posts={NewsPosts} />
      {/* <Swiper slides={SLIDES} options={OPTIONS} /> */}
      {/* <CTest /> */}
    </main>
  );
}
