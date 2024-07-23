"use client";

import React, { useEffect, useRef, useState, visible } from "react";
import Lottie from "lottie-react";

const LottieAnimation = ({
  animationData,
  loop = false,
  autoplay = false,
  style = {},
  delay = 0,
  hover = false,
}) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div
      onMouseEnter={
        hover
          ? () => {
              if (lottieRef.current) {
                lottieRef.current.play();
              }
            }
          : null
      }
      onMouseLeave={
        hover
          ? () => {
              if (lottieRef.current) {
                lottieRef.current.pause();
              }
            }
          : null
      }
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={style}
        lottieRef={lottieRef}
      />
    </div>
  );
};

export default LottieAnimation;
