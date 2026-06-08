"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { Doc } from "@/convex/_generated/dataModel";

export type AlbumCardData = Pick<
  Doc<"albums">,
  "slug" | "title" | "category" | "cover" | "photoCount"
>;

type AlbumCardProps = {
  album: AlbumCardData;
  index?: number;
};

export function AlbumCard({ album, index = 0 }: AlbumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: "easeOut" }}
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
        <p className="text-sm text-muted-foreground">{album.photoCount} photos</p>
      </Link>
    </motion.div>
  );
}
