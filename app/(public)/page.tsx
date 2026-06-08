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

const serviceDescriptions: Record<string, string> = {
  Weddings: "Full-day coverage that captures every detail of your celebration.",
  Portraits: "Individual, couple, and family sessions in studio or on location.",
  Events: "Conferences, parties, and milestones documented candidly.",
  Studio: "Headshots and product photography with clean studio lighting.",
  Commercial: "Brand and campaign imagery for businesses across Ghana.",
};

export default async function Page() {
  const [settings, featuredAlbums] = await Promise.all([
    fetchQuery(api.siteSettings.get, {}),
    fetchQuery(api.albums.listFeatured, {}),
  ]);

  if (!settings) {
    return null;
  }

  const services = siteConfig.categories.map((category) => ({
    name: category,
    description: serviceDescriptions[category] ?? "Tailored coverage built around your day.",
  }));

  return (
    <HomePage
      hero={settings.hero}
      featuredAlbums={featuredAlbums}
      services={services}
      aboutSnippet={settings.aboutSnippet}
      contact={{ phone: settings.phone, whatsapp: settings.whatsapp }}
    />
  );
}
