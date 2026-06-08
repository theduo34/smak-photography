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
        <div className="relative aspect-[16/11] overflow-hidden rounded-xl">
          <Image
            src={album.cover.url}
            alt={album.cover.alt}
            fill
            placeholder="blur"
            blurDataURL={album.cover.blurDataURL}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-5 flex flex-col gap-1.5">
          <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            {album.category} · {album.photoCount} photos
          </span>
          <h3 className="text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-muted-foreground sm:text-3xl">
            {album.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
