"use client";

import Image from "next/image";
import type { Doc } from "@/convex/_generated/dataModel";

type PhotoItemProps = {
  image: Doc<"photos">["image"];
  onClick: () => void;
};

export function PhotoItem({ image, onClick }: PhotoItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mb-4 block w-full overflow-hidden rounded-lg break-inside-avoid"
    >
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </button>
  );
}
