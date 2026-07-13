"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, Package, Inbox } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/shared/Logo";
import { AdminAccountMenu } from "@/features/admin/layout/AdminAccountMenu";

const activePillClass =
  "data-active:bg-primary/10 data-active:text-primary data-active:font-medium data-active:hover:bg-primary/15 data-active:hover:text-primary";

// Labels collapse to nothing in icon mode — the SidebarMenuButton itself
// already shrinks to a square via the primitive's own collapse styles.
const collapsibleLabel = "group-data-[collapsible=icon]:hidden";

type AdminSidebarProps = {
  secret: string;
};

export function AdminSidebar({ secret }: AdminSidebarProps) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const base = `/admin/${secret}`;

  const items = [
    { label: "Dashboard", href: base, icon: LayoutDashboard },
    { label: "Albums", href: `${base}/albums`, icon: ImageIcon },
    { label: "Packages", href: `${base}/packages`, icon: Package },
    { label: "Enquiries", href: `${base}/enquiries`, icon: Inbox },
  ];

  function closeOnMobile() {
    if (isMobile) setOpenMobile(false);
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-3.5">
        <Link
          href={base}
          onClick={closeOnMobile}
          className="flex items-center gap-2 px-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <Logo
            imageClassName="size-7 shrink-0 lg:size-8"
            textClassName={`text-sm lg:text-base ${collapsibleLabel}`}
          />
        </Link>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent className="px-2 pt-3">
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const active = item.href === base ? pathname === base : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      size="lg"
                      isActive={active}
                      tooltip={item.label}
                      className={activePillClass}
                      render={
                        <Link href={item.href} onClick={closeOnMobile}>
                          <item.icon />
                          <span className={collapsibleLabel}>{item.label}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="mx-0" />
      <SidebarFooter className="px-2 py-3">
        <AdminAccountMenu secret={secret} />
      </SidebarFooter>
    </Sidebar>
  );
}
