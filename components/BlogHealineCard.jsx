import imageUrlBuilder from "@sanity/image-url";

import { timeAgo } from "@/lib/utils";
import { Circle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlurFade from "./magicui/blur-fade";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ReadingTime from "./ReadingTime";

const projectId = "chgbiwcm";
const dataset = "production";
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default function BlogHealineCard({ post, className, key }) {
  const { name, publishedAt, mainImage, description, tags, slug, readingTime } =
    post;
  const articleImageUrl = mainImage
    ? urlFor(mainImage)?.width(550).height(310).url()
    : null;
  const postDate = new Date(publishedAt);
  return (
    <BlurFade
      delay={key * 0.08}
      inView={true}
      className={`headline-card flex flex-col md:flex-row justify-start items-center h-fit md:h-1/6 md:gap-4  ${className}`}
    >
      <div className=" w-full h-1/2 md:w-1/3 md:h-full overflow-hidden rounded-lg">
        <Link
          href={`/news/article/${slug.current}`}
          className=" w-full h-full  hover:opacity-80 transition-all  duration-300"
        >
          <Image
            src={articleImageUrl || "/car_3tww.png"}
            width={300}
            height={300}
            alt="car"
            className="w-full h-full object-cover object-center"
          />
        </Link>
      </div>
      <Card className="h-1/3 md:w-2/3 md:h-full border-none shadow-none flex flex-col items-start justify-between ps-1 md:ps-0">
        <CardHeader className="ps-0 pb-3 pt-2  sm:pt-0">
          <span className="text-sm text-muted-foreground">
            {timeAgo(postDate)}
          </span>
          <CardTitle>
            <Link
              href={`/news/article/${slug.current}`}
              className="hover:text-green-600 transition-all duration-300 leading-8"
            >
              {name}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex gap-2 pb-0 ps-0 ">
          <div className="bg-green-400 bg-opacity-10 backdrop-blur-sm border-opacity-45 text-green-700 text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2 w-fit">
            <span className="{tag} capitalize">
              {
                tags?.filter(
                  (tag) =>
                    tag !== "selection" &&
                    tag !== "featured" &&
                    tag !== "cars" &&
                    tag !== "new"
                )[0]
              }
            </span>
          </div>
          <Circle
            size={10}
            className="text-xl opacity-40"
            fill="gray"
            strokeWidth={0}
          />
          <ReadingTime readingTime={readingTime} />
        </CardFooter>
      </Card>
    </BlurFade>
  );
}
