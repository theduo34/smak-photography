"use client";

import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/layout/AdminSidebar";
import { AdminTopbar } from "@/features/admin/layout/AdminTopbar";
import { AdminErrorBoundary } from "@/features/admin/layout/AdminErrorBoundary";

export function AdminPanelShell({ secret, children }: { secret: string; children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar secret={secret} />
      <SidebarInset>
        <AdminTopbar secret={secret} />
        <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:gap-8 lg:p-8">
          <AdminErrorBoundary>{children}</AdminErrorBoundary>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
