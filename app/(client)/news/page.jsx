import { client, sanityFetch } from "@/app/sanity/client";

export const revalidate = +(process.env.NEXT_REVALIDATION_TIME || 0) || 60
export const dynamic = 'force-static'

const HERO_QUERY = `*[_type == "article" && "featured" in tags]{_id, name, description, mainImage, slug, tags, readingTime}|order(date desc)[0...4]`;
const SELECTION_QUERY = `*[_type == "article" && "selection" in tags]{_id, name, slug, tags, mainImage}|order(date desc)`;
const NEWS_QUERY = `*[_type == "article" && "news" in tags]{_id, name, description, mainImage, publishedAt, slug, tags, readingTime}|order(publishedAt desc)[0...5]`;
const UPCOMINGEVENTS_QUERY = `*[_type == "upcomingEvent"]{_id, name, description, mainImage, GuessedDate}|order(date desc)`;

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

import Hero from "@/components/Hero";
import Selection from "@/components/Selection";
import LatestNews from "../../../components/LatestNews";
import Categories from "@/components/Categories";
import UpcomingEvents from "@/components/UpcomingEvents";

export default async function News({}) {
  // Sanity Posts fetching
  const selectionPosts = await sanityFetch({ query: SELECTION_QUERY }, { next: { revalidate: 60 } });
  const newsPosts = await sanityFetch({ query: NEWS_QUERY }, { next: { revalidate: 60 } });
  const featuredPosts = await sanityFetch({ query: HERO_QUERY }, { next: { revalidate: 60 } });

  const upcomingPosts = await sanityFetch({ query: UPCOMINGEVENTS_QUERY }, { next: { revalidate: 60 } });

  const OPTIONS = { loop: true, direction: "rtl", slidesToScroll: 1, align: "center" };
  const SLIDE_COUNT = 6;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <main className="flex flex-col gap-12 max-w-[1920px] mx-auto" dir="rtl">
      <Hero featuredPosts={featuredPosts} projectId={projectId} dataset={dataset} />
      <Selection selectionPosts={selectionPosts} />
      <LatestNews posts={newsPosts} />
      <Categories />
      <UpcomingEvents posts={upcomingPosts} slides={SLIDES} options={OPTIONS} projectId={projectId} dataset={dataset} />
    </main>
  );
}
