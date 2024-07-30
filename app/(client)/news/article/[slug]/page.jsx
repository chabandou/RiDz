import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "next-sanity";

import { arefRuqaa } from "@/app/(client)/fonts";
import { connectToMongoDB } from "@/app/lib/mongodb";
import { client, sanityFetch } from "@/app/sanity/client";
import ReadingTime from "@/components/ReadingTime";
import Selection from "@/components/Selection";
import SocialMediaShare from "@/components/SocialMediaShare";
import TrendingHeadlines from "@/components/TrendingHeadlines";
import BlurFade from "@/components/magicui/blur-fade";
import { tagThings } from "@/constants";
import Page from "@/models/pageVisits";
import clsx from "clsx";
import { Circle, Eye, MessageSquareText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/Tag";

export const revalidate = +(process.env.NEXT_REVALIDATION_TIME || 0) || 60;
export const dynamic = "force-static";

async function incrementVisitsMDB(slug) {
  await connectToMongoDB("incrementVisits");
  try {
    const page = await Page.find({ slug });
    if (!page) {
      Page.create({ slug, visits: 1, timestamps: [new Date()] });
    } else {
      await Page.findOneAndUpdate(
        { slug },
        { $inc: { visits: 1 }, $push: { timestamps: new Date() } },
        { upsert: true, new: true }
      );
      const pageVisits = page[0].visits;
      return pageVisits;
    }
  } catch (error) {
    console.log(error);
  }
}

const ARTICLE_QUERY = `*[
    _type == "article" &&
    slug.current == $slug
  ][0]{_id, name, publishedAt, mainImage, tags, body, readingTime}`;

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const SampleImageComponent = ({ value, isInline }) => {
  const { width, height } = value;
  return (
    <Image
      src={imageUrlBuilder({ projectId, dataset })
        .image(value)
        .auto("format")
        .url()}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? "inline-block" : "block",

        objectFit: "cover",
        objectPosition: "center",
        width,
        height,
      }}
      width={1920}
      height={1080}
    />
  );
};
export default async function ArticlePage({ params }) {
  const article = await sanityFetch(
    {
      query: ARTICLE_QUERY,
      params,
    },
    { next: { revalidate: 60 } }
  );
  const { _id, name, publishedAt, mainImage, tags, body, readingTime } =
    article;
  const articleImageUrl = mainImage ? urlFor(mainImage)?.url() : null;

  const articleDate = new Date(publishedAt).toLocaleDateString("ar-DZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const articleDateHg = new Date(publishedAt).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pageVisits = await incrementVisitsMDB(params.slug);

  const RELATED_QUERY = `*[_type == "article" && (${tags
    .filter((tag) => tag !== "featured" && tag !== "selection")
    .map((tag) => `"${tag}" in tags`)
    .join(
      " || "
    )}) && _id != "${_id}"]{name, publishedAt, mainImage, tags, slug, readingTime}`;

  const relatedPosts = await sanityFetch({
    query: RELATED_QUERY,
  });

  const components = {
    types: {
      image: SampleImageComponent,
      // Any other custom types you have in your content
      // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
    },
  };
  return (
    <>
      <main className="overflow-x-hidden " dir="rtl">
        <section className="container mx-auto grid gap-12 p-2">
          <div className="relative w-full h-fit grid items-top gap-12 ">
            <div className=" flex flex-col justify-center space-y-4 ">
              <BlurFade inView className="w-full h-fit" carouselItem yOffset={8}>
                <Image
                  src={
                    articleImageUrl || "https://via.placeholder.com/1920x1080"
                  }
                  alt={name || "article"}
                  className="mx-auto aspect-video h-[33vh] xl:h-[85vh] drop-shadow-lg scale-105 overflow-hidden md:rounded-xl object-cover object-center sm:w-full mb-2 xl:mt-2 md:mb-8"
                  height="1080"
                  width="1920"
                />
              </BlurFade>
              <div className="md:w-[75ch] xl:w-full grid grid-cols-1 xl:grid-cols-12 place-content-center gap-8 xl:gap-2 mx-auto ">
                <div className="article-title  xl:col-start-2 xl:col-span-7 flex flex-col flex-wrap items-start justify-start gap-2 ">
                  <BlurFade  inView className="text-sm xl:text-lg mb-2 xl:mb-0">
                    {articleDate && (
                      <dt>
                        {articleDate}{" "}
                        <span className="text-primary font-bold text-lg md:text-xl">
                          |
                        </span>{" "}
                        {articleDateHg}
                      </dt>
                    )}
                  </BlurFade>
                  <BlurFade delay={0.08} inView>
                    {name && (
                      <h1
                        className={clsx(
                          "text-6xl md:text-[5rem] font-bold leading-[1.125] mb-6",
                          arefRuqaa.className
                        )}
                      >
                        {name}
                      </h1>
                    )}
                  </BlurFade>

                  <BlurFade
                    delay={0.1}
                    inView
                    className="flex flex-wrap items-center justify-start gap-2"
                  >
                    <div className="flex flex-wrap items-center justify-start gap-2">
                      {tags &&
                        tags
                          .filter(
                            (tag) => tag !== "featured" && tag !== "selection" && tag !== "news"
                          )
                          .map((tag, index) => (
                            <Link key={index} href={`/news/category/${tag}`}>
                            <Tag key={index} tag={tagThings[tag] ? tagThings[tag].translation : tag} className="bg-green-400/10 border-opacity-45 text-green-700 " />
                            </Link>
                          ))}
                    </div>
                    {readingTime && (
                      <Circle
                        size={10}
                        className="text-xl opacity-40"
                        fill="gray"
                        strokeWidth={0}
                      />
                    )}
                    <ReadingTime readingTime={readingTime} />
                  </BlurFade>
                  <div className="h-[2px] w-full bg-gradient-to-l from-primary/80 to-transparent mt-2 hidden xl:flex"></div>
                </div>
                <div style={{ alignItems: "end" }} className="xl:col-span-3 grid grid-cols-2 justify-start xl:justify-items-end  xl:grid-cols-1 xl:grid-rows-[1fr,_auto] h-full gap-5"> 
                <div style={{ alignSelf: "start"  }} className="xl:flex items-start justify-start justify-self-start xl:justify-self-end hidden">
                    <Link href="/news/all-news" className="main-page-content lx:mb-2  hover:text-primary transition-all duration-300 ease-in-out ">
                     
                      <span className="inline xl:hidden">→ </span>العودة لكل الأخبار<span className="hidden xl:inline"> ←</span>{" "}
                    </Link>
                  </div>
                  <BlurFade
                    inView
                    className="flex items-start justify-start  xl:justify-end h-fit xl:me-2 "
                  >
                    <div className="flex flex-wrap items-start justify-start xl:justify-end gap-4">
                      <SocialMediaShare title={name} />
                    </div>
                  </BlurFade>
                  <BlurFade
                    delay={0.04}
                    inView
                    className="flex items-start justify-end"
                  >
                    <div className="flex flex-wrap items-start justify-start gap-4">
                      <div className="bg-green-400 bg-opacity-10 backdrop-blur-sm border-opacity-45 text-green-700 text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2 w-fit">
                        <span className="flex flex-wrap items-center justify-center gap-4">
                          {pageVisits} <Eye className="w-6 h-6 " />
                        </span>
                      </div>
                      <div className="bg-green-400 bg-opacity-10 backdrop-blur-sm border-opacity-45 text-green-700 text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2 w-fit">
                        <span className="flex flex-wrap items-center justify-center gap-4">
                          {0} <MessageSquareText className="w-6 h-6 " />
                        </span>
                      </div>
                    </div>
                  </BlurFade>
                  
                </div>
                <div className="h-[2px] w-full bg-gradient-to-l from-primary/80  to-transparent mt-2 xl:hidden visible"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 mt-2 mb-8 mx-auto">
            <BlurFade
              delay={0.1}
              inView
              className=" md:w-[75ch] xl:col-start-2 xl:col-span-7 prose max-w-none mb-4 xl:mb-0"
            >
              <PortableText value={body} components={components} />
            </BlurFade>
            <div className="xl:col-span-3">
              <TrendingHeadlines articlePage={true} />
            </div>
          </div>
        </section>


        <section className="container w-full xl:grid xl:grid-cols-12 mx-auto" dir="rtl">
          <div className="xl:col-span-12 flex flex-col gap-12 max-w-[1920px] mb-6 -mt-3 md:mt-4">
            <Selection
              selectionPosts={relatedPosts}
              title="قد يعجبك أيضاً"
              isArticlePage={true}
            />
          </div>
        </section>
      </main>
    </>
  );
}
