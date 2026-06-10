import Image from "next/image";
import { PhotoGrid } from "@/features/portfolio/PhotoGrid";
import { AlbumBackLink } from "@/features/portfolio/AlbumBackLink";
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
        <div className="section-shell absolute inset-x-0 top-20 z-20">
          <AlbumBackLink />
        </div>
        <div className="section-shell relative z-10 flex flex-col gap-3 pt-24 pb-12 text-background sm:pt-32">
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
