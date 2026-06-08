import { ImageOff } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { AlbumCard, type AlbumCardData } from "@/features/portfolio/AlbumCard";

type AlbumGridProps = {
  albums: AlbumCardData[];
};

export function AlbumGrid({ albums }: AlbumGridProps) {
  if (albums.length === 0) {
    return (
      <EmptyState
        icon={ImageOff}
        title="No albums in this category yet"
        description="Check back soon, or browse another category in the meantime."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
      {albums.map((album, index) => (
        <AlbumCard key={album.slug} album={album} index={index} />
      ))}
    </div>
  );
}
