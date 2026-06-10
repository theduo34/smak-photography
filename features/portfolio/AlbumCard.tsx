"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
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
          <div
            className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10"
            aria-hidden
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-100 transition-all duration-300 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
            View album
            <ArrowUpRight className="size-3.5" />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-1.5">
          <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            <span className="text-primary">{album.category}</span> · {album.photoCount} photos
          </span>
          <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-muted-foreground sm:text-3xl">
            {album.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
