"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import SeachMakes from "./SeachMakes";
import { useState } from "react";
import Image from "next/image";

import { fuels, yearsOfProduction } from "@/constants";
import { CustomFilter } from "./CustomFilter";
import { useRouter } from "next/navigation";

export default function CarsSearchBar() {

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();


  function handleSearch(e) {
    e.preventDefault();
    if (!make && !model)
      return alert("Veuillez entrer un constructeur ou un modèle");

    updateSearchParams(make.toLowerCase(), model.toLowerCase());
  }

  function updateSearchParams(make, model) {
    const searchParams = new URLSearchParams(window.location.search);
    if (make) {
      searchParams.set("make", make);
    } else {
      searchParams.delete("make");
    }

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname, { scroll: false });
  }
  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-4 mt-4 mb-4 "
      dir="rtl"
    >
      <form onSubmit={handleSearch} className="w-full flex flex-col justify-center items-center gap-4">
        <div className="flex w-full h-[3em] ">
          <SeachMakes setMake={setMake} />
          <Button type="submit" className="sm:hidden h-full rounded-s-none">
            <Search size={20} />
          </Button>
        </div>
        <div className="flex h-[3em] w-full">
          <div className="relative w-full focus-within:border-green-500 active min-h-[1.5em] border-none bg-gray-100 border-[#777] flex items-center gap-[.5em] p-[.5em] rounded-full rounded-e-none focus:border-green-500">
            <Image
              src={"/sedan-car-model-svgrepo-com.svg"}
              width={25}
              height={25}
              className="opacity-80 scale-125"
              alt="car model"
            />
            <input
              type="text"
              name="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="موديل السيارة"
              className="input w-full bg-gray-100 placeholder:text-[#777]  border-none active:outline-none focus:outline-none active:border-none pr-[.25em] "
            />
          </div>
          <Button type="submit" className="sm:hidden h-full rounded-s-none">
            <Search size={20} />
          </Button>
        </div>
      </form>
      <div className="w-full grid grid-cols-2 gap-4">
        <CustomFilter title="الوقود" prm="fuel" options={fuels} />
        <CustomFilter
          title="سنة الصنع"
          prm="year"
          options={yearsOfProduction}
        />
      </div>
    </div>
  );
}
