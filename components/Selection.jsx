import imageUrlBuilder from "@sanity/image-url";
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
import BlurFade from "./magicui/blur-fade";
import clsx from "clsx";

const projectId = "chgbiwcm";
const dataset = "production";
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;


export default async function Selection({ selectionPosts , title = "مُختارات", isArticlePage = false }) {
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
        <SectionHeader title={title}>
          <CarouselNext className="hidden lg:flex left-0 top-0 translate-x-12" />
          <CarouselPrevious className="hidden lg:flex left-0 top-0" />
        </SectionHeader>
        <CarouselContent>
          {selectionPosts.map((post, index) => {
            const {_id, name, slug, tags, mainImage} = post
            const articleImageUrl = mainImage
            ? urlFor(mainImage)?.width(350).height(350).url()
            : null;
            const tag = tags.filter(
              (tag) =>
                tag !== "selection" &&
                tag !== "featured" &&
                tag !== "cars" &&
                tag !== "new" &&
                tag !== "upcoming-events" &&
                tag !== "news" &&
                tag !== "essay"
            )[0];
            return (
              <CarouselItem
                key={index}
                className={clsx("basis-[80%] lg:basis-[33%] ", isArticlePage ? "xl:basis-[25%]" : "xl:basis-[20%]")}
              >
              <BlurFade key={index} delay={index * 0.1} inView className="">
                <div className="">
                  <Card
                    key={_id}
                    className="flex items-center justify-center rounded-lg overflow-hidden shadow-md h-[350px] w-full border-none"
                  >
                    <div
                      className="card-body bg-cover bg-center text-white h-full w-full"
                      style={{
                        backgroundImage:
                          `url(${articleImageUrl})` || "/car_3tww.png",
                      }}
                    >
                      <Link
                        href={`/news/article/${slug.current}`}
                        className=" w-full h-full"
                      >
                        <div className="bg-gradient-to-t from-[#000000] to-80% flex flex-col justify-center h-full w-full transition-all duration-300 ">
                          <CardHeader className="flex flex-col justify-between items-start h-full">
                            <div className="bg-slate-500 bg-opacity-20 backdrop-blur-sm border border-white border-opacity-45 text-white text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2 w-fit">
                              <span className="{tag} capitalize">
                                {tagThings[tag]?.translation || tag}
                              </span>
                            </div>

                            <CardTitle className="leading-7">
                              {name}
                            </CardTitle>
                          </CardHeader>
                        </div>
                      </Link>
                    </div>
                  </Card>
                </div>
              </BlurFade>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}