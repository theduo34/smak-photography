"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Doc } from "@/convex/_generated/dataModel";

export type FeaturedAlbum = Pick<Doc<"albums">, "slug" | "title" | "category" | "cover">;

type FeaturedAlbumsProps = {
  albums: FeaturedAlbum[];
};

export function FeaturedAlbums({ albums }: FeaturedAlbumsProps) {
  return (
    <section className="section-shell section-padding">
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured work"
            description="A glimpse into recent shoots, weddings, portraits, and events captured around Koforidua and beyond."
          />
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground"
          >
            View all albums
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album, index) => (
            <motion.div
              key={album.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            >
              <Link href={`/portfolio/${album.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={album.cover.url}
                    alt={album.cover.alt}
                    fill
                    placeholder="blur"
                    blurDataURL={album.cover.blurDataURL}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                    {album.category}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-medium text-foreground group-hover:text-muted-foreground">
                  {album.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
