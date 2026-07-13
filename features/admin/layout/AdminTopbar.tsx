"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { AdminNotifications } from "@/features/admin/layout/AdminNotifications";

const TITLES: Record<string, string> = {
  "": "Dashboard",
  albums: "Albums",
  packages: "Packages",
  enquiries: "Enquiries",
  settings: "Site settings",
};

// Sub-pages one level below a list section aren't in the sidebar, so the
// topbar grows a back arrow to the parent list instead of a flat title.
const DETAIL_LABELS: Record<string, { new: string; edit: string }> = {
  albums: { new: "New album", edit: "Edit album" },
  packages: { new: "New package", edit: "Edit package" },
};

export function AdminTopbar({ secret }: { secret: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(`/admin/${secret}`, "").split("/").filter(Boolean);
  const [section, sub] = rest;

  const detail = sub ? DETAIL_LABELS[section] : undefined;
  const backHref = detail ? `/admin/${secret}/${section}` : undefined;
  const title = detail ? (sub === "new" ? detail.new : detail.edit) : TITLES[section ?? ""] ?? "Admin";

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 lg:h-16 lg:px-6">
      <SidebarTrigger size="icon-lg" className="size-10 [&_svg]:size-5" />
      <Separator orientation="vertical" className="h-6" />
      {backHref && (
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Back"
          nativeButton={false}
          render={<Link href={backHref} />}
        >
          <ArrowLeft />
        </Button>
      )}
      <h1 className="text-sm font-medium text-sidebar-foreground lg:text-base">{title}</h1>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <AdminNotifications />
      </div>
    </header>
  );
}
