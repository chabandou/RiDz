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
    }
  } catch (error) {
    console.log(error);
  }
}

const ARTICLE_QUERY = `*[
    _type == "article" &&
    slug.current == $slug
  ][0]{...,}`;

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function articlePage({ params }) {
  const article = await sanityFetch({
    query: ARTICLE_QUERY,
    params,
  });
  const { name, publishedAt, mainImage, description, articleType, tags, body } =
    article;
  const articleImageUrl = mainImage
    ? urlFor(mainImage)?.width(550).height(310).url()
    : null;
  console.log(articleImageUrl);
  const articleDate = new Date(publishedAt).toDateString();
  const articleTime = new Date(publishedAt).toLocaleTimeString();

  await incrementVisitsMDB(params.slug);

  return (
    <main className="container mx-auto grid gap-12 p-12" dir="rtl">
      <div className="mb-4">
        <Link href="/all-news"> رجوع ←</Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={articleImageUrl || "https://via.placeholder.com/550x310"}
          alt={name || "article"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {articleType ? (
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 capitalize">
                {articleType.replace("-", " ")}
              </div>
            ) : null}
            {name ? (
              <h1 className="text-4xl font-bold tracking-tighter mb-8">
                {name}
              </h1>
            ) : null}

            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
              <dd className="font-semibold">حرر تاريخ</dd>
              <div>
                {articleDate && <dt>{articleDate}</dt>}
                {articleTime && <dt>{articleTime}</dt>}
              </div>
            </dl>
          </div>
          {description && description.length > 0 && (
            <div className="prose max-w-none">{description}</div>
          )}
        </div>
      </div>

      <div className="prose max-w-none">
        <PortableText value={body} />
      </div>
    </main>
  );
}
