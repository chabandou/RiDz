import Image from "next/image";
import { Button } from "./ui/button";

export default function CarShowcaseHero() {
  return (
    <section
      className="flex flex-col xl:flex-row w-full xl:h-[90vh] justify-center items-center gap-4 xl:gap-14 mt-4 mb-4 px-4"
      dir="rtl"
    >
      <div className="flex flex-col w-[90%] xl:w-[60%] items-start justify-start gap-5 ">
        <h1 className="text-[2.6rem] xl:text-6xl font-extrabold leading-normal xl:leading-[4.7rem]">
          إكتشف خصائص و أسعار السيارات في سوق {" "}
          <span className="Algeria">الجـزائـر!</span>{" "}
        </h1>
        <p className="xl:text-lg text-muted-foreground">
          تصفح السيارات المتوفرة في السوق وتعرف على تصاميمها وخصائصها بكل بساطة
          عبر موقعنا و اجعل عملية شراء سيارتك القادمة سهلاً و مدروساً.
        </p>
        <Button className="mt-5">استكشف السيارات</Button>
      </div>
      <div className="relative w-full flex justify-end items-end h-full">
        <div className="w-[90%] xl:w-[90%] h-full py-16 xl:py-8 flex items-center">
            <Image src="/hero.png" alt="hero" width={1000} height={1000} />
        </div>
        <div className="bg-[url('/hero-bg2.png')] bg-contain bg-no-repeat absolute top-[60px] md:top-[30px] bottom-0 xl:top-8 scale-[1.25] md:scale-[1.1] xl:scale-[1.6]  xl:-left-[40%] w-full h-full xl:h-screen box-border  -z-10 -left-1/4 "></div>
      </div>
    </section>
  );
}
