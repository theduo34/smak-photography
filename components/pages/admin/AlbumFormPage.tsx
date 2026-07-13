"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { AlbumForm } from "@/features/admin/albums/AlbumForm";
import { PhotosManager } from "@/features/admin/albums/PhotosManager";

export function AlbumFormPage({ secret, albumId }: { secret: string; albumId?: Id<"albums"> }) {
  const existing = useQuery(api.albums.getById, albumId ? { id: albumId } : "skip");

  if (albumId && existing === undefined) {
    return <Skeleton className="h-96 w-full max-w-2xl" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="admin-subheading">
        {albumId
          ? "Update the album's details, visibility, and photos."
          : "Add a new album to the portfolio."}
      </p>
      <AlbumForm secret={secret} initial={existing ?? undefined} />
      {existing && (
        <>
          <Separator className="max-w-3xl" />
          <PhotosManager albumId={existing._id} albumTitle={existing.title} />
        </>
      )}
    </div>
  );
}
