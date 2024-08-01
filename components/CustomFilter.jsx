"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { updateSearchParams } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";

export function CustomFilter({ title, options, prm }) {
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  function handleUpdateParams(e) {
    const newPathName = updateSearchParams(prm, e.value.toLowerCase());

    router.push(newPathName, { scroll: false });
  }

  const ref = useRef(null);
  function getWidth() {
    const width = ref.current?.offsetWidth;
    console.log(width);
    return width;
  }

  return (
    <div ref={ref} className="w-full drop-down-menu drop-shadow-md">
      <DropdownMenu className="w-full">
        <DropdownMenuTrigger asChild>
          <Button className="w-full justify-between" variant="outline">
            {selected ? selected.title : title} <ChevronsUpDown size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`w-[50vw]`}>
          <DropdownMenuLabel className="" dir="rtl">
            {title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              dir="rtl"
              key={option.value}
              checked={option.value === selected?.value}
              onCheckedChange={() => {
                setSelected(option);
                handleUpdateParams(option);
              }}
            >
              {option.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
