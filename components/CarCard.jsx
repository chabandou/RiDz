"use client";

import { generateCarImageUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { LoaderIcon, LoaderPinwheel } from "lucide-react";

export default function CarCard({ car }) {
  console.log(car);
  const { city_mpg, year, make, model, transmission, drive } = car;
  const carImageUrl = generateCarImageUrl(car);

  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await generateCarImageUrl(car);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, []);

  const carPrice = city_mpg * (year / 2005 + 1) * 1000;

  let key = 1 + car.city_mpg;

  return (
    <div
      className="flex flex-col p-6 justify-center items-start text-gray-800 bg-green-100/40 hover:bg-white hover:shadow-md rounded-3xl group"
      key={key}
    >
      <div className="w-full flex justify-between items-start gap-2">
        <h2 className="text-[22px] leading-[26px] font-bold capitalize text-green-700">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold z-10 text-gray-700">
        <span className="self-start text-[14px] font-semibold ">€</span>
        {carPrice > 1000
          ? `${`${carPrice}`
              .split(".")[0]
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          : carPrice}
        <span className="self-end text-[14px] font-medium ">MSRP</span>
      </p>
      <div className="relative w-full h-44 my-3 oject-contain bg-white  border-2 border-primary rounded-2xl flex justify-center items-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="car model"
            className="object-contain scale-110  border-2 border-primary rounded-2xl group-hover:border-transparent"
            fill
            priority
          />
        ) : <LoaderPinwheel size={40}  className="animate-spin text-primary"/>}
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              className="object-contain"
              alt="steering wheel"
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatique" : "Manuelle"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/tire.svg"
              width={20}
              height={20}
              className="object-contain"
              alt="tire"
            />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/gas.svg"
              width={20}
              height={20}
              className="object-contain"
              alt="gas"
            />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="hidden group-hover:flex absolute bottom-0 w-full z-10">
          <Button
            className="w-full py-[16px] rounded-full bg-[#058c42ff] text-white text-[14px] font-bold leading-[17px]"
            handleClick={() => {
              setIsOpen(true);
            }}
          >
            {" "}
            Afficher plus{" "}
          </Button>
        </div>
      </div>

      {/* <CarDetails
          isOpen={isOpen}
          car={car}
          closeModal={() => setIsOpen(false)}
        /> */}
    </div>
  );
}
