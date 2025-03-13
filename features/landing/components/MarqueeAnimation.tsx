/* eslint-disable react/no-array-index-key */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MarqueeProps {
  leftImages: string[] | undefined;
  rightImages: string[] | undefined;
}

function MarqueeRight({ rightImages }: { rightImages: string[] | undefined }) {
  return (
    <div className="relative h-full w-1/3 overflow-hidden md:w-1/4">
      <motion.div
        className="flex flex-col gap-4 md:gap-6 lg:gap-8"
        animate={{
          y: ["-50%", "0%"],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {rightImages &&
          rightImages.map((src, index) => (
            <div
              key={`right-${index}`}
              className="relative h-60 w-full"
              style={{ width: "100%", height: "auto", aspectRatio: "auto" }}
            >
              <Image
                src={src}
                alt={`marquee-right-${index}`}
                width={0}
                height={0}
                sizes="100%"
                className="h-auto w-full drop-shadow-lg"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </div>
          ))}

        {rightImages &&
          rightImages.map((src, index) => (
            <div
              key={`right-clone-${index}`}
              className="relative w-full"
              style={{ width: "100%", height: "auto", aspectRatio: "auto" }}
            >
              <Image
                src={src}
                alt={`marquee-right-clone-${index}`}
                width={0}
                height={0}
                sizes="100%"
                className="h-auto w-full drop-shadow-lg"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </div>
          ))}
      </motion.div>
    </div>
  );
}

function MarqueeLeft({ leftImages }: { leftImages: string[] | undefined }) {
  return (
    <div className="relative h-full w-2/3 overflow-hidden md:w-3/4">
      <motion.div
        className="flex flex-col items-start gap-4 md:gap-6 lg:gap-8"
        animate={{
          y: ["0%", "-50%"],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {leftImages &&
          leftImages.map((src, index) => (
            <div
              key={`left-${index}`}
              className="relative w-full"
              style={{ width: "100%", height: "auto", aspectRatio: "auto" }}
            >
              <Image
                src={src}
                alt={`marquee-left-${index}`}
                width={0}
                height={0}
                sizes="100%"
                className="h-auto w-full drop-shadow-lg"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </div>
          ))}
        {leftImages &&
          leftImages.map((src, index) => (
            <div
              key={`left-clone-${index}`}
              className="relative w-full"
              style={{ width: "100%", height: "auto", aspectRatio: "auto" }}
            >
              <Image
                src={src}
                alt={`marquee-left-clone-${index}`}
                width={0}
                height={0}
                sizes="100%"
                className="h-auto w-full drop-shadow-lg"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </div>
          ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeAnimation({
  leftImages,
  rightImages,
}: MarqueeProps) {
  return (
    <div className="flex h-full w-full justify-start gap-8 overflow-hidden px-4 md:gap-12 md:px-8 lg:px-24">
      <MarqueeLeft leftImages={leftImages} />
      <MarqueeRight rightImages={rightImages} />
    </div>
  );
}
