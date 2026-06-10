import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PhotoGrid } from "@/features/portfolio/PhotoGrid";
import type { Doc } from "@/convex/_generated/dataModel";

type AlbumPageProps = {
  album: Doc<"albums">;
  photos: Doc<"photos">[];
};

function formatShootDate(shootDate: string) {
  return new Date(`${shootDate}T00:00:00`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export function AlbumPage({ album, photos }: AlbumPageProps) {
  return (
    <div className="flex flex-col gap-10 pb-16 sm:pb-24">
      <header className="relative -mt-16 flex min-h-[50vh] items-end overflow-hidden">
        <Image
          src={album.cover.url}
          alt={album.cover.alt}
          fill
          priority
          placeholder="blur"
          blurDataURL={album.cover.blurDataURL}
          sizes="100vw"
          className="object-cover"
        />
        <div className="image-overlay" aria-hidden />
        <div className="section-shell absolute inset-x-0 top-20 z-10 sm:top-24">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 rounded-full border border-background/30 bg-foreground/20 py-2 pr-4 pl-2.5 text-sm font-medium text-background backdrop-blur-sm transition-colors hover:bg-foreground/30"
          >
            <ChevronLeft className="size-4" />
            Back
          </Link>
        </div>
        <div className="section-shell relative z-10 flex flex-col gap-3 pt-32 pb-12 text-background">
          <span className="text-sm font-medium tracking-wide text-background/80 uppercase">
            {album.category} · {formatShootDate(album.shootDate)}
          </span>
          <h1 className="font-heading max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {album.title}
          </h1>
          <p className="max-w-2xl text-base text-background/85 sm:text-lg">
            {album.description}
          </p>
        </div>
      </header>
      <div className="section-shell">
        <PhotoGrid photos={photos} />
      </div>
    </div>
  );
}
