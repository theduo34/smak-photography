"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroSettingsForm } from "@/features/admin/settings/HeroSettingsForm";
import { AboutSettingsForm } from "@/features/admin/settings/AboutSettingsForm";
import { ContactSettingsForm } from "@/features/admin/settings/ContactSettingsForm";
import { SocialsSettingsForm } from "@/features/admin/settings/SocialsSettingsForm";
import { StatsSettingsForm } from "@/features/admin/settings/StatsSettingsForm";

export function SettingsPage() {
  const settings = useQuery(api.siteSettings.get);

  return (
    <div className="flex flex-col gap-6">
      <p className="admin-subheading">Everything visitors see across the public site.</p>

      {settings === undefined ? (
        <Skeleton className="h-96 w-full max-w-2xl" />
      ) : settings === null ? (
        <p className="text-sm text-muted-foreground">
          Site settings haven&apos;t been seeded yet. Run the seed script first.
        </p>
      ) : (
        <Card>
          <CardContent>
            <Tabs defaultValue="hero">
              <TabsList>
                <TabsTrigger value="hero">Hero</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="socials">Socials</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
              </TabsList>
              <TabsContent value="hero" className="pt-4">
                <HeroSettingsForm settings={settings} />
              </TabsContent>
              <TabsContent value="about" className="pt-4">
                <AboutSettingsForm settings={settings} />
              </TabsContent>
              <TabsContent value="contact" className="pt-4">
                <ContactSettingsForm settings={settings} />
              </TabsContent>
              <TabsContent value="socials" className="pt-4">
                <SocialsSettingsForm settings={settings} />
              </TabsContent>
              <TabsContent value="stats" className="pt-4">
                <StatsSettingsForm settings={settings} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
