"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type MapEmbedProps = {
  mapsUrl: string;
};

export function MapEmbed({ mapsUrl }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border sm:aspect-video">
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <iframe
        src={mapsUrl}
        title="Smak Photography studio location"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    </div>
  );
}
