"use client";

import Link from "next/link";
import { usePaginatedQuery } from "convex/react";
import { Loader2, Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PackagesTable } from "@/features/admin/packages/PackagesTable";

const PAGE_SIZE = 15;

export function PackagesPage({ secret }: { secret: string }) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.packages.listAll,
    {},
    { initialNumItems: PAGE_SIZE }
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="admin-subheading">Manage the service packages shown on the pricing page.</p>
        <Button
          nativeButton={false}
          render={
            <Link href={`/admin/${secret}/packages/new`}>
              <Plus className="size-4" />
              New package
            </Link>
          }
        />
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4">
          {status === "LoadingFirstPage" ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <PackagesTable packages={results} secret={secret} />
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
