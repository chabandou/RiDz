"use client";

import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import Lottie from "lottie-web";
import Success from "@/public/Success.json";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import clsx from "clsx";
import { CheckCircleIcon } from "lucide-react";
import BlurFade from "./magicui/blur-fade";
import LottieAnimation from "./LottieAnimation";

const formSchema = z.object({
  email: z.string().email("البريد الالكتروني غير صالح"),
});

export default function CTA() {
  const defaultVariants = {
    hidden: { y: 6, opacity: 0, filter: `blur(6px)` },
    visible: { y: -6, opacity: 1, filter: `blur(0px)` },
    hiddenFinal: {
      y: -12,
      opacity: 0,
      filter: `blur(6px)`,
      transitionEnd: { display: "none" },
    },
  };
  async function addEmail(data) {
    const { email } = data;
    const Email = {
      email,
    };
    const response = await fetch("http://localhost:3000/api/newsletter", {
      method: "POST",
      body: JSON.stringify(Email),
    });
    if (response.status === 200) {
      setEmailRes(200);
    } else
      (error) => {
        console.error(error);
      };
  }
  const [emailRes, setEmailRes] = useState(0);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(data) {
    addEmail(data);
  }
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <section className="CTA-section relative w-full h-[50vh] md:h-[60vh] xl:h-[90vh] grid grid-cols-1 gap-2" dir="rtl">
      <div className="w-full h-full overflow-hidden absolute top-0 left-0 -z-10">
        <Image
          src="/CTA-newsletter3.jpg"
          className=" w-full h-full object-cover object-bottom"
          width={1024}
          height={1024}
          alt="CTA"
        />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-between md:gap-12  text-white">
        <div className="w-full h-full flex flex-col items-center justify-start text-center gap-4 pt-4 md:pt-12 bg-[hsl(0,0%,8%,0.75)] md:bg-transparent">
          <h2 className="text-4xl md:text-5xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
            إبقَ في المقدمة
          </h2>
          <p className="text-lg xl:text-xl md:pt-2  text-opacity-70 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
            انضم إلى مجتمع عشاق السيارات
          </p>
        </div>
        <div className="w-full  flex flex-col items-center justify-center text-center gap-8 pt-12 pb-12 bg-[hsl(0,0%,8%,0.75)] md:bg-[hsl(0,0%,8%,0.85)] md:backdrop-blur-sm ">
          <AnimatePresence mode="wait">
            <motion.div
              initial="hidden"
              animate={emailRes === 200 ? "hiddenFinal" : "visible"}
              exit="hiddenFinal"
              variants={defaultVariants}
              onAnimationComplete={
                emailRes === 200 ? () => setIsSubmitted(true) : null
              }
              transition={{
                delay: 0.04,
                duration: 0.4,
                ease: "easeOut",
              }}
              className={clsx(
                "flex flex-col items-center justify-center text-center gap-8 ",
                isSubmitted ? "hidden" : "block"
              )}
            >
              <p className="px-2 -mb-3 lg:px-0 text-sm md:text-lg xl:text-xl lg:w-[75ch]  text-opacity-70 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                لتصلك آخر الأخبار المتعلقة بالسيارات الجزائرية مباشرة على صندوق
                بريدك الالكتروني سجل لتنظم إلى قائمة المتلقين
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="relative w-fit flex items-center justify-center text-md"
                  dir="ltr"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            className="relative w-[350px] md:w-full lg:w-[500px] h-20 rounded-full  lg:text-lg ps-4 bg-transparent text-white placeholder:text-white  "
                            placeholder="أدخل بريدك الالكتروني"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute -translate-y-1 translate-x-2" />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="absolute right-0 -translate-x-2 w-32  lg:w-40 h-16  rounded-full lg:text-lg active:scale-90 bg-primary/75 hover:bg-opacity-95"
                    type="submit"
                  >
                    إشترك
                  </Button>
                </form>
              </Form>
            </motion.div>
          </AnimatePresence>
          <BlurFade
            delay={0.5}
            inView={true}
            className={clsx(
              "flex flex-col items-center justify-center text-center gap-8",
              isSubmitted ? "block" : "hidden"
            )}
          >
            {isSubmitted && <LottieAnimation
              animationData={Success}
              loop={false}
              delay={700}
              style={{ width: "200px", height: "200px" }}
            />}
            <p className="text-lg lg:text-xl lg:w-[75ch]  text-opacity-70 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              تم الإشتراك بقائمة المتلقين بنجاح، شكراً على ثقتكم بنا.
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
