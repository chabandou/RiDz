"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

import { generateCarImageUrl } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import clsx from "clsx";

export default function CarDetails({ car, isOpen, closeModal }) {
  const [imageUrl, setImageUrl] = useState([""]);

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await generateCarImageUrl(car);
      const url2 = await generateCarImageUrl(car, "118");
      const url3 = await generateCarImageUrl(car, "117");
      const url4 = await generateCarImageUrl(car, "119");
      setImageUrl([url, url2, url3, url4]);
    };

    fetchImageUrl();
  }, [ car ]);

  return (
    <div>
      <Dialog>
        <div className="w-[55vw] md:w-[35vw] xl:w-[18vw] absolute bottom-8 left-1/2 -translate-x-1/2 z-10 items-center justify-center mx-auto hidden group-hover:flex">
          <DialogTrigger style={{ width: "100%" }}>
            <span className={clsx(buttonVariants({ variant: "default" }), "w-full bg-[#058c42ff]")}>الخصائص</span>
          </DialogTrigger>
        </div>
        <DialogContent className="w-[90vw] rounded-lg py-4 px-2">
            <div className="relative w-full max-w-lg max-h-[90vh] transform overflow-y-auto rounded-2xl bg-white p-6 text-left transition-all flex flex-col gap-5">

            <div className="flex-1 flex flex-col gap-3">
              <div className="relative w-full h-40 bg-cover bg-center border-b-[3px] border-[#058c42ff]">
                {imageUrl[0] && (
                  <Image
                    src={imageUrl[0]}
                    alt="car model"
                    fill
                    sizes="(100vw, 100vh)"
                    priority
                    className="object-contain"
                  />
                )}
              </div>
              <div className="flex gap-3 border-b-[3px] border-[#058c42ff] pb-2">
                <div className="flex-1 relative w-full h-24 rounded-lg">
                  {imageUrl[1] && (
                    <Image
                      src={imageUrl[1]}
                      alt="car model"
                      fill
                      priority
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="flex-1 relative w-full h-24 rounded-lg">
                  {imageUrl[2] && (
                    <Image
                      src={imageUrl[2]}
                      alt="car model"
                      fill
                      priority
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="flex-1 relative w-full h-24 rounded-lg">
                  {imageUrl[3] && (
                    <Image
                      src={imageUrl[3]}
                      alt="car model"
                      fill
                      priority
                      className="object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-xl font-semibold capitalize">
                {car.make} {car.model}
              </h2>
              <div className="mt-3 flex flex-wrap gap-4">
                {Object.entries(car).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-5 w-full text-right border-b-2 border-black-100 border-opacity-15"
                  >
                    <h4 className="text-grey font-semibold capitalize">
                      {key.split("_").join(" ")}:
                    </h4>
                    <p className="text-[#058c42ff] font-extrabold text-[18px] capitalize">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
