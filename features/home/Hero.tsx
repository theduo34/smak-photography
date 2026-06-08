"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppButton } from "@/features/enquiry/WhatsAppButton";
import { cn } from "@/lib/utils";
import type { Doc } from "@/convex/_generated/dataModel";

type HeroProps = {
  image: Doc<"siteSettings">["hero"]["image"];
  headline: string;
  subtext: string;
  whatsapp: string;
};

export function Hero({ image, headline, subtext, whatsapp }: HeroProps) {
  return (
    <section className="relative -mt-16 flex min-h-[88vh] items-end overflow-hidden">
      <Image
        src={image.url}
        alt={image.alt}
        fill
        priority
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-foreground/40" aria-hidden />
      <div className="section-shell relative z-10 flex flex-col gap-6 pt-32 pb-16 sm:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-background sm:text-6xl"
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
          <Link
            href="/portfolio"
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            View Our Work
          </Link>
          <WhatsAppButton
            phone={whatsapp}
            message="Hi! I'd like to enquire about a photoshoot."
            size="lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
