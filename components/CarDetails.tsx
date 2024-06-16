"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";

import { CarProps } from "@/types";
import { generateCarImageUrl } from "@/utils";

interface CarDetailsProps {
  car: CarProps;
  isOpen: boolean;
  closeModal: () => void;
}


export default function CarDetails({
  car,
  isOpen,
  closeModal,
}: CarDetailsProps) {
  
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
}, []);


  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-lg max-h-[90vh] transform overflow-y-auto rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 rounded-lg bg-pattern bg-cover bg-center">
                      { imageUrl[0] && <Image
                        src={imageUrl[0]}
                        alt="car model"
                        fill
                        sizes="(100vw, 100vh)"
                        priority
                        className="object-contain"
                      />}
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 rounded-lg bg-primary-blue-100">
                        { imageUrl[1] && <Image
                          src={imageUrl[1]}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />}
                      </div>
                      <div className="flex-1 relative w-full h-24 rounded-lg bg-primary-blue-100">
                        { imageUrl[2] && <Image
                          src={imageUrl[2]}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />}
                      </div>
                      <div className="flex-1 relative w-full h-24 rounded-lg bg-primary-blue-100">
                        { imageUrl[3] && <Image
                          src={imageUrl[3]}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold capitalize">
                        {car.make} {car.model}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-5 w-full text-right border-b-2 border-black-100 border-opacity-15">
                            <h4 className="text-grey font-semibold capitalize">{key.split("_").join(" ")}:</h4> 
                            <p className="text-primary-blue font-extrabold text-[18px] capitalize">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
