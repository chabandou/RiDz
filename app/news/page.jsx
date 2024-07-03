import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchPages } from "../lib/notion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import Carousel from "@/components/Carousel";


export default async function News({}) {
  const posts = await fetchPages();
  const featuredPosts = posts.results.filter((post) =>
    post.properties.Tags.multi_select.some((tag) => tag.name === "featured")
  );
  

  //   console.log(featuredPosts);
  return (
    <section className="">
      <Carousel featuredPosts={featuredPosts} />
      <div className="flex flex-col items-center justify-center max-w-[1920px] mx-auto sm:px-16 px-6 mt-2 gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.results.map((post) => (
            // console.log(post.properties.Tags),
            <Card
              key={post.id}
              className={clsx(
                "flex items-center justify-center rounded-lg overflow-hidden shadow-2xl",
                post.properties.Language.select.name === "Arabic" &&
                  "text-right"
              )}
            >
              <div
                className="card-body bg-cover text-white h-full"
                style={{
                  backgroundImage:
                    `url(${post.cover?.external.url})` || "/car_3tww.png",
                }}
              >
                <div
                  className={clsx(
                    "bg-gray-800 bg-opacity-30 flex flex-col justify-center h-full",
                    post.properties.Language.select.name === "Arabic" &&
                      "items-end"
                  )}
                >
                  <CardHeader>
                    <Link
                      href={`/news/${post.properties.slug.rich_text[0].plain_text}`}
                    >
                      <CardTitle>
                        {post.properties.Title.title[0].plain_text}
                      </CardTitle>
                    </Link>
                  </CardHeader>
                  <CardContent className="w-[80%] ">
                    <p className="line-clamp-2">
                      {post.properties.Description.rich_text[0].plain_text}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/news/${post.properties.slug.rich_text[0].plain_text}`}
                    >
                      <Button
                        className="rounded-full border-green-500 hover:text-green-500 group"
                        variant="secondary"
                      >
                        {" "}
                        Lire la suite{" "}
                        <span className="translate-x-1 group-hover:translate-x-2 transition-transform">
                          &rarr;
                        </span>{" "}
                      </Button>
                    </Link>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
