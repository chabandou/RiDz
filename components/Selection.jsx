import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SectionHeader from "./ui/SectionHeader";
import { tagThings } from "@/constants";

export default async function Selection({ selectionPosts }) {
  return (
    <div className="Selections-section relative flex flex-col items-center justify-center mx-auto sm:px-16 px-2 mt-2 gap-10 w-full mb-4">
      <Carousel
        opts={{
          loop: true,
          direction: "rtl",
          align: "center",
          breakpoints: {
            "(min-width: 1024px)": { align: "start" },
          },
        }}
        className=" max-w-full xl:w-full mx-auto space-y-8"
      >
        <SectionHeader title="مُختارات">
          <CarouselNext className="hidden lg:flex left-0 top-0 translate-x-12" />
          <CarouselPrevious className="hidden lg:flex left-0 top-0" />
        </SectionHeader>
        <CarouselContent>
          {selectionPosts.map((post, index) => {
            const tag = post.properties.Tags.multi_select.filter(
              (tag) =>
                tag.name !== "selection" &&
                tag.name !== "featured" &&
                tag.name !== "cars" &&
                tag.name !== "new"
            )[0].name;
            return (
              <CarouselItem
                key={index}
                className="basis-[80%] lg:basis-[33%] xl:basis-[20%]"
              >
                <div className="">
                  <Card
                    key={post.id}
                    className="flex items-center justify-center rounded-lg overflow-hidden shadow-2xl h-[350px] w-full"
                  >
                    <div
                      className="card-body bg-cover bg-center text-white h-full w-full"
                      style={{
                        backgroundImage:
                          `url(${post.cover?.external.url})` || "/car_3tww.png",
                      }}
                    >
                      <Link
                        href={`/news/article/${post.properties.Slug.rich_text[0].plain_text}`}
                        className=" w-full h-full"
                      >
                        <div className="bg-gradient-to-t from-[#000000] to-80% flex flex-col justify-center h-full w-full transition-all duration-300 ">
                          <CardHeader className="flex flex-col justify-between items-start h-full">
                            <div className="bg-slate-500 bg-opacity-10 backdrop-blur-sm border border-white border-opacity-45 text-white text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2 w-fit">
                              <span className="{tag} capitalize">
                                {tagThings[tag]?.translation || tag}
                              </span>
                            </div>

                            <CardTitle className="leading-7">
                              {post.properties.Title.title[0].plain_text}
                            </CardTitle>
                          </CardHeader>
                        </div>
                      </Link>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

{
  /* <CardContent className="w-[80%] ">
                    <p className="line-clamp-2">
                      {post.properties.Description.rich_text[0].plain_text}
                    </p>
                  </CardContent> */
}
{
  /* <CardFooter>
                    <Link
                      href={`/news/${post.properties.Slug.rich_text[0].plain_text}`}
                    >
                      <Button
                        className="group rounded-full bg-transparent hover:text-green-400 hover:bg-black hover:bg-opacity-10 "
                        variant="outline"
                      >
                        المزيد
                        <span className="-translate-x-1 group-hover:-translate-x-2 transition-transform">
                          &larr;
                        </span>{" "}
                      </Button>
                    </Link>
                  </CardFooter> */
}
