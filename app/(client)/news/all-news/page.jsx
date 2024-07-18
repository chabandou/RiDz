import { client, sanityFetch } from "@/app/sanity/client";

import Image from "next/image";

import AllNewsHeadlines from "@/components/AllNewsHeadlines";



const ARTICLE_QUERY = `*[_type == "article" && "news" in tags]{_id, name, description, slug, tags, publishedAt, mainImage}|order(date desc)`;


export default async function allNews() {
  const posts = await sanityFetch({ query: ARTICLE_QUERY });
  // console.log(posts[0]);

  return (
    <main className="flex flex-col gap-12 max-w-[1920px] px-6 " dir="rtl">
      <section className="Latest-section relative grid grid-cols-1 lg:grid-cols-3 mx-auto sm:px-16 px-6 mt-2 w-full mb-4">
        <AllNewsHeadlines posts={posts} title="كل الأخبار" />

        <div className="flex items-start justify-start flex-col gap-8 h-[95vh] bg-gradient-to-b from-[#15803cdc] to-[#059668e0] rounded-lg p-6 text-white border-white border-spacing-7 inset-4">
          <div className="w-full flex items-start justify-center gap-2">
            <span className="text-3xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              الأكثر تفاعلاً
            </span>
            <Image
              src="/fire.svg"
              width={32}
              height={32}
              alt="fire"
              className=" "
            />
          </div>
          <div className="w-full h-full flex flex-col justify-start gap-5">

          </div>
        </div>
      </section>
    </main>
  );
}






// export default async function IndexPage() {

//   return (
//     <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
//       <h1 className="text-4xl font-bold tracking-tighter">Events</h1>
//       <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
//         {events.map((event) => (
//           <li className="bg-white p-4 rounded-lg" key={event._id}>
//             <Link
//               className="hover:underline"
//               href={`/news/article/${event.slug.current}`}
//             >
//               <h2 className="text-xl font-semibold">{event?.name}</h2>
//               <p className="text-gray-500">
//                 {new Date(event?.date).toLocaleDateString()}
//               </p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }
