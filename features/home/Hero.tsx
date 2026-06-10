"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppButton } from "@/features/enquiry/WhatsAppButton";
import { HeroCarousel } from "@/features/home/HeroCarousel";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Doc } from "@/convex/_generated/dataModel";

type HeroProps = {
  images: Doc<"siteSettings">["hero"]["images"];
  headline: string;
  subtext: string;
  whatsapp: string;
};

export function Hero({ images, headline, subtext, whatsapp }: HeroProps) {
  return (
    <section className="relative -mt-16 flex min-h-[88vh] items-end overflow-hidden">
      <HeroCarousel images={images} />
      <div className="image-overlay" aria-hidden />
      <div className="section-shell relative z-10 flex flex-col gap-6 pt-32 pb-16 sm:pb-24">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex w-fit items-center rounded-full border border-background/30 px-3 py-1 text-xs font-medium tracking-[0.2em] text-background/90 uppercase"
        >
          {siteConfig.location}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="font-heading max-w-3xl text-4xl font-semibold tracking-tight text-balance text-background sm:text-6xl"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-xl text-lg text-background/85"
        >
          {subtext}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-3"
        >
          <WhatsAppButton
            phone={whatsapp}
            message="Hi! I'd like to enquire about a photoshoot."
            size="lg"
          />
          <Link
            href="/portfolio"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            View Our Work
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6, ease: "easeOut" },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
        }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-background/70"
        aria-hidden
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
