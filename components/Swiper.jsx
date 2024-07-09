"use client";

import React from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Link from "@/node_modules/next/link";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla" dir="rtl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number overflow-hidden">
                <Card className="flex items-center justify-center rounded-lg overflow-hidden shadow-2xl h-full w-full">
                  <div
                    className="card-body bg-cover bg-center text-white h-full w-full"
                    style={{
                      backgroundImage: "url(/car_3tww.png)",
                    }}
                  >
                    <Link href={`/news`} className=" w-full h-full">
                      <div className="bg-gradient-to-t from-[#000000] to-80% flex flex-col justify-center h-full w-full transition-all duration-300 ">
                        <CardHeader className="flex flex-col justify-between items-start h-full">
                          <div className="bg-slate-500 bg-opacity-10 backdrop-blur-sm border border-white border-opacity-45 text-white text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-full flex items-center gap-2 w-fit">
                            <span className="{tag}">Tag</span>
                          </div>

                          <CardTitle className="leading-7">عنوان</CardTitle>
                        </CardHeader>
                      </div>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
