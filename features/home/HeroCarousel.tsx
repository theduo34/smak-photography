"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Doc } from "@/convex/_generated/dataModel";

type HeroCarouselProps = {
  images: Doc<"siteSettings">["hero"]["images"];
};

const SLIDE_DURATION = 6000;

export function HeroCarousel({ images }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = mounted && Boolean(prefersReducedMotion);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduceMotion || images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [images.length, reduceMotion]);

  return (
    <>
      {images.map((image, i) => {
        const active = i === index;
        return (
          <motion.div
            key={image.url}
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
            aria-hidden={!active}
          >
            <motion.div
              initial={false}
              animate={{ scale: reduceMotion ? 1 : active ? 1.08 : 1 }}
              transition={{ duration: SLIDE_DURATION + 1200, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                priority={i === 0}
                placeholder="blur"
                blurDataURL={image.blurDataURL}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        );
      })}
      {images.length > 1 && (
        <div className="absolute right-4 bottom-6 z-10 flex gap-2 sm:right-6">
          {images.map((image, i) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-background"
                  : "w-1.5 bg-background/40 hover:bg-background/70"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
