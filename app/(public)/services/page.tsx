import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Photography packages and pricing from Smak Photography — weddings, portraits, events, and more in Koforidua, Ghana.",
  alternates: { canonical: "/services" },
};

export default async function Page() {
  const [packages, settings] = await Promise.all([
    fetchQuery(api.packages.listActive, {}),
    fetchQuery(api.siteSettings.get, {}),
  ]);

  return (
    <ServicesPage
      packages={packages}
      phone={settings?.phone ?? ""}
      whatsapp={settings?.whatsapp ?? ""}
    />
  );
}
