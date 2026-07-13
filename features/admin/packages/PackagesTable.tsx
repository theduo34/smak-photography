"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { MoreHorizontal, Package, Plus } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

function formatPrice(pkg: Doc<"packages">) {
  if (pkg.priceType === "custom") return "Custom quote";
  const prefix = pkg.priceType === "from" ? "From " : "";
  return `${prefix}${pkg.currency} ${pkg.price.toLocaleString()}`;
}

export function PackagesTable({
  packages,
  secret,
}: {
  packages: Doc<"packages">[];
  secret: string;
}) {
  const update = useMutation(api.packages.update);
  const remove = useMutation(api.packages.remove);
  const [pendingDelete, setPendingDelete] = useState<Id<"packages"> | null>(null);

  if (packages.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No packages yet"
        description="Create your first service package to show it on the pricing page."
        action={
          <Button
            nativeButton={false}
            render={
              <Link href={`/admin/${secret}/packages/new`}>
                <Plus className="size-4" />
                New package
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
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Popular</TableHead>
          <TableHead>Active</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages.map((pkg) => (
          <TableRow key={pkg._id}>
            <TableCell className="font-medium text-foreground">{pkg.name}</TableCell>
            <TableCell className="text-muted-foreground">{pkg.category}</TableCell>
            <TableCell className="text-muted-foreground">{formatPrice(pkg)}</TableCell>
            <TableCell>{pkg.popular && <Badge variant="secondary">Popular</Badge>}</TableCell>
            <TableCell>
              <Switch
                checked={pkg.active}
                onCheckedChange={(checked) =>
                  void update({ id: pkg._id, active: checked }).catch(() =>
                    toast.error("Could not update package")
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
                  <DropdownMenuItem render={<Link href={`/admin/${secret}/packages/${pkg._id}`}>Edit</Link>} />
                  <DropdownMenuItem variant="destructive" onClick={() => setPendingDelete(pkg._id)}>
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
        title="Delete package?"
        description="This permanently removes the package. Existing enquiries that reference it keep their snapshot of the name."
        onConfirm={() => {
          if (!pendingDelete) return;
          void remove({ id: pendingDelete }).catch(() => toast.error("Could not delete package"));
          setPendingDelete(null);
        }}
      />
    </Table>
  );
}
