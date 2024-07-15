import { fetchByTag, fetchPages, getTopPages } from "../lib/notion";

import Hero from "@/components/Hero";
import Selection from "@/components/Selection";
import LatestNews from "../../components/LatestNews";
import Categories from "@/components/Categories";
import UpcomingEvents from "@/components/UpcomingEvents";
import CTA from "@/components/CTA";

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

  async function getUpcomingEvents() {
    try {
      const upcomingEvents = await fetchByTag("upcoming-events");
      return upcomingEvents;
    } catch (error) {
      console.log(error);
    }
  }
  const upcomingPosts = await getUpcomingEvents();

  const OPTIONS = { loop: true, direction: "rtl", slidesToScroll: 1, align: "center" };
  const SLIDE_COUNT = 6;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  //   console.log(featuredPosts);
  return (
    <main className="flex flex-col gap-12 max-w-[1920px] mx-auto" dir="rtl">
      {/* <Hero featuredPosts={featuredPosts} /> */}
      <Selection selectionPosts={selectionPosts} />
      {/* <LatestNews posts={NewsPosts} /> */}
      {/* <Categories /> */}
      <UpcomingEvents posts={upcomingPosts} slides={SLIDES} options={OPTIONS} />
      <CTA />
    </main>
  );
}
