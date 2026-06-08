import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { HomePage } from "@/components/pages/HomePage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function Page() {
  const [settings, featuredAlbums, packages] = await Promise.all([
    fetchQuery(api.siteSettings.get, {}),
    fetchQuery(api.albums.listFeatured, {}),
    fetchQuery(api.packages.listActive, {}),
  ]);

  if (!settings) {
    return null;
  }

  const popularPackages = packages.filter((pkg) => pkg.popular).slice(0, 3);

  return (
    <HomePage
      hero={settings.hero}
      featuredAlbums={featuredAlbums}
      popularPackages={popularPackages}
      aboutSnippet={settings.aboutSnippet}
      contact={{ phone: settings.phone, whatsapp: settings.whatsapp }}
    />
  );
}
