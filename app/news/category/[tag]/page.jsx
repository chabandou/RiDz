import { arefRuqaa } from "@/app/fonts";
import { fetchByTag } from "@/app/lib/notion";
import AllNewsHeadlines from "@/components/AllNewsHeadlines";
import { tagThings } from "@/constants";
import clsx from "clsx";
import Image from "next/image";

export default async function Category({ params }) {
  const posts = await fetchByTag(params.tag);
  const title = tagThings[params.tag].translation;
  return (
    <main className="flex flex-col gap-12 max-w-[1920px] h-fit " dir="rtl">
      <div className="w-full h-[70vh] relative ">
        <div className="w-full h-full absolute bg-black bg-opacity-20">

        </div>
        <Image className="w-full h-full object-cover object-center " src={tagThings[params.tag].img} width={1920} height={1080} alt="car" />
        <h1 className={clsx("text-[11rem] font-bold text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[1px_1px_0px_rgba(0,0,0)]", arefRuqaa.className)}>{title}</h1>
      </div>
      <section className="Latest-section relative grid grid-cols-1 lg:grid-cols-3 mx-auto sm:px-16 px-6 mt-2 w-full mb-4">
        <AllNewsHeadlines posts={posts} title={`كل أخبار ${title}`} />
      </section>
    </main>
  );
}
