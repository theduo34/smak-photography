"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EmptyState } from "@/components/shared/EmptyState";

// UI shell only — no notification data or unread badge yet. Wire this up
// once there's a source of truth (a table + a query) to back it.
export function AdminNotifications() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
        }
      />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <EmptyState
            icon={BellOff}
            title="No notifications yet"
            description="Enquiry and booking updates will show up here."
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
