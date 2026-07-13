"use client";

import { useState } from "react";
import { usePaginatedQuery, useMutation } from "convex/react";
import { Inbox, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/shared/EmptyState";
import { EnquiryDetailSheet } from "@/features/admin/enquiries/EnquiryDetailSheet";
import { ConfirmDeleteDialog } from "@/features/admin/shared/ConfirmDeleteDialog";

const STATUS_VARIANT: Record<Doc<"enquiries">["status"], "default" | "secondary" | "outline"> = {
  new: "default",
  contacted: "secondary",
  booked: "outline",
  closed: "outline",
};

type StatusFilter = "all" | Doc<"enquiries">["status"];

export function EnquiriesTable() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<Doc<"enquiries"> | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Id<"enquiries"> | null>(null);
  const remove = useMutation(api.enquiries.remove);

  const { results, status, loadMore } = usePaginatedQuery(
    api.enquiries.listAll,
    statusFilter === "all" ? {} : { status: statusFilter },
    { initialNumItems: 25 }
  );

  return (
    <div className="flex flex-col gap-4">
      <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="booked">Booked</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      {status === "LoadingFirstPage" ? (
        <Skeleton className="h-64 w-full" />
      ) : results.length === 0 ? (
        <EmptyState icon={Inbox} title="No enquiries" description="Enquiries from the site will show up here." />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((enquiry) => (
                <TableRow
                  key={enquiry._id}
                  className="cursor-pointer"
                  onClick={() => setSelected(enquiry)}
                >
                  <TableCell className="font-medium text-foreground">{enquiry.name}</TableCell>
                  <TableCell className="text-muted-foreground">{enquiry.phone}</TableCell>
                  <TableCell className="capitalize text-muted-foreground">{enquiry.source}</TableCell>
                  <TableCell className="text-muted-foreground">{enquiry.packageName ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[enquiry.status]} className="capitalize">
                      {enquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(event) => {
                        event.stopPropagation();
                        setPendingDelete(enquiry._id);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {status === "CanLoadMore" && (
            <Button variant="outline" onClick={() => loadMore(25)} className="self-center">
              Load more
            </Button>
          )}
        </>
      )}

      <EnquiryDetailSheet enquiry={selected} onOpenChange={(open) => !open && setSelected(null)} />
      <ConfirmDeleteDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete enquiry?"
        description="This permanently removes the enquiry record."
        onConfirm={() => {
          if (!pendingDelete) return;
          void remove({ id: pendingDelete }).catch(() => toast.error("Could not delete enquiry"));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
