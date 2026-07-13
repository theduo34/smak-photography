"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "convex/react";
import { Images, MoreHorizontal, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDeleteDialog } from "@/features/admin/shared/ConfirmDeleteDialog";

export function AlbumsTable({ albums, secret }: { albums: Doc<"albums">[]; secret: string }) {
  const update = useMutation(api.albums.update);
  const remove = useMutation(api.albums.remove);
  const [pendingDelete, setPendingDelete] = useState<Id<"albums"> | null>(null);

  if (albums.length === 0) {
    return (
      <EmptyState
        icon={Images}
        title="No albums yet"
        description="Create your first album to start building the portfolio."
        action={
          <Button
            nativeButton={false}
            render={
              <Link href={`/admin/${secret}/albums/new`}>
                <Plus className="size-4" />
                New album
              </Link>
            }
          />
        }
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Album</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Photos</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Published</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album) => (
          <TableRow key={album._id}>
            <TableCell>
              <Link href={`/admin/${secret}/albums/${album._id}`} className="flex items-center gap-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image src={album.cover.url} alt={album.cover.alt} fill className="object-cover" />
                </div>
                <span className="font-medium text-foreground hover:underline">{album.title}</span>
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">{album.category}</TableCell>
            <TableCell className="text-muted-foreground">{album.photoCount}</TableCell>
            <TableCell>
              {album.featured && <Star className="size-4 fill-primary text-primary" />}
            </TableCell>
            <TableCell>
              <Switch
                checked={album.published}
                onCheckedChange={(checked) =>
                  void update({ id: album._id, published: checked }).catch(() =>
                    toast.error("Could not update album")
                  )
                }
              />
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon-lg">
                      <MoreHorizontal className="size-5" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem render={<Link href={`/admin/${secret}/albums/${album._id}`}>Edit</Link>} />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setPendingDelete(album._id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <ConfirmDeleteDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete album?"
        description="This permanently deletes the album, all of its photos, and the uploaded image files. This can't be undone."
        onConfirm={() => {
          if (!pendingDelete) return;
          void remove({ id: pendingDelete }).catch(() => toast.error("Could not delete album"));
          setPendingDelete(null);
        }}
      />
    </Table>
  );
}
