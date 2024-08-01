"use client";

import { manufacturers } from "@/constants";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import clsx from "clsx";
import Image from "next/image";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

export default function SeachMakes({ make, setMake }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => setOpen(false));

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  function handleClear() {
    setQuery("");
    document.querySelector(".input").value = "";
  }
  function handleSearch(e) {
    e.preventDefault();
    // document.querySelector(".input").value = e.target.innerText;
    setQuery(e.target.innerText);
    setMake(e.target.innerText);
    setOpen(false);
  }

  return (
    <div
      tabIndex={0}
      ref={ref}
      className="relative w-full focus-within:border-green-500 active min-h-[1.5em] border-none bg-gray-100 placeholder:text-[#777] flex items-center gap-[.5em] p-[.5em] rounded-full rounded-e-none focus:border-green-500"
    >
      <Image
        src="/toyota.svg"
        className="opacity-80"
        width={25}
        height={25}
        alt="car logo"
      />
      <input
        value={query}
        placeholder="أدخل الشركة المصنعة..."
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        className="input w-full bg-gray-100 placeholder:text-[#777]  border-none active:outline-none focus:outline-none active:border-none pr-[.25em]"
      />
      <button
        onClick={handleClear}
        className="bg-none text-[#777] border-none outline-none cursor-pointer p-0 font-[1.5em] focus:text-[#333] hover:text-[#333]"
      >
        &times;
      </button>
      <div className="divider bg-[#777] w-[.05em] self-stretch"></div>
      <div
        onClick={() => setOpen(!open)}
        className="caret border-transparent border-[.25em] border-t-[#777] translate-y-1/4 hover:border-t-green-500 cursor-pointer transition-all duration-300 ease-out"
      ></div>
      <ul
        className={clsx(
          "options absolute top-[calc(100%+.5em)] right-0 w-full max-h-[15em] overflow-y-auto bg-gray-100 border-[.1em] rounded-[.5em] p-[.25em] z-30",
          {
            hidden: !open,
          }
        )}
      >
        {filteredManufacturers.map((manufacturer) => (
          <li
            key={manufacturer}
            onClick={handleSearch}
            className={clsx(
              "option py-[.25em] px-[.5em] hover:bg-green-700 hover:text-white cursor-pointer",
              {
                // "bg-green-300": selectedStatus === manufacturer
              }
            )}
          >
            {manufacturer}
          </li>
        ))}
      </ul>
    </div>
  );
}

{
  /*
    const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  <Popover open={open} onOpenChange={setOpen}>
<PopoverTrigger asChild>
  <Button
    variant="outline"
    size="sm"
    className="w-[150px] items-center justify-between"
  >
    {selectedStatus ? <>{selectedStatus}</> : <>إختر الصانع</>}
    <ChevronsUpDown className=" h-4 w-4  shrink-0 opacity-50" />
  </Button>
</PopoverTrigger>
<PopoverContent className="p-0" align="start">
  <Command>
    <CommandInput placeholder="إدخل الصانع" />
    <CommandList className="z-20">
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup className="z-20">
        {manufacturers.map((manufacturer) => (
          <CommandItem
            className="z-20"
            key={manufacturer}
            value={manufacturer}
            onSelect={(value) => {
              setSelectedStatus(value);
              setOpen(false);
            }}
          >
            <span>{manufacturer}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  </Command>
</PopoverContent>
</Popover> */
}
