import { Circle } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { timeAgo } from "@/lib/utils";
import clsx from "clsx";

export default function BlogHealineCard({ post, className }) {
  const postDate = new Date(post.properties.Date.created_time);
  return (
    <div className={`headline-card flex justify-start items-center h-1/6  ${className}`}>
      <div className="w-1/3 overflow-hidden rounded-lg">
        <Link
          href={`/news/${post.properties.Slug.rich_text[0]?.plain_text}`}
          className="hover:opacity-80 transition-all duration-300"
        >
          <Image
            src={post.cover?.external?.url || "/car_3tww.png"}
            width={300}
            height={300}
            alt="car"
            className="w-full"
          />
        </Link>
      </div>
      <Card className="h-full border-none shadow-none w-2/3 flex flex-col items-start justify-between">
        <CardHeader className="space-y-8 pt-0">
          <CardTitle>
            <Link
              href={`/news/${post.properties.Slug.rich_text[0]?.plain_text}`}
              className="hover:text-green-600 transition-all duration-300"
            >
              {post.properties.Title.title[0]?.plain_text}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {post.properties.Description.rich_text[0]?.plain_text}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex gap-2 pb-0">
          <div className="bg-green-400 bg-opacity-10 backdrop-blur-sm border-opacity-45 text-green-700 text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2 w-fit">
            <span className="{tag} capitalize">
              {
                post.properties.Tags.multi_select?.filter(
                  (tag) =>
                    tag.name !== "selection" &&
                    tag.name !== "featured" &&
                    tag.name !== "cars" &&
                    tag.name !== "new"
                )[0].name
              }
            </span>
          </div>
          <Circle
            size={10}
            className="text-xl opacity-40"
            fill="gray"
            strokeWidth={0}
          />
          <span className="text-sm text-muted-foreground">
            {timeAgo(postDate)}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
