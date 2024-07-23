"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function DotLottieAnimation(src, hover = false) {
  return (
    <DotLottieReact
      src={src}
      playOnHover={hover}
    />
  );
};