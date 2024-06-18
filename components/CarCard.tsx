"use client";

import { CarProps } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import { generateCarImageUrl } from "@/utils";

interface CarCardProps {
  car: CarProps;
}



export default function CarCard({ car }: CarCardProps) {
  const { city_mpg, year, make, model, transmission, drive } = car;

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
    <div className="car-card group" key={key}>
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold z-10">
        <span className="self-start text-[14px] font-semibold ">€</span>
        {carPrice > 1000
          ? `${`${carPrice}`
              .split(".")[0]
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          : carPrice}
        <span className="self-end text-[14px] font-medium">MSRP</span>
      </p>
      <div className="relative w-full h-44 my-3 oject-contain bg-white">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="car model"
            className="object-contain scale-110"
            fill
            priority
          />
        )}
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

        <div className="car-card__btn-container">
          <CustomButton
            title="Afficher plus"
            containerStyles="w-full py-[16px] rounded-full bg-[#058c42ff]"
            textStyles="text-white text-[14px] font-bold leading-[17px]"
            rightIcon="/right-arrow.svg"
            handleClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        car={car}
        closeModal={() => setIsOpen(false)}
      />
    </div>
  );
}
