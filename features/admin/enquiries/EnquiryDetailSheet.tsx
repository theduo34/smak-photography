"use client";

import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EnquiryDetailSheet({
  enquiry,
  onOpenChange,
}: {
  enquiry: Doc<"enquiries"> | null;
  onOpenChange: (open: boolean) => void;
}) {
  const updateStatus = useMutation(api.enquiries.updateStatus);
  const [status, setStatus] = useState<Doc<"enquiries">["status"]>(enquiry?.status ?? "new");
  const [notes, setNotes] = useState(enquiry?.notes ?? "");

  useEffect(() => {
    setStatus(enquiry?.status ?? "new");
    setNotes(enquiry?.notes ?? "");
  }, [enquiry]);

  async function handleSave() {
    if (!enquiry) return;
    try {
      await updateStatus({ id: enquiry._id, status, notes: notes.trim() || undefined });
      toast.success("Enquiry updated");
      onOpenChange(false);
    } catch {
      toast.error("Could not update enquiry");
    }
  }

  return (
    <Sheet open={enquiry !== null} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{enquiry?.name}</SheetTitle>
          <SheetDescription>
            {enquiry?.phone}
            {enquiry?.email ? ` · ${enquiry.email}` : ""}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 pb-4">
          {enquiry?.packageName && (
            <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
              Re: <span className="font-medium text-foreground">{enquiry.packageName}</span>
            </p>
          )}
          <div className="flex flex-col gap-1.5">
            <Label>Message</Label>
            <p className="rounded-md border border-border bg-background p-3 text-sm text-foreground whitespace-pre-wrap">
              {enquiry?.message}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="notes">Internal notes</Label>
            <Textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Notes for the studio team, not shown to the client."
            />
          </div>
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
