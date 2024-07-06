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
import Selection from "@/components/Selection";
import Swiper from "swiper";

export default async function News({}) {
  const posts = await fetchPages();
  const featuredPosts = posts.results.filter((post) =>
    post.properties.Tags.multi_select.some((tag) => tag.name === "featured")
  );
  const selectionPosts = posts.results.filter((post) =>
    post.properties.Tags.multi_select.some((tag) => tag.name === "selection")
  );

  //   console.log(featuredPosts);
  return (
    <main className="flex flex-col gap-10 max-w-[1920px]" dir="rtl">
      <Carousel featuredPosts={featuredPosts} />
      <Selection selectionPosts={selectionPosts} />
      <Swiper />
    </main>
  );
}
