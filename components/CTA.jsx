"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

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

const formSchema = z.object({
  email: z.string().email("البريد الالكتروني غير صالح"),
});

export default function CTA() {
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
  return (
    <section className="CTA-section relative w-full h-[90vh] md:h-[80vh] lg:h-[90vh] grid grid-cols-1 gap-2">
      <div className="w-full h-full overflow-hidden absolute top-0 left-0 -z-10">
        <Image
          src="/CTA-newsletter2.jpg"
          className=" w-full h-full object-cover object-bottom"
          width={1024}
          height={1024}
          alt="CTA"
        />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-between gap-12 pt-12 text-white">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <h2 className="text-4xl md:text-5xl  font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
            ابقَ في المقدمة
          </h2>
          <p className="text-lg  text-opacity-70 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
            انضم إلى مجتمع عشاق السيارات
          </p>
        </div>
        <div className="w-full  flex flex-col items-center justify-center text-center gap-8 pt-12 pb-12 backdrop-blur-sm border-t-2 border-[#e6e6e659]">
          <div
            className={clsx(
              "flex flex-col items-center justify-center text-center gap-8",
              emailRes === 200 && "hidden"
            )}
          >
            <p className="text-lg lg:w-[75ch]  text-opacity-70 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
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
          </div>
          <div
            className={clsx(
              "flex flex-col items-center justify-center text-center gap-8",
              emailRes !== 200 && "hidden"
            )}
          >
            <CheckCircleIcon
              stroke="rgb(22 163 74)"
              className="w-32 h-32 text-white drop-shadow-[1px_1px_0_rgba(255,255,255)]"
            />
            <p className="text-lg lg:text-xl lg:w-[75ch]  text-opacity-70 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              تم الإشتراك بقائمة المتلقين بنجاح، شكراً على ثقتكم بنا.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
