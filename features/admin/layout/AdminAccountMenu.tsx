"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut, Settings } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { initials } from "@/lib/utils";

export function AdminAccountMenu({ secret }: { secret: string }) {
  const viewer = useQuery(api.users.viewer);
  const { signOut } = useAuthActions();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const email = viewer?.email ?? "";
  const fullName = [viewer?.firstName, viewer?.lastName].filter(Boolean).join(" ");
  const displayName = fullName || email.split("@")[0] || "Admin";

  async function handleLogout() {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      // Navigate regardless of signOut outcome so a network hiccup never
      // leaves an admin stuck behind a confirm dialog with no way out.
      router.replace(`/admin/${secret}/login`);
    }
  }

  return (
    <>
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger
          className="flex w-full items-center gap-2.5 rounded-md bg-sidebar-accent/60 p-2 text-left transition-colors hover:bg-sidebar-accent group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
          aria-label="Account settings"
        >
          <Avatar size="sm" className="shrink-0 lg:size-9">
            <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
              {viewer === undefined ? "" : initials(displayName)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-sm font-medium text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            My account
          </span>
        </PopoverTrigger>
        {/* w-64 = 16rem, matching SIDEBAR_WIDTH so the popover never spills past the sidebar's own width. */}
        <PopoverContent side="top" align="start" className="w-64">
          <div className="flex items-center gap-2.5 px-1 pb-1">
            <Avatar>
              <AvatarFallback className="bg-primary/10 font-medium text-primary">
                {initials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-foreground capitalize">
                {displayName}
              </span>
              <span className="truncate text-xs text-muted-foreground">{email}</span>
            </div>
          </div>
          <Separator />
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              router.push(`/admin/${secret}/settings`);
            }}
            className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
          >
            <Settings className="size-4 text-muted-foreground" />
            Site settings
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setConfirmOpen(true);
            }}
            className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </PopoverContent>
      </Popover>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;ll need to sign in again to manage the studio&apos;s content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={signingOut} onClick={handleLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
