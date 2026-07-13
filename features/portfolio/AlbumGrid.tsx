"use client";

import { useEffect, useRef } from "react";
import { usePaginatedQuery } from "convex/react";
import { ImageOff } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { EmptyState } from "@/components/shared/EmptyState";
import { AlbumCard } from "@/features/portfolio/AlbumCard";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 8;

type AlbumGridProps = {
  category?: string;
};

export function AlbumGrid({ category }: AlbumGridProps) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.albums.listPublished,
    { category },
    { initialNumItems: PAGE_SIZE }
  );
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Auto-loads the next page as the sentinel nears the viewport — no
  // "Load more" button, matching how the rest of the site reveals content.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "CanLoadMore") {
          loadMore(PAGE_SIZE);
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [status, loadMore]);

  if (status === "LoadingFirstPage") {
    return (
      <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-5">
            <Skeleton className="aspect-16/11 w-full rounded-xl" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-7 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <EmptyState
        icon={ImageOff}
        title="No albums in this category yet"
        description="Check back soon, or browse another category in the meantime."
      />
    );
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
        {results.map((album, index) => (
          <AlbumCard key={album.slug} album={album} index={index} />
        ))}
      </div>
      {status !== "Exhausted" && (
        <div ref={sentinelRef} className="flex justify-center py-4" aria-hidden>
          <div className="size-6 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
      )}
    </div>
  );
}
