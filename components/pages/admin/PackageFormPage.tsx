"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageForm } from "@/features/admin/packages/PackageForm";

export function PackageFormPage({
  secret,
  packageId,
}: {
  secret: string;
  packageId?: Id<"packages">;
}) {
  const existing = useQuery(api.packages.getById, packageId ? { id: packageId } : "skip");

  if (packageId && existing === undefined) {
    return <Skeleton className="h-96 w-full max-w-2xl" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="admin-subheading">
        {packageId
          ? "Update the package's details, pricing, and visibility."
          : "Add a new service package to the pricing page."}
      </p>
      <PackageForm secret={secret} initial={existing ?? undefined} />
    </div>
  );
}
