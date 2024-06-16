"use client";
import { CustomButtonProps } from "@/types";
import Image from "next/image";

export default function CustomButton({
    title, containerStyles, btnType, textStyles, rightIcon, handleClick}: CustomButtonProps) {
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>
        {rightIcon && (
            <div className="relative w-6 h-6">
                <Image
                    src={rightIcon}
                    alt="right icon"
                    className="object-contain"
                    fill
                />
            </div>
        )}
    </button>
  );
}
