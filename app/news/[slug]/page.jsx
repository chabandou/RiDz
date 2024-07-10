import { fetchBySlug, fetchPageBlocks, notion } from "@/app/lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import clsx from "clsx";
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

export default async function Article({ params }) {
  const post = await fetchBySlug(params.slug);
  if (!post) return <div>404</div>;

  console.log(post.id);
  const blocks = await fetchPageBlocks(post.id);
  // console.log(blocks[0].heading_1);
  const renderer = new NotionRenderer({
    client: notion,
  });

  const postLang = post.properties.Language.select.name;
  // console.log(postLang);

  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  const html = await renderer.render(...blocks);

  await incrementVisitsMDB(params.slug);

  return (
    <div
      className={clsx("prose mx-auto mt-10 text-right")}
      dangerouslySetInnerHTML={{ __html: html }}
      dir={postLang === "Arabic" ? "rtl" : "ltr"}
    ></div>
  );
}
