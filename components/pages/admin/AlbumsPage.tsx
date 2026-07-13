"use client";

import Link from "next/link";
import { usePaginatedQuery } from "convex/react";
import { Loader2, Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlbumsTable } from "@/features/admin/albums/AlbumsTable";

const PAGE_SIZE = 15;

export function AlbumsPage({ secret }: { secret: string }) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.albums.listAll,
    {},
    { initialNumItems: PAGE_SIZE }
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="admin-subheading">Manage the portfolio albums shown on the site.</p>
        <Button
          nativeButton={false}
          render={
            <Link href={`/admin/${secret}/albums/new`}>
              <Plus className="size-4" />
              New album
            </Link>
          }
        />
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4">
          {status === "LoadingFirstPage" ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <AlbumsTable albums={results} secret={secret} />
          )}

          {status !== "LoadingFirstPage" && status !== "Exhausted" && (
            <Button
              variant="outline"
              className="self-center"
              disabled={status === "LoadingMore"}
              onClick={() => loadMore(PAGE_SIZE)}
            >
              {status === "LoadingMore" && <Loader2 className="size-4 animate-spin" />}
              Load more
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
