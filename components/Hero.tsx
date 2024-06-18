"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";

export default function Hero() {
  function handleScroll() {}
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Restez à jour sur les voitures dans <span className="Algeria">l'Algerie!</span>
        </h1>
        <p className="hero__subtitle">
          Rationalisez votre expérience d'achat de voiture grâce à notre
          processus de recherche et de comparaison simple.
        </p>
        <CustomButton
          title="Explorez les Voitures"
          containerStyles="bg-[#058c42ff] text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/hero.png"
            alt="hero"
            fill
            className="object-contain"
            priority
          />
        </div>
          <div className="hero__image-overlay"></div>
      </div>
    </div>
  );
}
