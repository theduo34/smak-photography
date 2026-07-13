"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { ArrowDown, ArrowUp, Images, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { ImageUploadButton } from "@/features/admin/shared/ImageUploadField";
import { ConfirmDeleteDialog } from "@/features/admin/shared/ConfirmDeleteDialog";
import { toImageUpload, type UploadedImage } from "@/lib/upload";

const MAX_PHOTOS_PER_ALBUM = 12;

export function PhotosManager({ albumId, albumTitle }: { albumId: Id<"albums">; albumTitle: string }) {
  const photos = useQuery(api.photos.listByAlbum, { albumId });
  const createPhoto = useMutation(api.photos.create);
  const updatePhoto = useMutation(api.photos.update);
  const removePhoto = useMutation(api.photos.remove);
  const reorderPhotos = useMutation(api.photos.reorder);
  const [pendingDelete, setPendingDelete] = useState<Id<"photos"> | null>(null);

  const count = photos?.length ?? 0;
  const atLimit = count >= MAX_PHOTOS_PER_ALBUM;

  async function handleUploaded(upload: UploadedImage) {
    try {
      await createPhoto({ albumId, image: toImageUpload(upload) });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add photo");
    }
  }

  function move(index: number, direction: -1 | 1) {
    if (!photos) return;
    const target = index + direction;
    if (target < 0 || target >= photos.length) return;
    const ids = photos.map((p) => p._id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    void reorderPhotos({ ids }).catch(() => toast.error("Could not reorder photos"));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-medium text-foreground">Photos</h3>
          <span className="text-xs text-muted-foreground">
            {count} / {MAX_PHOTOS_PER_ALBUM}
          </span>
        </div>
        <ImageUploadButton
          alt={albumTitle}
          onUploaded={handleUploaded}
          disabled={atLimit}
          maxFiles={Math.max(0, MAX_PHOTOS_PER_ALBUM - count)}
        >
          {atLimit ? "Limit reached" : "Add photos"}
        </ImageUploadButton>
      </div>

      {photos === undefined ? (
        <Skeleton className="h-40 w-full" />
      ) : photos.length === 0 ? (
        <EmptyState icon={Images} title="No photos yet" description="Add photos to this album." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo: Doc<"photos">, index: number) => (
            <div key={photo._id} className="flex flex-col gap-2 rounded-lg border border-border p-2">
              <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                <Image src={photo.image.url} alt={photo.image.alt} fill className="object-cover" />
              </div>
              <Input
                defaultValue={photo.caption ?? ""}
                placeholder="Caption (optional)"
                className="h-8 text-xs"
                onBlur={(event) => {
                  const caption = event.target.value.trim();
                  if (caption !== (photo.caption ?? "")) {
                    void updatePhoto({ id: photo._id, caption: caption || undefined }).catch(() =>
                      toast.error("Could not update caption")
                    );
                  }
                }}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowUp className="size-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    disabled={index === photos.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowDown className="size-3.5" />
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 text-destructive hover:text-destructive"
                  onClick={() => setPendingDelete(photo._id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete photo?"
        description="This permanently removes the photo from the album."
        onConfirm={() => {
          if (!pendingDelete) return;
          void removePhoto({ id: pendingDelete }).catch(() => toast.error("Could not delete photo"));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
