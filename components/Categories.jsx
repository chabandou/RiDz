import Link from "next/link";
import SectionHeader from "./ui/SectionHeader";
import { tagThings } from "@/constants";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import Image from "next/image";

export default function Categories() {
  return (
    <div className="categories-section h-fit lg:h-fit relative flex flex-col items-center justify-center mx-auto sm:px-16 px-2 mt-2 gap-10 w-full mb-4">
      <SectionHeader title="تصفح التصنيفات" />
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Object.entries(tagThings).map(([tag, { translation, img }], index) => {
          if (tag !== "featured" && tag !== "new" && tag !== "popular") {
            return (
              <Link
                key={tag}
                href={`/news/category/${tag}`}
                className={`group  relative h-36 flex items-center justify-center lg:text-base rounded-lg overflow-hidden`}
              >
                <Card
                  className=" w-full h-full bg-transparent hover:bg-white hover:bg-opacity-80 hover:backdrop-blur-sm   flex items-center justify-center transition-all duration-300 hover:border-green-600"
                >
                  <CardHeader>
                    <CardTitle className=" text-white group-hover:text-green-600 text-4xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] transition-all duration-300">
                      {translation}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Image className="absolute top-0 left-0 w-full h-full object-cover object-center -z-10 group-hover:scale-110" src={img} width={1024} height={1024} loading="lazy" alt={tag} />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
