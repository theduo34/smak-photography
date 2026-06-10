import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Smak Photography, a photography studio based in Koforidua, Ghana.",
  alternates: { canonical: "/about" },
};

export default async function Page() {
  const settings = await fetchQuery(api.siteSettings.get, {});

  return (
    <AboutPage
      aboutFull={settings?.aboutFull ?? null}
      aboutImage={settings?.aboutImage ?? null}
      stats={settings?.stats ?? []}
      whatsapp={settings?.whatsapp ?? ""}
      phone={settings?.phone ?? ""}
    />
  );
}
