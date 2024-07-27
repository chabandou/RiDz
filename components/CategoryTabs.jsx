"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllNewsHeadlines from "./AllNewsHeadlines";
import { tagThings } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryTabs({ posts, params, numberOfPosts }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const { replace } = useRouter();
    const handleToggle = (term) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (term) {
        params.set("type", term);
      } else {
        params.delete("type");
      }
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }



  const title = tagThings[params.tag]?.translation;

  const newsPosts = posts.filter((post) =>
    post.tags.some((tag) => tag === "news")
  );
  const essayPosts = posts.filter((post) =>
    post.tags.some((tag) => tag === "essay")
  );
  return (
    <Tabs
      defaultValue="news"
      className="col-span-2 flex flex-col items-start justify-center gap-4 h-full"
      dir="rtl"
    >
      <TabsList className="w-[90%] mx-auto grid grid-cols-2 h-fit">
        <TabsTrigger
          value="news"
          className="text-xl data-[state=active]:text-white data-[state=active]:bg-primary/85"
          onClick={() => handleToggle("news")}
        >
          الأخبار
        </TabsTrigger>
        <TabsTrigger
          value="essay"
          className="text-xl data-[state=active]:text-white data-[state=active]:bg-primary/85"
          onClick={() => handleToggle("essay")}
        >
          مقالات
        </TabsTrigger>
      </TabsList>
      <TabsContent value="news" className="w-fit h-full grid grid-cols-1 data-[state=inactive]:hidden">
        <AllNewsHeadlines posts={newsPosts} title={`كل أخبار ${title}`} numberOfPosts={numberOfPosts}  />
      </TabsContent>
      <TabsContent value="essay" className="w-full h-full grid grid-cols-1">
        <AllNewsHeadlines
          posts={essayPosts}
          title={`كل المقالات عن ${title}`}
          numberOfPosts={numberOfPosts}
        />
      </TabsContent>
    </Tabs>
  );
}
