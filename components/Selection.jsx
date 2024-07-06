
import "swiper/css";
import "swiper/css/navigation";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import Link from "next/link";

export default function Selection({ selectionPosts }) {

    return (
        <div className="Selections-section flex flex-col items-center justify-center mx-auto sm:px-16 px-6 mt-2 gap-10 w-full mb-4">
        <div className="flex items-center justify-start w-full border-r-8 border-primary pr-3">
          <h2 className="text-3xl font-bold text-right leading-[2.5rem]">
            مُختارات
          </h2>
        </div>
        <div className="mySwipper flex justify-between items-center gap-5 w-full">
          {selectionPosts.map((post) => (
            // console.log(post.properties.Tags),
            <Card
              key={post.id}
              className="flex items-center justify-center rounded-lg overflow-hidden shadow-2xl h-[350px] w-1/5"
            >
              <div
                className="card-body bg-cover bg-center text-white h-full w-full"
                style={{
                  backgroundImage:
                    `url(${post.cover?.external.url})` || "/car_3tww.png",
                }}
              >
                <Link
                  href={`/news/${post.properties.slug.rich_text[0].plain_text}`}
                  className=" w-full h-full"
                >
                  <div className="bg-gradient-to-t from-[#000000] to-80% flex flex-col justify-center h-full w-full transition-all duration-300 ">
                    <CardHeader className="flex flex-col justify-between items-start h-full">
                      <div className="bg-slate-500 bg-opacity-10 backdrop-blur-sm border border-white border-opacity-45 text-white text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2 w-fit">
                        <span className="{tag}">Tag</span>
                      </div>

                      <CardTitle className="leading-7">
                        {post.properties.Title.title[0].plain_text}
                      </CardTitle>
                    </CardHeader>
                    {/* <CardContent className="w-[80%] ">
                    <p className="line-clamp-2">
                      {post.properties.Description.rich_text[0].plain_text}
                    </p>
                  </CardContent> */}
                    {/* <CardFooter>
                    <Link
                      href={`/news/${post.properties.slug.rich_text[0].plain_text}`}
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
                  </CardFooter> */}
                  </div>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
}