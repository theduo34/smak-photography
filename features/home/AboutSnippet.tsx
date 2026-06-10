"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Aperture } from "lucide-react";

type AboutSnippetProps = {
  snippet: string;
};

export function AboutSnippet({ snippet }: AboutSnippetProps) {
  return (
    <section className="section-shell section-padding">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="media-placeholder aspect-[4/3] overflow-hidden rounded-lg border border-border lg:order-last"
          aria-hidden
        >
          <Aperture className="size-16 text-primary/50" strokeWidth={1} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="mx-auto flex max-w-md flex-col gap-4"
        >
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            About the studio
          </span>
          <p className="font-heading text-2xl leading-relaxed text-balance text-foreground sm:text-3xl lg:text-4xl">
            {snippet}
          </p>
          <Link href="/about" className="link-arrow">
            Our story
            <ArrowUpRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
