"use client";

import imageUrlBuilder from "@sanity/image-url";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import SectionHeader from "./ui/SectionHeader";

import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

const EmblaCarousel = (props) => {
  const urlFor = (source) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const { slides, options, posts, projectId, dataset } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number");
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <section className="w-full flex flex-col items-center justify-center mx-auto sm:px-16 px-2 mt-2 mb-2 gap-8">
      <SectionHeader title="الأحداث المنتظرة" />

      <div className="embla w-full relative mx-auto ">
        <div
          className="embla__viewport w-full lg:w-2/3 mx-auto "
          ref={emblaRef}
        >
          <div className="embla__container w-full h-[45vh] lg:h-[85vh]">
            {posts.map((post, index) => {
              const { _id, name, description, mainImage, GuessedDate } = post;
              const eventImageURL = mainImage
                ? urlFor(mainImage)?.url()
                : null;
              return (
                <div className="embla__slide w-full h-full" key={index}>
                  <div className="embla__slide__number w-full h-full">
                    <div className="h-full w-full">
                      <Card
                        key={post._id}
                        className="flex items-center justify-center rounded-lg overflow-hidden shadow-xl h-[40vh] lg:h-[80vh] w-full"
                      >
                        <div
                          className="card-body bg-cover bg-center text-white h-full w-full"
                          style={{
                            backgroundImage:
                              `url(${eventImageURL})` ||
                              "/car_3tww.png",
                          }}
                        >
                          <div className="bg-gradient-to-t from-[#000000] to-80% flex flex-col justify-center h-full w-full transition-all duration-300 ">
                            <CardHeader className="flex flex-col relative justify-end items-start h-full">
                              <div className="absolute left-0 top-0 translate-y-5 translate-x-5 aspect-square bg-slate-500 bg-opacity-10 backdrop-blur-sm border border-white border-opacity-45 text-white text-xs px-2 py-1 lg:text-sm lg:px-4 lg:py-2 rounded-3xl flex items-center gap-2 ">
                                <span className="{tag} text-xl md:text-2xl lg:text-[2.5rem] opacity-95 lg:leading-[3rem] capitalize w-[6ch]">
                                  {
                                    GuessedDate
                                  }
                                </span>
                              </div>

                              <CardTitle className="text-3xl lg:text-5xl  pb-4">
                                {name}
                              </CardTitle>
                            </CardHeader>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="absolute hidden lg:flex w-fit right-0 top-[50%]  -translate-y-1/2  text-green-600 opacity-75 hover:opacity-90 "
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="absolute hidden lg:flex w-fit left-0 top-[50%] -translate-y-1/2  text-green-600 opacity-75 hover:opacity-90 "
        />
      </div>
    </section>
  );
};

export default EmblaCarousel;
