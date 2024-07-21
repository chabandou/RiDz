// import { fetchBySlug, fetchPageBlocks, notion } from "@/app/lib/notion";
// import bookmarkPlugin from "@notion-render/bookmark-plugin";
// import { NotionRenderer } from "@notion-render/client";
// import hljsPlugin from "@notion-render/hljs-plugin";
// import clsx from "clsx";

// export default async function Article({ params }) {
//   const post = await fetchBySlug(params.slug);
//   if (!post) return <div>404</div>;

//   const blocks = await fetchPageBlocks(post.id);
//   // console.log(blocks[0].heading_1);
//   const renderer = new NotionRenderer({
//     client: notion,
//   });

//   const postLang = post.properties.Language.select.name;
//   // console.log(postLang);

//   renderer.use(hljsPlugin({}));
//   renderer.use(bookmarkPlugin(undefined));

//   const html = await renderer.render(...blocks);

//   // reading time logic
//   const wordMatchRegExp = /(?<!<)([\u0600-\u06FF]+)(?!>)/g; // Regular expression
//   const words = html.matchAll(wordMatchRegExp);
//   const wordCount = [...words].length;
//   console.log(wordCount);
//   const readingTime = Math.round(wordCount / 200);

//   await incrementVisitsMDB(params.slug);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <p className="text-right">⏱️ {readingTime} min read</p>
//       <article
//         className={clsx("prose mx-auto mt-10 text-right")}
//         dangerouslySetInnerHTML={{ __html: html }}
//         dir={postLang === "Arabic" ? "rtl" : "ltr"}
//       ></article>
//     </main>
//   );
// }

import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import Link from "next/link";
import Image from "next/image";
import { client, sanityFetch } from "@/app/sanity/client";
import { connectToMongoDB } from "@/app/lib/mongodb";
import Page from "@/models/pageVisits";
import TrendingHeadlines from "@/components/TrendingHeadlines";
import BlurFade from "@/components/magicui/blur-fade";
import { footerLinks, tagThings } from "@/constants";
import clsx from "clsx";
import { Circle, Eye, MessageSquareText } from "lucide-react";
import SocialMediaShare from "@/components/SocialMediaShare";
import { arefRuqaa } from "@/app/(client)/fonts";
import ReadingTime from "@/components/ReadingTime";
import Selection from "@/components/Selection";

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

export default async function ArticlePage({ params }) {
  const article = await sanityFetch({
    query: ARTICLE_QUERY,
    params,
  });
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

  return (
    <>
      <main className="" dir="rtl">
        <section className="container mx-auto grid gap-12 p-2">
          <div className="mb-1">
            <Link href="/news/all-news"> → العودة لكل الأخبار </Link>
          </div>
          <div className="relative w-full h-fit grid items-top gap-12 ">
            <div className=" flex flex-col justify-center space-y-4">
              <Image
                src={articleImageUrl || "https://via.placeholder.com/1920x1080"}
                alt={name || "article"}
                className="mx-auto aspect-video h-[85vh] drop-shadow-lg scale-105 overflow-hidden rounded-xl object-cover object-center sm:w-full mb-8"
                height="1080"
                width="1920"
              />
              <div className="grid grid-cols-4 gap-2">
                <div className="article-title col-span-3 flex flex-col flex-wrap items-start justify-start gap-6">
                  <BlurFade inView>
                    {articleDate && (
                      <dt>
                        {articleDate}{" "}
                        <span className="text-primary font-bold text-xl">
                          |
                        </span>{" "}
                        {articleDateHg}
                      </dt>
                    )}
                  </BlurFade>
                  <BlurFade
                    delay={0.08}
                    inView
                    className="text-lg tracking-tighter"
                  >
                    {name && (
                      <h1
                        className={clsx(
                          "text-8xl font-bold tracking-tighter mb-5",
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
                            (tag) => tag !== "featured" && tag !== "selection"
                          )
                          .map((tag, index) => (
                            <div
                              key={tag}
                              className={clsx(
                                tagThings[tag]
                                  ? `tagBg-${tagThings[tag].color}`
                                  : "",
                                `bg-green-400 bg-opacity-10 backdrop-blur-sm border-opacity-45 text-green-700 text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2 w-fit`
                              )}
                            >
                              <span className="{tag}">
                                {tagThings[tag]
                                  ? tagThings[tag].translation
                                  : tag}
                              </span>

                              {tagThings[tag]?.icon}
                            </div>
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
                  <div className="h-[2px] w-full bg-gradient-to-l from-primary/80 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 h-fit gap-8">
                  <BlurFade inView className="flex items-start justify-between h-fit me-2">
                    <span className="text-lg tracking-tighter">
                      شارك المقال
                    </span>
                    <div className="flex flex-wrap items-start justify-end gap-4">
                      <SocialMediaShare title={name} />
                    </div>
                  </BlurFade>
                  <BlurFade delay={0.04} inView className="flex items-start justify-end">
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
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2 mb-8">
            <BlurFade
              delay={0.1}
              inView
              className=" w-[75ch] col-span-3 prose max-w-none"
            >
              <PortableText value={body} />
            </BlurFade>
            <div>
              <div></div>
              <TrendingHeadlines articlePage={true} />
            </div>
          </div>
        </section>

        <section
          className="flex flex-col gap-12 max-w-[1920px] mx-auto mb-6 mt-4"
          dir="rtl"
        >
          <Selection selectionPosts={relatedPosts} title="قد يعجبك أيضاً" />
        </section>
      </main>
    </>
  );
}
