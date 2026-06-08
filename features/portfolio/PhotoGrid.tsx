"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { PhotoItem } from "@/features/portfolio/PhotoItem";
import { Lightbox } from "@/features/portfolio/Lightbox";
import type { Doc } from "@/convex/_generated/dataModel";

type PhotoGridProps = {
  photos: Doc<"photos">[];
};

export function PhotoGrid({ photos }: PhotoGridProps) {
  const [index, setIndex] = useState(-1);

  if (photos.length === 0) {
    return (
      <EmptyState
        icon={ImageOff}
        title="No photos yet"
        description="Photos for this album are still being prepared. Check back soon."
      />
    );
  }

  const slides = photos.map((photo) => ({
    src: photo.image.url,
    width: photo.image.width,
    height: photo.image.height,
    alt: photo.image.alt,
  }));

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <PhotoItem key={photo._id} image={photo.image} onClick={() => setIndex(i)} />
        ))}
      </div>
      <Lightbox slides={slides} index={index} open={index >= 0} onClose={() => setIndex(-1)} />
    </>
  );
}
