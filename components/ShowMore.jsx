"use client";
import { useRouter } from "next/navigation";
import { updateSearchParams } from "@/lib/utils";
import { Button } from "./ui/button";

export default function ShowMore({pageNumber, isNext}) {
    const router = useRouter();
    function handleNavigation() {
        const newPath = updateSearchParams("limit", (10 * (pageNumber + 1) ).toString());
        router.push(newPath, { scroll: false });
    }
    return (
        <div className="w-full flex items-center justify-center gap-5 mt-10">
            {!isNext && (
                <Button  onClick={handleNavigation} >أظهر المزيد</Button>
            )}
        </div>
    );
}