"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import {
  Inbox,
  MessageCircleMore,
  CalendarCheck2,
  Images,
  Package,
  Mail,
  ChevronRight,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/features/admin/dashboard/StatCard";
import { RecentEnquiriesTable } from "@/features/admin/dashboard/RecentEnquiriesTable";

function useGreeting() {
  const [greeting, setGreeting] = useState("Welcome back");
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
  }, []);
  return greeting;
}

function ProgressRow({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between text-sm lg:text-base">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">
          {count} / {total}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function DashboardPage({ secret }: { secret: string }) {
  const stats = useQuery(api.dashboard.getStats);
  const viewer = useQuery(api.users.viewer);
  const greeting = useGreeting();
  const firstName = viewer?.firstName;

  if (stats === undefined) {
    return (
      <div className="flex flex-col gap-6 lg:gap-8">
        <Skeleton className="h-9 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl lg:h-32" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <Skeleton className="h-80 rounded-xl lg:col-span-2" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  const draftAlbums = stats.totalAlbums - stats.publishedAlbums;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div>
        <h2 className="admin-heading">
          {greeting}
          {firstName ? `, ${firstName}` : ""}
        </h2>
        <p className="admin-subheading">Here&apos;s what&apos;s happening with the studio.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="New enquiries"
          value={stats.statusCounts.new}
          icon={Inbox}
          tone="primary"
          hint={stats.statusCounts.new > 0 ? "Needs a reply" : "All caught up"}
        />
        <StatCard
          label="Contacted"
          value={stats.statusCounts.contacted}
          icon={MessageCircleMore}
          tone="phone"
          hint="Awaiting response"
        />
        <StatCard
          label="Booked"
          value={stats.statusCounts.booked}
          icon={CalendarCheck2}
          tone="whatsapp"
          hint="Confirmed shoots"
        />
        <StatCard
          label="Published albums"
          value={`${stats.publishedAlbums} / ${stats.totalAlbums}`}
          icon={Images}
          tone="neutral"
          hint={draftAlbums > 0 ? `${draftAlbums} in draft` : "All published"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent enquiries</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={
                <Link href={`/admin/${secret}/enquiries`}>
                  View all
                  <ChevronRight className="size-4" />
                </Link>
              }
            />
          </CardHeader>
          <CardContent>
            <RecentEnquiriesTable enquiries={stats.recentEnquiries} secret={secret} />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 lg:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Catalogue health</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ProgressRow label="Albums published" count={stats.publishedAlbums} total={stats.totalAlbums} />
              <ProgressRow label="Packages active" count={stats.activePackages} total={stats.totalPackages} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="justify-start"
                nativeButton={false}
                render={
                  <Link href={`/admin/${secret}/albums/new`}>
                    <Images className="size-4" />
                    New album
                  </Link>
                }
              />
              <Button
                variant="outline"
                className="justify-start"
                nativeButton={false}
                render={
                  <Link href={`/admin/${secret}/packages/new`}>
                    <Package className="size-4" />
                    New package
                  </Link>
                }
              />
              <Button
                variant="outline"
                className="justify-start"
                nativeButton={false}
                render={
                  <Link href={`/admin/${secret}/enquiries`}>
                    <Mail className="size-4" />
                    Review enquiries
                  </Link>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
