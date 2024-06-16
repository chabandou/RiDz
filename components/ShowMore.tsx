"use client";
import { useRouter } from "next/navigation";
import { ShowMoreProps } from "@/types";
import CustomButton from "./CustomButton";
import { updateSearchParams } from "@/utils";

export default function ShowMore({pageNumber, isNext}: ShowMoreProps) {
    const router = useRouter();
    function handleNavigation() {
        const newPath = updateSearchParams("limit", (10 * (pageNumber + 1) ).toString());
        router.push(newPath, { scroll: false });
    }
    return (
        <div className="w-full flex-center gap-5 mt-10">
            {!isNext && (
                <CustomButton title="Afficher plus" btnType="button" containerStyles="bg-primary-blue text-white rounded-full" handleClick={handleNavigation} />
            )}
        </div>
    );
}