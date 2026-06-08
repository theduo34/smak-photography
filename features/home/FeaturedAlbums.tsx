import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AlbumCard, type AlbumCardData } from "@/features/portfolio/AlbumCard";

export type FeaturedAlbum = AlbumCardData;

type FeaturedAlbumsProps = {
  albums: FeaturedAlbum[];
};

export function FeaturedAlbums({ albums }: FeaturedAlbumsProps) {
  return (
    <div className={"relative"}>
        <section className="section-shell section-padding">
            <div className="flex flex-col gap-10">
                <SectionHeading
                    eyebrow="Portfolio"
                    title="Featured work"
                    description="A glimpse into recent shoots, weddings, portraits, and events captured around Koforidua and beyond."
                />

                <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
                    {albums.map((album, index) => (
                        <AlbumCard key={album.slug} album={album} index={index} />
                    ))}
                </div>

                <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-1.5 self-center text-sm font-medium text-foreground hover:text-muted-foreground"
                >
                    View all albums
                    <ArrowUpRight className="size-4" />
                </Link>
            </div>
        </section>
        <div aria-hidden className="absolute inset-0 pointer-events-none select-none">
            <div className="dot-grid absolute inset-0 opacity-25" />
        </div>
    </div>
  );
}
